import Link from "next/link";
import DealerCheckoutButton from "@/components/DealerCheckoutButton";
import DealerTracking from "./DealerTracking";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://northsky-auto.vercel.app";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dealer Memberships | NorthSky Auto",
  description:
    "Join NorthSky Auto as a dealer and access vehicle acquisition opportunities, sourcing tools, saved vehicles, analytics, and dealer marketplace features across Canada.",
  keywords: [
    "NorthSky Auto dealer",
    "dealer membership Canada",
    "vehicle acquisition",
    "dealer vehicle sourcing",
    "used vehicle sourcing",
    "car dealer marketplace Canada",
    "vehicle leads for dealers",
  ],
  alternates: {
    canonical: `${SITE_URL}/buyers`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Dealer Memberships | NorthSky Auto",
    description:
      "Choose a NorthSky Auto dealer membership and build a more organized vehicle acquisition pipeline.",
    url: `${SITE_URL}/buyers`,
    siteName: "NorthSky Auto",
    type: "website",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dealer Memberships | NorthSky Auto",
    description:
      "Discover vehicle acquisition opportunities and build your dealership sourcing pipeline with NorthSky Auto.",
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
    badge: "GET STARTED",
    features: [
      "Access available vehicle opportunities",
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
      "For growing dealerships that want more tools and a stronger acquisition workflow.",
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
];

const benefits = [
  {
    icon: "🚗",
    title: "Discover Vehicles",
    text:
      "Find vehicle acquisition opportunities submitted by sellers through the NorthSky Auto marketplace.",
  },
  {
    icon: "📊",
    title: "Manage Your Pipeline",
    text:
      "Organize potential acquisitions and manage your vehicle sourcing activity from one dealer environment.",
  },
  {
    icon: "⭐",
    title: "Save Opportunities",
    text:
      "Save promising vehicles for additional review, comparison, and follow-up.",
  },
];

const steps = [
  {
    number: "01",
    title: "Choose Your Plan",
    text:
      "Select the dealer membership that fits your dealership and sourcing needs.",
  },
  {
    number: "02",
    title: "Complete Checkout",
    text:
      "Subscribe securely through Stripe and complete the dealer onboarding process.",
  },
  {
    number: "03",
    title: "Access Your Account",
    text:
      "Access your NorthSky Auto dealer environment and available platform features.",
  },
  {
    number: "04",
    title: "Build Your Pipeline",
    text:
      "Review vehicle opportunities and identify potential inventory for your dealership.",
  },
];

function getSearchParam(searchParams, key, fallback) {
  const value = searchParams?.[key];

  if (Array.isArray(value)) {
    return value[0] || fallback;
  }

  return value || fallback;
}

export default async function BuyersPage({ searchParams }) {
  const params = await searchParams;

  const source = getSearchParam(params, "source", "direct");
  const campaign = getSearchParam(
    params,
    "campaign",
    "organic"
  );

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "NorthSky Auto Dealer Memberships",
    url: `${SITE_URL}/buyers`,
    description:
      "Dealer memberships for dealerships seeking vehicle acquisition opportunities through NorthSky Auto.",
    isPartOf: {
      "@type": "WebSite",
      name: "NorthSky Auto",
      url: SITE_URL,
    },
    about: {
      "@type": "AutomotiveBusiness",
      name: "NorthSky Auto",
      url: SITE_URL,
      areaServed: {
        "@type": "Country",
        name: "Canada",
      },
    },
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <DealerTracking
        source={source}
        campaign={campaign}
      />

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
              Build Your Acquisition Pipeline.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
            NorthSky Auto helps dealerships discover vehicle
            acquisition opportunities submitted by sellers across
            Canada.
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

      {/* BENEFITS */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-widest text-blue-600">
              Built For Vehicle Acquisition
            </p>

            <h2 className="mt-4 text-3xl font-black md:text-4xl">
              A Better Way to Organize Vehicle Sourcing
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

      {/* PRICING */}
      <section
        id="plans"
        className="scroll-mt-20 px-6 py-20 md:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="inline-flex rounded-full bg-blue-100 px-5 py-2 text-sm font-black text-blue-700">
              DEALER MEMBERSHIPS
            </span>

            <h2 className="mt-6 text-4xl font-black tracking-tight md:text-5xl">
              Choose Your Dealer Plan
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Simple monthly memberships designed for dealerships
              building a more organized vehicle acquisition pipeline.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-2">
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
                    <span className="text-xl" aria-hidden="true">
                      ⭐
                    </span>
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
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-3xl rounded-2xl bg-slate-100 p-5 text-center text-sm leading-6 text-slate-500">
            NorthSky Auto memberships provide access to the dealer
            platform and available vehicle acquisition opportunities.
            Opportunity availability varies by market, seller activity,
            vehicle type, and dealer eligibility.
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-slate-950 px-6 py-20 text-white md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-blue-500/20 px-5 py-2 text-sm font-black tracking-wide text-blue-300">
              HOW IT WORKS
            </span>

            <h2 className="mt-6 text-4xl font-black md:text-5xl">
              Start Building Your Acquisition Pipeline
            </h2>

            <p className="mt-5 leading-8 text-slate-400">
              Getting started with NorthSky Auto is designed to be simple.
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

      {/* FEATURES */}
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                icon: "🔎",
                title: "Discover Potential Inventory",
                text:
                  "Review vehicle opportunities submitted through the NorthSky Auto marketplace and identify vehicles that may fit your dealership.",
              },
              {
                icon: "📊",
                title: "Manage Your Pipeline",
                text:
                  "Organize potential acquisitions and use your dealer tools to manage opportunities as your sourcing activity grows.",
              },
              {
                icon: "⭐",
                title: "Save Promising Vehicles",
                text:
                  "Keep vehicles you're interested in available for additional review and follow-up.",
              },
              {
                icon: "⚡",
                title: "Make Better Acquisition Decisions",
                text:
                  "Review available vehicle and seller information before deciding which opportunities deserve your attention.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200"
              >
                <div className="text-4xl">{item.icon}</div>

                <h2 className="mt-5 text-2xl font-black">
                  {item.title}
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TELEGRAM */}
      <section className="border-y border-slate-200 bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200 md:p-12">
          <div className="text-5xl" aria-hidden="true">
            📲
          </div>

          <h2 className="mt-5 text-3xl font-black">
            Follow NorthSky Auto on Telegram
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
            Get vehicle opportunities, automotive updates, dealer
            opportunities, and featured inventory through our Telegram
            channel.
          </p>

          <a
            href={`https://t.me/NorthSkyAutoCanada?start=${encodeURIComponent(
              `${source}_${campaign}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex rounded-xl bg-sky-500 px-7 py-4 font-black text-white transition hover:bg-sky-400"
          >
            Join NorthSky Auto on Telegram →
          </a>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-10 text-center text-white shadow-xl md:p-14">
          <h2 className="text-4xl font-black md:text-5xl">
            Ready to Start Sourcing?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-100">
            Choose your NorthSky Auto dealer membership and start
            building a more organized vehicle acquisition pipeline.
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
          are processed securely through Stripe. Vehicle opportunities,
          seller availability, pricing, condition, and transaction
          outcomes are not guaranteed.
        </div>
      </section>
    </main>
  );
}
