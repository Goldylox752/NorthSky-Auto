import Stripe from "stripe";
import { headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";
export const runtime = "nodejs";
/*
|--------------------------------------------------------------------------
| NorthSky Auto — Stripe Webhook
|--------------------------------------------------------------------------
|
| Handles:
|
| checkout.session.completed
| customer.subscription.created
| customer.subscription.updated
| customer.subscription.deleted
| invoice.paid
| invoice.payment_failed
|
| Stripe remains the source of truth for subscription status.
|--------------------------------------------------------------------------
*/
const PLAN_NAMES = {
  starter: "Dealer Starter",
  professional: "Dealer Professional",
};
function normalizePlan(value) {
  if (!value) return null;
  const plan = String(value)
    .trim()
    .toLowerCase();
  if (
    plan === "starter" ||
    plan === "dealer starter"
  ) {
    return "starter";
  }
  if (
    plan === "professional" ||
    plan === "pro" ||
    plan === "dealer pro" ||
    plan === "dealer professional"
  ) {
    return "professional";
  }
  return null;
}
function getCustomerId(customer) {
  if (!customer) return null;
  if (typeof customer === "string") {
    return customer;
  }
  return customer.id || null;
}
function getStripe() {
  const key =
    process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY is not configured."
    );
  }
  return new Stripe(key, {
    apiVersion: "2025-03-31.basil",
  });
}
function getSupabase() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is not configured."
    );
  }
  if (!serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not configured."
    );
  }
  return createClient(
    url,
    serviceRoleKey
  );
}
/*
|--------------------------------------------------------------------------
| Plan Detection
|--------------------------------------------------------------------------
*/
function getPlanFromPriceId(priceId) {
  if (!priceId) return null;
  if (
    priceId ===
    process.env.STRIPE_STARTER_PRICE_ID
  ) {
    return "starter";
  }
  if (
    priceId ===
    process.env.STRIPE_PROFESSIONAL_PRICE_ID
  ) {
    return "professional";
  }
  return null;
}
function getSubscriptionPlan(subscription) {
  const priceId =
    subscription?.items?.data?.[0]?.price?.id ||
    null;
  /*
   * Price ID is authoritative.
   */
  const pricePlan =
    getPlanFromPriceId(priceId);
  if (pricePlan) {
    return {
      plan: pricePlan,
      priceId,
    };
  }
  /*
   * Metadata fallback.
   */
  const metadataPlan =
    normalizePlan(
      subscription?.metadata?.plan
    );
  return {
    plan: metadataPlan,
    priceId,
  };
}
/*
|--------------------------------------------------------------------------
| Marketing Attribution
|--------------------------------------------------------------------------
*/
function getMarketingMetadata(metadata) {
  return {
    source:
      metadata?.source
        ?.toString()
        .trim()
        .slice(0, 100) || null,
    campaign:
      metadata?.campaign
        ?.toString()
        .trim()
        .slice(0, 100) || null,
    sessionId:
      metadata?.marketing_session_id
        ?.toString()
        .trim()
        .slice(0, 200) || null,
  };
}
/*
|--------------------------------------------------------------------------
| Dealer Lookup
|--------------------------------------------------------------------------
*/
async function findDealer(
  supabase,
  {
    customerId = null,
    email = null,
    subscriptionId = null,
  } = {}
) {
  /*
   * Subscription ID is the strongest lookup
   * for an existing subscription.
   */
  if (subscriptionId) {
    const { data, error } =
      await supabase
        .from("dealers")
        .select("*")
        .eq(
          "stripe_subscription_id",
          subscriptionId
        )
        .maybeSingle();
    if (error) {
      console.error(
        "Dealer lookup by subscription failed:",
        error
      );
    }
    if (data) return data;
  }
  /*
   * Then Stripe customer ID.
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
    if (data) return data;
  }
  /*
   * Finally email.
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
    if (data) return data;
  }
  return null;
}
/*
|--------------------------------------------------------------------------
| Dealer Update
|--------------------------------------------------------------------------
*/
async function updateDealer(
  supabase,
  dealerId,
  updates
) {
  if (!dealerId) return null;
  const { data, error } =
    await supabase
      .from("dealers")
      .update(updates)
      .eq("id", dealerId)
      .select("*")
      .maybeSingle();
  if (error) {
    console.error(
      "Dealer update failed:",
      error
    );
    throw error;
  }
  return data;
}
/*
|--------------------------------------------------------------------------
| Dealer Creation
|--------------------------------------------------------------------------
*/
async function createDealer(
  supabase,
  {
    email,
    customerId,
    subscriptionId,
    plan,
    status,
    source,
    campaign,
    sessionId,
    name,
  }
) {
  if (!email && !customerId) {
    throw new Error(
      "Cannot create dealer without email or Stripe customer ID."
    );
  }
  const dealerData = {
    email: email || null,
    stripe_customer_id:
      customerId || null,
    stripe_subscription_id:
      subscriptionId || null,
    subscription_plan:
      plan || null,
    subscription_status:
      status || "active",
    marketing_source:
      source || null,
    marketing_campaign:
      campaign || null,
    marketing_session_id:
      sessionId || null,
    name:
      name || null,
  };
  const { data, error } =
    await supabase
      .from("dealers")
      .insert(dealerData)
      .select("*")
      .single();
  if (error) {
    /*
     * A duplicate can occur when Stripe retries
     * an event or two related events arrive close
     * together. Try to find the existing dealer.
     */
    console.error(
      "Dealer insert failed:",
      error
    );
    const existing =
      await findDealer(
        supabase,
        {
          customerId,
          email,
          subscriptionId,
        }
      );
    if (existing) {
      return existing;
    }
    throw error;
  }
  console.log(
    "Dealer created:",
    {
      dealerId: data.id,
      email: data.email,
      plan: data.subscription_plan,
      status: data.subscription_status,
    }
  );
  return data;
}
/*
|--------------------------------------------------------------------------
| Find Or Create Dealer
|--------------------------------------------------------------------------
*/
async function findOrCreateDealer(
  supabase,
  data
) {
  const existing =
    await findDealer(
      supabase,
      {
        customerId:
          data.customerId,
        email: data.email,
        subscriptionId:
          data.subscriptionId,
      }
    );
  if (existing) {
    const updates = {};
    if (data.customerId) {
      updates.stripe_customer_id =
        data.customerId;
    }
    if (data.subscriptionId) {
      updates.stripe_subscription_id =
        data.subscriptionId;
    }
    if (data.plan) {
      updates.subscription_plan =
        data.plan;
    }
    if (data.status) {
      updates.subscription_status =
        data.status;
    }
    if (data.source) {
      updates.marketing_source =
        data.source;
    }
    if (data.campaign) {
      updates.marketing_campaign =
        data.campaign;
    }
    if (data.sessionId) {
      updates.marketing_session_id =
        data.sessionId;
    }
    if (data.name && !existing.name) {
      updates.name = data.name;
    }
    if (
      data.email &&
      !existing.email
    ) {
      updates.email = data.email;
    }
    if (Object.keys(updates).length) {
      return updateDealer(
        supabase,
        existing.id,
        updates
      );
    }
    return existing;
  }
  return createDealer(
    supabase,
    data
  );
}
/*
|--------------------------------------------------------------------------
| POST /api/stripe/webhook
|--------------------------------------------------------------------------
*/
export async function POST(request) {
  try {
    /*
     * Validate required environment variables
     * at request time.
     */
    if (
      !process.env.STRIPE_SECRET_KEY
    ) {
      console.error(
        "STRIPE_SECRET_KEY is missing."
      );
      return new Response(
        "Webhook configuration error",
        { status: 500 }
      );
    }
    if (
      !process.env.STRIPE_WEBHOOK_SECRET
    ) {
      console.error(
        "STRIPE_WEBHOOK_SECRET is missing."
      );
      return new Response(
        "Webhook configuration error",
        { status: 500 }
      );
    }
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL
    ) {
      console.error(
        "NEXT_PUBLIC_SUPABASE_URL is missing."
      );
      return new Response(
        "Webhook configuration error",
        { status: 500 }
      );
    }
    if (
      !process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      console.error(
        "SUPABASE_SERVICE_ROLE_KEY is missing."
      );
      return new Response(
        "Webhook configuration error",
        { status: 500 }
      );
    }
    const stripe = getStripe();
    const supabase = getSupabase();
    /*
     * Stripe signature verification requires
     * the raw request body.
     */
    const rawBody =
      await request.text();
    const headersList =
      await headers();
    const signature =
      headersList.get(
        "stripe-signature"
      );
    if (!signature) {
      return new Response(
        "Missing stripe-signature",
        { status: 400 }
      );
    }
    let event;
    try {
      event =
        stripe.webhooks.constructEvent(
          rawBody,
          signature,
          process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
      console.error(
        "Stripe signature verification failed:",
        error?.message
      );
      return new Response(
        "Invalid webhook signature",
        { status: 400 }
      );
    }
    console.log(
      "Stripe webhook:",
      event.id,
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
      const {
        source,
        campaign,
        sessionId,
      } =
        getMarketingMetadata(
          session.metadata
        );
      const name =
        session.customer_details
          ?.name || null;
      if (!plan) {
        console.error(
          "Checkout completed with invalid plan:",
          session.metadata?.plan
        );
        return Response.json({
          received: true,
          warning:
            "Invalid dealer plan.",
        });
      }
      await findOrCreateDealer(
        supabase,
        {
          email,
          customerId,
          subscriptionId,
          plan,
          status: "active",
          source,
          campaign,
          sessionId,
          name,
        }
      );
      console.log(
        "Dealer checkout completed:",
        {
          sessionId: session.id,
          customerId,
          subscriptionId,
          email,
          plan,
          planName:
            PLAN_NAMES[plan],
        }
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
        getSubscriptionPlan(
          subscription
        );
      const {
        source,
        campaign,
        sessionId,
      } =
        getMarketingMetadata(
          subscription.metadata
        );
      if (!plan) {
        console.error(
          "Unknown subscription price:",
          priceId
        );
        return Response.json({
          received: true,
          warning:
            "Unknown subscription plan.",
        });
      }
      await findOrCreateDealer(
        supabase,
        {
          email: null,
          customerId,
          subscriptionId:
            subscription.id,
          plan,
          status:
            subscription.status,
          source,
          campaign,
          sessionId,
          name: null,
        }
      );
      console.log(
        "Subscription connected:",
        {
          subscriptionId:
            subscription.id,
          plan,
          status:
            subscription.status,
        }
      );
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
        getSubscriptionPlan(
          subscription
        );
      const {
        source,
        campaign,
        sessionId,
      } =
        getMarketingMetadata(
          subscription.metadata
        );
      if (!plan) {
        console.error(
          "Unknown updated subscription price:",
          priceId
        );
        return Response.json({
          received: true,
          warning:
            "Unknown subscription plan.",
        });
      }
      const dealer =
        await findDealer(
          supabase,
          {
            customerId,
            subscriptionId:
              subscription.id,
          }
        );
      if (!dealer) {
        console.warn(
          "No dealer found for subscription update:",
          subscription.id
        );
        /*
         * Create a dealer record if Stripe
         * has a valid subscription but the
         * earlier event was missed.
         */
        await findOrCreateDealer(
          supabase,
          {
            email: null,
            customerId,
            subscriptionId:
              subscription.id,
            plan,
            status:
              subscription.status,
            source,
            campaign,
            sessionId,
            name: null,
          }
        );
      } else {
        const updates = {
          stripe_customer_id:
            customerId,
          stripe_subscription_id:
            subscription.id,
          subscription_plan:
            plan,
          subscription_status:
            subscription.status,
        };
        if (source) {
          updates.marketing_source =
            source;
        }
        if (campaign) {
          updates.marketing_campaign =
            campaign;
        }
        if (sessionId) {
          updates.marketing_session_id =
            sessionId;
        }
        await updateDealer(
          supabase,
          dealer.id,
          updates
        );
      }
      console.log(
        "Subscription updated:",
        {
          subscriptionId:
            subscription.id,
          plan,
          status:
            subscription.status,
        }
      );
    }
    /*
    |--------------------------------------------------------------------------
    | SUBSCRIPTION DELETED
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
        await findDealer(
          supabase,
          {
            customerId,
            subscriptionId:
              subscription.id,
          }
        );
      if (dealer) {
        await updateDealer(
          supabase,
          dealer.id,
          {
            subscription_status:
              "canceled",
          }
        );
        console.log(
          "Dealer subscription canceled:",
          dealer.id
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
        await findDealer(
          supabase,
          {
            customerId,
          }
        );
      if (dealer) {
        await updateDealer(
          supabase,
          dealer.id,
          {
            subscription_status:
              "active",
          }
        );
        console.log(
          "Dealer subscription active:",
          dealer.id
        );
      }
    }
    /*
    |--------------------------------------------------------------------------
    | INVOICE PAYMENT FAILED
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
        await findDealer(
          supabase,
          {
            customerId,
          }
        );
      if (dealer) {
        await updateDealer(
          supabase,
          dealer.id,
          {
            subscription_status:
              "past_due",
          }
        );
        console.log(
          "Dealer subscription marked past_due:",
          dealer.id
        );
      }
    }
    /*
    |--------------------------------------------------------------------------
    | UNHANDLED EVENT
    |--------------------------------------------------------------------------
    */
    else {
      console.log(
        "Stripe event received but not handled:",
        event.type
      );
    }
    /*
     * Stripe requires a successful response
     * so it does not unnecessarily retry the event.
     */
    return Response.json({
      received: true,
    });
  } catch (error) {
    console.error(
      "Stripe webhook processing failed:",
      error
    );
    return new Response(
      "Webhook processing failed",
      { status: 500 }
    );
  }
}