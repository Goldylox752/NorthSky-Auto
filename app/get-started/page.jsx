import Link from "next/link";
export const metadata = {
  title: "NorthSky Auto | Canadian Vehicle Acquisition Marketplace",
  description:
    "NorthSky Auto connects Canadian vehicle sellers with dealerships looking for inventory and vehicle acquisition opportunities. Sell a vehicle or join as a dealer.",
  keywords: [
    "NorthSky Auto",
    "Canadian vehicle marketplace",
    "sell vehicle to dealer Canada",
    "dealer vehicle acquisition",
    "vehicle leads Canada",
    "dealer inventory sourcing",
    "sell car Canada",
    "used vehicle dealers Canada",
  ],
  alternates: {
    canonical: "https://northsky-auto.vercel.app/",
  },
  openGraph: {
    title: "NorthSky Auto | Canadian Vehicle Acquisition Marketplace",
    description:
      "Connect vehicle sellers with Canadian dealerships looking for inventory and acquisition opportunities.",
    url: "https://northsky-auto.vercel.app/",
    siteName: "NorthSky Auto",
    locale: "en_CA",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};
export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.25),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-300">
              🇨🇦 Canadian Vehicle Acquisition Marketplace
            </div>
            <h1 className="mt-7 text-5xl font-black tracking-tight sm:text-6xl md:text-7xl">
              Connect Vehicles
              <span className="block text-blue-500">
                With Canadian Dealers.
              </span>
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
              NorthSky Auto connects vehicle sellers with participating
              dealerships looking for potential inventory acquisition
              opportunities through one centralized platform.
            </p>
            <div className="mt-10">
              <Link
                href="/get-started"
                className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-8 py-4 font-black text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500 sm:w-auto"
              >
                Get Started →
              </Link>
              <p className="mt-4 text-sm text-slate-400">
                Selling a vehicle or looking for dealership inventory?
              </p>
            </div>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/sell"
                className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-center font-bold transition hover:bg-white hover:text-slate-950"
              >
                Sell My Vehicle
              </Link>
              <Link
                href="/dealer/register"
                className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-center font-bold transition hover:bg-white hover:text-slate-950"
              >
                Become a Dealer
              </Link>
              <Link
                href="/dealer/login"
                className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-center font-bold transition hover:bg-white hover:text-slate-950"
              >
                Dealer Login
              </Link>
            </div>
            <div className="mt-9 flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm text-slate-400">
              <span>✓ Free vehicle submission</span>
              <span>✓ Canada-focused</span>
              <span>✓ Dealer sourcing platform</span>
              <span>✓ Secure online accounts</span>
            </div>
          </div>
        </div>
      </section>
      {/* GET STARTED */}
      <section className="border-b border-slate-200 bg-slate-50 px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-widest text-blue-600">
              Get Started
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              Choose Your Path
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Whether you're selling a vehicle or sourcing inventory,
              NorthSky Auto gives you a simple place to get started.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
                🚗
              </div>
              <p className="mt-7 text-sm font-black uppercase tracking-widest text-blue-600">
                Vehicle Sellers
              </p>
              <h3 className="mt-2 text-3xl font-black">
                Have a vehicle to sell?
              </h3>
              <p className="mt-5 leading-7 text-slate-600">
                Submit your vehicle information and create a potential
                acquisition opportunity for participating dealerships.
              </p>
              <ul className="mt-7 space-y-3 text-sm text-slate-700">
                <li>✓ Free online vehicle submission</li>
                <li>✓ Cars, trucks, SUVs and vans</li>
                <li>✓ Commercial vehicle submissions</li>
                <li>✓ Canadian location information</li>
                <li>✓ Vehicle condition and history details</li>
              </ul>
              <Link
                href="/sell"
                className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-6 py-4 font-black text-white transition hover:bg-blue-700"
              >
                Sell My Vehicle →
              </Link>
            </div>
            <div className="rounded-3xl bg-slate-950 p-8 text-white shadow-xl md:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-3xl">
                🏢
              </div>
              <p className="mt-7 text-sm font-black uppercase tracking-widest text-blue-400">
                Canadian Dealerships
              </p>
              <h3 className="mt-2 text-3xl font-black">
                Looking for inventory?
              </h3>
              <p className="mt-5 leading-7 text-slate-300">
                Create a dealer account and discover potential vehicle
                acquisition opportunities through the NorthSky Auto dealer
                portal.
              </p>
              <ul className="mt-7 space-y-3 text-sm text-slate-300">
                <li>✓ Dealer account management</li>
                <li>✓ Browse vehicle opportunities</li>
                <li>✓ Review vehicle information</li>
                <li>✓ Save potential inventory</li>
                <li>✓ Subscription-based dealer access</li>
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/dealer/register"
                  className="flex-1 rounded-xl bg-blue-600 px-6 py-4 text-center font-black transition hover:bg-blue-500"
                >
                  Become a Dealer →
                </Link>
                <Link
                  href="/dealer/login"
                  className="flex-1 rounded-xl border border-white/20 px-6 py-4 text-center font-black transition hover:bg-white hover:text-slate-950"
                >
                  Dealer Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* VALUE */}
      <section className="border-b border-slate-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            <ValueCard
              icon="🚗"
              title="For Vehicle Sellers"
              text="Submit your vehicle details and create a potential acquisition opportunity for participating dealerships."
            />
            <ValueCard
              icon="🏢"
              title="For Dealerships"
              text="Discover vehicle opportunities and build a more organized inventory sourcing pipeline."
            />
            <ValueCard
              icon="🇨🇦"
              title="Built for Canada"
              text="NorthSky Auto is designed around Canadian sellers, dealerships, vehicle listings, and acquisition opportunities."
            />
          </div>
        </div>
      </section>
      {/* HOW IT WORKS */}
      <section className="bg-slate-100 px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-widest text-blue-600">
              Simple Process
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              How NorthSky Auto Works
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              A straightforward marketplace connecting vehicle supply with
              dealership inventory demand.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-4">
            <ProcessCard
              number="01"
              title="Get Started"
              text="Choose whether you're selling a vehicle or joining NorthSky Auto as a dealership."
            />
            <ProcessCard
              number="02"
              title="Submit or Discover"
              text="Sellers submit vehicle information while dealers discover potential inventory opportunities."
            />
            <ProcessCard
              number="03"
              title="Review"
              text="Participating dealers review available vehicle information and identify opportunities that fit their needs."
            />
            <ProcessCard
              number="04"
              title="Take Action"
              text="Dealers can save promising opportunities and continue their vehicle acquisition process."
            />
          </div>
        </div>
      </section>
      {/* DEALER CTA */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 to-indigo-800 p-8 text-white md:p-12">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-widest text-blue-200">
                  Dealer Portal
                </p>
                <h2 className="mt-3 text-3xl font-black md:text-4xl">
                  Build a better vehicle sourcing pipeline.
                </h2>
                <p className="mt-5 leading-7 text-blue-100">
                  Join NorthSky Auto and organize potential vehicle
                  acquisition opportunities in one dealer-focused platform.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link
                  href="/dealer/register"
                  className="rounded-xl bg-white px-6 py-4 text-center font-black text-blue-700 transition hover:bg-blue-50"
                >
                  Create Dealer Account →
                </Link>
                <Link
                  href="/pricing"
                  className="rounded-xl border border-white/30 px-6 py-4 text-center font-black transition hover:bg-white/10"
                >
                  View Dealer Plans
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FINAL CTA */}
      <section className="bg-slate-950 px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-black uppercase tracking-widest text-blue-400">
            NorthSky Auto
          </p>
          <h2 className="mt-3 text-4xl font-black md:text-5xl">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Choose your path and start using the NorthSky Auto vehicle
            acquisition marketplace.
          </p>
          <Link
            href="/get-started"
            className="mt-8 inline-flex rounded-xl bg-blue-600 px-8 py-4 font-black text-white transition hover:bg-blue-500"
          >
            Get Started →
          </Link>
          <p className="mt-5 text-xs text-slate-500">
            Vehicle submission is free. A submission does not guarantee an
            offer, buyer, or completed sale.
          </p>
        </div>
      </section>
      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <Link href="/" className="text-xl font-black">
                NorthSky Auto
              </Link>
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
                Canadian vehicle acquisition marketplace connecting
                vehicle sellers with participating dealerships.
              </p>
            </div>
            <nav
              aria-label="Footer navigation"
              className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400"
            >
              <Link href="/get-started" className="hover:text-white">
                Get Started
              </Link>
              <Link href="/sell" className="hover:text-white">
                Sell
              </Link>
              <Link href="/dealer/register" className="hover:text-white">
                Dealers
              </Link>
              <Link href="/pricing" className="hover:text-white">
                Pricing
              </Link>
              <Link href="/about" className="hover:text-white">
                About
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
          <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-slate-500">
            © 2026 NorthSky Auto. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
function ValueCard({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="text-3xl">{icon}</div>
      <h3 className="mt-4 text-xl font-black">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        {text}
      </p>
    </div>
  );
}
function ProcessCard({ number, title, text }) {
  return (
    <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
      <span className="text-sm font-black text-blue-600">
        {number}
      </span>
      <h3 className="mt-3 text-xl font-black">
        {title}
      </h3>
      <p className="mt-3 leading-7 text-slate-600">
        {text}
      </p>
    </div>
  );
}