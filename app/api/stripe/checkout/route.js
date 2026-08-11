import Stripe from "stripe";
import { NextResponse } from "next/server";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://northsky-auto.vercel.app";
/*
 * Approved NorthSky Auto dealer products.
 *
 * Prices are selected directly from Stripe.
 * Customers cannot submit their own price.
 */
const DEALER_PRODUCTS = {
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
     * /buyers submits a normal HTML form.
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
    /*
     * Validate the product against our server-side
     * allowlist.
     */
    const dealerProduct =
      DEALER_PRODUCTS[productId];
    if (!dealerProduct) {
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
            "The selected Stripe product could not be found.",
        },
        {
          status: 404,
        }
      );
    }
    /*
     * Find active recurring prices for this product.
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
          error:
            `No active recurring price is configured for ${dealerProduct.name}.`,
        },
        {
          status: 400,
        }
      );
    }
    /*
     * Prefer the product's Stripe default price.
     * Otherwise use the first active recurring price.
     */
    let selectedPrice = null;
    if (stripeProduct.default_price) {
      const defaultPriceId =
        typeof stripeProduct.default_price ===
        "string"
          ? stripeProduct.default_price
          : stripeProduct.default_price.id;
      selectedPrice = prices.data.find(
        (price) =>
          price.id === defaultPriceId
      );
    }
    if (!selectedPrice) {
      selectedPrice = prices.data[0];
    }
    /*
     * Create Stripe Checkout.
     */
    const session =
      await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [
          {
            price: selectedPrice.id,
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
          plan: dealerProduct.plan,
          plan_name: dealerProduct.name,
          product:
            "northsky-auto-dealer-membership",
        },
        subscription_data: {
          metadata: {
            productId,
            plan: dealerProduct.plan,
            plan_name: dealerProduct.name,
            product:
              "northsky-auto-dealer-membership",
          },
        },
      });
    /*
     * Stripe must provide a Checkout URL.
     */
    if (!session.url) {
      console.error(
        "Stripe Checkout returned no URL:",
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
     * Send the customer directly to Stripe Checkout.
     */
    return NextResponse.redirect(
      session.url,
      303
    );
  } catch (error) {
    console.error(
      "NorthSky Auto Stripe Checkout Error:",
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