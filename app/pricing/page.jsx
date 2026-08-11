"use client";
import { useState } from "react";
const plans = [
  {
    id: "starter",
    name: "Starter Dealer",
    price: "$299",
    description:
      "A practical starting point for independent dealers building a stronger vehicle sourcing pipeline.",
    features: [
      "Vehicle acquisition opportunities",
      "Dealer dashboard access",
      "Basic vehicle filters",
      "Lead notifications",
      "Monthly account reporting",
    ],
    popular: false,
  },
  {
    id: "professional",
    name: "Professional",
    price: "$599",
    description:
      "Designed for growing dealerships that want more tools and a consistent acquisition workflow.",
    features: [
      "Everything in Starter",
      "Priority lead access",
      "Advanced vehicle filters",
      "Saved vehicle searches",
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
      "Built for high-volume dealerships and multi-location operations.",
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
const steps = [
  {
    number: "01",
    title: "Choose Your Plan",
    description:
      "Select the membership level that fits your dealership and vehicle acquisition goals.",
  },
  {
    number: "02",
    title: "Complete Checkout",
    description:
      "Complete your recurring dealer membership through secure Stripe checkout.",
  },
  {
    number: "03",
    title: "Get Approved",
    description:
      "NorthSky Auto can review your dealer account and activate access where applicable.",
  },
  {
    number: "04",
    title: "Access Opportunities",
    description:
      "Use your dealer dashboard to discover and manage available vehicle acquisition opportunities.",
  },
];
const faqs = [
  {
    question: "Can I cancel my membership?",
    answer:
      "Yes. Dealer memberships are recurring subscriptions and can be managed through your Stripe billing account.",
  },
  {
    question: "What happens after I pay?",
    answer:
      "After checkout, your subscription can be reviewed and your dealer account can be activated according to NorthSky Auto's dealer approval process.",
  },
  {
    question: "Are vehicle leads guaranteed?",
    answer:
      "No. Vehicle availability and lead volume can vary by market, seller activity, vehicle type, and other factors.",
  },
  {
    question: "Are leads exclusive?",
    answer:
      "Certain plans may receive priority access to acquisition opportunities. Availability and access can vary by opportunity.",
  },
  {
    question: "What types of vehicles can be available?",
    answer:
      "Potential opportunities may include cars, trucks, SUVs, vans, and commercial vehicles from sellers across Canada.",
  },
  {
    question: "How is billing handled?",
    answer:
      "NorthSky Auto uses Stripe for recurring subscription billing and secure payment processing.",
  },
];
export default function PricingPage() {
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [error, setError] = useState("");
  async function handleCheckout(planId) {
    if (loadingPlan) return;
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
      let data = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }
      if (!response.ok) {
        throw new Error(
          data?.error || "Unable to start Stripe checkout."
        );
      }
      if (!data?.url) {
        throw new Error(
          "Stripe checkout URL was not returned."
        );
      }
      window.location.href = data.url;
    } catch (err) {
      console.error("NorthSky Auto checkout error:", err);
      setError(
        err?.message ||
          "Something went wrong while starting checkout. Please try again."
      );
      setLoadingPlan(null);
    }
  }
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 px-6 py-20 text-white md:py-28">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl text-center">
          <span className="inline-flex rounded-full bg-blue-500/20 px-5 py-2 text-sm font-black tracking-wide text-blue-300 ring-1 ring-blue-400/20">
            NORTHSKY AUTO DEALER MEMBERSHIP
          </span>
          <h1 className="mx-auto mt-6 max-w-5xl text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
            Build a Better Vehicle Acquisition Pipeline
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
            Choose a NorthSky Auto dealer membership and access vehicle
            acquisition opportunities from sellers across Canada.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-slate-200">
              ✓ Monthly billing
            </span>
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-slate-200">
              ✓ Cancel anytime
            </span>
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-slate-200">
              ✓ Secure Stripe checkout
            </span>
          </div>
        </div>
      </section>
      {/* PRICING */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          {error && (
            <div
              role="alert"
              className="mx-auto mb-10 max-w-2xl rounded-2xl border border-red-200 bg-red-50 p-5 text-center text-sm font-semibold text-red-700"
            >
              {error}
            </div>
          )}
          <div className="grid gap-8 lg:grid-cols-3">
            {plans.map((plan) => {
              const isLoading = loadingPlan === plan.id;
              const disabled = loadingPlan !== null;
              return (
                <article
                  key={plan.id}
                  className={`relative flex flex-col rounded-3xl bg-white p-8 shadow-lg ring-1 transition hover:-translate-y-1 hover:shadow-xl ${
                    plan.popular
                      ? "ring-2 ring-blue-600"
                      : "ring-slate-200"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-5 py-2 text-sm font-black text-white shadow-lg">
                      MOST POPULAR
                    </div>
                  )}
                  <div>
                    <h2 className="text-2xl font-black text-slate-950">
                      {plan.name}
                    </h2>
                    <p className="mt-4 min-h-[84px] text-sm leading-7 text-slate-600">
                      {plan.description}
                    </p>
                  </div>
                  <div className="mt-8">
                    <span className="text-5xl font-black tracking-tight text-slate-950">
                      {plan.price}
                    </span>
                    <span className="ml-2 text-slate-500">
                      / month
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleCheckout(plan.id)
                    }
                    disabled={disabled}
                    aria-disabled={disabled}
                    className={`mt-8 w-full rounded-xl px-6 py-4 font-black transition ${
                      plan.popular
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-slate-950 text-white hover:bg-slate-800"
                    } ${
                      disabled
                        ? "cursor-not-allowed opacity-60"
                        : ""
                    }`}
                  >
                    {isLoading
                      ? "Connecting to Stripe..."
                      : `Choose ${plan.name}`}
                  </button>
                  <p className="mt-3 text-center text-xs text-slate-500">
                    Secure recurring billing through Stripe
                  </p>
                  <div className="my-8 border-t border-slate-100" />
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-500">
                    What's Included
                  </h3>
                  <ul className="mt-5 space-y-4">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm leading-6 text-slate-700"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-0.5 font-black text-blue-600"
                        >
                          ✓
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      {/* VALUE SECTION */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-black uppercase tracking-widest text-blue-600">
              Dealer Platform
            </span>
            <h2 className="mt-4 text-3xl font-black md:text-4xl">
              More Than a Membership
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              NorthSky Auto is designed to give dealerships a more
              organized way to discover, evaluate, and manage potential
              vehicle acquisition opportunities.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200">
              <div className="text-4xl">🚗</div>
              <h3 className="mt-5 text-xl font-black">
                Vehicle Opportunities
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                Discover vehicle submissions that may fit your
                dealership's inventory requirements.
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200">
              <div className="text-4xl">📊</div>
              <h3 className="mt-5 text-xl font-black">
                Acquisition Management
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                Organize opportunities, track leads, save vehicles,
                and monitor your acquisition activity.
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200">
              <div className="text-4xl">🇨🇦</div>
              <h3 className="mt-5 text-xl font-black">
                Canadian Focus
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                Built around vehicle sellers and dealerships operating
                across the Canadian market.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* HOW IT WORKS */}
      <section className="bg-slate-100 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-black uppercase tracking-widest text-blue-600">
              HOW IT WORKS
            </span>
            <h2 className="mt-4 text-3xl font-black md:text-4xl">
              Start in Four Simple Steps
            </h2>
            <p className="mt-5 leading-7 text-slate-600">
              Choose a plan, complete checkout, and move into your
              dealer onboarding process.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-3xl bg-white p-7 text-center shadow-sm ring-1 ring-slate-200"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-lg font-black text-blue-600">
                  {step.number}
                </div>
                <h3 className="mt-5 text-xl font-black text-slate-950">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="text-sm font-black uppercase tracking-widest text-blue-600">
              FAQ
            </span>
            <h2 className="mt-4 text-3xl font-black md:text-4xl">
              Dealer Pricing Questions
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <h3 className="text-lg font-black text-slate-950">
                  {faq.question}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* FINAL CTA */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-4xl">
          <span className="text-sm font-black uppercase tracking-widest text-blue-100">
            GET STARTED
          </span>
          <h2 className="mt-4 text-4xl font-black sm:text-5xl">
            Ready to Build Your Acquisition Pipeline?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
            Start with the Professional plan and begin building a
            more organized vehicle sourcing workflow.
          </p>
          <button
            type="button"
            onClick={() =>
              handleCheckout("professional")
            }
            disabled={loadingPlan !== null}
            className="mt-10 rounded-xl bg-white px-10 py-5 font-black text-blue-700 shadow-xl transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loadingPlan === "professional"
              ? "Connecting to Stripe..."
              : "Start With Professional — $599/month"}
          </button>
          <p className="mt-4 text-sm text-blue-100">
            Secure checkout powered by Stripe
          </p>
        </div>
      </section>
    </main>
  );
}