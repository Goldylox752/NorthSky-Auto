import Stripe from "stripe";
import { headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
const PLAN_NAMES = {
  starter: "Starter Dealer",
  professional: "Professional",
  enterprise: "Enterprise",
};
function getPlanName(plan) {
  return PLAN_NAMES[plan] || plan || "Unknown";
}
function getPlanFromPriceId(priceId) {
  if (
    priceId &&
    priceId === process.env.STRIPE_STARTER_PRICE_ID
  ) {
    return "starter";
  }
  if (
    priceId &&
    priceId === process.env.STRIPE_PROFESSIONAL_PRICE_ID
  ) {
    return "professional";
  }
  if (
    priceId &&
    priceId === process.env.STRIPE_ENTERPRISE_PRICE_ID
  ) {
    return "enterprise";
  }
  return null;
}
async function findDealer({
  customerId,
  email,
}) {
  if (!customerId && !email) {
    return null;
  }
  if (customerId) {
    const { data, error } = await supabase
      .from("dealers")
      .select("*")
      .eq("stripe_customer_id", customerId)
      .maybeSingle();
    if (!error && data) {
      return data;
    }
  }
  if (email) {
    const { data, error } = await supabase
      .from("dealers")
      .select("*")
      .ilike("email", email)
      .maybeSingle();
    if (!error && data) {
      return data;
    }
  }
  return null;
}
async function updateDealer(dealerId, updates) {
  if (!dealerId) {
    return;
  }
  const { error } = await supabase
    .from("dealers")
    .update(updates)
    .eq("id", dealerId);
  if (error) {
    console.error("Supabase dealer update failed:", error);
    throw error;
  }
}
export async function POST(request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");
  if (!signature) {
    return new Response("Missing stripe-signature", {
      status: 400,
    });
  }
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error(
      "Stripe webhook signature verification failed:",
      error.message
    );
    return new Response(
      `Webhook Error: ${error.message}`,
      {
        status: 400,
      }
    );
  }
  try {
    console.log(
      `Stripe webhook received: ${event.type}`
    );
    switch (event.type) {
      /*
       * --------------------------------------------------
       * CHECKOUT COMPLETED
       * --------------------------------------------------
       */
      case "checkout.session.completed": {
        const session = event.data.object;
        const customerId = session.customer;
        const subscriptionId = session.subscription;
        const email =
          session.customer_details?.email ||
          session.customer_email ||
          null;
        const plan =
          session.metadata?.plan || null;
        console.log("Checkout completed:", {
          sessionId: session.id,
          customerId,
          subscriptionId,
          email,
          plan,
        });
        const dealer = await findDealer({
          customerId,
          email,
        });
        if (!dealer) {
          console.warn(
            "No matching dealer found for checkout:",
            {
              customerId,
              email,
            }
          );
          break;
        }
        const updates = {};
        if (customerId) {
          updates.stripe_customer_id = customerId;
        }
        if (subscriptionId) {
          updates.stripe_subscription_id =
            subscriptionId;
        }
        if (plan) {
          updates.subscription_plan = plan;
        }
        updates.subscription_status = "active";
        await updateDealer(dealer.id, updates);
        console.log(
          "Dealer updated after checkout:",
          dealer.id
        );
        break;
      }
      /*
       * --------------------------------------------------
       * SUBSCRIPTION CREATED
       * --------------------------------------------------
       */
      case "customer.subscription.created": {
        const subscription = event.data.object;
        const customerId = subscription.customer;
        const priceId =
          subscription.items?.data?.[0]?.price?.id;
        const plan =
          subscription.metadata?.plan ||
          getPlanFromPriceId(priceId);
        const dealer = await findDealer({
          customerId,
        });
        console.log("Subscription created:", {
          subscriptionId: subscription.id,
          customerId,
          priceId,
          plan,
          status: subscription.status,
        });
        if (!dealer) {
          console.warn(
            "No dealer found for subscription:",
            subscription.id
          );
          break;
        }
        await updateDealer(dealer.id, {
          stripe_customer_id: customerId,
          stripe_subscription_id: subscription.id,
          subscription_plan: plan,
          subscription_status: subscription.status,
        });
        break;
      }
      /*
       * --------------------------------------------------
       * SUBSCRIPTION UPDATED
       * --------------------------------------------------
       */
      case "customer.subscription.updated": {
        const subscription = event.data.object;
        const customerId = subscription.customer;
        const priceId =
          subscription.items?.data?.[0]?.price?.id;
        const plan =
          subscription.metadata?.plan ||
          getPlanFromPriceId(priceId);
        const dealer = await findDealer({
          customerId,
        });
        console.log("Subscription updated:", {
          subscriptionId: subscription.id,
          customerId,
          priceId,
          plan,
          status: subscription.status,
        });
        if (!dealer) {
          console.warn(
            "No dealer found for updated subscription:",
            subscription.id
          );
          break;
        }
        await updateDealer(dealer.id, {
          stripe_customer_id: customerId,
          stripe_subscription_id: subscription.id,
          subscription_plan: plan,
          subscription_status: subscription.status,
        });
        break;
      }
      /*
       * --------------------------------------------------
       * SUBSCRIPTION CANCELLED
       * --------------------------------------------------
       */
      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const customerId = subscription.customer;
        const dealer = await findDealer({
          customerId,
        });
        console.log(
          "Subscription cancelled:",
          subscription.id
        );
        if (!dealer) {
          console.warn(
            "No dealer found for cancelled subscription:",
            subscription.id
          );
          break;
        }
        await updateDealer(dealer.id, {
          subscription_status: "canceled",
        });
        break;
      }
      /*
       * --------------------------------------------------
       * INVOICE PAID
       * --------------------------------------------------
       */
      case "invoice.paid": {
        const invoice = event.data.object;
        const customerId = invoice.customer;
        const dealer = await findDealer({
          customerId,
        });
        console.log("Invoice paid:", {
          invoiceId: invoice.id,
          customerId,
        });
        if (!dealer) {
          console.warn(
            "No dealer found for paid invoice:",
            invoice.id
          );
          break;
        }
        await updateDealer(dealer.id, {
          subscription_status: "active",
        });
        break;
      }
      /*
       * --------------------------------------------------
       * PAYMENT FAILED
       * --------------------------------------------------
       */
      case "invoice.payment_failed": {
        const invoice = event.data.object;
        const customerId = invoice.customer;
        const dealer = await findDealer({
          customerId,
        });
        console.log("Invoice payment failed:", {
          invoiceId: invoice.id,
          customerId,
        });
        if (!dealer) {
          console.warn(
            "No dealer found for failed invoice:",
            invoice.id
          );
          break;
        }
        await updateDealer(dealer.id, {
          subscription_status: "past_due",
        });
        break;
      }
      /*
       * --------------------------------------------------
       * DEFAULT
       * --------------------------------------------------
       */
      default:
        console.log(
          `Unhandled Stripe event: ${event.type}`
        );
    }
    return Response.json({
      received: true,
    });
  } catch (error) {
    console.error(
      "Stripe webhook processing error:",
      error
    );
    return new Response(
      "Webhook processing failed",
      {
        status: 500,
      }
    );
  }
}