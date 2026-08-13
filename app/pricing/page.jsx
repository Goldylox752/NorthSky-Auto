import Link from "next/link";
import DealerCheckoutButton from "@/components/DealerCheckoutButton";

export const metadata = {
  title: "Dealer Plans & Pricing | NorthSky Auto",
  description:
    "Compare NorthSky Auto dealer membership plans and pricing. Choose a Starter Dealer or Professional membership to discover vehicle acquisition opportunities across Canada.",
  keywords: [
    "NorthSky Auto pricing",
    "dealer membership",
    "dealer vehicle sourcing",
    "vehicle acquisition",
    "dealer marketplace",
    "Canadian auto dealers",
    "vehicle acquisition opportunities",
  ],
  alternates: {
    canonical: "https://northsky-auto.vercel.app/pricing",
  },
  openGraph: {
    title: "Dealer Plans & Pricing | NorthSky Auto",
    description:
      "Compare NorthSky Auto dealer memberships and choose the plan that fits your vehicle acquisition needs.",
    url: "https://northsky-auto.vercel.app/pricing",
    siteName: "NorthSky Auto",
    type: "website",
  },
};

const plans = [
  {
    name: "Starter Dealer",
    plan: "starter",
    price: "$299",
    period: "/month",
    description:
      "For independent dealers starting a more organized vehicle sourcing pipeline.",
    features: [
      "Access available vehicle opportunities",
      "Dealer account",
      "Available vehicle and seller information",
      "Vehicle opportunity notifications",
      "Dealer marketplace access",
    ],
  },
  {
    name: "Professional",
    plan: "professional",
    price: "$599",
    period: "/month",
    popular: true,
    description:
      "For growing dealerships that want more tools and a stronger vehicle acquisition workflow.",
    features: [
      "Everything in Starter Dealer",
      "Priority vehicle opportunities",
      "Advanced vehicle filters",
      "Saved vehicle opportunities",
      "Lead analytics",
      "Priority dealer support",
    ],
  },
];

const faqs = [
  {
    question: "What is included with a NorthSky Auto dealer membership?",
    answer:
      "Dealer memberships provide access to the NorthSky Auto dealer platform and available vehicle acquisition opportunities. Features vary by membership level.",
  },
  {
    question: "What is the difference between Starter Dealer and Professional?",
    answer:
      "Starter Dealer provides core marketplace and vehicle opportunity access. Professional adds priority opportunities, advanced filters, saved opportunities, lead analytics, and priority dealer support.",
  },
  {
    question: "Are memberships billed monthly?",
    answer:
      "Yes. NorthSky Auto currently offers monthly dealer membership plans. Applicable membership and billing terms apply.",
  },
  {
    question: "Can I change my membership plan?",
    answer:
      "Yes. Contact NorthSky Auto if you need assistance changing your dealer membership.",
  },
  {
    question: "Are vehicle opportunities guaranteed?",
    answer:
      "No. Vehicle opportunities depend on seller activity, inventory, market conditions, vehicle type, and other factors. NorthSky Auto does not guarantee availability or transaction completion.",
  },
];

export default function PricingPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "NorthSky Auto Dealer Plans & Pricing",
    description:
      "Compare NorthSky Auto dealer membership plans and pricing.",
    url: "https://northsky-auto.vercel.app/pricing",
    isPartOf: {
      "@type": "WebSite",
      name: "NorthSky Auto",
      url: "https://northsky-auto.vercel.app",
    },
    about: {
      "@type": "Service",
      name: "NorthSky Auto Dealer Membership",
      serviceType: "Vehicle Acquisition Marketplace",
      areaServed: {
        "@type": "Country",
        name: "Canada",
      },
      provider: {
        "@type": "Organization",
        name: "NorthSky Auto",
        url: "https://northsky-auto.vercel.app",
      },
    },
    mainEntity: {
      "@type": "ItemList",
      name: "NorthSky Auto Dealer Membership Plans",
      itemListElement: plans.map((plan, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: plan.name,
        description: plan.description,
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* STRUCTURED DATA */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* HERO */}

      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 px-6 py-20 text-white md:py-28">
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-flex rounded-full bg-blue-500/15 px-5 py-2 text-xs font-black uppercase tracking-widest text-blue-300 ring-1 ring-blue-400/20">
            NorthSky Auto Dealer Membership
          </span>

          <h1 className="mt-7 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
            Dealer Plans & Pricing
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
            Choose the NorthSky Auto dealer membership that fits
            your dealership and start building a more organized
            vehicle acquisition pipeline.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#plans"
              className="rounded-xl bg-blue-600 px-7 py-3.5 font-black text-white transition hover:bg-blue-500"
            >
              Compare Plans →
            </a>

            <Link
              href="/contact?topic=dealer-membership"
              className="rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 font-black text-white transition hover:bg-white hover:text-slate-950"
            >
              Contact NorthSky Auto
            </Link>
          </div>
        </div>
      </section>

      {/* PRICING */}

      <section
        id="plans"
        className="scroll-mt-20 px-6 py-16 md:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-widest text-blue-600">
              Dealer Memberships
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              Choose Your Dealer Plan
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Simple monthly memberships designed for dealerships
              looking to discover and manage vehicle acquisition
              opportunities.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-2">
            {plans.map((plan) => (
              <div
                key={plan.plan}
                className={`relative flex flex-col rounded-3xl bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl md:p-10 ${
                  plan.popular
                    ? "ring-2 ring-blue-600"
                    : "ring-1 ring-slate-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-blue-600 px-5 py-2 text-xs font-black uppercase tracking-wide text-white shadow-lg">
                    Most Popular
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black uppercase tracking-wide text-blue-700">
                    Dealer Membership
                  </span>

                  {plan.popular && (
                    <span className="text-xl">⭐</span>
                  )}
                </div>

                <h3 className="mt-7 text-3xl font-black">
                  {plan.name}
                </h3>

                <p className="mt-4 min-h-[80px] leading-7 text-slate-600">
                  {plan.description}
                </p>

                <div className="mt-7">
                  <span className="text-5xl font-black tracking-tight text-slate-950">
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
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-3xl rounded-2xl bg-slate-100 p-5 text-center text-sm leading-6 text-slate-500 ring-1 ring-slate-200">
            Membership provides access to the NorthSky Auto dealer
            platform and available vehicle acquisition opportunities.
            Opportunity availability may vary based on seller activity,
            market conditions, vehicle type, and dealer eligibility.
          </div>
        </div>
      </section>

      {/* WHY NORTHSKY */}

      <section className="border-y border-slate-200 bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-black uppercase tracking-widest text-blue-600">
              Built For Dealers
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-4xl">
              A More Organized Vehicle Acquisition Workflow
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              NorthSky Auto gives dealerships a dedicated environment
              to discover, review, save, and manage potential vehicle
              acquisition opportunities.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Feature
              icon="🚗"
              title="Discover Vehicles"
              text="Review seller-submitted vehicle opportunities that may fit your dealership."
            />

            <Feature
              icon="📊"
              title="Manage Opportunities"
              text="Keep potential acquisitions organized inside your dealer workspace."
            />

            <Feature
              icon="⭐"
              title="Build Your Pipeline"
              text="Save promising opportunities and develop a more consistent sourcing workflow."
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}

      <section className="bg-slate-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-widest text-blue-400">
              How It Works
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-4xl">
              Start Sourcing With NorthSky Auto
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Step
              number="01"
              title="Choose a Plan"
              text="Select Starter Dealer or Professional based on your dealership's needs."
            />

            <Step
              number="02"
              title="Subscribe Securely"
              text="Complete your membership checkout through Stripe."
            />

            <Step
              number="03"
              title="Access Opportunities"
              text="Use your dealer environment to discover and manage available vehicle opportunities."
            />
          </div>
        </div>
      </section>

      {/* FAQ */}

      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-widest text-blue-600">
              FAQ
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-4xl">
              Dealer Pricing FAQ
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {faqs.map((faq) => (
              <Faq
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="bg-blue-600 px-6 py-20 text-center text-white">
        <h2 className="text-3xl font-black md:text-4xl">
          Ready to Start Sourcing?
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-100">
          Choose your NorthSky Auto dealer membership and start
          building a more organized vehicle acquisition pipeline.
        </p>

        <Link
          href="/buyers"
          className="mt-8 inline-flex rounded-xl bg-white px-8 py-4 font-black text-blue-700 shadow-lg transition hover:bg-blue-50"
        >
          View Dealer Memberships →
        </Link>
      </section>

      {/* DISCLOSURE */}

      <section className="border-t border-slate-200 bg-white px-6 py-8">
        <div className="mx-auto max-w-4xl text-center text-xs leading-6 text-slate-500">
          NorthSky Auto dealer memberships are subject to applicable
          membership terms and account requirements. Subscription
          payments are processed securely through Stripe. Vehicle
          opportunities, seller availability, pricing, condition,
          and transaction completion are not guaranteed.
        </div>
      </section>
    </main>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200">
      <div className="text-4xl">{icon}</div>

      <h3 className="mt-5 text-xl font