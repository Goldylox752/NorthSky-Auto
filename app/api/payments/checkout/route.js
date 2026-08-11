import Stripe from "stripe";
import { NextResponse } from "next/server";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://northsky-auto.vercel.app";
/*
 * Stripe products allowed for dealer memberships.
 *
 * IMPORTANT:
 * These product IDs stay on the server.
 * The customer only sends the plan name.
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
  /*
   * Enterprise is intentionally disabled until
   * a dedicated Stripe Enterprise product exists.
   */
};
export async function POST(request) {
  try {
    let body = {};
    /*
     * Support JSON requests from DealerCheckoutButton.
     */
    const contentType =
      request.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      body = await request.json();
    } else {
      /*
       * Also support FormData in case another part
       * of the site uses the checkout endpoint.
       */
      const formData = await request.formData();
      body = {
        plan: formData.get("plan") || "",
        productId: formData.get("productId") || "",
      };
    }
    const requestedPlan = String(
      body?.plan || ""
    )
      .trim()
      .toLowerCase();
    /*
     * Never trust a client-supplied Stripe price or
     * product ID. The server determines the product.
     */
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
     * Verify the Stripe product exists.
     */
    const stripeProduct =
      await stripe.products.retrieve(productId);
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
     * Find active recurring prices attached
     * to this Stripe product.
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
     * Prefer Stripe's default price.
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
     * Fall back to the first active recurring
     * price if a default price isn't configured.
     */
    if (!price) {
      price = prices.data[0];
    }
    /*
     * Optional safety check:
     * Make sure the Stripe price is actually recurring.
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
     * Create Stripe Checkout.
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
          `${SITE_URL}/buyers?checkout=cancelled`,
        metadata: {
          productId,
          plan: requestedPlan,
          plan_name: name,
          product:
            "northsky-auto-dealer-membership",
        },
        subscription_data: {
          metadata: {
            productId,
            plan: requestedPlan,
            plan_name: name,
            product:
              "northsky-auto-dealer-membership",
          },
        },
      });
    /*
     * Stripe should return a Checkout URL.
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
     * Return JSON because DealerCheckoutButton
     * expects { url }.
     */
    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
      plan: requestedPlan,
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