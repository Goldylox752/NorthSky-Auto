import Link from "next/link";

export const metadata = {
  title: "About NorthSky Auto | Canadian Vehicle Marketplace",
  description:
    "Learn about NorthSky Auto, a Canadian vehicle marketplace connecting vehicle sellers with participating dealerships looking for inventory and vehicle acquisition opportunities.",
  alternates: {
    canonical: "https://northsky-auto.vercel.app/about",
  },
  openGraph: {
    title: "About NorthSky Auto | Canadian Vehicle Marketplace",
    description:
      "NorthSky Auto connects vehicle sellers with participating dealerships across Canada.",
    url: "https://northsky-auto.vercel.app/about",
    siteName: "NorthSky Auto",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 text-white">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-black uppercase tracking-widest text-blue-300">
              About NorthSky Auto
            </p>

            <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              A smarter way to connect vehicles with dealerships.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300 md:text-xl">
              NorthSky Auto is a Canadian vehicle marketplace designed to
              connect vehicle sellers with participating dealerships looking
              for inventory and vehicle acquisition opportunities.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/sell"
                className="rounded-xl bg-blue-600 px-6 py-3 font-black text-white transition hover:bg-blue-500"
              >
                Sell Your Vehicle
              </Link>

              <Link
                href="/buyers"
                className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-black text-white transition hover:bg-white/15"
              >
                For Dealerships
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-blue-600">
              Our Mission
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Making vehicle acquisition simpler.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Selling or acquiring vehicles can be time-consuming. Sellers
              need a straightforward way to submit their vehicles, while
              dealerships need better ways to discover potential inventory.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              NorthSky Auto brings these two sides together through a digital
              marketplace. Sellers can submit vehicle information and
              participating dealerships can review available acquisition
              opportunities that may fit their inventory needs.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <h3 className="text-xl font-black">
              What NorthSky Auto focuses on
            </h3>

            <div className="mt-6 space-y-6">
              <div>
                <h4 className="font-black">Vehicle Sellers</h4>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  A simple digital way to submit vehicle information and
                  create potential acquisition opportunities.
                </p>
              </div>

              <div>
                <h4 className="font-black">Dealerships</h4>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  A centralized platform for discovering and managing
                  potential vehicle inventory opportunities.
                </p>
              </div>

              <div>
                <h4 className="font-black">Better Connections</h4>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Technology designed to make vehicle sourcing and
                  communication more organized and efficient.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-black uppercase tracking-widest text-blue-600">
              HOW NORTHSKY AUTO WORKS
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Simple from submission to opportunity.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              NorthSky Auto is designed to make the vehicle acquisition
              process easier for sellers and participating dealerships.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-black text-blue-700">
                1
              </div>

              <h3 className="mt-5 text-xl font-black">
                Submit a Vehicle
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Provide information about your car, truck, SUV, van, or other
                vehicle through the NorthSky Auto submission process.
              </p>

              <Link
                href="/sell"
                className="mt-5 inline-flex font-bold text-blue-600 hover:text-blue-700"
              >
                Submit a vehicle →
              </Link>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-black text-blue-700">
                2
              </div>

              <h3 className="mt-5 text-xl font-black">
                Dealerships Discover Opportunities
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Participating dealerships can discover vehicle submissions
                and identify potential inventory acquisition opportunities.
              </p>

              <Link
                href="/buyers"
                className="mt-5 inline-flex font-bold text-blue-600 hover:text-blue-700"
              >
                Explore dealer access →
              </Link>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-black text-blue-700">
                3
              </div>

              <h3 className="mt-5 text-xl font-black">
                Evaluate the Opportunity
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Dealerships can review vehicle information and determine
                whether an opportunity fits their inventory requirements.
              </p>

              <Link
                href="/pricing"
                className="mt-5 inline-flex font-bold text-blue-600 hover:text-blue-700"
              >
                View dealer plans →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY NORTHSKY */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-widest text-blue-600">
            WHY NORTHSKY AUTO
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Built around better vehicle connections.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            NorthSky Auto focuses on creating a straightforward digital
            marketplace experience without unnecessary complexity.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 p-6">
            <div className="text-3xl">🇨🇦</div>

            <h3 className="mt-4 font-black">Canadian Focus</h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Built with Canadian vehicle sellers and automotive businesses
              in mind.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-6">
            <div className="text-3xl">⚡</div>

            <h3 className="mt-4 font-black">Simple Process</h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Straightforward vehicle submission and marketplace workflows.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-6">
            <div className="text-3xl">🚗</div>

            <h3 className="mt-4 font-black">Dealer Opportunities</h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Help dealerships discover potential vehicle inventory
              acquisition opportunities.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-6">
            <div className="text-3xl">💻</div>

            <h3 className="mt-4 font-black">Digital First</h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Modern online tools designed to make automotive sourcing more
              organized and efficient.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center lg:px-8">
          <p className="text-sm font-black uppercase tracking-widest text-blue-100">
            GET STARTED
          </p>

          <h2 className="mt-4 text-3xl font-black sm:text-4xl">
            Ready to explore NorthSky Auto?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Whether you're selling a vehicle or looking for potential
            inventory, NorthSky Auto is built to make the connection easier.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/sell"
              className="rounded-xl bg-white px-6 py-3 font-black text-blue-700 transition hover:bg-blue-50"
            >
              Sell Your Vehicle
            </Link>

            <Link
              href="/buyers"
              className="rounded-xl border border-white/30 px-6 py-3 font-black text-white transition hover:bg-white/10"
            >
              Dealer Marketplace
            </Link>

            <Link
              href="/contact"
              className="rounded-xl border border-white/30 px-6 py-3 font-black text-white transition hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <Link
              href="/"
              className="text-lg font-black text-white"
            >
              NorthSky Auto
            </Link>

            <p className="mt-2 text-sm text-slate-400">
              Canadian vehicle marketplace and dealer acquisition platform.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <Link href="/" className="hover:text-white">
              Home
            </Link>

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
          </nav>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-6 py-5 text-center text-xs text-slate-500 lg:px-8 sm:text-left">
            © {new Date().getFullYear()} NorthSky Auto. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}