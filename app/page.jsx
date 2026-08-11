import Link from "next/link";
export const metadata = {
  title: "NorthSky Auto | Sell Your Vehicle to Canadian Dealers",
  description:
    "NorthSky Auto connects vehicle sellers with dealerships across Canada. Submit your vehicle or join as a dealer.",
};
export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="bg-slate-950 px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex rounded-full bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-400">
            🇨🇦 Canadian Vehicle Marketplace
          </div>
          <h1 className="mt-7 text-5xl font-black tracking-tight md:text-7xl">
            Sell Your Vehicle.
            <span className="block text-blue-500">
              Find Dealer Interest.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
            Submit your car, truck, SUV, van, or commercial vehicle
            to NorthSky Auto and connect with participating dealerships
            across Canada.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              href="/sell"
              className="rounded-xl bg-blue-600 px-8 py-4 font-black text-white transition hover:bg-blue-500"
            >
              Sell My Vehicle →
            </Link>
            <Link
              href="/buyers"
              className="rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-black text-white transition hover:bg-white hover:text-slate-950"
            >
              I'm a Dealer →
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <span>✓ Free vehicle submission</span>
            <span>✓ Canada-focused</span>
            <span>✓ Dealer marketplace</span>
          </div>
        </div>
      </section>
      {/* TWO AUDIENCES */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-black uppercase tracking-widest text-blue-600">
              How NorthSky Works
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight">
              Built for Sellers and Dealers
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              One simple marketplace connecting vehicle supply with
              dealer demand.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {/* SELLERS */}
            <div className="rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200">
              <div className="text-4xl">🚗</div>
              <h3 className="mt-5 text-2xl font-black">
                Selling a Vehicle?
              </h3>
              <p className="mt-4 leading-7 text-slate-600">
                Tell us about your vehicle. Submit the year, make,
                model, mileage, condition, location, and asking price.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                <li>✓ Cars, trucks, SUVs and vans</li>
                <li>✓ Commercial vehicles</li>
                <li>✓ Simple online submission</li>
                <li>✓ No cost to submit</li>
              </ul>
              <Link
                href="/sell"
                className="mt-8 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-black text-white transition hover:bg-blue-700"
              >
                Submit My Vehicle →
              </Link>
            </div>
            {/* DEALERS */}
            <div className="rounded-3xl bg-slate-950 p-8 text-white">
              <div className="text-4xl">🏢</div>
              <h3 className="mt-5 text-2xl font-black">
                Looking for Inventory?
              </h3>
              <p className="mt-4 leading-7 text-slate-300">
                Access vehicle opportunities submitted by sellers
                and build a more organized vehicle sourcing pipeline.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                <li>✓ Discover vehicle opportunities</li>
                <li>✓ Review vehicle details</li>
                <li>✓ Organize sourcing activity</li>
                <li>✓ Dealer membership options</li>
              </ul>
              <Link
                href="/buyers"
                className="mt-8 inline-flex rounded-xl bg-white px-6 py-3 font-black text-slate-950 transition hover:bg-blue-50"
              >
                I'm a Dealer →
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* HOW IT WORKS */}
      <section className="bg-slate-100 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-widest text-blue-600">
              Simple Process
            </p>
            <h2 className="mt-3 text-4xl font-black">
              How It Works
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-7 shadow-sm">
              <span className="text-sm font-black text-blue-600">
                01
              </span>
              <h3 className="mt-3 text-xl font-black">
                Submit
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                Provide your vehicle information through our online
                submission form.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-7 shadow-sm">
              <span className="text-sm font-black text-blue-600">
                02
              </span>
              <h3 className="mt-3 text-xl font-black">
                Get Discovered
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                Your vehicle can become an acquisition opportunity
                for participating dealerships.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-7 shadow-sm">
              <span className="text-sm font-black text-blue-600">
                03
              </span>
              <h3 className="mt-3 text-xl font-black">
                Connect
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                Interested parties can review the opportunity and
                discuss a potential transaction.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* FINAL CTA */}
      <section className="bg-blue-600 px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-4xl font-black md:text-5xl">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-100">
            Sell your vehicle or join NorthSky Auto as a dealership.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/sell"
              className="rounded-xl bg-white px-8 py-4 font-black text-blue-700 transition hover:bg-blue-50"
            >
              Sell My Vehicle →
            </Link>
            <Link
              href="/buyers"
              className="rounded-xl border border-white/40 px-8 py-4 font-black text-white transition hover:bg-white hover:text-blue-700"
            >
              Dealer Portal →
            </Link>
          </div>
        </div>
      </section>
      {/* FOOTER */}
      <footer className="bg-slate-950 px-6 py-10 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              href="/"
              className="text-xl font-black"
            >
              NorthSky Auto
            </Link>
            <p className="mt-2 text-sm text-slate-400">
              Canadian vehicle acquisition marketplace.
            </p>
          </div>
          <nav className="flex flex-wrap gap-5 text-sm text-slate-400">
            <Link
              href="/sell"
              className="hover:text-white"
            >
              Sell
            </Link>
            <Link
              href="/buyers"
              className="hover:text-white"
            >
              Dealers
            </Link>
            <Link
              href="/pricing"
              className="hover:text-white"
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="hover:text-white"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="hover:text-white"
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              className="hover:text-white"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-white"
            >
              Terms
            </Link>
          </nav>
        </div>
        <div className="mx-auto mt-8 max-w-6xl border-t border-white/10 pt-6 text-center text-sm text-slate-500">
          © 2026 NorthSky Auto. All rights reserved.
        </div>
      </footer>
    </main>
  );
}