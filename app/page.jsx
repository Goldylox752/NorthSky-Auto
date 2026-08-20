import Link from "next/link";

export const metadata = {
  title: "NorthSky Auto | Sell Your Vehicle & Find Dealer Opportunities",
  description:
    "NorthSky Auto connects vehicle sellers with automotive dealers across Canada. Submit your vehicle and create a dealer acquisition opportunity.",
  keywords: [
    "NorthSky Auto",
    "sell vehicle Canada",
    "sell car to dealer Canada",
    "vehicle marketplace Canada",
    "dealer vehicle leads",
    "automotive dealer leads",
    "vehicle acquisition Canada",
  ],
  alternates: {
    canonical: "https://north-sky-auto-gold.vercel.app",
  },
  openGraph: {
    title: "NorthSky Auto | Vehicle Marketplace & Dealer Leads",
    description:
      "Submit your vehicle and connect with automotive dealers across Canada.",
    url: "https://north-sky-auto-gold.vercel.app",
    siteName: "NorthSky Auto",
    type: "website",
    locale: "en_CA",
  },
};

const sellerSteps = [
  {
    number: "01",
    title: "Submit Your Vehicle",
    text: "Enter your vehicle details, location, condition and other information through our online submission.",
  },
  {
    number: "02",
    title: "Create a Vehicle Opportunity",
    text: "Your submission is organized into a structured opportunity within the NorthSky Auto marketplace.",
  },
  {
    number: "03",
    title: "Reach Participating Dealers",
    text: "Dealers using NorthSky Auto can discover vehicle opportunities that match their acquisition needs.",
  },
];

const dealerFeatures = [
  {
    number: "01",
    title: "Vehicle Opportunities",
    text: "Discover vehicle submissions from sellers across Canada.",
  },
  {
    number: "02",
    title: "Lead Management",
    text: "Organize and manage vehicle acquisition opportunities from your dealer dashboard.",
  },
  {
    number: "03",
    title: "Saved Opportunities",
    text: "Save promising vehicles and keep opportunities organized for follow-up.",
  },
  {
    number: "04",
    title: "Dealer Analytics",
    text: "Monitor dealership activity and understand your acquisition pipeline.",
  },
];

const pricing = [
  {
    name: "Dealer Starter",
    price: "$599",
    description:
      "For dealerships ready to start building a vehicle acquisition pipeline.",
    features: [
      "Dealer account",
      "Vehicle opportunity access",
      "Lead management",
      "Dealer dashboard",
      "Saved opportunities",
      "Email support",
    ],
  },
  {
    name: "Dealer Pro",
    price: "$799",
    description:
      "For active dealerships that want enhanced tools for managing acquisition opportunities.",
    features: [
      "Everything in Dealer Starter",
      "Priority vehicle opportunities",
      "Advanced lead management",
      "Dealer analytics",
      "Priority support",
      "Enhanced dealer tools",
    ],
  },
];

const faqs = [
  {
    question: "What is NorthSky Auto?",
    answer:
      "NorthSky Auto is a Canadian automotive marketplace that connects vehicle sellers with participating automotive dealers.",
  },
  {
    question: "How do I submit my vehicle?",
    answer:
      "Click Submit Your Vehicle and complete the online submission with your vehicle information, location and other requested details.",
  },
  {
    question: "Does NorthSky Auto buy vehicles directly?",
    answer:
      "No. NorthSky Auto operates the marketplace and facilitates connections between sellers and participating dealers. Any offer or purchase decision is made by the participating dealer.",
  },
  {
    question: "Can dealerships join NorthSky Auto?",
    answer:
      "Yes. Dealerships can join NorthSky Auto and access the dealer platform and available vehicle opportunities through a paid dealer subscription.",
  },
  {
    question: "How much does the dealer platform cost?",
    answer:
      "NorthSky Auto currently offers two dealer plans: Dealer Starter at $599/month and Dealer Pro at $799/month.",
  },
  {
    question: "Is there a fee to submit a vehicle?",
    answer:
      "Vehicle sellers can submit their vehicle through NorthSky Auto without a submission fee.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-slate-950 text-white">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(37,99,235,0.30),transparent_40%),radial-gradient(circle_at_15%_85%,rgba(14,165,233,0.12),transparent_35%)]" />

        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:60px_60px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-32">

          <div className="grid items-center gap-16 lg:grid-cols-[1.08fr_.92fr]">

            <div className="max-w-3xl">

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-slate-300 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Canadian vehicle marketplace
              </div>

              <h1 className="mt-7 text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
                Sell your vehicle.
                <br />
                <span className="text-blue-400">
                  Reach active dealers.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                NorthSky Auto connects vehicle sellers with automotive
                dealers across Canada through a dedicated vehicle marketplace
                and dealer lead platform.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">

                <Link
                  href="/sell"
                  className="rounded-xl bg-blue-600 px-7 py-4 text-center font-black text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500"
                >
                  Submit Your Vehicle →
                </Link>

                <Link
                  href="/dealer"
                  className="rounded-xl border border-white/15 bg-white/[0.06] px-7 py-4 text-center font-black text-white transition hover:bg-white/[0.1]"
                >
                  I'm a Dealer →
                </Link>

              </div>

              <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-400">
                <span>✓ Canadian marketplace</span>
                <span>✓ Free vehicle submission</span>
                <span>✓ Dealer acquisition opportunities</span>
              </div>

            </div>

            {/* HERO PLATFORM CARD */}

            <div className="hidden lg:block">

              <div className="relative">

                <div className="absolute -inset-8 rounded-[3rem] bg-blue-500/10 blur-3xl" />

                <div className="relative rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-xl">

                  <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">

                    <div className="flex items-center justify-between">

                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                          NorthSky Auto
                        </p>

                        <p className="mt-1 font-bold">
                          Vehicle Opportunity
                        </p>
                      </div>

                      <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-400">
                        OPEN
                      </span>

                    </div>

                    <div className="mt-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 p-6">

                      <div className="flex h-36 items-center justify-center rounded-xl border border-white/5 bg-white/[0.03] text-7xl">
                        🚙
                      </div>

                      <div className="mt-5">

                        <p className="text-xl font-black">
                          2022 Toyota RAV4
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                          Seller vehicle submission
                        </p>

                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-3">

                        <div className="rounded-xl bg-white/[0.05] p-3">
                          <p className="text-xs text-slate-500">
                            Location
                          </p>

                          <p className="mt-1 text-sm font-bold">
                            Alberta, Canada
                          </p>
                        </div>

                        <div className="rounded-xl bg-white/[0.05] p-3">
                          <p className="text-xs text-slate-500">
                            Status
                          </p>

                          <p className="mt-1 text-sm font-bold text-emerald-400">
                            Available
                          </p>
                        </div>

                      </div>

                    </div>

                    <div className="mt-5 flex items-center justify-between">

                      <div>
                        <p className="text-xs text-slate-500">
                          Dealer Marketplace
                        </p>

                        <p className="mt-1 font-bold">
                          Acquisition Opportunity
                        </p>
                      </div>

                      <span className="text-2xl text-blue-400">
                        →
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          VALUE PROPOSITION
      ===================================================== */}

      <section className="border-b border-slate-200 bg-white py-16">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">

            <div>

              <p className="text-sm font-black uppercase tracking-widest text-blue-600">
                One marketplace
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Built around vehicle acquisition.
              </h2>

            </div>

            <p className="text-lg leading-8 text-slate-600">
              NorthSky Auto gives vehicle sellers a simple way to submit their
              vehicles while giving participating dealerships a dedicated
              platform to discover and manage potential acquisition
              opportunities.
            </p>

          </div>

        </div>
      </section>

      {/* =====================================================
          SELLER FLOW
      ===================================================== */}

      <section className="bg-slate-50 py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="max-w-2xl">

            <p className="text-sm font-black uppercase tracking-widest text-blue-600">
              For vehicle sellers
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Submit once. Create an opportunity.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Skip the process of contacting dealerships one at a time.
              Submit your vehicle through NorthSky and create a structured
              vehicle opportunity.
            </p>

          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">

            {sellerSteps.map((step) => (
              <div
                key={step.number}
                className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                <span className="text-sm font-black text-blue-600">
                  {step.number}
                </span>

                <h3 className="mt-7 text-xl font-black">
                  {step.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {step.text}
                </p>

                <div className="mt-8 h-1 w-10 rounded-full bg-blue-600 transition-all duration-300 group-hover:w-20" />

              </div>
            ))}

          </div>

          <div className="mt-10">

            <Link
              href="/sell"
              className="inline-flex rounded-xl bg-blue-600 px-7 py-4 font-black text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500"
            >
              Submit Your Vehicle →
            </Link>

          </div>

        </div>

      </section>

      {/* =====================================================
          SELLER CTA
      ===================================================== */}

      <section className="py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="relative overflow-hidden rounded-[2rem] bg-blue-600 px-8 py-14 text-white sm:px-14 lg:px-16 lg:py-16">

            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

            <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">

              <div className="max-w-2xl">

                <p className="text-sm font-black uppercase tracking-widest text-blue-100">
                  Free vehicle submission
                </p>

                <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                  Ready to sell your vehicle?
                </h2>

                <p className="mt-5 text-lg leading-8 text-blue-100">
                  Submit your vehicle details and create an opportunity that
                  participating dealers can discover.
                </p>

              </div>

              <Link
                href="/sell"
                className="rounded-xl bg-white px-7 py-4 text-center font-black text-blue-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"
              >
                Start My Submission →
              </Link>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          DEALER PLATFORM
      ===================================================== */}

      <section className="bg-slate-950 py-24 text-white">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

            <div>

              <p className="text-sm font-black uppercase tracking-widest text-blue-400">
                For automotive dealers
              </p>

              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Build your vehicle acquisition pipeline.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-400">
                NorthSky Auto gives dealerships a dedicated platform for
                discovering, saving and managing vehicle acquisition
                opportunities.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                <Link
                  href="/dealer"
                  className="rounded-xl bg-blue-600 px-6 py-3.5 text-center font-black text-white transition hover:bg-blue-500"
                >
                  Dealer Platform →
                </Link>

                <Link
                  href="/pricing"
                  className="rounded-xl border border-white/15 px-6 py-3.5 text-center font-black text-white transition hover:bg-white/5"
                >
                  View Dealer Pricing
                </Link>

              </div>

            </div>

            <div className="grid gap-4 sm:grid-cols-2">

              {dealerFeatures.map((feature) => (
                <div
                  key={feature.number}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:bg-white/[0.07]"
                >

                  <span className="text-sm font-black text-blue-400">
                    {feature.number}
                  </span>

                  <h3 className="mt-5 text-lg font-black">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {feature.text}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          DEALER PRICING PREVIEW
      ===================================================== */}

      <section className="bg-slate-50 py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-sm font-black uppercase tracking-widest text-blue-600">
              Dealer plans
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Choose your dealer platform.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Start building your vehicle acquisition pipeline with NorthSky
              Auto.
            </p>

          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">

            {pricing.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative rounded-3xl bg-white p-8 shadow-sm ring-1 ${
                  index === 1
                    ? "ring-2 ring-blue-600 md:-translate-y-2"
                    : "ring-slate-200"
                }`}
              >

                {index === 1 && (
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600 px-4 py-2 text-xs font-black uppercase tracking-wider text-white">
                    Most Popular
                  </div>
                )}

                <p className="text-sm font-black uppercase tracking-widest text-blue-600">
                  {plan.name}
                </p>

                <div className="mt-5 flex items-end gap-2">

                  <span className="text-5xl font-black">
                    {plan.price}
                  </span>

                  <span className="pb-1 text-sm font-semibold text-slate-500">
                    /month
                  </span>

                </div>

                <p className="mt-5 leading-7 text-slate-600">
                  {plan.description}
                </p>

                <div className="mt-7 space-y-3">

                  {plan.features.slice(0, 4).map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 text-sm font-semibold"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-xs font-black text-green-700">
                        ✓
                      </span>

                      {feature}
                    </div>
                  ))}

                </div>

                <Link
                  href="/pricing"
                  className={`mt-8 flex w-full items-center justify-center rounded-xl px-6 py-4 font-black transition ${
                    index === 1
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "border border-slate-300 text-slate-900 hover:border-blue-600 hover:text-blue-600"
                  }`}
                >
                  View Plan →
                </Link>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* =====================================================
          PLATFORM FLOW
      ===================================================== */}

      <section className="py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-sm font-black uppercase tracking-widest text-blue-600">
              How NorthSky works
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              From vehicle submission to dealer lead.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              NorthSky Auto is built around a simple marketplace flow that
              connects vehicle sellers with dealerships.
            </p>

          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-4">

            {[
              {
                number: "01",
                title: "Seller",
                text: "A vehicle owner submits a vehicle.",
              },
              {
                number: "02",
                title: "Marketplace",
                text: "NorthSky organizes the vehicle opportunity.",
              },
              {
                number: "03",
                title: "Dealer",
                text: "Participating dealers discover relevant opportunities.",
              },
              {
                number: "04",
                title: "Lead",
                text: "Dealers manage potential acquisition opportunities.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
              >

                <span className="text-sm font-black text-blue-600">
                  {item.number}
                </span>

                <h3 className="mt-5 text-xl font-black">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {item.text}
                </p>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* =====================================================
          FAQ
      ===================================================== */}

      <section className="border-t border-slate-200 bg-slate-50 py-24">

        <div className="mx-auto max-w-4xl px-6 lg:px-8">

          <div className="text-center">

            <p className="text-sm font-black uppercase tracking-widest text-blue-600">
              FAQ
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Questions, answered.
            </h2>

          </div>

          <div className="mt-12 space-y-4">

            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >

                <summary className="cursor-pointer list-none font-bold">

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

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="bg-white py-24">

        <div className="mx-auto max-w-4xl px-6 text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white shadow-lg shadow-blue-600/20">
            🚗
          </div>

          <h2 className="mt-7 text-3xl font-black tracking-tight sm:text-5xl">
            Your next vehicle opportunity starts here.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Whether you're selling a vehicle or building your dealership's
            acquisition pipeline, NorthSky Auto brings both sides together.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              href="/sell"
              className="rounded-xl bg-blue-600 px-7 py-4 font-black text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500"
            >
              Submit Your Vehicle
            </Link>

            <Link
              href="/pricing"
              className="rounded-xl bg-slate-950 px-7 py-4 font-black text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              View Dealer Plans
            </Link>

          </div>

        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-white/10 bg-slate-950 py-10 text-white">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="text-lg font-black">
                NorthSky Auto
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Connecting vehicle sellers with automotive dealers across
                Canada.
              </p>

            </div>

            <nav className="flex flex-wrap gap-6 text-sm text-slate-400">

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
                href="/dealer"
                className="transition hover:text-white"
              >
                Dealers
              </Link>

              <Link
                href="/pricing"
                className="transition hover:text-white"
              >
                Pricing
              </Link>

              <Link
                href="/contact"
                className="transition hover:text-white"
              >
                Contact
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

            </nav>

          </div>

          <div className="mt-8 border-t border-white/10 pt-6 text-xs text-slate-500">
            © {new Date().getFullYear()} NorthSky Auto. All rights reserved.
          </div>

        </div>

      </footer>

    </main>
  );
}