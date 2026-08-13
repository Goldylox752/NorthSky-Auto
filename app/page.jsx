import Link from "next/link";

export const metadata = {
  title: "NorthSky Auto | Canadian Vehicle Acquisition Marketplace",
  description:
    "NorthSky Auto connects Canadian vehicle sellers with dealerships looking for inventory and vehicle acquisition opportunities. Submit a vehicle or register as a dealer.",
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

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.25),transparent_40%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">

            <div className="inline-flex items-center rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-300">
              🇨🇦 Canadian Vehicle Acquisition Marketplace
            </div>

            <h1 className="mt-7 text-5xl font-black tracking-tight sm:text-6xl md:text-7xl">
              Connect Vehicles
              <span className="block text-blue-500">
                With Canadian Dealers.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
              NorthSky Auto helps vehicle sellers submit their vehicles
              and gives participating dealerships a centralized way to
              discover potential inventory acquisition opportunities.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

              <Link
                href="/sell"
                className="rounded-xl bg-blue-600 px-8 py-4 text-center font-black text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500"
              >
                Sell My Vehicle →
              </Link>

              <Link
                href="/dealer/register"
                className="rounded-xl border border-white/20 bg-white/10 px-8 py-4 text-center font-black text-white transition hover:bg-white hover:text-slate-950"
              >
                Become a Dealer →
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


      {/* =========================================================
          VALUE PROPOSITION
      ========================================================= */}

      <section className="border-b border-slate-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">

          <div className="grid gap-6 md:grid-cols-3">

            <ValueCard
              icon="🚗"
              title="For Vehicle Sellers"
              text="Submit your vehicle details once and create a potential acquisition opportunity for participating dealerships."
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


      {/* =========================================================
          TWO AUDIENCES
      ========================================================= */}

      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-sm font-black uppercase tracking-widest text-blue-600">
              One Platform
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              Built Around Vehicle Acquisition
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              NorthSky Auto brings vehicle supply and dealership demand
              together in one organized marketplace.
            </p>

          </div>


          <div className="mt-14 grid gap-8 lg:grid-cols-2">

            {/* SELLER */}

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 md:p-10">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
                🚗
              </div>

              <p className="mt-7 text-sm font-black uppercase tracking-widest text-blue-600">
                Vehicle Sellers
              </p>

              <h3 className="mt-2 text-3xl font-black">
                Looking to sell a vehicle?
              </h3>

              <p className="mt-5 leading-7 text-slate-600">
                Submit information about your car, truck, SUV, van,
                or commercial vehicle. Your submission can be reviewed
                as a potential acquisition opportunity.
              </p>

              <ul className="mt-7 space-y-3 text-sm text-slate-700">
                <li>✓ Free online submission</li>
                <li>✓ Cars, trucks, SUVs and vans</li>
                <li>✓ Commercial vehicles</li>
                <li>✓ Canadian postal code targeting</li>
                <li>✓ Vehicle condition and history details</li>
              </ul>

              <Link
                href="/sell"
                className="mt-8 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-black text-white transition hover:bg-blue-700"
              >
                Submit My Vehicle →
              </Link>

            </div>


            {/* DEALER */}

            <div className="rounded-3xl bg-slate-950 p-8 text-white md:p-10">

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
                Create a dealer account and access vehicle acquisition
                opportunities through the NorthSky Auto dealer portal.
              </p>

              <ul className="mt-7 space-y-3 text-sm text-slate-300">
                <li>✓ Dealer account management</li>
                <li>✓ Browse vehicle opportunities</li>
                <li>✓ Review vehicle information</li>
                <li>✓ Save potential inventory</li>
                <li>✓ Subscription-based dealer access</li>
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">

                <Link
                  href="/dealer/register"
                  className="rounded-xl bg-blue-600 px-6 py-3 font-black text-white transition hover:bg-blue-500"
                >
                  Register as a Dealer →
                </Link>

                <Link
                  href="/dealer/login"
                  className="rounded-xl border border-white/20 px-6 py-3 font-black text-white transition hover:bg-white hover:text-slate-950"
                >
                  Dealer Login
                </Link>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =========================================================
          HOW IT WORKS
      ========================================================= */}

      <section className="bg-slate-100 px-6 py-20 md:py-24">

        <div className="mx-auto max-w-6xl">

          <div className="text-center">

            <p className="text-sm font-black uppercase tracking-widest text-blue-600">
              Simple Process
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight">
              How NorthSky Auto Works
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
              A straightforward process designed to make vehicle
              acquisition and sourcing easier.
            </p>

          </div>


          <div className="mt-14 grid gap-6 md:grid-cols-3">

            <ProcessCard
              number="01"
              title="Submit a Vehicle"
              text="Vehicle sellers provide basic vehicle, condition, location, and pricing information through the NorthSky Auto submission form."
            />

            <ProcessCard
              number="02"
              title="Vehicle Opportunity"
              text="The submission can be reviewed and made available as a potential acquisition opportunity for eligible participating dealers."
            />

            <ProcessCard
              number="03"
              title="Dealer Review"
              text="Dealers can review available opportunities through their dealer account and determine which vehicles fit their sourcing needs."
            />

          </div>

        </div>

      </section>


      {/* =========================================================
          DEALER CTA
      ========================================================= */}

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


              <div className="flex flex-col gap-3 sm:flex-row md:flex-col">

                <Link
                  href="/dealer/register"
                  className="rounded-xl bg-white px-6 py-4 text-center font-black text-blue-700 transition hover:bg-blue-50"
                >
                  Create Dealer Account →
                </Link>

                <Link
                  href="/pricing"
                  className="rounded-xl border border-white/30 px-6 py-4 text-center font-black text-white transition hover:bg-white/10"
                >
                  View Dealer Plans
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          SELLER CTA
      ========================================================= */}

      <section className="bg-slate-950 px-6 py-20 text-center text-white">

        <div className="mx-auto max-w-3xl">

          <p className="text-sm font-black uppercase tracking-widest text-blue-400">
            Ready to Start?
          </p>

          <h2 className="mt-3 text-4xl font-black md:text-5xl">
            Have a vehicle to sell?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Submit your vehicle to NorthSky Auto for potential
            dealership acquisition opportunities.
          </p>

          <Link
            href="/sell"
            className="mt-8 inline-flex rounded-xl bg-blue-600 px-8 py-4 font-black text-white transition hover:bg-blue-500"
          >
            Submit Your Vehicle →
          </Link>

          <p className="mt-5 text-xs text-slate-500">
            Submission is free. A submission does not guarantee an offer,
            buyer, or completed sale.
          </p>

        </div>

      </section>


      {/* =========================================================
          FOOTER
      ========================================================= */}

      <footer className="border-t border-slate-800 bg-slate-950 px-6 py-10 text-white">

        <div className="mx-auto max-w-6xl">

          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

            <div>

              <Link
                href="/"
                className="text-xl font-black"
              >
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

              <Link href="/sell" className="hover:text-white">
                Sell
              </Link>

              <Link href="/buyers" className="hover:text-white">
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


/*
|--------------------------------------------------------------------------
| Value Card
|--------------------------------------------------------------------------
*/

function ValueCard({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

      <div className="text-3xl">
        {icon}
      </div>

      <h3 className="mt-4 text-xl font-black">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-600">
        {text}
      </p>

    </div>
  );
}


/*
|--------------------------------------------------------------------------
| Process Card
|--------------------------------------------------------------------------
*/

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