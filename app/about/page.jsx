import Link from "next/link";
export const metadata = {
  title: "About NorthSky Auto | Canadian Vehicle Acquisition Marketplace",
  description:
    "Learn how NorthSky Auto connects Canadian vehicle sellers with participating dealerships looking for potential vehicle acquisition opportunities.",
};
const values = [
  {
    icon: "🇨🇦",
    title: "Canadian Focus",
    text: "NorthSky Auto is built around the Canadian automotive market, helping organize vehicle opportunities for sellers and dealerships across Canada.",
  },
  {
    icon: "🚗",
    title: "Vehicle Focused",
    text: "From cars and trucks to SUVs, vans, and commercial vehicles, NorthSky Auto is designed around vehicle acquisition.",
  },
  {
    icon: "🏢",
    title: "Dealer Focused",
    text: "We help participating dealerships discover potential inventory opportunities and build a more organized sourcing pipeline.",
  },
  {
    icon: "⚡",
    title: "Simple Process",
    text: "Our goal is to make vehicle submission, discovery, evaluation, and communication easier for everyone involved.",
  },
];
const howItWorks = [
  {
    number: "01",
    title: "Vehicle Sellers Submit",
    text: "Vehicle owners provide information about their vehicle, including its year, make, model, mileage, condition, and asking price.",
  },
  {
    number: "02",
    title: "Opportunities Are Organized",
    text: "Submitted vehicles can be organized into acquisition opportunities for participating dealerships.",
  },
  {
    number: "03",
    title: "Dealers Discover Vehicles",
    text: "Participating dealerships can browse and filter available opportunities based on their inventory needs.",
  },
  {
    number: "04",
    title: "Both Sides Evaluate",
    text: "Interested parties can evaluate the vehicle, communicate, negotiate, and complete their own transaction.",
  },
];
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 text-white">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="max-w-4xl">
            <Link
              href="/"
              className="inline-flex rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-blue-300 transition hover:bg-white/10 hover:text-white"
            >
              ← NorthSky Auto
            </Link>
            <p className="mt-8 text-sm font-black uppercase tracking-widest text-blue-400">
              About NorthSky Auto
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight md:text-6xl">
              Connecting Vehicle Supply With
              <span className="block text-blue-400">
                Dealer Demand.
              </span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
              NorthSky Auto is a Canadian-focused vehicle acquisition
              marketplace designed to connect vehicle sellers with participating
              dealerships looking for potential inventory opportunities.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/sell"
                className="rounded-xl bg-blue-600 px-7 py-4 font-black text-white shadow-lg transition hover:bg-blue-500"
              >
                Sell Your Vehicle →
              </Link>
              <Link
                href="/buyers"
                className="rounded-xl border border-white/20 bg-white/5 px-7 py-4 font-black text-white transition hover:bg-white hover:text-slate-950"
              >
                I'm a Dealer
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* INTRO */}
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-blue-600">
                Our Mission
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
                Make Vehicle Acquisition More Organized
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Vehicle sellers and dealerships often have different needs.
                Sellers want a straightforward way to present their vehicles,
                while dealerships are constantly looking for inventory that
                fits their business.
              </p>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                NorthSky Auto is designed to bring those two sides together
                through a structured marketplace where vehicle submissions can
                become acquisition opportunities for participating dealers.
              </p>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Our focus is simple: make it easier to submit vehicles, discover
                potential inventory, evaluate opportunities, and move the
                acquisition process forward.
              </p>
            </div>
            <div className="rounded-3xl bg-slate-950 p-8 text-white shadow-xl md:p-10">
              <p className="text-sm font-black uppercase tracking-widest text-blue-400">
                NorthSky Auto
              </p>
              <h3 className="mt-4 text-3xl font-black">
                A Marketplace Built Around Vehicle Acquisition
              </h3>
              <div className="mt-8 space-y-5">
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="font-black">For Sellers</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Submit vehicle information and create an opportunity for
                    participating dealerships to discover.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="font-black">For Dealerships</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Browse potential acquisition opportunities and identify
                    vehicles that may fit your inventory strategy.
                  </p>
                </div>
                <div className="rounded-2xl bg-blue-600 p-5">
                  <p className="font-black">For the Marketplace</p>
                  <p className="mt-2 text-sm leading-6 text-blue-100">
                    Create a more organized connection between vehicle supply
                    and dealership demand.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* VALUES */}
      <section className="bg-slate-100 px-6 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-widest text-blue-600">
              What We Focus On
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
              Built for the Canadian Automotive Market
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              NorthSky Auto is focused on creating a straightforward marketplace
              experience around vehicle acquisition.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="text-4xl">{value.icon}</div>
                <h3 className="mt-5 text-xl font-black">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {value.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* HOW IT WORKS */}
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-widest text-blue-600">
              How It Works
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
              From Seller Submission to Dealer Opportunity
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              NorthSky Auto provides a structured process for presenting vehicle
              opportunities to participating dealerships.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step) => (
              <div
                key={step.number}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <span className="text-sm font-black text-blue-600">
                  {step.number}
                </span>
                <h3 className="mt-4 text-xl font-black">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* IMPORTANT POSITIONING */}
      <section className="bg-slate-950 px-6 py-20 text-white md:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-black uppercase tracking-widest text-blue-400">
            Marketplace Transparency
          </p>
          <h2 className="mt-4 text-4xl font-black md:text-5xl">
            Built to Facilitate Opportunities — Not Guarantee Transactions
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            NorthSky Auto provides a marketplace and technology platform for
            vehicle submissions and dealer acquisition opportunities. Vehicle
            information is submitted by sellers and should be independently
            evaluated by interested dealerships.
          </p>
          <div className="mt-8 grid gap-4 text-left md:grid-cols-3">
            <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
              <p className="font-black">Seller Information</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Vehicle information is provided by the submitting seller.
              </p>
            </div>
            <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
              <p className="font-black">Independent Evaluation</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Dealers should independently verify vehicle condition, history,
                ownership, pricing, and other relevant information.
              </p>
            </div>
            <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
              <p className="font-black">Independent Transactions</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Any purchase, sale, negotiation, or transaction is between the
                applicable parties.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 px-6 py-20 text-center text-white md:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-black uppercase tracking-widest text-blue-100">
            Get Started
          </p>
          <h2 className="mt-4 text-4xl font-black md:text-5xl">
            Ready to Join NorthSky Auto?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-100">
            Whether you are selling a vehicle or looking for potential
            acquisition opportunities, NorthSky Auto is built to help you take
            the next step.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              href="/sell"
              className="rounded-xl bg-white px-8 py-4 font-black text-blue-700 shadow-lg transition hover:bg-blue-50"
            >
              Sell My Vehicle →
            </Link>
            <Link
              href="/buyers"
              className="rounded-xl border border-white/40 bg-white/10 px-8 py-4 font-black text-white transition hover:bg-white hover:text-blue-700"
            >
              I'm a Dealer →
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-white/40 px-8 py-4 font-black text-white transition hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-slate-950 px-6 py-12 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <Link
                href="/"
                className="text-2xl font-black"
              >
                NorthSky Auto
              </Link>
              <p className="mt-3 max-w-md text-sm leading-7 text-slate-400">
                A Canadian-focused vehicle acquisition marketplace connecting
                vehicle sellers with participating dealerships.
              </p>
              <p className="mt-5 text-sm text-slate-500">
                Canada • Vehicle Acquisition • Dealer Marketplace
              </p>
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
                  Dealer Portal
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
                  Dealer Login
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-center text-sm text-slate-500 md:flex-row md:items-center md:justify-between md:text-left">
            <p>© 2026 NorthSky Auto. All rights reserved.</p>
            <div className="flex justify-center gap-5 md:justify-end">
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