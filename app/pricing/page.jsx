import Link from "next/link";

export const metadata = {
  title: "Dealer Pricing | NorthSky Auto",
  description:
    "Choose a NorthSky Auto dealer plan and access vehicle acquisition opportunities across Canada.",
};

const plans = [
  {
    name: "Dealer Starter",
    price: "$599",
    period: "/month",
    description:
      "For dealerships ready to access NorthSky Auto vehicle acquisition opportunities and manage their dealer pipeline.",
    features: [
      "Dealer account",
      "Vehicle opportunity access",
      "Lead management",
      "Dealer dashboard",
      "Saved opportunities",
      "Dealer profile",
      "Email support",
    ],
    href: "/dealer/register?plan=starter",
    popular: false,
    productId: "prod_V6lGVSaDMBJqcR",
  },
  {
    name: "Dealer Pro",
    price: "$799",
    period: "/month",
    description:
      "For active dealerships that want expanded opportunities, better pipeline management, and advanced dealer tools.",
    features: [
      "Everything in Dealer Starter",
      "Priority vehicle opportunities",
      "Advanced lead management",
      "Saved opportunities",
      "Dealer analytics",
      "Pipeline tracking",
      "Priority support",
    ],
    href: "/dealer/register?plan=pro",
    popular: true,
    productId: "prod_V6lJBhsxc8LiSg",
  },
];

const benefits = [
  {
    icon: "🚗",
    title: "Vehicle Opportunities",
    description:
      "Discover vehicle acquisition opportunities submitted by sellers across Canada.",
  },
  {
    icon: "📊",
    title: "Dealer Dashboard",
    description:
      "Manage leads, saved opportunities, dealership information, and platform activity from one place.",
  },
  {
    icon: "⚡",
    title: "Built for Dealers",
    description:
      "NorthSky Auto is designed around the vehicle acquisition workflow of modern automotive dealerships.",
  },
];

const faqs = [
  {
    question: "What is included with Dealer Starter?",
    answer:
      "Dealer Starter includes a dealer account, vehicle opportunity access, lead management, saved opportunities, your dealer dashboard, and email support.",
  },
  {
    question: "What is included with Dealer Pro?",
    answer:
      "Dealer Pro includes everything in Dealer Starter plus priority vehicle opportunities, advanced lead management, dealer analytics, pipeline tracking, and priority support.",
  },
  {
    question: "Can I change my plan later?",
    answer:
      "Yes. Your dealership can change its subscription as your vehicle acquisition needs grow.",
  },
  {
    question: "Is NorthSky Auto a vehicle dealership?",
    answer:
      "No. NorthSky Auto operates as a marketplace and technology platform connecting vehicle sellers with participating automotive dealers. Dealers make their own acquisition decisions.",
  },
  {
    question: "How do I get started?",
    answer:
      "Choose a dealer plan, create your dealer account, and complete your dealership profile. You'll then be able to access the NorthSky Auto dealer platform.",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.28),transparent_45%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">

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
              Built for automotive dealers.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Access vehicle acquisition opportunities, manage your dealer
              pipeline, and grow your inventory sourcing operation with
              NorthSky Auto.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-slate-400">
              <span>✓ Canadian marketplace</span>
              <span>✓ Dealer dashboard</span>
              <span>✓ Vehicle opportunities</span>
            </div>

          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="px-6 py-20 md:py-28">

        <div className="mx-auto max-w-5xl">

          <div className="grid gap-8 lg:grid-cols-2">

            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`relative flex flex-col rounded-3xl bg-white p-8 shadow-xl transition duration-300 hover:-translate-y-1 ${
                  plan.popular
                    ? "ring-2 ring-blue-600 lg:scale-[1.02]"
                    : "ring-1 ring-slate-200"
                }`}
              >

                {plan.popular && (
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-blue-600 px-5 py-2 text-xs font-black uppercase tracking-wider text-white shadow-lg">
                    Most Popular
                  </div>
                )}

                <div>

                  <div className="flex items-start justify-between gap-4">

                    <div>
                      <p className="text-sm font-black uppercase tracking-wider text-blue-600">
                        {plan.name}
                      </p>

                      <p className="mt-2 text-sm font-semibold text-slate-500">
                        Monthly dealer subscription
                      </p>
                    </div>

                    <span className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-500">
                      CAD
                    </span>

                  </div>

                  <div className="mt-7 flex items-end gap-2">

                    <span className="text-5xl font-black tracking-tight">
                      {plan.price}
                    </span>

                    <span className="pb-1 text-sm font-semibold text-slate-500">
                      {plan.period}
                    </span>

                  </div>

                  <p className="mt-5 min-h-[96px] text-sm leading-6 text-slate-600">
                    {plan.description}
                  </p>

                </div>

                <div className="my-8 h-px bg-slate-200" />

                <div>

                  <p className="mb-5 text-sm font-black text-slate-900">
                    What's included
                  </p>

                  <ul className="space-y-4">

                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm font-semibold text-slate-700"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-black text-emerald-700">
                          ✓
                        </span>

                        <span>{feature}</span>
                      </li>
                    ))}

                  </ul>

                </div>

                <div className="mt-auto pt-10">

                  <Link
                    href={plan.href}
                    className={`flex w-full items-center justify-center rounded-xl px-6 py-4 text-center font-black transition ${
                      plan.popular
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700"
                        : "bg-slate-950 text-white hover:bg-slate-800"
                    }`}
                  >
                    Choose {plan.name} →
                  </Link>

                  <p className="mt-3 text-center text-xs text-slate-400">
                    Secure subscription setup
                  </p>

                </div>

              </article>
            ))}

          </div>

          {/* PRICE NOTE */}

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 text-center text-sm text-slate-500">
            All prices are in <strong className="text-slate-900">CAD</strong>{" "}
            and billed monthly. Subscription access is subject to NorthSky
            Auto's dealer terms.
          </div>

        </div>

      </section>

      {/* BENEFITS */}
      <section className="border-y border-slate-200 bg-white px-6 py-20 md:py-24">

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
              The Dealer Platform
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Everything built around your acquisition pipeline
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              NorthSky Auto brings vehicle opportunities and dealer tools
              together in one centralized platform.
            </p>

          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">

            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200"
              >

                <div className="text-4xl">
                  {benefit.icon}
                </div>

                <h3 className="mt-5 text-xl font-black">
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

      {/* COMPARISON */}
      <section className="px-6 py-20 md:py-24">

        <div className="mx-auto max-w-5xl">

          <div className="text-center">

            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
              Compare Plans
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Choose the right level for your dealership
            </h2>

          </div>

          <div className="mt-12 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">

            <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50">

              <div className="p-5 text-sm font-black">
                Feature
              </div>

              <div className="p-5 text-center text-sm font-black">
                Starter
              </div>

              <div className="p-5 text-center text-sm font-black text-blue-600">
                Pro
              </div>

            </div>

            {[
              ["Dealer Account", true, true],
              ["Vehicle Opportunities", true, true],
              ["Lead Management", true, true],
              ["Saved Opportunities", true, true],
              ["Dealer Dashboard", true, true],
              ["Priority Opportunities", false, true],
              ["Advanced Lead Management", false, true],
              ["Dealer Analytics", false, true],
              ["Pipeline Tracking", false, true],
              ["Priority Support", false, true],
            ].map(([feature, starter, pro]) => (
              <div
                key={feature}
                className="grid grid-cols-3 border-b border-slate-100 last:border-0"
              >

                <div className="p-5 text-sm font-semibold text-slate-700">
                  {feature}
                </div>

                <div className="p-5 text-center">
                  {starter ? (
                    <span className="font-black text-emerald-600">✓</span>
                  ) : (
                    <span className="text-slate-300">—</span>
                  )}
                </div>

                <div className="p-5 text-center">
                  {pro ? (
                    <span className="font-black text-emerald-600">✓</span>
                  ) : (
                    <span className="text-slate-300">—</span>
                  )}
                </div>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* FAQ */}
      <section className="border-t border-slate-200 bg-slate-50 px-6 py-20 md:py-24">

        <div className="mx-auto max-w-4xl">

          <div className="text-center">

            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
              FAQ
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Common questions
            </h2>

          </div>

          <div className="mt-12 space-y-4">

            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
              >

                <summary className="cursor-pointer list-none font-black">
                  <div className="flex items-center justify-between gap-6">

                    <span>{faq.question}</span>

                    <span className="shrink-0 text-xl font-normal text-blue-600 transition group-open:rotate-45">
                      +
                    </span>

                  </div>
                </summary>

                <p className="mt-4 leading-7 text-slate-600">
                  {faq.answer}
                </p>

              </details>
            ))}

          </div>

        </div>

      </section>

      {/* FINAL CTA */}
      <section className="bg-blue-600 px-6 py-20 text-white md:py-24">

        <div className="mx-auto max-w-4xl text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-xl">
            🚗
          </div>

          <h2 className="mt-7 text-3xl font-black tracking-tight sm:text-5xl">
            Ready to build your vehicle pipeline?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-100">
            Choose your dealer plan and start accessing NorthSky Auto's
            vehicle acquisition platform.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              href="/dealer/register?plan=starter"
              className="rounded-xl bg-white px-7 py-4 font-black text-blue-700 shadow-lg transition hover:bg-blue-50"
            >
              Start with Starter →
            </Link>

            <Link
              href="/dealer/register?plan=pro"
              className="rounded-xl border border-white/30 bg-blue-700 px-7 py-4 font-black text-white transition hover:bg-blue-800"
            >
              Choose Pro →
            </Link>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 px-6 py-10 text-slate-400">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-sm md:flex-row">

          <div>
            <p className="font-black text-white">
              NorthSky Auto
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Connecting vehicles with dealer opportunities across Canada.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-5">

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
              href="/dealer"
              className="transition hover:text-white"
            >
              Dealer Portal
            </Link>

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

        <div className="mx-auto mt-8 max-w-7xl border-t border-white/10 pt-6 text-xs text-slate-500">
          © {new Date().getFullYear()} NorthSky Auto. All rights reserved.
        </div>

      </footer>

    </main>
  );
}