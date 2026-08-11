import Link from “next/link”;

export const metadata = {
title: “About NorthSky Auto | Canadian Vehicle Marketplace”,
description:
“Learn about NorthSky Auto, a Canadian vehicle marketplace connecting vehicle sellers with dealerships looking for inventory and acquisition opportunities.”,
alternates: {
canonical: “/about”,
},
};

export default function AboutPage() {
return (
{/* Hero */}
← NorthSky Auto
      <p className="mt-10 text-sm font-black uppercase tracking-[0.2em] text-blue-300">
        🇨🇦 Canadian Vehicle Marketplace
      </p>
      <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-tight md:text-6xl">
        Connecting Vehicle Sellers With Canadian Dealerships.
      </h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
        NorthSky Auto is built to make vehicle selling and dealership
        acquisition more efficient by bringing both sides of the
        automotive market together in one platform.
      </p>
    </div>
  </section>
  {/* What We Do */}
  <section className="px-6 py-16">
    <div className="mx-auto max-w-5xl">
      <div className="max-w-3xl">
        <p className="text-sm font-black uppercase tracking-widest text-blue-600">
          What We Do
        </p>
        <h2 className="mt-3 text-3xl font-black md:text-4xl">
          A simpler way to create vehicle opportunities.
        </h2>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          Selling a vehicle can mean dealing with multiple listings,
          inquiries, messages, and uncertain buyers. Dealerships also
          spend time searching for vehicles that fit their inventory
          needs.
        </p>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          NorthSky Auto brings these two needs together. Vehicle owners
          can submit their vehicle information, while participating
          dealerships can discover acquisition opportunities through the
          marketplace.
        </p>
      </div>
    </div>
  </section>
  {/* How It Works */}
  <section className="bg-white px-6 py-16">
    <div className="mx-auto max-w-5xl">
      <div className="text-center">
        <p className="text-sm font-black uppercase tracking-widest text-blue-600">
          How It Works
        </p>
        <h2 className="mt-3 text-3xl font-black md:text-4xl">
          Built around a straightforward process.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          NorthSky Auto keeps the process focused on vehicle information,
          acquisition opportunities, and connections between sellers and
          dealerships.
        </p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-lg font-black text-white">
            1
          </div>
          <h3 className="mt-6 text-xl font-black">
            Submit Your Vehicle
          </h3>
          <p className="mt-3 leading-7 text-slate-600">
            Provide your vehicle details, mileage, condition, asking
            price, and other relevant information.
          </p>
        </div>
        <div className="rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-lg font-black text-white">
            2
          </div>
          <h3 className="mt-6 text-xl font-black">
            Create an Opportunity
          </h3>
          <p className="mt-3 leading-7 text-slate-600">
            Your submitted vehicle information can become an acquisition
            opportunity for participating dealerships.
          </p>
        </div>
        <div className="rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-lg font-black text-white">
            3
          </div>
          <h3 className="mt-6 text-xl font-black">
            Connect & Complete
          </h3>
          <p className="mt-3 leading-7 text-slate-600">
            Interested parties can review the opportunity and determine
            whether they want to move forward.
          </p>
        </div>
      </div>
    </div>
  </section>
  {/* For Sellers & Dealers */}
  <section className="px-6 py-16">
    <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
      {/* Sellers */}
      <div className="rounded-3xl bg-slate-950 p-8 text-white md:p-10">
        <p className="text-sm font-black uppercase tracking-widest text-blue-400">
          For Vehicle Owners
        </p>
        <h2 className="mt-4 text-3xl font-black">
          Turn your vehicle into an acquisition opportunity.
        </h2>
        <p className="mt-5 leading-8 text-slate-300">
          Submit your car, truck, SUV, van, or commercial vehicle and
          provide the information dealerships need to understand the
          opportunity.
        </p>
        <ul className="mt-8 space-y-4 text-slate-200">
          <li>✓ Simple online vehicle submission</li>
          <li>✓ Vehicle details organized in one place</li>
          <li>✓ Access to a dealership-focused marketplace</li>
          <li>✓ Designed for sellers across Canada</li>
        </ul>
        <Link
          href="/sell"
          className="mt-8 inline-flex rounded-xl bg-blue-600 px-6 py-4 font-black text-white transition hover:bg-blue-700"
        >
          Sell Your Vehicle →
        </Link>
      </div>
      {/* Dealers */}
      <div className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200 md:p-10">
        <p className="text-sm font-black uppercase tracking-widest text-blue-600">
          For Dealerships
        </p>
        <h2 className="mt-4 text-3xl font-black">
          Find vehicle acquisition opportunities.
        </h2>
        <p className="mt-5 leading-8 text-slate-600">
          NorthSky Auto gives participating dealerships a place to
          discover vehicles submitted by sellers who are actively looking
          to sell.
        </p>
        <ul className="mt-8 space-y-4 text-slate-700">
          <li>✓ Discover vehicle opportunities</li>
          <li>✓ Review vehicle and seller information</li>
          <li>✓ Build your acquisition pipeline</li>
          <li>✓ Manage opportunities through the platform</li>
        </ul>
        <Link
          href="/buyers"
          className="mt-8 inline-flex rounded-xl bg-slate-950 px-6 py-4 font-black text-white transition hover:bg-slate-800"
        >
          Join the Dealer Network →
        </Link>
      </div>
    </div>
  </section>
  {/* Mission */}
  <section className="bg-blue-50 px-6 py-16">
    <div className="mx-auto max-w-4xl text-center">
      <p className="text-sm font-black uppercase tracking-widest text-blue-600">
        Our Mission
      </p>
      <h2 className="mt-4 text-3xl font-black md:text-4xl">
        Make vehicle acquisition more connected and efficient.
      </h2>
      <p className="mt-6 text-lg leading-8 text-slate-600">
        Our goal is to create a practical marketplace where vehicle
        sellers can submit opportunities and dealerships can discover
        inventory that may fit their acquisition needs.
      </p>
    </div>
  </section>
  {/* CTA */}
  <section className="bg-gradient-to-br from-slate-950 to-blue-950 px-6 py-20 text-white">
    <div className="mx-auto max-w-4xl text-center">
      <h2 className="text-4xl font-black md:text-5xl">
        Ready to get started?
      </h2>
      <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
        Whether you&apos;re selling a vehicle or looking for inventory,
        NorthSky Auto is built to connect the right people with the right
        opportunities.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
        <Link
          href="/sell"
          className="rounded-xl bg-blue-600 px-7 py-4 font-black text-white transition hover:bg-blue-700"
        >
          Sell Your Vehicle
        </Link>
        <Link
          href="/buyers"
          className="rounded-xl bg-white px-7 py-4 font-black text-slate-950 transition hover:bg-slate-100"
        >
          I&apos;m a Dealer
        </Link>
        <Link
          href="/contact"
          className="rounded-xl border border-white/20 px-7 py-4 font-black text-white transition hover:bg-white/10"
        >
          Contact Us
        </Link>
      </div>
    </div>
  </section>
  {/* Footer */}
  <footer className="border-t border-slate-200 bg-white px-6 py-8">
    <div className="mx-auto max-w-5xl text-center">
      <nav
        aria-label="Footer navigation"
        className="flex flex-wrap justify-center gap-5 text-sm font-semibold text-slate-500"
      >
        <Link
          href="/"
          className="transition hover:text-blue-600"
        >
          Home
        </Link>
        <Link
          href="/sell"
          className="transition hover:text-blue-600"
        >
          Sell Your Vehicle
        </Link>
        <Link
          href="/buyers"
          className="transition hover:text-blue-600"
        >
          Dealers
        </Link>
        <Link
          href="/pricing"
          className="transition hover:text-blue-600"
        >
          Pricing
        </Link>
        <Link
          href="/about"
          className="font-black text-blue-600"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="transition hover:text-blue-600"
        >
          Contact
        </Link>
      </nav>
      <p className="mt-6 text-sm text-slate-400">
        © 2026 NorthSky Auto. All rights reserved.
      </p>
    </div>
  </footer>
</main>

);
}