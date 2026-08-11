import Stripe from "stripe";
import { NextResponse } from "next/server";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const PRICE_IDS = {
  starter: process.env.STRIPE_STARTER_PRICE_ID,
  professional: process.env.STRIPE_PROFESSIONAL_PRICE_ID,
  enterprise: process.env.STRIPE_ENTERPRISE_PRICE_ID,
};
export async function POST(request) {
  try {
    const body = await request.json();
    const { plan } = body;
    if (!plan || !PRICE_IDS[plan]) {
      return NextResponse.json(
        {
          error: "Invalid dealer plan.",
        },
        {
          status: 400,
        }
      );
    }
    const priceId = PRICE_IDS[plan];
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://northsky-auto.vercel.app";
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      billing_address_collection: "required",
      allow_promotion_codes: true,
      success_url:
        `${siteUrl}/dealer/dashboard?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:
        `${siteUrl}/pricing?checkout=cancelled`,
      metadata: {
        plan,
        product: "northsky-auto-dealer-membership",
      },
      subscription_data: {
        metadata: {
          plan,
          product: "northsky-auto-dealer-membership",
        },
      },
    });
    return NextResponse.json({
      url: session.url,
    });
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