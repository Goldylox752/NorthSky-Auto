import Link from "next/link";

export const metadata = {
  title: "Dealer Plans & Pricing | NorthSky Auto",
  description:
    "Choose a NorthSky Auto dealer membership plan to discover vehicle acquisition opportunities and build your dealership inventory pipeline.",
  alternates: {
    canonical: "https://northsky-auto.vercel.app/pricing",
  },
};

const plans = [
  {
    name: "Starter Dealer",
    price: "$99",
    period: "/month",
    description:
      "A simple starting point for dealerships looking to discover vehicle acquisition opportunities.",
    features: [
      "Access vehicle opportunities",
      "Dealer marketplace access",
      "Vehicle opportunity details",
      "Dealer account dashboard",
      "Saved vehicle opportunities",
      "Basic sourcing tools",
    ],
    cta: "Start Starter Plan",
    href: "/buyers?plan=starter",
  },
  {
    name: "Pro Dealer",
    price: "$299",
    period: "/month",
    popular: true,
    description:
      "For dealerships actively building a vehicle acquisition pipeline.",
    features: [
      "Everything in Starter",
      "Priority access to opportunities",
      "Advanced vehicle sourcing",
      "Saved opportunities",
      "Dealer pipeline tools",
      "Priority dealer support",
    ],
    cta: "Start Pro Plan",
    href: "/buyers?plan=pro",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description:
      "For larger dealer groups and organizations with specialized sourcing requirements.",
    features: [
      "Everything in Pro",
      "Multi-location support",
      "Custom sourcing requirements",
      "Dedicated onboarding",
      "Custom account configuration",
      "Enterprise support",
    ],
    cta: "Contact Sales",
    href: "/contact?topic=dealer-membership",
  },
];

export default function PricingPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "NorthSky Auto Dealer Pricing",
    description:
      "NorthSky Auto dealer membership plans and pricing.",
    url: "https://northsky-auto.vercel.app/pricing",
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      {/* HERO */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 px-6 py-20 text-white md:py-28">
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-flex rounded-full bg-blue-500/15 px-4 py-2 text-xs font-black uppercase tracking-widest text-blue-300 ring-1 ring-blue-400/20">
            Dealer Membership
          </span>

          <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
            Dealer Plans & Pricing
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Choose the NorthSky Auto membership that fits
            your dealership and start building a stronger
            vehicle acquisition pipeline.
          </p>
        </div>
      </section>

      {/* PRICING */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-3xl bg-white p-8 shadow-sm ring-1 ${
                plan.popular
                  ? "ring-2 ring-blue-600 shadow-xl"
                  : "ring-slate-200"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-5 py-2 text-xs font-black uppercase tracking-widest text-white">
                  Most Popular
                </span>
              )}

              <p className="text-sm font-black uppercase tracking-widest text-blue-600">
                {plan.name}
              </p>

              <div className="mt-5 flex items-end gap-1">
                <span className="text-5xl font-black text-slate-950">
                  {plan.price}
                </span>

                {plan.period && (
                  <span className="pb-2 text-sm font-bold text-slate-500">
                    {plan.period}
                  </span>
                )}
              </div>

              <p className="mt-5 min-h-[72px] text-sm leading-6 text-slate-600">
                {plan.description}
              </p>

              <ul className="mt-7 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-3 text-sm font-medium text-slate-700"
                  >
                    <span className="font-black text-green-600">
                      ✓
                    </span>

                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <Link
                  href={plan.href}
                  className={`block rounded-xl px-5 py-3.5 text-center text-sm font-black transition ${
                    plan.popular
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  {plan.cta} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VALUE */}
      <section className="border-t border-slate-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-black uppercase tracking-widest text-blue-600">
            Built for Dealers
          </p>

          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            Find More Vehicle Acquisition Opportunities
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600">
            NorthSky Auto helps dealerships discover
            seller-submitted vehicles and organize potential
            acquisition opportunities in one marketplace.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-black">
            Dealer Pricing FAQ
          </h2>

          <div className="mt-10 space-y-4">
            <Faq
              question="Can I change my dealer plan?"
              answer="Yes. Contact NorthSky Auto to discuss changing your membership plan."
            />

            <Faq
              question="Is there a long-term contract?"
              answer="NorthSky Auto memberships are presented as monthly plans. Review the applicable membership terms before subscribing."
            />

            <Faq
              question="What does the Starter plan include?"
              answer="Starter provides access to the dealer marketplace, vehicle opportunities, account tools, and basic sourcing functionality."
            />

            <Faq
              question="What is included with Pro?"
              answer="Pro is designed for dealerships that actively source inventory and includes additional sourcing and support features."
            />

            <Faq
              question="Do you offer Enterprise plans?"
              answer="Yes. Enterprise pricing is customized for larger dealer groups and specialized requirements."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 px-6 py-16 text-center text-white">
        <h2 className="text-3xl font-black md:text-4xl">
          Ready to Start Sourcing?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-blue-100">
          Choose a dealer plan and start exploring vehicle
          acquisition opportunities.
        </p>

        <Link
          href="/buyers"
          className="mt-7 inline-flex rounded-xl bg-white px-7 py-3.5 font-black text-blue-700 transition hover:bg-slate-100"
        >
          View Dealer Plans →
        </Link>
      </section>
    </main>
  );
}

function Faq({ question, answer }) {
  return (
    <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
      <h3 className="font-black text-slate-950">
        {question}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {answer}
      </p>
    </div>
  );
}