import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY
);

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://northsky-auto.vercel.app";

/*
|--------------------------------------------------------------------------
| Allowed Dealer Plans
|--------------------------------------------------------------------------
|
| Stripe product IDs stay server-side.
| Never trust a client-supplied product or price ID.
|
*/

const ALLOWED_PLANS = {
  starter: {
    productId: "prod_V3GcC4jUgJBx4D",
    name: "Dealer Starter",
  },

  professional: {
    productId: "prod_V3GdnfhA4TkBDi",
    name: "Dealer Professional",
  },
};

/*
|--------------------------------------------------------------------------
| POST /api/payments/checkout
|--------------------------------------------------------------------------
*/

export async function POST(request) {
  try {
    let body = {};

    /*
     * Support JSON.
     */
    const contentType =
      request.headers.get("content-type") || "";

    if (
      contentType.includes(
        "application/json"
      )
    ) {
      body = await request.json();
    } else {
      /*
       * Support FormData as well.
       */
      const formData =
        await request.formData();

      body = {
        plan: formData.get("plan") || "",
        source: formData.get("source") || "",
        campaign:
          formData.get("campaign") || "",
        session_id:
          formData.get("session_id") || "",
      };
    }

    /*
    |--------------------------------------------------------------------------
    | Validate plan
    |--------------------------------------------------------------------------
    */

    const requestedPlan = String(
      body?.plan || ""
    )
      .trim()
      .toLowerCase();

    if (!requestedPlan) {
      return NextResponse.json(
        {
          error: "Missing dealer plan.",
        },
        {
          status: 400,
        }
      );
    }

    const planConfig =
      ALLOWED_PLANS[requestedPlan];

    if (!planConfig) {
      return NextResponse.json(
        {
          error:
            requestedPlan === "enterprise"
              ? "Enterprise checkout is not available yet. Please contact NorthSky Auto for Enterprise membership."
              : "Invalid dealer plan.",
        },
        {
          status: 400,
        }
      );
    }

    const {
      productId,
      name,
    } = planConfig;

    /*
    |--------------------------------------------------------------------------
    | Marketing Attribution
    |--------------------------------------------------------------------------
    |
    | These values are safe to store as Stripe metadata.
    |
    */

    const source =
      typeof body?.source === "string" &&
      body.source.trim()
        ? body.source
            .trim()
            .slice(0, 100)
        : "direct";

    const campaign =
      typeof body?.campaign === "string" &&
      body.campaign.trim()
        ? body.campaign
            .trim()
            .slice(0, 100)
        : "organic";

    const sessionId =
      typeof body?.session_id === "string"
        ? body.session_id
            .trim()
            .slice(0, 200)
        : "";

    /*
    |--------------------------------------------------------------------------
    | Verify Stripe Product
    |--------------------------------------------------------------------------
    */

    const stripeProduct =
      await stripe.products.retrieve(
        productId
      );

    if (
      !stripeProduct ||
      stripeProduct.deleted
    ) {
      return NextResponse.json(
        {
          error:
            "The selected dealer product could not be found.",
        },
        {
          status: 404,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Find Active Recurring Prices
    |--------------------------------------------------------------------------
    */

    const prices =
      await stripe.prices.list({
        product: productId,
        active: true,
        type: "recurring",
        limit: 20,
      });

    if (!prices.data.length) {
      return NextResponse.json(
        {
          error:
            `No active recurring price is available for ${name}.`,
        },
        {
          status: 400,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Prefer Stripe Default Price
    |--------------------------------------------------------------------------
    */

    let price = null;

    if (stripeProduct.default_price) {
      const defaultPriceId =
        typeof stripeProduct.default_price ===
        "string"
          ? stripeProduct.default_price
          : stripeProduct.default_price.id;

      price = prices.data.find(
        (item) =>
          item.id === defaultPriceId
      );
    }

    /*
     * Fall back to the first active recurring price.
     */

    if (!price) {
      price = prices.data[0];
    }

    /*
    |--------------------------------------------------------------------------
    | Verify Recurring Price
    |--------------------------------------------------------------------------
    */

    if (
      !price.recurring ||
      !price.recurring.interval
    ) {
      return NextResponse.json(
        {
          error:
            "The selected Stripe price is not configured as a recurring subscription.",
        },
        {
          status: 400,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Stripe Metadata
    |--------------------------------------------------------------------------
    |
    | This is the important part.
    |
    | Stripe Checkout Session:
    |
    | source = telegram
    | campaign = dealer-recruitment
    |
    | Subscription:
    |
    | source = telegram
    | campaign = dealer-recruitment
    |
    */

    const marketingMetadata = {
      source,
      campaign,
      ...(sessionId
        ? {
            marketing_session_id:
              sessionId,
          }
        : {}),
    };

    const productMetadata = {
      productId,
      plan: requestedPlan,
      plan_name: name,
      product:
        "northsky-auto-dealer-membership",

      ...marketingMetadata,
    };

    /*
    |--------------------------------------------------------------------------
    | Create Stripe Checkout Session
    |--------------------------------------------------------------------------
    */

    const session =
      await stripe.checkout.sessions.create({
        mode: "subscription",

        line_items: [
          {
            price: price.id,
            quantity: 1,
          },
        ],

        customer_creation: "always",

        billing_address_collection:
          "required",

        allow_promotion_codes: true,

        success_url:
          `${SITE_URL}/dealer/dashboard` +
          `?checkout=success` +
          `&session_id={CHECKOUT_SESSION_ID}`,

        cancel_url:
          `${SITE_URL}/buyers` +
          `?checkout=cancelled`,

        /*
         * Checkout session metadata.
         */
        metadata: productMetadata,

        /*
         * Subscription metadata.
         */
        subscription_data: {
          metadata: productMetadata,
        },
      });

    /*
    |--------------------------------------------------------------------------
    | Verify Checkout URL
    |--------------------------------------------------------------------------
    */

    if (!session.url) {
      console.error(
        "Stripe Checkout session did not return a URL:",
        session.id
      );

      return NextResponse.json(
        {
          error:
            "Stripe did not return a checkout URL.",
        },
        {
          status: 500,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Return Checkout URL
    |--------------------------------------------------------------------------
    */

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
      plan: requestedPlan,
      source,
      campaign,
    });
  } catch (error) {
    console.error(
      "Stripe Checkout Error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Unable to create Stripe checkout session.",
      },
      {
        status: 500,
      }
    );
  }
}