“use client”;

import Link from “next/link”;
import { useState } from “react”;

const plans = [
{
name: “Starter”,
price: 99,
description: “For dealerships getting started with NorthSky Auto.”,
features: [
“Dealer account”,
“Access to vehicle opportunities”,
“Basic dealer dashboard”,
“Lead browsing”,
“Dealer support”,
],
},
{
name: “Dealer Pro”,
price: 299,
popular: true,
description:
“For dealerships actively sourcing additional inventory.”,
features: [
“Everything in Starter”,
“Priority vehicle opportunities”,
“Advanced lead management”,
“Acquisition pipeline tools”,
“Priority support”,
],
},
{
name: “Enterprise”,
price: null,
description:
“For larger dealerships and multi-location operations.”,
features: [
“Everything in Dealer Pro”,
“Multi-location support”,
“Custom acquisition solutions”,
“Dedicated support”,
“Custom pricing”,
],
},
];

export default function DealerSubscriptionsPage() {
const [selectedPlan, setSelectedPlan] = useState(null);

function handlePlanSelect(plan) {
setSelectedPlan(plan.name);

// Stripe checkout can be connected here later.
console.log("Selected plan:", plan.name);

}

return (
{/* Header */}
NS
        <div>
          <div className="font-black tracking-tight text-slate-950">
            NorthSky Auto
          </div>
          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Dealer Portal
          </div>
        </div>
      </Link>
      <div className="flex items-center gap-2">
        <Link
          href="/dealer/dashboard"
          className="rounded-lg px-3 py-2 text-sm font-bold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          Dashboard
        </Link>
        <Link
          href="/dealer/settings"
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-black text-slate-600 transition hover:bg-slate-50"
        >
          Settings
        </Link>
      </div>
    </div>
  </header>
  {/* Hero */}
  <section className="overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white">
    <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 md:py-16 lg:px-8">
      <span className="inline-flex rounded-full bg-blue-500/15 px-4 py-2 text-xs font-black uppercase tracking-widest text-blue-300 ring-1 ring-blue-400/20">
        Dealer Membership
      </span>
      <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
        Choose the right plan for your dealership.
      </h1>
      <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
        Get the tools you need to discover vehicle opportunities
        and build a stronger inventory acquisition pipeline.
      </p>
    </div>
  </section>
  {/* Plans */}
  <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
    <div className="grid gap-6 lg:grid-cols-3">
      {plans.map((plan) => (
        <PlanCard
          key={plan.name}
          plan={plan}
          selected={selectedPlan === plan.name}
          onSelect={() => handlePlanSelect(plan)}
        />
      ))}
    </div>
    {/* Selected plan notice */}
    {selectedPlan && (
      <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-blue-200 bg-blue-50 p-5 text-center">
        <p className="text-sm font-black text-blue-900">
          {selectedPlan} selected
        </p>
        <p className="mt-1 text-sm text-blue-700">
          Stripe checkout will be connected to this button when
          billing is enabled.
        </p>
      </div>
    )}
  </section>
  {/* Benefits */}
  <section className="border-t border-slate-200 bg-white">
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-black uppercase tracking-widest text-blue-600">
          Built For Dealers
        </p>
        <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
          Turn vehicle opportunities into inventory.
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-500">
          NorthSky Auto is designed to give Canadian dealerships
          a more organized way to discover and manage potential
          vehicle acquisition opportunities.
        </p>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Benefit
          icon="🚘"
          title="Vehicle Opportunities"
          text="Discover seller-submitted vehicles."
        />
        <Benefit
          icon="🔎"
          title="Search"
          text="Find opportunities that fit your dealership."
        />
        <Benefit
          icon="📊"
          title="Organization"
          text="Keep your acquisition activity organized."
        />
        <Benefit
          icon="🇨🇦"
          title="Canadian Marketplace"
          text="Built with Canadian dealerships in mind."
        />
      </div>
    </div>
  </section>
  {/* CTA */}
  <section className="bg-slate-950 px-4 py-16 text-white sm:px-6">
    <div className="mx-auto max-w-4xl text-center">
      <span className="text-4xl">🚘</span>
      <h2 className="mt-5 text-3xl font-black sm:text-4xl">
        Ready to grow your acquisition pipeline?
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
        Browse available vehicle opportunities or return to
        your dealer dashboard.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link
          href="/dealer/leads"
          className="rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-black text-white transition hover:bg-blue-500"
        >
          Browse Vehicle Leads →
        </Link>
        <Link
          href="/dealer/dashboard"
          className="rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-black text-white transition hover:bg-white/10"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  </section>
  {/* Footer */}
  <footer className="border-t border-slate-800 bg-slate-950 px-4 py-7 text-center text-xs font-semibold text-slate-500 sm:px-6">
    © {new Date().getFullYear()} NorthSky Auto. Dealer
    marketplace and acquisition platform.
  </footer>
</main>

);
}

function PlanCard({ plan, selected, onSelect }) {
return (
<article
className={relative flex flex-col rounded-3xl bg-white p-7 shadow-sm ring-1 transition sm:p-8 ${ plan.popular ? "ring-2 ring-blue-600 shadow-xl" : "ring-slate-200" } ${ selected ? "translate-y-[-2px] shadow-xl" : "hover:-translate-y-1 hover:shadow-lg" }}
>
{plan.popular && (
Most Popular
)}

  <div>
    <p className="text-xs font-black uppercase tracking-widest text-blue-600">
      Dealer Plan
    </p>
    <h2 className="mt-3 text-2xl font-black text-slate-950">
      {plan.name}
    </h2>
    <p className="mt-3 min-h-[48px] text-sm leading-6 text-slate-500">
      {plan.description}
    </p>
  </div>
  <div className="mt-7">
    {plan.price === null ? (
      <div>
        <span className="text-3xl font-black text-slate-950">
          Custom
        </span>
        <span className="ml-2 text-sm font-semibold text-slate-400">
          pricing
        </span>
      </div>
    ) : (
      <div>
        <span className="text-4xl font-black tracking-tight text-slate-950">
          ${plan.price}
        </span>
        <span className="ml-2 text-sm font-semibold text-slate-400">
          / month
        </span>
      </div>
    )}
  </div>
  <div className="my-7 h-px bg-slate-100" />
  <ul className="space-y-3">
    {plan.features.map((feature) => (
      <li
        key={feature}
        className="flex items-start gap-3 text-sm text-slate-600"
      >
        <span className="mt-0.5 font-black text-blue-600">
          ✓
        </span>
        <span>{feature}</span>
      </li>
    ))}
  </ul>
  <div className="mt-8 flex-1" />
  <button
    type="button"
    onClick={onSelect}
    className={`w-full rounded-xl px-5 py-3.5 text-sm font-black transition ${
      plan.popular
        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
        : "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
    }`}
  >
    {plan.price === null
      ? "Contact NorthSky"
      : selected
      ? "Selected ✓"
      : `Choose ${plan.name}`}
  </button>
</article>

);
}

function Benefit({ icon, title, text }) {
return (
{icon}
  <h3 className="mt-4 font-black text-slate-950">
    {title}
  </h3>
  <p className="mt-2 text-sm leading-6 text-slate-500">
    {text}
  </p>
</div>

);
}