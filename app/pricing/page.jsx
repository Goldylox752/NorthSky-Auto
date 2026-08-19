import Link from "next/link";

export const metadata = {
  title: "Dealer Pricing | NorthSky Auto",
  description:
    "Choose a NorthSky Auto dealer plan and access vehicle acquisition opportunities.",
};

const plans = [
  {
    name: "Starter",
    price: "$99",
    description:
      "A simple starting point for dealerships looking to access NorthSky Auto.",
    features: [
      "Dealer account",
      "Vehicle lead access",
      "Lead management",
      "Dealer dashboard",
      "Email support",
    ],
    href: "/dealer/register",
    popular: false,
  },
  {
    name: "Dealer Pro",
    price: "$299",
    description:
      "Built for active dealerships that want more opportunities and better lead management.",
    features: [
      "Everything in Starter",
      "Priority vehicle opportunities",
      "Advanced lead management",
      "Saved opportunities",
      "Dealer analytics",
      "Priority support",
    ],
    href: "/dealer/register",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description:
      "For dealership groups and larger automotive organizations requiring a tailored solution.",
    features: [
      "Everything in Dealer Pro",
      "Multiple dealership locations",
      "Custom onboarding",
      "Dedicated support",
      "Custom solutions",
      "Enterprise account management",
    ],
    href: "/contact",
    popular: false,
  },
];

const benefits = [
  {
    icon: "🚗",
    title: "Vehicle Opportunities",
    description:
      "Discover vehicle acquisition opportunities through the NorthSky Auto dealer platform.",
  },
  {
    icon: "📊",
    title: "Dealer Dashboard",
    description:
      "Manage leads, saved opportunities, subscriptions, and dealership activity from one place.",
  },
  {
    icon: "⚡",
    title: "Built for Dealers",
    description:
      "A streamlined platform designed around the needs of modern automotive dealerships.",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Link
              href="/"
              className="inline-flex text-sm font-bold text-blue-300 transition hover:text-white"
            >
              ← NorthSky Auto
            </Link>

            <p className="mt-10 text-sm font-black uppercase tracking-[0.25em] text-blue-400">
              Dealer Plans
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
              Choose the plan that fits your dealership
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Access NorthSky Auto dealer tools, vehicle opportunities, lead
              management, and analytics through a plan built for your business.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex flex-col rounded-3xl bg-white p-8 shadow-xl ring-1 ${
                plan.popular
                  ? "ring-2 ring-blue-600 lg:-translate-y-2"
                  : "ring-slate-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600 px-5 py-2 text-xs font-black uppercase tracking-wider text-white shadow-lg">
                  Most Popular
                </div>
              )}

              <div>
                <p className="text-sm font-black uppercase tracking-wider text-blue-600">
                  {plan.name}
                </p>

                <div className="mt-5 flex items-end gap-2">
                  <span className="text-5xl font-black tracking-tight">
                    {plan.price}
                  </span>

                  {plan.price !== "Custom" && (
                    <span className="pb-1 text-sm font-semibold text-slate-500">
                      /month
                    </span>
                  )}
                </div>

                <p className="mt-5 min-h-[72px] text-sm leading-6 text-slate-600">
                  {plan.description}
                </p>
              </div>

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
                  className={`flex w-full items-center justify-center rounded-xl px-6 py-4 text-center font-black transition focus:outline-none focus:ring-4 ${
                    plan.popular
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700 focus:ring-blue-200"
                      : "border border-slate-300 bg-white text-slate-900 hover:border-blue-600 hover:text-blue-600 focus:ring-slate-200"
                  }`}
                >
                  {plan.name === "Enterprise"
                    ? "Contact Sales →"
                    : "Get Started →"}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="border-y border-slate-200 bg-white px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
              Built for dealerships
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Everything you need in one platform
            </h2>

            <p className="mt-4 text-slate-600">
              NorthSky Auto gives dealers the tools they need to manage
              opportunities and grow their vehicle acquisition pipeline.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200"
              >
                <div className="text-4xl">{benefit.icon}</div>

                <h3 className="mt-5 text-xl font-black text-slate-900">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
              FAQ
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Common questions
            </h2>
          </div>

          <div className="mt-12 space-y-5">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="font-black">
                Can I change my plan later?
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Yes. Your dealership can change its subscription as your
                requirements grow.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="font-black">
                Do I need a dealer account?
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Yes. Dealer accounts provide access to the dealer portal,
                opportunities, and account management tools.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="font-black">
                How do I get started?
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Create a dealer account and complete your dealership profile
                to begin using the platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 px-6 py-16 text-white md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            Ready to grow your vehicle pipeline?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Join NorthSky Auto and start managing dealership opportunities
            through one centralized platform.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/dealer/register"
              className="rounded-xl bg-white px-7 py-4 font-black text-blue-700 shadow-lg transition hover:bg-blue-50"
            >
              Create Dealer Account →
            </Link>

            <Link
              href="/dealer/login"
              className="rounded-xl border border-blue-300 px-7 py-4 font-black text-white transition hover:bg-blue-700"
            >
              Dealer Login
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 px-6 py-10 text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-sm md:flex-row">
          <p>
            © {new Date().getFullYear()} NorthSky Auto. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            <Link
              href="/privacy"
              className="transition hover:text-white"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-white"
            >
              Terms
            </Link>

            <Link
              href="/contact"
              className="transition hover:text-white"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}