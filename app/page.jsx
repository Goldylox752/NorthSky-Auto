```jsx
import Link from "next/link";

export const metadata = {
  title: "NorthSky Auto | Sell Your Vehicle & Connect With Dealers",
  description:
    "NorthSky Auto connects vehicle sellers with automotive dealers across Canada. Submit your vehicle and create a dealer acquisition opportunity.",
  keywords: [
    "NorthSky Auto",
    "sell car Canada",
    "sell vehicle Canada",
    "car dealers Canada",
    "vehicle marketplace Canada",
    "dealer vehicle leads",
  ],
  alternates: {
    canonical: "https://north-sky-auto-gold.vercel.app",
  },
  openGraph: {
    title: "NorthSky Auto | Vehicle Marketplace",
    description:
      "Submit your vehicle and connect with participating automotive dealers across Canada.",
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
    text: "Tell us about your vehicle, including its make, model, condition and location.",
  },
  {
    number: "02",
    title: "Create Your Opportunity",
    text: "Your vehicle information is organized into a structured marketplace opportunity.",
  },
  {
    number: "03",
    title: "Connect With Dealers",
    text: "Participating dealers can discover vehicle opportunities through NorthSky Auto.",
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
    text: "Keep acquisition opportunities organized in one place.",
  },
  {
    number: "03",
    title: "Saved Vehicles",
    text: "Save promising opportunities for future follow-up.",
  },
  {
    number: "04",
    title: "Dealer Dashboard",
    text: "Manage your vehicle acquisition activity from a dedicated platform.",
  },
];

const pricing = [
  {
    name: "Dealer Starter",
    price: "$599",
    description:
      "For dealerships beginning to build a vehicle acquisition pipeline.",
    features: [
      "Dealer account",
      "Vehicle opportunity access",
      "Lead management",
      "Dealer dashboard",
    ],
  },
  {
    name: "Dealer Pro",
    price: "$799",
    description:
      "For dealerships looking for expanded acquisition and lead-management tools.",
    features: [
      "Everything in Starter",
      "Priority opportunities",
      "Advanced lead management",
      "Dealer analytics",
    ],
  },
];

const faqs = [
  {
    question: "What is NorthSky Auto?",
    answer:
      "NorthSky Auto is a Canadian vehicle marketplace that connects vehicle sellers with participating automotive dealers.",
  },
  {
    question: "How do I submit my vehicle?",
    answer:
      "Visit the Sell Your Vehicle page and complete the online submission with your vehicle information.",
  },
  {
    question: "Does NorthSky Auto buy vehicles directly?",
    answer:
      "No. NorthSky Auto provides the marketplace platform. Participating dealers make their own purchasing and offer decisions.",
  },
  {
    question: "Can dealerships join NorthSky Auto?",
    answer:
      "Yes. Automotive dealerships can join the platform and access available vehicle opportunities through a dealer subscription.",
  },
  {
    question: "Is vehicle submission free?",
    answer:
      "Vehicle sellers can submit their vehicles without a submission fee.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      {/* HERO */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300">
                Canadian Vehicle Marketplace
              </div>

              <h1 className="mt-7 text-5xl font-black leading-tight tracking-tight sm:text-6xl">
                Sell your vehicle.
                <span className="block text-blue-400">
                  Reach automotive dealers.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
                NorthSky Auto makes it easier for vehicle sellers to submit
                their vehicles and for participating dealers to discover
                acquisition opportunities across Canada.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/sell"
                  className="rounded-xl bg-blue-600 px-7 py-4 text-center font-bold text-white hover:bg-blue-500"
                >
                  Submit Your Vehicle
                </Link>

                <Link
                  href="/dealer"
                  className="rounded-xl border border-white/15 bg-white/5 px-7 py-4 text-center font-bold text-white hover:bg-white/10"
                >
                  I'm a Dealer
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-5 text-sm text-slate-400">
                <span>✓ Canadian marketplace</span>
                <span>✓ Free submission</span>
                <span>✓ Dealer opportunities</span>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="rounded-2xl bg-slate-900 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                      NorthSky Auto
                    </p>
                    <p className="mt-1 text-lg font-bold">
                      Vehicle Opportunity
                    </p>
                  </div>

                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-400">
                    OPEN
                  </span>
                </div>

                <div className="mt-6 rounded-2xl border border-white/5 bg-slate-800 p-6">
                  <div className="flex h-32 items-center justify-center rounded-xl bg-slate-900 text-6xl">
                    🚙
                  </div>

                  <h2 className="mt-5 text-xl font-black">
                    2022 Toyota RAV4
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    Seller vehicle submission
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-white/5 p-4">
                      <p className="text-xs text-slate-500">Location</p>
                      <p className="mt-1 text-sm font-bold">
                        Alberta, Canada
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/5 p-4">
                      <p className="text-xs text-slate-500">Status</p>
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

                  <span className="text-2xl text-blue-400">→</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE */}
      <section className="border-b border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-blue-600">
                One platform
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Built around vehicle acquisition.
              </h2>
            </div>

            <p className="text-lg leading-8 text-slate-600">
              Sellers get a simple way to submit their vehicles while
              participating dealerships get a dedicated platform for
              discovering and managing potential acquisition opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* SELLER SECTION */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase tracking-widest text-blue-600">
              For Vehicle Sellers
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Turn your vehicle into an opportunity.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Submit your vehicle information through NorthSky Auto and create
              a structured opportunity that participating dealers can discover.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {sellerSteps.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
              >
                <span className="text-sm font-black text-blue-600">
                  {step.number}
                </span>

                <h3 className="mt-6 text-xl font-black">{step.title}</h3>

                <p className="mt-3 leading-7 text-slate-600">{step.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/sell"
              className="inline-flex rounded-xl bg-blue-600 px-7 py-4 font-bold text-white hover:bg-blue-500"
            >
              Submit Your Vehicle →
            </Link>
          </div>
        </div>
      </section>

      {/* DEALER PLATFORM */}
      <section className="bg-slate-950 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-blue-400">
                For Automotive Dealers
              </p>

              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Build your vehicle acquisition pipeline.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-400">
                NorthSky Auto gives dealerships a centralized platform for
                discovering, saving and managing vehicle acquisition
                opportunities.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/dealer"
                  className="rounded-xl bg-blue-600 px-6 py-4 text-center font-bold hover:bg-blue-500"
                >
                  Dealer Platform
                </Link>

                <Link
                  href="/pricing"
                  className="rounded-xl border border-white/15 px-6 py-4 text-center font-bold hover:bg-white/5"
                >
                  View Pricing
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {dealerFeatures.map((feature) => (
                <div
                  key={feature.number}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
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

      {/* PRICING */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-widest text-blue-600">
              Dealer Plans
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Choose your dealer platform.
            </h2>

            <p className="mt-5 text-lg text-slate-600">
              Select the plan that fits your dealership's acquisition goals.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {pricing.map((plan, index) => (
              <div
                key={plan.name}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
              >
                {index === 1 && (
                  <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
                    MOST POPULAR
                  </span>
                )}

                <p className="mt-4 text-sm font-black uppercase tracking-widest text-blue-600">
                  {plan.name}
                </p>

                <div className="mt-5">
                  <span className="text-5xl font-black">{plan.price}</span>
                  <span className="ml-2 text-slate-500">/month</span>
                </div>

                <p className="mt-5 leading-7 text-slate-600">
                  {plan.description}
                </p>

                <div className="mt-7 space-y-3">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 text-sm font-semibold"
                    >
                      <span className="text-green-600">✓</span>
                      {feature}
                    </div>
                  ))}
                </div>

                <Link
                  href="/pricing"
                  className="mt-8 block rounded-xl bg-slate-950 px-6 py-4 text-center font-bold text-white hover:bg-slate-800"
                >
                  View Plan
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-widest text-blue-600">
              How It Works
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              From seller submission to dealer opportunity.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-4">
            {[
              ["01", "Seller", "A vehicle owner submits a vehicle."],
              ["02", "Marketplace", "NorthSky organizes the opportunity."],
              ["03", "Dealer", "Participating dealers discover vehicles."],
              ["04", "Lead", "Dealers manage acquisition opportunities."],
            ].map(([number, title, text]) => (
              <div
                key={number}
                className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <span className="text-sm font-black text-blue-600">
                  {number}
                </span>

                <h3 className="mt-5 text-xl font-black">{title}</h3>

                <p className="mt-3 leading-7 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
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
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <summary className="cursor-pointer font-bold">
                  {faq.question}
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
      <section className="bg-blue-600 py-24 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-black sm:text-5xl">
            Your next vehicle opportunity starts here.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-100">
            Submit a vehicle or start building your dealership acquisition
            pipeline with NorthSky Auto.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/sell"
              className="rounded-xl bg-white px-7 py-4 font-bold text-blue-700 hover:bg-blue-50"
            >
              Submit Your Vehicle
            </Link>

            <Link
              href="/dealer"
              className="rounded-xl bg-slate-950 px-7 py-4 font-bold text-white hover:bg-slate-900"
            >
              Join as a Dealer
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 py-10 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-lg font-black">NorthSky Auto</p>

              <p className="mt-1 text-sm text-slate-500">
                Connecting vehicle sellers with automotive dealers across
                Canada.
              </p>
            </div>

            <nav className="flex flex-wrap gap-5 text-sm text-slate-400">
              <Link href="/inventory" className="hover:text-white">
                Inventory
              </Link>

              <Link href="/sell" className="hover:text-white">
                Sell
              </Link>

              <Link href="/dealer" className="hover:text-white">
                Dealers
              </Link>

              <Link href="/pricing" className="hover:text-white">
                Pricing
              </Link>

              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>

              <Link href="/privacy" className="hover:text-white">
                Privacy
              </Link>

              <Link href="/terms" className="hover:text-white">
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
```
