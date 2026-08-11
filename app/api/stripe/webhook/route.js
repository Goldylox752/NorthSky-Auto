import Stripe from "stripe";
import { headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";
const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY
);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
/*
|--------------------------------------------------------------------------
| Plan helpers
|--------------------------------------------------------------------------
*/
const PLAN_NAMES = {
  starter: "Dealer Starter",
  professional: "Dealer Pro",
  enterprise: "Dealer Enterprise",
};
function normalizePlan(plan) {
  if (!plan) return null;
  const value = String(plan)
    .toLowerCase()
    .trim();
  if (
    value === "starter" ||
    value === "dealer starter"
  ) {
    return "starter";
  }
  if (
    value === "professional" ||
    value === "pro" ||
    value === "dealer pro"
  ) {
    return "professional";
  }
  if (
    value === "enterprise" ||
    value === "dealer enterprise"
  ) {
    return "enterprise";
  }
  return null;
}
function getPlanFromPriceId(priceId) {
  if (
    priceId &&
    priceId ===
      process.env.STRIPE_STARTER_PRICE_ID
  ) {
    return "starter";
  }
  if (
    priceId &&
    priceId ===
      process.env.STRIPE_PROFESSIONAL_PRICE_ID
  ) {
    return "professional";
  }
  if (
    priceId &&
    priceId ===
      process.env.STRIPE_ENTERPRISE_PRICE_ID
  ) {
    return "enterprise";
  }
  return null;
}
function getCustomerId(customer) {
  if (!customer) {
    return null;
  }
  if (typeof customer === "string") {
    return customer;
  }
  return customer.id || null;
}
/*
|--------------------------------------------------------------------------
| Supabase helpers
|--------------------------------------------------------------------------
*/
async function findDealer({
  customerId,
  email,
}) {
  if (!customerId && !email) {
    return null;
  }
  /*
   * First try Stripe customer ID.
   */
  if (customerId) {
    const { data, error } =
      await supabase
        .from("dealers")
        .select("*")
        .eq(
          "stripe_customer_id",
          customerId
        )
        .maybeSingle();
    if (error) {
      console.error(
        "Dealer lookup by Stripe customer failed:",
        error
      );
    }
    if (data) {
      return data;
    }
  }
  /*
   * Fall back to dealer email.
   */
  if (email) {
    const { data, error } =
      await supabase
        .from("dealers")
        .select("*")
        .ilike("email", email)
        .maybeSingle();
    if (error) {
      console.error(
        "Dealer lookup by email failed:",
        error
      );
    }
    if (data) {
      return data;
    }
  }
  return null;
}
async function updateDealer(
  dealerId,
  updates
) {
  if (!dealerId) {
    return;
  }
  const { error } =
    await supabase
      .from("dealers")
      .update(updates)
      .eq("id", dealerId);
  if (error) {
    console.error(
      "Supabase dealer update failed:",
      error
    );
    throw error;
  }
}
/*
|--------------------------------------------------------------------------
| Subscription helpers
|--------------------------------------------------------------------------
*/
function getSubscriptionDetails(
  subscription
) {
  const priceId =
    subscription?.items?.data?.[0]
      ?.price?.id || null;
  const metadataPlan =
    normalizePlan(
      subscription?.metadata?.plan
    );
  const pricePlan =
    getPlanFromPriceId(priceId);
  return {
    plan:
      metadataPlan ||
      pricePlan ||
      null,
    priceId,
  };
}
/*
|--------------------------------------------------------------------------
| Webhook
|--------------------------------------------------------------------------
*/
export async function POST(request) {
  const body = await request.text();
  const headersList = await headers();
  const signature =
    headersList.get(
      "stripe-signature"
    );
  /*
   * Stripe signature is required.
   */
  if (!signature) {
    return new Response(
      "Missing stripe-signature",
      {
        status: 400,
      }
    );
  }
  /*
   * Webhook secret is required.
   */
  if (
    !process.env.STRIPE_WEBHOOK_SECRET
  ) {
    console.error(
      "STRIPE_WEBHOOK_SECRET is not configured."
    );
    return new Response(
      "Webhook configuration error",
      {
        status: 500,
      }
    );
  }
  let event;
  /*
   * Verify Stripe webhook signature.
   */
  try {
    event =
      stripe.webhooks.constructEvent(
        body,
        signature,
        process.env
          .STRIPE_WEBHOOK_SECRET
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
      "Stripe webhook received:",
      event.type
    );
    /*
    |--------------------------------------------------------------------------
    | CHECKOUT COMPLETED
    |--------------------------------------------------------------------------
    */
    if (
      event.type ===
      "checkout.session.completed"
    ) {
      const session =
        event.data.object;
      const customerId =
        getCustomerId(
          session.customer
        );
      const subscriptionId =
        getCustomerId(
          session.subscription
        );
      const email =
        session.customer_details
          ?.email ||
        session.customer_email ||
        null;
      const plan =
        normalizePlan(
          session.metadata?.plan
        );
      console.log(
        "Checkout completed:",
        {
          sessionId: session.id,
          customerId,
          subscriptionId,
          email,
          plan,
          planName:
            plan
              ? PLAN_NAMES[plan]
              : null,
        }
      );
      const dealer =
        await findDealer({
          customerId,
          email,
        });
      /*
       * The payment may complete before a dealer
       * record exists. Do not fail the webhook.
       */
      if (!dealer) {
        console.warn(
          "No matching dealer found for checkout:",
          {
            customerId,
            email,
            sessionId:
              session.id,
          }
        );
        return Response.json({
          received: true,
          warning:
            "Dealer record not found.",
        });
      }
      const updates = {
        subscription_status:
          "active",
      };
      if (customerId) {
        updates.stripe_customer_id =
          customerId;
      }
      if (subscriptionId) {
        updates.stripe_subscription_id =
          subscriptionId;
      }
      if (plan) {
        updates.subscription_plan =
          plan;
      }
      await updateDealer(
        dealer.id,
        updates
      );
      console.log(
        "Dealer activated:",
        dealer.id
      );
    }
    /*
    |--------------------------------------------------------------------------
    | SUBSCRIPTION CREATED
    |--------------------------------------------------------------------------
    */
    else if (
      event.type ===
      "customer.subscription.created"
    ) {
      const subscription =
        event.data.object;
      const customerId =
        getCustomerId(
          subscription.customer
        );
      const {
        plan,
        priceId,
      } =
        getSubscriptionDetails(
          subscription
        );
      const dealer =
        await findDealer({
          customerId,
        });
      console.log(
        "Subscription created:",
        {
          subscriptionId:
            subscription.id,
          customerId,
          priceId,
          plan,
          status:
            subscription.status,
        }
      );
      if (!dealer) {
        console.warn(
          "No dealer found for subscription:",
          subscription.id
        );
      } else {
        await updateDealer(
          dealer.id,
          {
            stripe_customer_id:
              customerId,
            stripe_subscription_id:
              subscription.id,
            subscription_plan:
              plan,
            subscription_status:
              subscription.status,
          }
        );
      }
    }
    /*
    |--------------------------------------------------------------------------
    | SUBSCRIPTION UPDATED
    |--------------------------------------------------------------------------
    */
    else if (
      event.type ===
      "customer.subscription.updated"
    ) {
      const subscription =
        event.data.object;
      const customerId =
        getCustomerId(
          subscription.customer
        );
      const {
        plan,
        priceId,
      } =
        getSubscriptionDetails(
          subscription
        );
      const dealer =
        await findDealer({
          customerId,
        });
      console.log(
        "Subscription updated:",
        {
          subscriptionId:
            subscription.id,
          customerId,
          priceId,
          plan,
          status:
            subscription.status,
        }
      );
      if (!dealer) {
        console.warn(
          "No dealer found for updated subscription:",
          subscription.id
        );
      } else {
        await updateDealer(
          dealer.id,
          {
            stripe_customer_id:
              customerId,
            stripe_subscription_id:
              subscription.id,
            subscription_plan:
              plan,
            subscription_status:
              subscription.status,
          }
        );
      }
    }
    /*
    |--------------------------------------------------------------------------
    | SUBSCRIPTION CANCELLED
    |--------------------------------------------------------------------------
    */
    else if (
      event.type ===
      "customer.subscription.deleted"
    ) {
      const subscription =
        event.data.object;
      const customerId =
        getCustomerId(
          subscription.customer
        );
      const dealer =
        await findDealer({
          customerId,
        });
      console.log(
        "Subscription cancelled:",
        {
          subscriptionId:
            subscription.id,
          customerId,
        }
      );
      if (!dealer) {
        console.warn(
          "No dealer found for cancelled subscription:",
          subscription.id
        );
      } else {
        await updateDealer(
          dealer.id,
          {
            subscription_status:
              "canceled",
          }
        );
      }
    }
    /*
    |--------------------------------------------------------------------------
    | INVOICE PAID
    |--------------------------------------------------------------------------
    */
    else if (
      event.type ===
      "invoice.paid"
    ) {
      const invoice =
        event.data.object;
      const customerId =
        getCustomerId(
          invoice.customer
        );
      const dealer =
        await findDealer({
          customerId,
        });
      console.log(
        "Invoice paid:",
        {
          invoiceId:
            invoice.id,
          customerId,
        }
      );
      if (!dealer) {
        console.warn(
          "No dealer found for paid invoice:",
          invoice.id
        );
      } else {
        await updateDealer(
          dealer.id,
          {
            subscription_status:
              "active",
          }
        );
      }
    }
    /*
    |--------------------------------------------------------------------------
    | PAYMENT FAILED
    |--------------------------------------------------------------------------
    */
    else if (
      event.type ===
      "invoice.payment_failed"
    ) {
      const invoice =
        event.data.object;
      const customerId =
        getCustomerId(
          invoice.customer
        );
      const dealer =
        await findDealer({
          customerId,
        });
      console.log(
        "Invoice payment failed:",
        {
          invoiceId:
            invoice.id,
          customerId,
        }
      );
      if (!dealer) {
        console.warn(
          "No dealer found for failed invoice:",
          invoice.id
        );
      } else {
        await updateDealer(
          dealer.id,
          {
            subscription_status:
              "past_due",
          }
        );
      }
    }
    /*
    |--------------------------------------------------------------------------
    | OTHER STRIPE EVENTS
    |--------------------------------------------------------------------------
    */
    else {
      console.log(
        "Unhandled Stripe event:",
        event.type
      );
    }
    /*
    |--------------------------------------------------------------------------
    | Successful webhook response
    |--------------------------------------------------------------------------
    */
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