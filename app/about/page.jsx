import Link from "next/link";

export const metadata = {
  title: "About NorthSky Auto | Canadian Vehicle Marketplace",
  description:
    "Learn about NorthSky Auto, a Canadian vehicle marketplace connecting vehicle sellers with dealerships and qualified buyers looking for inventory and acquisition opportunities.",
  alternates: {
    canonical: "https://northsky-auto.vercel.app/about",
  },
  openGraph: {
    title: "About NorthSky Auto | Canadian Vehicle Marketplace",
    description:
      "NorthSky Auto connects vehicle sellers with dealerships and qualified buyers across Canada.",
    url: "https://northsky-auto.vercel.app/about",
    siteName: "NorthSky Auto",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-300">
              About NorthSky Auto
            </p>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              A smarter way to connect vehicles with buyers.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              NorthSky Auto is a Canadian vehicle marketplace designed to
              connect vehicle sellers with dealerships and qualified buyers
              looking for inventory and acquisition opportunities.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/sell"
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
              >
                Sell Your Vehicle
              </Link>

              <Link
                href="/buyers"
                className="rounded-lg border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/15"
              >
                For Dealerships
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Our Mission
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Making vehicle acquisition simpler.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Buying and selling vehicles can be time-consuming. Sellers want
              a straightforward way to get their vehicles in front of serious
              buyers, while dealerships need better opportunities to find
              inventory.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              NorthSky Auto is built to bring those two sides together through
              a simple digital marketplace. Sellers can submit vehicle
              information, while participating dealerships can discover
              acquisition opportunities that fit their inventory needs.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <h3 className="text-xl font-bold">What we focus on</h3>

            <div className="mt-6 space-y-5">
              <div>
                <h4 className="font-semibold">Vehicle Sellers</h4>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  A simple way to submit vehicle information and connect with
                  potential purchasing opportunities.
                </p>
              </div>

              <div>
                <h4 className="font-semibold">Dealerships</h4>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Access vehicle opportunities and discover potential inventory
                  acquisitions.
                </p>
              </div>

              <div>
                <h4 className="font-semibold">Better Connections</h4>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Technology that helps make communication between sellers and
                  automotive buyers more efficient.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              How NorthSky Auto Works
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Simple from submission to opportunity.
            </h2>

            <p className="mt-4 text-slate-600">
              Our marketplace is designed to make the vehicle acquisition
              process easier for both sides of the transaction.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                1
              </div>

              <h3 className="mt-5 text-xl font-bold">
                Submit a Vehicle
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Provide the basic information about your car, truck, SUV, or
                other vehicle through our online submission process.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                2
              </div>

              <h3 className="mt-5 text-xl font-bold">
                Connect With Buyers
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Vehicle opportunities can be presented to participating
                dealerships and qualified buyers looking for inventory.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                3
              </div>

              <h3 className="mt-5 text-xl font-bold">
                Explore the Opportunity
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Buyers can review available vehicle opportunities and determine
                whether a vehicle fits their inventory or purchasing needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why NorthSky */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Why NorthSky Auto
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Built around better vehicle connections.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            NorthSky Auto focuses on creating a straightforward marketplace
            experience without unnecessary complexity.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 p-6">
            <h3 className="font-bold">Canadian Focus</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Built with Canadian vehicle sellers and automotive businesses in
              mind.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 p-6">
            <h3 className="font-bold">Simple Process</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Straightforward vehicle submission and marketplace workflows.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 p-6">
            <h3 className="font-bold">Dealer Opportunities</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Help dealerships discover potential inventory acquisition
              opportunities.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 p-6">
            <h3 className="font-bold">Digital First</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Modern online tools designed to make automotive transactions more
              efficient.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-700 text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to explore NorthSky Auto?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Whether you're looking to sell a vehicle or find new inventory,
            NorthSky Auto is built to help make the connection easier.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/sell"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              Sell Your Vehicle
            </Link>

            <Link
              href="/buyers"
              className="rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Dealer Marketplace
            </Link>

            <Link
              href="/contact"
              className="rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}