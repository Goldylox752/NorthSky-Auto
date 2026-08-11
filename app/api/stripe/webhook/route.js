import Stripe from "stripe";
import { headers } from "next/headers";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
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
    console.error("Stripe webhook signature verification failed:", error.message);
    return new Response(`Webhook Error: ${error.message}`, {
      status: 400,
    });
  }
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        console.log("Checkout completed:", session.id);
        console.log({
          customerId: session.customer,
          subscriptionId: session.subscription,
          email: session.customer_details?.email,
        });
        break;
      }
      case "customer.subscription.created": {
        const subscription = event.data.object;
        console.log("Subscription created:", subscription.id);
        console.log("Status:", subscription.status);
        console.log("Customer:", subscription.customer);
        break;
      }
      case "customer.subscription.updated": {
        const subscription = event.data.object;
        console.log("Subscription updated:", subscription.id);
        console.log("Status:", subscription.status);
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        console.log("Subscription cancelled:", subscription.id);
        break;
      }
      case "invoice.paid": {
        const invoice = event.data.object;
        console.log("Invoice paid:", invoice.id);
        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object;
        console.log("Invoice payment failed:", invoice.id);
        break;
      }
      default:
        console.log(`Unhandled Stripe event: ${event.type}`);
    }
    return Response.json({
      received: true,
    });
  } catch (error) {
    console.error("Stripe webhook processing error:", error);
    return new Response("Webhook processing failed", {
      status: 500,
    });
  }
}