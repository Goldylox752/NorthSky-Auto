import Stripe from "stripe";
import { NextResponse } from "next/server";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const allowedProducts = {
  "prod_V3GcC4jUgJBx4D": {
    name: "Dealer Starter",
  },
  "prod_V3GdnfhA4TkBDi": {
    name: "Dealer Pro",
  },
};
export async function POST(request) {
  try {
    const formData = await request.formData();
    const productId = formData.get("productId");
    if (!productId) {
      return NextResponse.json(
        {
          error: "Missing productId.",
        },
        {
          status: 400,
        }
      );
    }
    const product = allowedProducts[productId];
    if (!product) {
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
     * Retrieve the Stripe product and its active prices.
     */
    const stripeProduct = await stripe.products.retrieve(productId);
    if (!stripeProduct || stripeProduct.deleted) {
      return NextResponse.json(
        {
          error: "Stripe product could not be found.",
        },
        {
          status: 404,
        }
      );
    }
    const prices = await stripe.prices.list({
      product: productId,
      active: true,
      type: "recurring",
      limit: 10,
    });
    if (!prices.data.length) {
      return NextResponse.json(
        {
          error: `No active recurring price was found for ${product.name}.`,
        },
        {
          status: 400,
        }
      );
    }
    /*
     * Prefer the default price when one is configured.
     * Otherwise use the first active recurring price.
     */
    let price = prices.data.find(
      (item) => item.id === stripeProduct.default_price
    );
    if (!price) {
      price = prices.data[0];
    }
    const origin =
      request.headers.get("origin") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://northsky-auto.vercel.app";
    /*
     * Create Stripe Checkout subscription.
     */
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      success_url: `${origin}/dealer/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/buyers?checkout=cancelled`,
      billing_address_collection: "required",
      customer_creation: "always",
      metadata: {
        productId,
        plan: product.name,
      },
      subscription_data: {
        metadata: {
          productId,
          plan: product.name,
        },
      },
    });
    if (!session.url) {
      return NextResponse.json(
        {
          error: "Stripe did not return a checkout URL.",
        },
        {
          status: 500,
        }
      );
    }
    /*
     * Redirect the dealer directly to Stripe Checkout.
     */
    return NextResponse.redirect(session.url, 303);
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
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