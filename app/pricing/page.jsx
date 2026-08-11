"use client";
import { useState } from "react";
export const metadata = {
  title:
    "Dealer Pricing Plans | NorthSky Auto Vehicle Acquisition Platform",
  description:
    "Choose a NorthSky Auto dealer membership plan and access vehicle acquisition opportunities from sellers across Canada.",
};
const plans = [
  {
    id: "starter",
    name: "Starter Dealer",
    price: "$299",
    description:
      "Perfect for independent dealers looking to increase vehicle sourcing.",
    features: [
      "Access to vehicle acquisition leads",
      "Dealer dashboard access",
      "Basic vehicle filters",
      "Lead notifications",
      "Monthly account reports",
    ],
    popular: false,
  },
  {
    id: "professional",
    name: "Professional",
    price: "$599",
    description:
      "Designed for growing dealerships that need consistent inventory opportunities.",
    features: [
      "Everything in Starter",
      "Priority lead access",
      "Advanced vehicle filters",
      "Saved searches",
      "Lead analytics",
      "Priority dealer support",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$999",
    description:
      "Built for high-volume dealers and multi-location operations.",
    features: [
      "Everything in Professional",
      "Unlimited team members",
      "Advanced reporting",
      "Multi-location support",
      "Premium acquisition opportunities",
      "Dedicated account support",
    ],
    popular: false,
  },
];
export default function PricingPage() {
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [error, setError] = useState("");
  async function handleCheckout(planId) {
    try {
      setLoadingPlan(planId);
      setError("");
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan: planId,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data?.error || "Unable to start checkout."
        );
      }
      if (!data?.url) {
        throw new Error("Stripe checkout URL was not returned.");
      }
      window.location.href = data.url;
    } catch (err) {
      console.error("Checkout error:", err);
      setError(
        err.message || "Something went wrong. Please try again."
      );
      setLoadingPlan(null);
    }
  }
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <span className="inline-flex rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold">
            NorthSky Auto Dealer Membership
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Get Access to Quality Vehicle Opportunities
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
            Choose a dealer plan and connect with vehicle sellers across
            Canada. Build your inventory pipeline with real acquisition
            opportunities.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-slate-300">
            <span>✓ Monthly billing</span>
            <span>✓ Cancel anytime</span>
            <span>✓ Secure Stripe checkout</span>
          </div>
        </div>
      </section>
      {/* Pricing */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          {error && (
            <div className="mx-auto mb-10 max-w-2xl rounded-xl border border-red-200 bg-red-50 p-4 text-center text-sm font-medium text-red-700">
              {error}
            </div>
          )}
          <div className="grid gap-8 lg:grid-cols-3">
            {plans.map((plan) => {
              const isLoading = loadingPlan === plan.id;
              return (
                <div
                  key={plan.id}
                  className={`relative flex flex-col rounded-3xl border bg-white p-8 shadow-lg transition hover:-translate-y-1 hover:shadow-xl ${
                    plan.popular
                      ? "border-blue-600 ring-2 ring-blue-100"
                      : "border-slate-200"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow">
                      Most Popular
                    </div>
                  )}
                  <h2 className="text-3xl font-bold text-slate-900">
                    {plan.name}
                  </h2>
                  <p className="mt-4 min-h-[72px] text-slate-600">
                    {plan.description}
                  </p>
                  <div className="mt-8">
                    <span className="text-5xl font-bold tracking-tight text-slate-900">
                      {plan.price}
                    </span>
                    <span className="ml-2 text-slate-500">
                      /month
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCheckout(plan.id)}
                    disabled={loadingPlan !== null}
                    className={`mt-8 block w-full rounded-xl py-4 text-center font-semibold transition ${
                      plan.popular
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-slate-900 text-white hover:bg-slate-800"
                    } ${
                      loadingPlan !== null
                        ? "cursor-not-allowed opacity-60"
                        : ""
                    }`}
                  >
                    {isLoading
                      ? "Connecting to Stripe..."
                      : "Choose Plan"}
                  </button>
                  <p className="mt-3 text-center text-xs text-slate-500">
                    Secure checkout powered by Stripe
                  </p>
                  <ul className="mt-8 space-y-4 border-t border-slate-100 pt-8">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex gap-3 text-slate-700"
                      >
                        <span className="font-bold text-blue-600">
                          ✓
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* How Billing Works */}
      <section className="bg-slate-100 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-4xl font-bold text-slate-900">
            How Dealer Membership Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
            Get started in minutes and begin building your vehicle
            acquisition pipeline.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {[
              "Choose Your Plan",
              "Complete Checkout",
              "Get Approved",
              "Access Vehicle Leads",
            ].map((item, index) => (
              <div
                key={item}
                className="rounded-2xl bg-white p-8 text-center shadow"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl font-bold text-blue-600">
                  {index + 1}
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {item}
                </h3>
                <p className="mt-3 text-sm text-slate-600">
                  {index === 0 &&
                    "Select the membership level that fits your dealership."}
                  {index === 1 &&
                    "Complete your secure recurring subscription through Stripe."}
                  {index === 2 &&
                    "NorthSky Auto can review and activate your dealer account."}
                  {index === 3 &&
                    "Access your dealer dashboard and available acquisition opportunities."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-4xl font-bold text-slate-900">
            Dealer Pricing FAQ
          </h2>
          <div className="mt-10 space-y-6">
            {[
              {
                q: "Can I cancel anytime?",
                a: "Yes. Your recurring membership can be managed through your Stripe billing account.",
              },
              {
                q: "Are leads exclusive?",
                a: "Premium plans can include priority access to acquisition opportunities. Lead availability may vary by market and vehicle.",
              },
              {
                q: "Do I pay to apply?",
                a: "Your selected dealer membership is billed monthly through Stripe. Dealer approval and access policies may apply.",
              },
              {
                q: "What type of vehicles are available?",
                a: "Cars, trucks, SUVs, vans, and commercial vehicles may be available from sellers across Canada.",
              },
            ].map((faq) => (
              <div
                key={faq.q}
                className="rounded-xl border border-slate-200 p-6"
              >
                <h3 className="text-xl font-bold text-slate-900">
                  {faq.q}
                </h3>
                <p className="mt-3 text-slate-600">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="bg-blue-600 px-6 py-20 text-center text-white">
        <h2 className="text-4xl font-bold sm:text-5xl">
          Start Building Your Inventory Pipeline
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100 sm:text-xl">
          Join NorthSky Auto and connect with sellers before vehicles
          reach traditional marketplaces.
        </p>
        <button
          type="button"
          onClick={() => handleCheckout("professional")}
          disabled={loadingPlan !== null}
          className="mt-10 inline-block rounded-xl bg-white px-10 py-5 font-semibold text-blue-600 shadow-lg transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loadingPlan === "professional"
            ? "Connecting to Stripe..."
            : "Start With Professional"}
        </button>
      </section>
    </main>
  );
}