import Link from "next/link";
export const metadata = {
  title: "Dealer Network | NorthSky Auto",
  description:
    "Join NorthSky Auto and connect with qualified vehicle sellers and acquisition opportunities across Canada.",
};
const benefits = [
  {
    icon: "🚘",
    title: "Fresh Inventory Opportunities",
    description:
      "Discover cars, trucks, SUVs, vans, and commercial vehicles from sellers looking to sell.",
  },
  {
    icon: "🎯",
    title: "Qualified Seller Leads",
    description:
      "Receive detailed vehicle information so your acquisition team can quickly evaluate opportunities.",
  },
  {
    icon: "⚡",
    title: "Faster Vehicle Acquisition",
    description:
      "Spend less time searching for inventory and more time connecting with potential sellers.",
  },
];
const steps = [
  {
    number: "01",
    title: "Apply",
    description:
      "Submit your dealership information and tell us about your operation.",
  },
  {
    number: "02",
    title: "Get Approved",
    description:
      "NorthSky Auto reviews your dealership and activates your dealer account.",
  },
  {
    number: "03",
    title: "Choose Your Plan",
    description:
      "Select the membership level that fits your vehicle acquisition needs.",
  },
  {
    number: "04",
    title: "Find Vehicles",
    description:
      "Access available acquisition opportunities through your dealer dashboard.",
  },
];
const plans = [
  {
    name: "Starter Dealer",
    price: "$299",
    description: "For independent dealers building their acquisition pipeline.",
    features: [
      "Vehicle acquisition leads",
      "Dealer dashboard",
      "Basic vehicle filters",
      "Lead notifications",
    ],
  },
  {
    name: "Professional",
    price: "$599",
    description: "For growing dealerships that need consistent opportunities.",
    features: [
      "Everything in Starter",
      "Priority lead access",
      "Advanced filters",
      "Saved searches",
      "Lead analytics",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$999",
    description: "For high-volume and multi-location dealership operations.",
    features: [
      "Everything in Professional",
      "Unlimited team members",
      "Advanced reporting",
      "Multi-location support",
      "Dedicated support",
    ],
  },
];
export default function BuyersPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.25),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full border border-blue-400/30 bg-blue-500/10 px-5 py-2 text-sm font-semibold text-blue-300">
              NorthSky Auto Dealer Network
            </span>
            <h1 className="mt-8 text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
              Find More Vehicles.
              <span className="block text-blue-400">
                Build Better Inventory.
              </span>
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
              NorthSky Auto connects dealerships with vehicle sellers across
              Canada. Build a stronger acquisition pipeline and discover
              vehicles before they reach traditional marketplaces.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/pricing"
                className="rounded-xl bg-blue-600 px-8 py-4 text-center font-bold text-white shadow-lg transition hover:bg-blue-500"
              >
                View Dealer Plans
              </Link>
              <Link
                href="/dealer-application"
                className="rounded-xl border border-white/20 bg-white/10 px-8 py-4 text-center font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                Apply As A Dealer
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400">
              <span>✓ Dealer-focused platform</span>
              <span>✓ Canadian vehicle opportunities</span>
              <span>✓ Secure monthly billing</span>
            </div>
          </div>
        </div>
      </section>
      {/* Benefits */}
      <section className="px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Why NorthSky Auto
            </span>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Built For Vehicle Acquisition Teams
            </h2>
            <p className="mt-5 text-lg text-slate-600">
              Give your dealership a more efficient way to discover and
              evaluate potential inventory.
            </p>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="text-5xl">{benefit.icon}</div>
                <h3 className="mt-6 text-2xl font-bold text-slate-900">
                  {benefit.title}
                </h3>
                <p className="mt-4 leading-7 text-slate-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* How It Works */}
      <section className="bg-slate-100 px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Simple Process
            </span>
            <h2 className="mt-3 text-4xl font-bold text-slate-900 md:text-5xl">
              How The Dealer Program Works
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-3xl bg-white p-8 shadow-sm"
              >
                <div className="text-4xl font-extrabold text-blue-600">
                  {step.number}
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Pricing Preview */}
      <section className="px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Dealer Membership
            </span>
            <h2 className="mt-3 text-4xl font-bold text-slate-900 md:text-5xl">
              Choose Your Dealer Plan
            </h2>
            <p className="mt-5 text-lg text-slate-600">
              Start with the plan that fits your dealership and upgrade as
              your acquisition needs grow.
            </p>
          </div>
          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-3xl border bg-white p-8 shadow-lg ${
                  plan.popular
                    ? "border-blue-600 ring-2 ring-blue-100"
                    : "border-slate-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-5 py-2 text-sm font-bold text-white">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-slate-900">
                  {plan.name}
                </h3>
                <p className="mt-4 min-h-[72px] text-slate-600">
                  {plan.description}
                </p>
                <div className="mt-7">
                  <span className="text-5xl font-extrabold text-slate-900">
                    {plan.price}
                  </span>
                  <span className="ml-2 text-slate-500">
                    /month
                  </span>
                </div>
                <Link
                  href="/pricing"
                  className={`mt-8 rounded-xl py-4 text-center font-bold transition ${
                    plan.popular
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                >
                  Choose Plan
                </Link>
                <ul className="mt-8 space-y-4 border-t border-slate-100 pt-8">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-3 text-slate-700"
                    >
                      <span className="font-bold text-blue-600">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/pricing"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              View full dealer pricing →
            </Link>
          </div>
        </div>
      </section>
      {/* Dealer Application CTA */}
      <section className="bg-slate-950 px-6 py-20 text-center text-white lg:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold md:text-5xl">
            Ready To Grow Your Inventory?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Join the NorthSky Auto dealer network and build a better vehicle
            acquisition pipeline.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/pricing"
              className="rounded-xl bg-blue-600 px-8 py-4 font-bold text-white transition hover:bg-blue-500"
            >
              Get Started
            </Link>
            <Link
              href="/dealer-application"
              className="rounded-xl border border-slate-700 bg-slate-900 px-8 py-4 font-bold text-white transition hover:bg-slate-800"
            >
              Apply As A Dealer
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}