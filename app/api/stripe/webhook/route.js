import Stripe from "stripe";
import { headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

/*
|--------------------------------------------------------------------------
| Runtime Clients
|--------------------------------------------------------------------------
|
| IMPORTANT:
| Do not initialize Stripe or Supabase at module load time.
| Next.js may evaluate this file during build/collection.
|
*/

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured.");
  }

  return new Stripe(secretKey, {
    apiVersion: "2025-03-31.basil",
  });
}

function getSupabase() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
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
    supabaseUrl,
    serviceRoleKey
  );
}

/*
|--------------------------------------------------------------------------
| Dealer Plans
|--------------------------------------------------------------------------
*/

const PLAN_NAMES = {
  starter: "Dealer Starter",
  professional: "Dealer Professional",
};

function normalizePlan(plan) {
  if (!plan) {
    return null;
  }

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
    value === "dealer pro" ||
    value === "dealer professional"
  ) {
    return "professional";
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

  return null;
}

/*
|--------------------------------------------------------------------------
| Stripe Helpers
|--------------------------------------------------------------------------
*/

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
| Marketing Attribution
|--------------------------------------------------------------------------
*/

function getMarketingAttribution(metadata) {
  if (!metadata) {
    return {
      source: null,
      campaign: null,
      sessionId: null,
    };
  }

  return {
    source:
      metadata.source
        ?.toString()
        .trim()
        .slice(0, 100) || null,

    campaign:
      metadata.campaign
        ?.toString()
        .trim()
        .slice(0, 100) || null,

    sessionId:
      metadata.marketing_session_id
        ?.toString()
        .trim()
        .slice(0, 200) || null,
  };
}

/*
|--------------------------------------------------------------------------
| Supabase Dealer Helpers
|--------------------------------------------------------------------------
*/

async function findDealer({
  supabase,
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
   * Then try email.
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

async function createDealer({
  supabase,
  email,
  customerId,
  subscriptionId,
  plan,
  status,
  source,
  campaign,
  sessionId,
  name,
}) {
  if (!email && !customerId) {
    console.warn(
      "Unable to create dealer: no email or Stripe customer ID."
    );

    return null;
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

    name: name || null,
  };

  const { data, error } =
    await supabase
      .from("dealers")
      .insert(dealerData)
      .select("*")
      .single();

  if (error) {
    console.error(
      "Failed to create dealer:",
      error
    );

    throw error;
  }

  console.log(
    "Dealer created:",
    {
      dealerId: data.id,
      email: data.email,
      plan: data.subscription_plan,
      source: data.marketing_source,
      campaign:
        data.marketing_campaign,
    }
  );

  return data;
}

async function updateDealer(
  supabase,
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

async function findOrCreateDealer({
  supabase,
  customerId,
  email,
  subscriptionId,
  plan,
  status,
  source,
  campaign,
  sessionId,
  name,
}) {
  const dealer =
    await findDealer({
      supabase,
      customerId,
      email,
    });

  /*
   * Existing dealer.
   */

  if (dealer) {
    const updates = {
      subscription_status:
        status || "active",

      subscription_plan:
        plan ||
        dealer.subscription_plan,
    };

    if (customerId) {
      updates.stripe_customer_id =
        customerId;
    }

    if (subscriptionId) {
      updates.stripe_subscription_id =
        subscriptionId;
    }

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

    if (name && !dealer.name) {
      updates.name = name;
    }

    await updateDealer(
      supabase,
      dealer.id,
      updates
    );

    return {
      ...dealer,
      ...updates,
    };
  }

  /*
   * Create dealer.
   */

  return createDealer({
    supabase,
    email,
    customerId,
    subscriptionId,
    plan,
    status,
    source,
    campaign,
    sessionId,
    name,
  });
}

/*
|--------------------------------------------------------------------------
| Subscription Helpers
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

  /*
   * Stripe price ID is authoritative.
   */

  const plan =
    pricePlan ||
    metadataPlan ||
    null;

  return {
    plan,
    priceId,
  };
}

/*
|--------------------------------------------------------------------------
| POST /api/stripe/webhook
|--------------------------------------------------------------------------
*/

export async function POST(request) {
  /*
   * Validate configuration at request time.
   *
   * This is intentionally NOT done at module scope
   * so `next build` can complete without production
   * environment variables being present.
   */

  const stripeSecretKey =
    process.env.STRIPE_SECRET_KEY;

  const webhookSecret =
    process.env.STRIPE_WEBHOOK_SECRET;

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const supabaseServiceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!stripeSecretKey) {
    console.error(
      "STRIPE_SECRET_KEY is not configured."
    );

    return new Response(
      "Webhook configuration error",
      {
        status: 500,
      }
    );
  }

  if (!webhookSecret) {
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

  if (!supabaseUrl) {
    console.error(
      "NEXT_PUBLIC_SUPABASE_URL is not configured."
    );

    return new Response(
      "Webhook configuration error",
      {
        status: 500,
      }
    );
  }

  if (!supabaseServiceRoleKey) {
    console.error(
      "SUPABASE_SERVICE_ROLE_KEY is not configured."
    );

    return new Response(
      "Webhook configuration error",
      {
        status: 500,
      }
    );
  }

  /*
   * Create clients only after configuration
   * has been validated at request time.
   */

  const stripe = getStripe();
  const supabase = getSupabase();

  /*
   * IMPORTANT:
   * Stripe signature verification requires
   * the raw request body.
   */

  const body =
    await request.text();

  const headersList =
    await headers();

  const signature =
    headersList.get(
      "stripe-signature"
    );

  if (!signature) {
    console.error(
      "Missing stripe-signature header."
    );

    return new Response(
      "Missing stripe-signature",
      {
        status: 400,
      }
    );
  }

  let event;

  /*
   * Verify Stripe signature.
   */

  try {
    event =
      stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      );
  } catch (error) {
    console.error(
      "Stripe webhook signature verification failed:",
      error?.message
    );

    return new Response(
      `Webhook Error: ${
        error?.message ||
        "Invalid signature"
      }`,
      {
        status: 400,
      }
    );
  }

  /*
   * Process verified Stripe event.
   */

  try {
    console.log(
      "Stripe webhook received:",
      {
        id: event.id,
        type: event.type,
      }
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
        getMarketingAttribution(
          session.metadata
        );

      const name =
        session.customer_details
          ?.name || null;

      console.log(
        "Checkout completed:",
        {
          checkoutSessionId:
            session.id,

          customerId,

          subscriptionId,

          email,

          plan,

          source,

          campaign,

          marketingSessionId:
            sessionId,
        }
      );

      if (!plan) {
        console.warn(
          "Invalid dealer plan:",
          session.metadata?.plan
        );

        return Response.json({
          received: true,
          warning:
            "Invalid or unsupported dealer plan.",
        });
      }

      const dealer =
        await findOrCreateDealer({
          supabase,
          customerId,
          email,
          subscriptionId,
          plan,
          status: "active",
          source,
          campaign,
          sessionId,
          name,
        });

      console.log(
        "Dealer activated:",
        {
          dealerId:
            dealer?.id,

          plan,

          planName:
            PLAN_NAMES[plan],

          source,

          campaign,
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
        getSubscriptionDetails(
          subscription
        );

      const {
        source,
        campaign,
        sessionId,
      } =
        getMarketingAttribution(
          subscription.metadata
        );

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

          source,

          campaign,
        }
      );

      if (!plan) {
        console.warn(
          "Unsupported subscription plan:",
          priceId
        );

        return Response.json({
          received: true,
          warning:
            "Unsupported subscription plan.",
        });
      }

      const dealer =
        await findOrCreateDealer({
          supabase,

          customerId,

          email: null,

          subscriptionId:
            subscription.id,

          plan,

          status:
            subscription.status,

          source,

          campaign,

          sessionId,

          name: null,
        });

      console.log(
        "Subscription connected to dealer:",
        dealer?.id
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
        getSubscriptionDetails(
          subscription
        );

      const {
        source,
        campaign,
        sessionId,
      } =
        getMarketingAttribution(
          subscription.metadata
        );

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

          source,

          campaign,
        }
      );

      if (!plan) {
        console.warn(
          "Unsupported subscription plan:",
          priceId
        );

        return Response.json({
          received: true,
          warning:
            "Unsupported subscription plan.",
        });
      }

      const dealer =
        await findDealer({
          supabase,
          customerId,
        });

      if (!dealer) {
        console.warn(
          "No dealer found for updated subscription:",
          {
            customerId,
            subscriptionId:
              subscription.id,
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

      console.log(
        "Subscription cancelled:",
        {
          subscriptionId:
            subscription.id,

          customerId,
        }
      );

      const dealer =
        await findDealer({
          supabase,
          customerId,
        });

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
          "Dealer subscription marked canceled:",
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

      console.log(
        "Invoice paid:",
        {
          invoiceId:
            invoice.id,

          customerId,
        }
      );

      const dealer =
        await findDealer({
          supabase,
          customerId,
        });

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
          "Dealer subscription marked active:",
          dealer.id
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

      console.log(
        "Invoice payment failed:",
        {
          invoiceId:
            invoice.id,

          customerId,
        }
      );

      const dealer =
        await findDealer({
          supabase,
          customerId,
        });

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
    | OTHER EVENTS
    |--------------------------------------------------------------------------
    */

    else {
      console.log(
        "Unhandled Stripe event:",
        event.type
      );
    }

    /*
     * Always acknowledge successfully processed
     * or intentionally ignored Stripe events.
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
