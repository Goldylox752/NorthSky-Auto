import Link from “next/link”;

export const metadata = {
title: “Dealer Pricing | NorthSky Auto”,
description:
“Choose a NorthSky Auto dealer subscription and access vehicle acquisition opportunities across Canada.”,
};

const plans = [
{
key: “starter”,
name: “Dealer Starter”,
price: “$599”,
description:
“A complete starting point for dealerships looking to source seller-submitted vehicle opportunities.”,
popular: false,
features: [
“Dealer account”,
“Vehicle opportunity access”,
“Lead management”,
“Dealer dashboard”,
“Saved opportunities”,
“Dealer profile”,
“Email support”,
],
},
{
key: “professional”,
name: “Dealer Professional”,
price: “$799”,
description:
“For active dealerships that want expanded sourcing tools and stronger pipeline management.”,
popular: true,
features: [
“Everything in Dealer Starter”,
“Priority vehicle opportunities”,
“Advanced lead management”,
“Saved opportunities”,
“Dealer analytics”,
“Pipeline tracking”,
“Priority support”,
],
},
];

const comparison = [
[“Dealer account”, true, true],
[“Vehicle opportunities”, true, true],
[“Lead management”, true, true],
[“Saved opportunities”, true, true],
[“Dealer dashboard”, true, true],
[“Dealer profile”, true, true],
[“Email support”, true, true],
[“Priority opportunities”, false, true],
[“Advanced lead management”, false, true],
[“Dealer analytics”, false, true],
[“Pipeline tracking”, false, true],
[“Priority support”, false, true],
];

const faqs = [
{
question: “How does dealer billing work?”,
answer:
“Choose a plan, create your dealer account, and continue through secure Stripe subscription checkout. Your subscription is managed through Stripe.”,
},
{
question: “What is included with Dealer Starter?”,
answer:
“Dealer Starter provides access to the dealer platform, vehicle opportunities, lead management, saved opportunities, your dealer dashboard, dealer profile tools, and email support.”,
},
{
question: “What is included with Dealer Professional?”,
answer:
“Professional includes everything in Starter plus priority vehicle opportunities, advanced lead management, analytics, pipeline tracking, and priority support.”,
},
{
question: “Can I change my plan later?”,
answer:
“Yes. Your dealership can change its subscription as your vehicle acquisition requirements grow.”,
},
{
question: “Is NorthSky Auto a dealership?”,
answer:
“No. NorthSky Auto operates as a marketplace and technology platform connecting vehicle sellers with participating automotive dealers. Dealers make their own acquisition decisions.”,
},
{
question: “Are prices in Canadian dollars?”,
answer:
“Yes. NorthSky Auto dealer plans are displayed in CAD and billed monthly.”,
},
];

function PlanCard({ plan }) {
return (
<article
className={relative flex h-full flex-col rounded-3xl bg-white p-8 shadow-xl ${ plan.popular ? "ring-2 ring-blue-600 lg:scale-[1.02]" : "ring-1 ring-slate-200" }}
>
{plan.popular && (
Most Popular
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
      <span className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-black text-slate-500">
        CAD
      </span>
    </div>
    <div className="mt-7 flex items-end gap-2">
      <span className="text-5xl font-black tracking-tight text-slate-950">
        {plan.price}
      </span>
      <span className="pb-1 text-sm font-bold text-slate-500">
        /month
      </span>
    </div>
    <p className="mt-5 min-h-[84px] text-sm leading-6 text-slate-600">
      {plan.description}
    </p>
  </div>
  <div className="my-8 h-px bg-slate-200" />
  <div>
    <p className="mb-5 text-sm font-black text-slate-950">
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
      href={`/dealer/register?plan=${plan.key}`}
      className={`flex w-full items-center justify-center rounded-xl px-6 py-4 text-center font-black transition ${
        plan.popular
          ? "bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700"
          : "bg-slate-950 text-white hover:bg-slate-800"
      }`}
    >
      Choose {plan.name} →
    </Link>
    <p className="mt-3 text-center text-xs font-semibold text-slate-400">
      Secure Stripe subscription checkout
    </p>
  </div>
</article>

);
}

export default function PricingPage() {
return (
{/* HERO */}

  <section className="relative overflow-hidden bg-slate-950 text-white">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.30),transparent_48%)]" />
    <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <Link
          href="/"
          className="inline-flex text-sm font-bold text-blue-300 transition hover:text-white"
        >
          ← NorthSky Auto
        </Link>
        <p className="mt-10 text-sm font-black uppercase tracking-[0.25em] text-blue-400">
          Dealer Membership
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
          Build your vehicle
          <span className="block text-blue-400">
            acquisition pipeline.
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Choose a NorthSky Auto dealer plan and
          access seller-submitted vehicle
          opportunities through your dealer
          dashboard.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-semibold text-slate-400">
          <span>✓ Canadian marketplace</span>
          <span>✓ Dealer dashboard</span>
          <span>✓ Lead management</span>
          <span>✓ Secure Stripe billing</span>
        </div>
      </div>
    </div>
  </section>
  {/* PRICING */}
  <section className="px-6 py-20 md:py-28">
    <div className="mx-auto max-w-5xl">
      <div className="grid gap-8 lg:grid-cols-2">
        {plans.map((plan) => (
          <PlanCard
            key={plan.key}
            plan={plan}
          />
        ))}
      </div>
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 text-center text-sm leading-6 text-slate-500 shadow-sm">
        All prices are in{" "}
        <strong className="text-slate-900">
          Canadian dollars (CAD)
        </strong>{" "}
        and billed monthly. Subscription access is
        subject to NorthSky Auto's dealer terms.
      </div>
    </div>
  </section>
  {/* HOW IT WORKS */}
  <section className="border-y border-slate-200 bg-white px-6 py-20 md:py-24">
    <div className="mx-auto max-w-6xl">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
          Getting Started
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
          From signup to dealer platform
        </h2>
        <p className="mt-4 leading-7 text-slate-600">
          NorthSky Auto keeps the dealer onboarding
          process simple.
        </p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {[
          {
            number: "01",
            title: "Choose a plan",
            text:
              "Select Starter or Professional based on your dealership's sourcing needs.",
          },
          {
            number: "02",
            title: "Create your account",
            text:
              "Complete your dealer registration and dealership information.",
          },
          {
            number: "03",
            title: "Access the platform",
            text:
              "Complete secure Stripe subscription checkout and access your dealer tools.",
          },
        ].map((step) => (
          <div
            key={step.number}
            className="rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200"
          >
            <div className="text-3xl font-black text-blue-600">
              {step.number}
            </div>
            <h3 className="mt-5 text-xl font-black">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {step.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
  {/* BENEFITS */}
  <section className="px-6 py-20 md:py-24">
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
          Dealer Platform
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
          Tools built around acquisition
        </h2>
        <p className="mt-4 leading-7 text-slate-600">
          Manage vehicle opportunities from one
          centralized dealer workspace.
        </p>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {[
          {
            icon: "🚗",
            title: "Vehicle Opportunities",
            description:
              "Discover seller-submitted vehicle acquisition opportunities across Canada.",
          },
          {
            icon: "📊",
            title: "Dealer Dashboard",
            description:
              "Manage leads, saved opportunities, dealership information, and platform activity.",
          },
          {
            icon: "⚡",
            title: "Built for Dealers",
            description:
              "A dealer-focused platform designed around modern vehicle acquisition workflows.",
          },
        ].map((benefit) => (
          <div
            key={benefit.title}
            className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200"
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
  <section className="bg-white px-6 py-20 md:py-24">
    <div className="mx-auto max-w-5xl">
      <div className="text-center">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
          Compare Plans
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
          Find the right fit
        </h2>
      </div>
      <div className="mt-12 overflow-hidden rounded-3xl shadow-sm ring-1 ring-slate-200">
        <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50">
          <div className="p-5 text-sm font-black">
            Feature
          </div>
          <div className="p-5 text-center text-sm font-black">
            Starter
          </div>
          <div className="p-5 text-center text-sm font-black text-blue-600">
            Professional
          </div>
        </div>
        {comparison.map(
          ([feature, starter, professional]) => (
            <div
              key={feature}
              className="grid grid-cols-3 border-b border-slate-100 last:border-0"
            >
              <div className="p-5 text-sm font-semibold text-slate-700">
                {feature}
              </div>
              <div className="p-5 text-center">
                {starter ? (
                  <span className="font-black text-emerald-600">
                    ✓
                  </span>
                ) : (
                  <span className="text-slate-300">
                    —
                  </span>
                )}
              </div>
              <div className="p-5 text-center">
                {professional ? (
                  <span className="font-black text-emerald-600">
                    ✓
                  </span>
                ) : (
                  <span className="text-slate-300">
                    —
                  </span>
                )}
              </div>
            </div>
          )
        )}
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
          Dealer questions
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
        Ready to start sourcing?
      </h2>
      <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-100">
        Choose your dealer plan and begin your
        NorthSky Auto onboarding.
      </p>
      <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href="/dealer/register?plan=starter"
          className="rounded-xl bg-white px-7 py-4 font-black text-blue-700 shadow-lg transition hover:bg-blue-50"
        >
          Start with Starter →
        </Link>
        <Link
          href="/dealer/register?plan=professional"
          className="rounded-xl border border-white/30 bg-blue-700 px-7 py-4 font-black text-white transition hover:bg-blue-800"
        >
          Choose Professional →
        </Link>
      </div>
    </div>
  </section>
  {/* FOOTER */}
  <footer className="bg-slate-950 px-6 py-10 text-slate-400">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-sm md:flex-row">
      <div className="text-center md:text-left">
        <p className="font-black text-white">
          NorthSky Auto
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Connecting vehicles with dealer
          opportunities across Canada.
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
          href="/vehicles"
          className="transition hover:text-white"
        >
          Vehicles
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
    <div className="mx-auto mt-8 max-w-7xl border-t border-white/10 pt-6 text-center text-xs text-slate-500">
      © {new Date().getFullYear()} NorthSky Auto.
      All rights reserved.
    </div>
  </footer>
</main>

);
}