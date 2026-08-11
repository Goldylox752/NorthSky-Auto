import Stripe from "stripe";
import { NextResponse } from "next/server";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://northsky-auto.vercel.app";
/*
 * Only products explicitly listed here can be purchased.
 *
 * Enterprise is intentionally not included because it is
 * handled as a custom/contact plan.
 */
const ALLOWED_PRODUCTS = {
  "prod_V3GcC4jUgJBx4D": {
    plan: "starter",
    name: "Dealer Starter",
  },
  "prod_V3GdnfhA4TkBDi": {
    plan: "professional",
    name: "Dealer Pro",
  },
};
export async function POST(request) {
  try {
    /*
     * The /buyers page submits a standard HTML form:
     *
     * productId
     * plan
     *
     * We primarily trust productId and determine the plan
     * server-side so customers cannot manipulate the price.
     */
    const formData = await request.formData();
    const productId = String(
      formData.get("productId") || ""
    ).trim();
    if (!productId) {
      return NextResponse.json(
        {
          error: "Missing dealer product.",
        },
        {
          status: 400,
        }
      );
    }
    const productConfig =
      ALLOWED_PRODUCTS[productId];
    if (!productConfig) {
      return NextResponse.json(
        {
          error: "Invalid dealer plan.",
        },
        {
          status: 400,
        }
      );
    }
    /*
     * Verify that the product actually exists in Stripe.
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
     * Find active recurring prices for the selected
     * Stripe product.
     */
    const prices = await stripe.prices.list({
      product: productId,
      active: true,
      type: "recurring",
      limit: 20,
    });
    if (!prices.data.length) {
      return NextResponse.json(
        {
          error: `No active recurring price is available for ${productConfig.name}.`,
        },
        {
          status: 400,
        }
      );
    }
    /*
     * Use Stripe's default price when available.
     * Otherwise fall back to the first active recurring price.
     */
    let price = null;
    if (stripeProduct.default_price) {
      const defaultPriceId =
        typeof stripeProduct.default_price ===
        "string"
          ? stripeProduct.default_price
          : stripeProduct.default_price.id;
      price = prices.data.find(
        (item) => item.id === defaultPriceId
      );
    }
    if (!price) {
      price = prices.data[0];
    }
    /*
     * Create the Stripe Checkout session.
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
          plan: productConfig.plan,
          plan_name: productConfig.name,
          product:
            "northsky-auto-dealer-membership",
        },
        subscription_data: {
          metadata: {
            productId,
            plan: productConfig.plan,
            plan_name: productConfig.name,
            product:
              "northsky-auto-dealer-membership",
          },
        },
      });
    /*
     * Stripe should always return a Checkout URL.
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
     * Redirect the dealer directly to Stripe Checkout.
     */
    return NextResponse.redirect(
      session.url,
      303
    );
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