import Link from "next/link";
export const metadata = {
  title: "NorthSky Auto | Sell Your Vehicle to Canadian Dealers",
  description:
    "NorthSky Auto helps Canadian vehicle sellers submit cars, trucks, SUVs, vans, and commercial vehicles for potential dealer acquisition opportunities.",
};
const sellerFeatures = [
  {
    icon: "🚗",
    title: "Any Vehicle",
    text: "Submit cars, trucks, SUVs, vans, and commercial vehicles.",
  },
  {
    icon: "⚡",
    title: "Simple Submission",
    text: "Enter your vehicle details, mileage, condition, location, and asking price.",
  },
  {
    icon: "🏢",
    title: "Dealer Marketplace",
    text: "Your submission can become an acquisition opportunity for participating dealerships.",
  },
];
const dealerBenefits = [
  "Discover seller-submitted vehicle opportunities",
  "Search by make, model, year, type, and mileage",
  "Review vehicle details in one place",
  "Protect seller contact information",
  "Manage acquisition opportunities",
  "Build a more organized sourcing pipeline",
];
const marketplaceSteps = [
  {
    number: "01",
    title: "Submit Your Vehicle",
    description:
      "Tell NorthSky Auto about the vehicle you want to sell and provide the basic vehicle details.",
  },
  {
    number: "02",
    title: "Vehicle Opportunity",
    description:
      "Your submission is organized into a vehicle opportunity that participating dealers can discover.",
  },
  {
    number: "03",
    title: "Dealer Review",
    description:
      "Participating dealerships can review available vehicle information and identify potential inventory matches.",
  },
  {
    number: "04",
    title: "Connect & Evaluate",
    description:
      "Interested parties can evaluate the vehicle, discuss terms, and complete their own transaction.",
  },
];
const dealerPlans = [
  {
    name: "Starter",
    price: "$299",
    description:
      "For independent dealers starting a structured vehicle sourcing pipeline.",
    href: "/pricing",
  },
  {
    name: "Professional",
    price: "$599",
    description:
      "For growing dealerships that need more acquisition and sourcing tools.",
    popular: true,
    href: "/pricing",
  },
  {
    name: "Enterprise",
    price: "$999",
    description:
      "For high-volume dealerships and businesses managing larger sourcing operations.",
    href: "/pricing",
  },
];
function Step({ number, title, text }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white shadow-lg shadow-blue-900/30">
        {number}
      </div>
      <div>
        <h3 className="font-black text-white">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-300">
          {text}
        </p>
      </div>
    </div>
  );
}
function ArrowLink({
  href,
  children,
  variant = "primary",
}) {
  const styles =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-500"
      : "border border-white/20 bg-white/5 text-white hover:bg-white hover:text-slate-950";
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-xl px-7 py-4 text-sm font-black shadow-lg transition duration-200 hover:-translate-y-0.5 ${styles}`}
    >
      {children}
    </Link>
  );
}
export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 text-white">
        <div
          aria-hidden="true"
          className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-24 lg:flex lg:items-center lg:gap-16 lg:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full bg-blue-500/20 px-4 py-2 text-xs font-black uppercase tracking-wide text-blue-300 ring-1 ring-blue-400/20">
              🇨🇦 Canadian Vehicle Acquisition Marketplace
            </span>
            <h1 className="mt-7 text-5xl font-black leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              Sell Your Vehicle
              <span className="block text-blue-400">
                to Potential Dealers.
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
              Submit your car, truck, SUV, van, or commercial vehicle
              to NorthSky Auto and create a potential acquisition
              opportunity for participating dealerships across Canada.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ArrowLink href="/sell">
                Sell My Vehicle →
              </ArrowLink>
              <ArrowLink href="/buyers" variant="secondary">
                I'm a Dealer →
              </ArrowLink>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-slate-300">
              <span>✓ Free submission</span>
              <span>✓ Canadian-focused</span>
              <span>✓ Dealer marketplace</span>
            </div>
          </div>
          {/* HERO CARD */}
          <div className="mt-14 w-full max-w-md lg:mt-0">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-7 shadow-2xl backdrop-blur-xl md:p-8">
              <p className="text-xs font-black uppercase tracking-widest text-blue-300">
                How It Works
              </p>
              <h2 className="mt-3 text-2xl font-black">
                From Seller to Dealer Opportunity
              </h2>
              <div className="mt-8 space-y-7">
                <Step
                  number="1"
                  title="Submit Your Vehicle"
                  text="Provide your vehicle details, mileage, condition, and asking price."
                />
                <Step
                  number="2"
                  title="Create an Opportunity"
                  text="Your submission can be organized for participating dealerships to discover."
                />
                <Step
                  number="3"
                  title="Dealer Review"
                  text="Dealers can search available opportunities and review vehicle information."
                />
                <Step
                  number="4"
                  title="Connect & Evaluate"
                  text="Interested parties can communicate, negotiate, and handle their own transaction."
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* SELLER SECTION */}
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-widest text-blue-600">
              For Vehicle Owners
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
              Put Your Vehicle in Front of Potential Buyers
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Submit your vehicle through NorthSky Auto and make it
              available as a potential acquisition opportunity for
              participating dealerships.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {sellerFeatures.map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="text-4xl">{feature.icon}</div>
                <h3 className="mt-5 text-xl font-black">
                  {feature.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/sell"
              className="inline-flex rounded-xl bg-blue-600 px-8 py-4 font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Submit My Vehicle →
            </Link>
          </div>
        </div>
      </section>
      {/* DEALER SECTION */}
      <section className="bg-slate-100 px-6 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-blue-600">
                For Dealerships
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
                Build a Better Vehicle Acquisition Pipeline
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Discover vehicle submissions from sellers who are
                looking to sell. Search opportunities, review vehicle
                information, and organize your sourcing workflow.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/buyers"
                  className="rounded-xl bg-slate-950 px-8 py-4 font-black text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  Enter Dealer Marketplace →
                </Link>
                <Link
                  href="/pricing"
                  className="rounded-xl border border-slate-300 bg-white px-8 py-4 font-black text-slate-900 transition hover:border-blue-600 hover:text-blue-600"
                >
                  View Pricing
                </Link>
              </div>
            </div>
            <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-200 md:p-10">
              <p className="text-xs font-black uppercase tracking-widest text-blue-600">
                Dealer Platform
              </p>
              <h3 className="mt-3 text-2xl font-black">
                Built for Vehicle Sourcing
              </h3>
              <div className="mt-7 space-y-5">
                {dealerBenefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-black text-blue-600">
                      ✓
                    </span>
                    <span className="leading-6 text-slate-700">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* MARKETPLACE FLOW */}
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-black uppercase tracking-widest text-blue-600">
              How NorthSky Auto Works
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
              A Simpler Vehicle Acquisition Process
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              NorthSky Auto organizes vehicle submissions into a
              marketplace experience designed to connect vehicle supply
              with dealer demand.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {marketplaceSteps.map((step) => (
              <div
                key={step.number}
                className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="text-sm font-black text-blue-600">
                  {step.number}
                </span>
                <h3 className="mt-4 text-xl font-black">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* DEALER PRICING */}
      <section className="bg-slate-950 px-6 py-20 text-white md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-black uppercase tracking-widest text-blue-400">
              Dealer Membership
            </p>
            <h2 className="mt-4 text-4xl font-black md:text-5xl">
              Choose Your Dealer Plan
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-400">
              Choose the membership level that fits your dealership's
              vehicle sourcing needs.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {dealerPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-3xl p-7 ${
                  plan.popular
                    ? "bg-blue-600 ring-2 ring-blue-400"
                    : "bg-white/10 ring-1 ring-white/10"
                }`}
              >
                {plan.popular && (
                  <span className="w-fit rounded-full bg-white/20 px-3 py-1 text-xs font-black">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="mt-4 text-2xl font-black">
                  {plan.name}
                </h3>
                <div className="mt-5">
                  <span className="text-4xl font-black">
                    {plan.price}
                  </span>
                  <span className="ml-2 text-slate-300">
                    /month
                  </span>
                </div>
                <p
                  className={`mt-4 flex-1 text-sm leading-7 ${
                    plan.popular
                      ? "text-blue-100"
                      : "text-slate-400"
                  }`}
                >
                  {plan.description}
                </p>
                <Link
                  href={plan.href}
                  className={`mt-7 rounded-xl px-5 py-3 text-center text-sm font-black transition ${
                    plan.popular
                      ? "bg-white text-blue-700 hover:bg-blue-50"
                      : "bg-white text-slate-950 hover:bg-blue-50"
                  }`}
                >
                  Choose {plan.name} →
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/pricing"
              className="text-sm font-black text-blue-400 transition hover:text-blue-300"
            >
              Compare all dealer plans →
            </Link>
          </div>
        </div>
      </section>
      {/* TRUST / POSITIONING */}
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 ring-1 ring-blue-100 md:p-12">
            <div className="grid gap-10 md:grid-cols-3 md:items-center">
              <div className="md:col-span-2">
                <p className="text-xs font-black uppercase tracking-widest text-blue-600">
                  Why NorthSky Auto?
                </p>
                <h2 className="mt-4 text-3xl font-black md:text-4xl">
                  Connecting Vehicle Supply With Dealer Demand
                </h2>
                <p className="mt-5 max-w-2xl leading-8 text-slate-600">
                  NorthSky Auto is designed to make it easier for
                  vehicle sellers to submit their vehicles and for
                  participating dealerships to discover potential
                  acquisition opportunities.
                </p>
                <Link
                  href="/about"
                  className="mt-7 inline-flex font-black text-blue-600 hover:text-blue-700"
                >
                  Learn more about NorthSky Auto →
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
                  <div className="text-3xl">🇨🇦</div>
                  <p className="mt-2 text-sm font-black">
                    Canadian Focus
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
                  <div className="text-3xl">🚗</div>
                  <p className="mt-2 text-sm font-black">
                    Vehicle Focus
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
                  <div className="text-3xl">🏢</div>
                  <p className="mt-2 text-sm font-black">
                    Dealer Focus
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
                  <div className="text-3xl">⚡</div>
                  <p className="mt-2 text-sm font-black">
                    Simple Process
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FINAL CTA */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 px-6 py-20 text-center text-white md:py-24">
        <div className="mx-auto max-w-4xl">
          <span className="text-xs font-black uppercase tracking-widest text-blue-100">
            Get Started Today
          </span>
          <h2 className="mt-4 text-4xl font-black md:text-5xl">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-100">
            Submit your vehicle or join NorthSky Auto as a dealership
            and start building a more organized vehicle acquisition
            pipeline.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              href="/sell"
              className="rounded-xl bg-white px-8 py-4 font-black text-blue-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"
            >
              Sell My Vehicle →
            </Link>
            <Link
              href="/buyers"
              className="rounded-xl border border-white/40 bg-white/10 px-8 py-4 font-black text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-blue-700"
            >
              I'm a Dealer →
            </Link>
          </div>
        </div>
      </section>
      {/* FOOTER */}
      <footer className="bg-slate-950 px-6 py-12 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <Link
                href="/"
                className="text-2xl font-black tracking-tight"
              >
                NorthSky Auto
              </Link>
              <p className="mt-3 max-w-md text-sm leading-7 text-slate-400">
                A Canadian-focused vehicle acquisition marketplace
                designed to connect vehicle sellers with participating
                dealerships.
              </p>
              <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-400">
                <span>🇨🇦 Canada</span>
                <span>•</span>
                <span>Vehicle Acquisition</span>
                <span>•</span>
                <span>Dealer Marketplace</span>
              </div>
            </div>
            <div>
              <h3 className="font-black">Sellers</h3>
              <div className="mt-4 space-y-3 text-sm text-slate-400">
                <Link
                  href="/sell"
                  className="block transition hover:text-white"
                >
                  Sell Your Vehicle
                </Link>
                <Link
                  href="/about"
                  className="block transition hover:text-white"
                >
                  About NorthSky Auto
                </Link>
                <Link
                  href="/contact"
                  className="block transition hover:text-white"
                >
                  Contact
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-black">Dealerships</h3>
              <div className="mt-4 space-y-3 text-sm text-slate-400">
                <Link
                  href="/buyers"
                  className="block transition hover:text-white"
                >
                  Dealer Marketplace
                </Link>
                <Link
                  href="/pricing"
                  className="block transition hover:text-white"
                >
                  Dealer Pricing
                </Link>
                <Link
                  href="/dealer"
                  className="block transition hover:text-white"
                >
                  Dealer Portal
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-center text-sm text-slate-500 md:flex-row md:items-center md:justify-between md:text-left">
            <p>
              © 2026 NorthSky Auto. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-5 md:justify-end">
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
        </div>
      </footer>
    </main>
  );
}