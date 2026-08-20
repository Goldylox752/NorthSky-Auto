import Link from "next/link";

export const metadata = {
  title: "Dealer Portal | NorthSky Auto",
  description:
    "Join NorthSky Auto and access vehicle acquisition opportunities, dealer leads, and tools built for automotive dealerships across Canada.",
};

const benefits = [
  {
    icon: "🚗",
    title: "Vehicle Opportunities",
    description:
      "Discover vehicle submissions from sellers looking for potential dealer opportunities.",
  },
  {
    icon: "📋",
    title: "Lead Management",
    description:
      "Review, organize, save, and manage vehicle acquisition opportunities from one dealer platform.",
  },
  {
    icon: "📊",
    title: "Dealer Analytics",
    description:
      "Monitor your dealership activity and understand your vehicle acquisition pipeline.",
  },
];

const plans = [
  {
    name: "Dealer Starter",
    price: "$599",
    description:
      "For dealerships ready to start accessing the NorthSky Auto vehicle marketplace.",
    features: [
      "Dealer account",
      "Vehicle opportunities",
      "Lead management",
      "Dealer dashboard",
      "Email support",
    ],
    href: "/pricing",
    popular: false,
  },
  {
    name: "Dealer Pro",
    price: "$799",
    description:
      "For active dealerships looking for a stronger vehicle acquisition workflow.",
    features: [
      "Everything in Dealer Starter",
      "Priority vehicle opportunities",
      "Advanced lead management",
      "Saved opportunities",
      "Dealer analytics",
      "Priority support",
    ],
    href: "/pricing",
    popular: true,
  },
];

const steps = [
  {
    number: "01",
    title: "Choose your plan",
    description:
      "Select Dealer Starter or Dealer Pro based on your dealership's acquisition needs.",
  },
  {
    number: "02",
    title: "Complete checkout",
    description:
      "Complete your secure subscription through Stripe and begin the dealer onboarding process.",
  },
  {
    number: "03",
    title: "Access the platform",
    description:
      "Set up your dealership profile and begin managing available vehicle opportunities.",
  },
];

export default function DealerPortalPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* HERO */}

      <section className="relative overflow-hidden bg-slate-950 text-white">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(37,99,235,0.30),transparent_40%),radial-gradient(circle_at_10%_90%,rgba(14,165,233,0.12),transparent_35%)]" />

        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:60px_60px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">

          <div className="mx-auto max-w-4xl text-center">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-5 py-2 text-sm font-bold text-slate-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              NorthSky Auto Dealer Network
            </div>

            <h1 className="mt-7 text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Build your
              <span className="block text-blue-400">
                vehicle pipeline.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              NorthSky Auto gives automotive dealerships a centralized
              platform to discover, manage, and act on vehicle acquisition
              opportunities across Canada.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">

              <Link
                href="/pricing"
                className="rounded-xl bg-blue-600 px-8 py-4 font-black text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500"
              >
                View Dealer Plans →
              </Link>

              <Link
                href="/sell"
                className="rounded-xl border border-white/15 bg-white/[0.06] px-8 py-4 font-black text-white transition hover:bg-white/[0.1]"
              >
                Sell a Vehicle
              </Link>

            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm text-slate-400">
              <span>✓ Canadian marketplace</span>
              <span>✓ Vehicle acquisition opportunities</span>
              <span>✓ Dealer lead management</span>
            </div>

          </div>

        </div>

      </section>

      {/* VALUE PROPOSITION */}

      <section className="bg-white px-6 py-20">

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
              Dealer Platform
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              A marketplace built around vehicle acquisition.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Instead of searching for inventory across multiple sources,
              NorthSky Auto is designed to give dealerships one place to
              discover and manage potential acquisition opportunities.
            </p>

          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">

            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="text-4xl">
                  {benefit.icon}
                </div>

                <h3 className="mt-6 text-xl font-black">
                  {benefit.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {benefit.description}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* PLANS */}

      <section className="bg-slate-50 px-6 py-24">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
              Dealer Membership
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Choose your dealer plan.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Start building your dealership's vehicle acquisition pipeline
              with a NorthSky Auto subscription.
            </p>

          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-2">

            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`relative flex flex-col rounded-3xl bg-white p-8 shadow-xl ring-1 ${
                  plan.popular
                    ? "ring-2 ring-blue-600 md:-translate-y-2"
                    : "ring-slate-200"
                }`}
              >

                {plan.popular && (
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600 px-5 py-2 text-xs font-black uppercase tracking-wider text-white shadow-lg">
                    Most Popular
                  </div>
                )}

                <p className="text-sm font-black uppercase tracking-wider text-blue-600">
                  {plan.name}
                </p>

                <div className="mt-5 flex items-end gap-2">

                  <span className="text-5xl font-black tracking-tight">
                    {plan.price}
                  </span>

                  <span className="pb-1 text-sm font-semibold text-slate-500">
                    /month
                  </span>

                </div>

                <p className="mt-5 min-h-[72px] text-sm leading-6 text-slate-600">
                  {plan.description}
                </p>

                <div className="my-8 h-px bg-slate-200" />

                <ul className="space-y-4">

                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm font-semibold text-slate-700"
                    >

                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-black text-green-700">
                        ✓
                      </span>

                      <span>{feature}</span>

                    </li>
                  ))}

                </ul>

                <div className="mt-auto pt-8">

                  <Link
                    href={plan.href}
                    className={`flex w-full items-center justify-center rounded-xl px-6 py-4 font-black transition ${
                      plan.popular
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700"
                        : "border border-slate-300 bg-white text-slate-900 hover:border-blue-600 hover:text-blue-600"
                    }`}
                  >
                    Choose {plan.name} →
                  </Link>

                </div>

              </article>
            ))}

          </div>

          <p className="mt-8 text-center text-sm text-slate-500">
            Secure subscription checkout powered by Stripe.
          </p>

        </div>

      </section>

      {/* HOW IT WORKS */}

      <section className="bg-slate-950 px-6 py-24 text-white">

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-400">
              Getting Started
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              From signup to vehicle opportunities.
            </h2>

          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">

            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-8"
              >

                <span className="text-4xl font-black text-blue-400">
                  {step.number}
                </span>

                <h3 className="mt-6 text-xl font-black">
                  {step.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-400">
                  {step.description}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* EXISTING DEALER */}

      <section className="px-6 py-24">

        <div className="mx-auto max-w-5xl">

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl sm:p-12">

            <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-center">

              <div>

                <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
                  Already a dealer?
                </p>

                <h2 className="mt-3 text-3xl font-black">
                  Access your NorthSky platform.
                </h2>

                <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                  If you already have an active dealer account, continue to
                  your dealer platform to manage your dealership and vehicle
                  acquisition opportunities.
                </p>

              </div>

              <Link
                href="/dealer/dashboard"
                className="rounded-xl bg-slate-950 px-7 py-4 text-center font-black text-white transition hover:bg-slate-800"
              >
                Open Dealer Platform →
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* SELLER CTA */}

      <section className="bg-blue-600 px-6 py-20 text-white">

        <div className="mx-auto max-w-5xl text-center">

          <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-100">
            Vehicle Sellers
          </p>

          <h2 className="mt-3 text-3xl font-black sm:text-4xl">
            Have a vehicle to sell?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-blue-100">
            Submit your vehicle and create an opportunity for participating
            dealers to discover.
          </p>

          <Link
            href="/sell"
            className="mt-8 inline-flex rounded-xl bg-white px-8 py-4 font-black text-blue-700 shadow-lg transition hover:bg-blue-50"
          >
            Submit Your Vehicle →
          </Link>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="bg-slate-950 px-6 py-10 text-slate-400">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-sm md:flex-row">

          <div>
            <p className="font-black text-white">
              NorthSky Auto
            </p>

            <p className="mt-1 text-slate-500">
              Vehicle marketplace and dealer acquisition platform for Canada.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-5">

            <Link
              href="/"
              className="transition hover:text-white"
            >
              Home
            </Link>

            <Link
              href="/inventory"
              className="transition hover:text-white"
            >
              Inventory
            </Link>

            <Link
              href="/sell"
              className="transition hover:text-white"
            >
              Sell
            </Link>

            <Link
              href="/pricing"
              className="transition hover:text-white"
            >
              Dealer Plans
            </Link>

            <Link
              href="/contact"
              className="transition hover:text-white"
            >
              Contact
            </Link>

          </nav>

        </div>

        <div className="mx-auto mt-8 max-w-7xl border-t border-white/10 pt-6 text-xs text-slate-500">
          © {new Date().getFullYear()} NorthSky Auto. All rights reserved.
        </div>

      </footer>

    </main>
  );
}