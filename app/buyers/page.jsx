import Link from "next/link";
import DealerCheckoutButton from "@/components/DealerCheckoutButton";
export const metadata = {
  title: "Dealer Memberships | NorthSky Auto",
  description:
    "Choose a NorthSky Auto dealer membership and access vehicle acquisition opportunities from sellers across Canada.",
};
const plans = [
  {
    name: "Starter Dealer",
    plan: "starter",
    price: "$299",
    period: "/month",
    description:
      "For independent dealers starting a more organized vehicle sourcing pipeline.",
    badge: "GET STARTED",
    features: [
      "Access vehicle acquisition opportunities",
      "Dealer account",
      "Vehicle and seller information",
      "Vehicle opportunity notifications",
      "Dealer marketplace access",
    ],
  },
  {
    name: "Professional",
    plan: "professional",
    price: "$599",
    period: "/month",
    description:
      "For growing dealerships that want more tools and a stronger acquisition pipeline.",
    badge: "MOST POPULAR",
    popular: true,
    features: [
      "Everything in Starter Dealer",
      "Priority vehicle opportunities",
      "Advanced vehicle filters",
      "Saved vehicle opportunities",
      "Lead analytics",
      "Priority dealer support",
    ],
  },
  {
    name: "Enterprise",
    plan: "enterprise",
    price: "$999",
    period: "/month",
    description:
      "For high-volume dealerships and multi-location operations.",
    badge: "HIGH VOLUME",
    features: [
      "Everything in Professional",
      "Unlimited team members",
      "Advanced reporting",
      "Multi-location support",
      "Premium acquisition opportunities",
      "Dedicated account support",
    ],
  },
];
const benefits = [
  {
    icon: "🚗",
    title: "Discover Vehicles",
    text: "Find vehicle acquisition opportunities submitted by sellers.",
  },
  {
    icon: "📊",
    title: "Manage Leads",
    text: "Organize vehicle opportunities and build your acquisition pipeline.",
  },
  {
    icon: "⭐",
    title: "Save Opportunities",
    text: "Keep promising vehicles available for future review.",
  },
];
const steps = [
  {
    number: "01",
    title: "Choose Your Plan",
    text: "Select the dealer membership that fits your dealership.",
  },
  {
    number: "02",
    title: "Complete Checkout",
    text: "Subscribe securely through Stripe and begin the dealer onboarding process.",
  },
  {
    number: "03",
    title: "Dealer Access",
    text: "Access your dealer environment and available vehicle opportunities.",
  },
  {
    number: "04",
    title: "Build Your Pipeline",
    text: "Review opportunities and identify vehicles that may fit your inventory needs.",
  },
];
export default function BuyersPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 px-6 py-24 text-white">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl text-center">
          <span className="inline-flex rounded-full bg-blue-500/20 px-5 py-2 text-sm font-black tracking-wide text-blue-300 ring-1 ring-blue-400/20">
            NORTHSKY AUTO FOR DEALERS
          </span>
          <h1 className="mx-auto mt-7 max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-6xl">
            Find Vehicles.
            <span className="block text-blue-400">
              Build Your Inventory Pipeline.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
            NorthSky Auto helps dealerships discover vehicle acquisition
            opportunities submitted by sellers across Canada.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a
              href="#plans"
              className="rounded-xl bg-blue-600 px-8 py-4 font-black text-white shadow-lg transition hover:bg-blue-500"
            >
              View Dealer Plans →
            </a>
            <Link
              href="/dealer"
              className="rounded-xl border border-white/20 bg-white/5 px-8 py-4 font-black text-white transition hover:bg-white hover:text-slate-950"
            >
              Dealer Portal
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-slate-300">
            <span>✓ Canadian-focused marketplace</span>
            <span>✓ Monthly memberships</span>
            <span>✓ Secure Stripe checkout</span>
          </div>
        </div>
      </section>
      {/* VALUE PROPOSITION */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-widest text-blue-600">
              Built For Vehicle Acquisition
            </p>
            <h2 className="mt-4 text-3xl font-black md:text-4xl">
              A Better Way to Organize Your Vehicle Sourcing
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              NorthSky Auto gives dealerships a dedicated environment
              for discovering, reviewing, saving, and managing potential
              vehicle acquisition opportunities.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="text-4xl">{benefit.icon}</div>
                <h3 className="mt-5 text-xl font-black">
                  {benefit.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* PLANS */}
      <section id="plans" className="scroll-mt-20 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="inline-flex rounded-full bg-blue-100 px-5 py-2 text-sm font-black text-blue-700">
              DEALER MEMBERSHIPS
            </span>
            <h2 className="mt-6 text-4xl font-black tracking-tight md:text-5xl">
              Choose Your Dealer Plan
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Choose the membership level that matches your dealership's
              vehicle acquisition needs.
            </p>
          </div>
          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.plan}
                className={`relative flex flex-col rounded-3xl bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
                  plan.popular
                    ? "ring-2 ring-blue-600"
                    : "ring-1 ring-slate-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-blue-600 px-5 py-2 text-xs font-black text-white shadow-lg">
                    MOST POPULAR
                  </div>
                )}
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">
                    {plan.badge}
                  </span>
                  {plan.popular && (
                    <span className="text-xl">⭐</span>
                  )}
                </div>
                <h3 className="mt-7 text-3xl font-black">
                  {plan.name}
                </h3>
                <p className="mt-4 min-h-[84px] leading-7 text-slate-600">
                  {plan.description}
                </p>
                <div className="mt-7">
                  <span className="text-5xl font-black tracking-tight">
                    {plan.price}
                  </span>
                  <span className="ml-2 font-semibold text-slate-500">
                    {plan.period}
                  </span>
                </div>
                <div className="my-8 h-px bg-slate-200" />
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-3 text-sm font-semibold leading-6 text-slate-700"
                    >
                      <span className="font-black text-blue-600">
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <DealerCheckoutButton
                    plan={plan.plan}
                    label={`Subscribe to ${plan.name}`}
                  />
                  <p className="mt-3 text-center text-xs text-slate-500">
                    Secure recurring checkout powered by Stripe.
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-6 text-slate-500">
            Membership provides access to the NorthSky Auto dealer
            platform and available vehicle acquisition opportunities.
            Opportunity availability may vary by market, vehicle type,
            seller activity, and dealer eligibility.
          </p>
        </div>
      </section>
      {/* HOW IT WORKS */}
      <section className="bg-slate-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-blue-500/20 px-5 py-2 text-sm font-black tracking-wide text-blue-300">
              HOW IT WORKS
            </span>
            <h2 className="mt-6 text-4xl font-black md:text-5xl">
              Start Building Your Acquisition Pipeline
            </h2>
            <p className="mt-5 leading-8 text-slate-400">
              Getting started is designed to be simple.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-3xl bg-white/10 p-8 ring-1 ring-white/10"
              >
                <div className="text-4xl font-black text-blue-400">
                  {step.number}
                </div>
                <h3 className="mt-5 text-xl font-black">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* PLATFORM FEATURES */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <div className="text-4xl">🔎</div>
              <h2 className="mt-5 text-2xl font-black">
                Discover Potential Inventory
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                Review vehicle opportunities submitted through the
                NorthSky Auto marketplace and identify vehicles that may
                fit your dealership.
              </p>
            </div>
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <div className="text-4xl">📊</div>
              <h2 className="mt-5 text-2xl font-black">
                Manage Your Pipeline
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                Organize potential acquisitions and use your dealer
                tools to manage opportunities as your sourcing activity
                grows.
              </p>
            </div>
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <div className="text-4xl">⭐</div>
              <h2 className="mt-5 text-2xl font-black">
                Save Promising Vehicles
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                Keep vehicles you're interested in available for
                additional review and follow-up.
              </p>
            </div>
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <div className="text-4xl">⚡</div>
              <h2 className="mt-5 text-2xl font-black">
                Move With Better Information
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                Review available seller and vehicle information before
                deciding which acquisition opportunities deserve your
                attention.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-10 text-center text-white shadow-xl md:p-14">
          <h2 className="text-4xl font-black md:text-5xl">
            Ready to Start Sourcing?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-100">
            Choose your NorthSky Auto dealer membership and start building
            a more organized vehicle acquisition pipeline.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a
              href="#plans"
              className="rounded-xl bg-white px-8 py-4 font-black text-blue-700 shadow-lg transition hover:bg-blue-50"
            >
              Choose a Dealer Plan →
            </a>
            <Link
              href="/contact"
              className="rounded-xl border border-white/40 bg-white/10 px-8 py-4 font-black text-white transition hover:bg-white hover:text-blue-700"
            >
              Contact NorthSky Auto
            </Link>
          </div>
        </div>
      </section>
      {/* DISCLOSURE */}
      <section className="border-t border-slate-200 bg-white px-6 py-8">
        <div className="mx-auto max-w-4xl text-center text-sm leading-6 text-slate-500">
          NorthSky Auto dealer memberships are subject to applicable
          membership terms and account requirements. Subscription payments
          are processed securely through Stripe. Vehicle opportunities
          and seller availability are not guaranteed and may vary by
          market and inventory.
        </div>
      </section>
    </main>
  );
}