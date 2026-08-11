import Link from "next/link";
export const metadata = {
  title: "NorthSky Auto | Sell Your Vehicle to Canadian Dealers",
  description:
    "NorthSky Auto connects Canadian vehicle sellers with dealerships looking for cars, trucks, SUVs, and commercial vehicles.",
};
export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:flex lg:items-center lg:gap-16">
          <div className="max-w-3xl">
            <div className="inline-flex rounded-full bg-blue-600/20 px-4 py-2 text-sm font-semibold text-blue-300 ring-1 ring-blue-500/30">
              🇨🇦 Canadian Vehicle Marketplace
            </div>
            <h1 className="mt-7 text-5xl font-extrabold leading-tight md:text-6xl">
              Sell Your Vehicle
              <span className="block text-blue-400">
                to Dealers Looking to Buy.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
              Submit your vehicle to NorthSky Auto and connect with dealerships
              searching for inventory across Canada.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/sell"
                className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-bold transition hover:bg-blue-500"
              >
                Sell My Vehicle
              </Link>
              <Link
                href="/buyers"
                className="rounded-xl border border-white/30 bg-white/5 px-8 py-4 text-lg font-semibold transition hover:bg-white hover:text-slate-900"
              >
                I'm a Dealer
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-300">
              <span>✓ Free vehicle submission</span>
              <span>✓ Canadian marketplace</span>
              <span>✓ Dealer network</span>
            </div>
          </div>
          {/* HERO CARD */}
          <div className="mt-14 w-full max-w-md lg:mt-0">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-300">
                How It Works
              </p>
              <div className="mt-6 space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold">
                      Submit Your Vehicle
                    </h3>
                    <p className="mt-1 text-sm text-slate-300">
                      Tell us about your car, truck, SUV, or commercial vehicle.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold">
                      Dealers Review It
                    </h3>
                    <p className="mt-1 text-sm text-slate-300">
                      Your vehicle can become an acquisition opportunity for
                      participating dealers.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold">
                      Connect & Complete
                    </h3>
                    <p className="mt-1 text-sm text-slate-300">
                      Interested parties can move forward with the vehicle.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* SELLER SECTION */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-semibold text-blue-600">
              FOR VEHICLE OWNERS
            </p>
            <h2 className="mt-3 text-4xl font-extrabold md:text-5xl">
              Turn Your Vehicle Into a Dealer Opportunity
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Instead of posting your vehicle everywhere and waiting for
              random inquiries, submit your vehicle information through
              NorthSky Auto and put it in front of dealerships looking for
              inventory.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Feature
              icon="🚗"
              title="Any Vehicle"
              text="Cars, trucks, SUVs, vans and commercial vehicles."
            />
            <Feature
              icon="📋"
              title="Simple Submission"
              text="Provide your vehicle details, mileage, condition and asking price."
            />
            <Feature
              icon="🤝"
              title="Dealer Network"
              text="Connect your vehicle with participating dealerships."
            />
          </div>
          <div className="mt-10">
            <Link
              href="/sell"
              className="inline-block rounded-xl bg-blue-600 px-8 py-4 font-bold text-white hover:bg-blue-700"
            >
              Submit My Vehicle
            </Link>
          </div>
        </div>
      </section>
      {/* DEALER SECTION */}
      <section className="bg-slate-100 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="font-semibold text-blue-600">
                FOR DEALERSHIPS
              </p>
              <h2 className="mt-3 text-4xl font-extrabold md:text-5xl">
                Find Your Next Acquisition
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                NorthSky Auto helps dealerships discover vehicle acquisition
                opportunities from sellers actively looking to sell.
              </p>
              <div className="mt-8">
                <Link
                  href="/buyers"
                  className="inline-block rounded-xl bg-slate-900 px-8 py-4 font-bold text-white hover:bg-slate-700"
                >
                  Join the Dealer Network
                </Link>
              </div>
            </div>
            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <h3 className="text-2xl font-bold">
                Dealer Benefits
              </h3>
              <div className="mt-6 space-y-5">
                <Benefit text="Access vehicle acquisition opportunities" />
                <Benefit text="Review seller and vehicle information" />
                <Benefit text="Build inventory more efficiently" />
                <Benefit text="Manage opportunities through your dealer dashboard" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* MARKETPLACE FLOW */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <p className="font-semibold text-blue-600">
            ONE PLATFORM
          </p>
          <h2 className="mt-3 text-4xl font-extrabold">
            Built for Both Sides of the Market
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            NorthSky Auto brings vehicle sellers and automotive dealers
            together in one marketplace.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border bg-white p-8">
              <div className="text-4xl">👤</div>
              <h3 className="mt-4 text-xl font-bold">
                Sellers
              </h3>
              <p className="mt-3 text-slate-600">
                Submit your vehicle and create a dealer acquisition opportunity.
              </p>
            </div>
            <div className="rounded-2xl border bg-white p-8">
              <div className="text-4xl">🚘</div>
              <h3 className="mt-4 text-xl font-bold">
                Vehicles
              </h3>
              <p className="mt-3 text-slate-600">
                Vehicle information is organized into actionable leads.
              </p>
            </div>
            <div className="rounded-2xl border bg-white p-8">
              <div className="text-4xl">🏢</div>
              <h3 className="mt-4 text-xl font-bold">
                Dealers
              </h3>
              <p className="mt-3 text-slate-600">
                Dealers discover opportunities and grow their inventory pipeline.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="bg-blue-600 px-6 py-20 text-center text-white">
        <h2 className="text-4xl font-extrabold md:text-5xl">
          Ready to Get Started?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-blue-100">
          Whether you're selling a vehicle or looking for inventory,
          NorthSky Auto is built to connect you with the right opportunity.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/sell"
            className="rounded-xl bg-white px-8 py-4 font-bold text-blue-600 hover:bg-slate-100"
          >
            Sell My Vehicle
          </Link>
          <Link
            href="/buyers"
            className="rounded-xl border border-white px-8 py-4 font-bold text-white hover:bg-white hover:text-blue-600"
          >
            Dealer Sign Up
          </Link>
        </div>
      </section>
      {/* FOOTER */}
      <footer className="bg-slate-950 px-6 py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xl font-bold">
              NorthSky Auto
            </div>
            <p className="mt-2 text-sm text-slate-400">
              Connecting Canadian vehicle sellers and dealerships.
            </p>
          </div>
          <div className="flex gap-6 text-sm text-slate-400">
            <Link href="/about" className="hover:text-white">
              About
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
            <Link href="/pricing" className="hover:text-white">
              Dealer Pricing
            </Link>
            <Link href="/sell" className="hover:text-white">
              Sell
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
function Feature({ icon, title, text }) {
  return (
    <div className="rounded-2xl border bg-white p-7 shadow-sm">
      <div className="text-4xl">
        {icon}
      </div>
      <h3 className="mt-5 text-xl font-bold">
        {title}
      </h3>
      <p className="mt-3 leading-7 text-slate-600">
        {text}
      </p>
    </div>
  );
}
function Benefit({ text }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-sm text-green-700">
        ✓
      </span>
      <span className="text-slate-700">
        {text}
      </span>
    </div>
  );
}