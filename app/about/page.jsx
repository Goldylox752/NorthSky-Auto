import Link from "next/link";
export const metadata = {
  title: "About NorthSky Auto | Canadian Vehicle Acquisition Marketplace",
  description:
    "Learn how NorthSky Auto connects Canadian vehicle sellers with dealerships through a simple vehicle acquisition marketplace.",
};
const values = [
  {
    icon: "🚗",
    title: "Better Vehicle Connections",
    description:
      "NorthSky Auto is designed to help vehicle sellers get their vehicles in front of dealerships and potential buyers looking for inventory opportunities.",
  },
  {
    icon: "🏢",
    title: "Built for Dealers",
    description:
      "Dealerships can discover vehicle opportunities, manage leads, save promising vehicles, and build a more organized acquisition pipeline.",
  },
  {
    icon: "🇨🇦",
    title: "Canadian Focus",
    description:
      "NorthSky Auto is being built with Canadian vehicle sellers and dealerships in mind.",
  },
  {
    icon: "⚡",
    title: "Simple Process",
    description:
      "Our goal is to make vehicle submission, opportunity discovery, and seller-dealer connections simple and straightforward.",
  },
];
const steps = [
  {
    number: "01",
    title: "Submit a Vehicle",
    description:
      "Sellers provide information about their car, truck, SUV, van, or commercial vehicle.",
  },
  {
    number: "02",
    title: "Create an Opportunity",
    description:
      "Submitted vehicle information can be presented as an acquisition opportunity for participating dealerships.",
  },
  {
    number: "03",
    title: "Dealers Discover Vehicles",
    description:
      "Participating dealerships can review vehicle opportunities that may match their inventory and acquisition requirements.",
  },
  {
    number: "04",
    title: "Connect & Evaluate",
    description:
      "Interested parties can communicate directly and complete their own vehicle evaluation, negotiation, and transaction process.",
  },
];
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-800 px-6 py-20 text-white">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full bg-blue-500/20 px-4 py-2 text-xs font-black tracking-widest text-blue-300">
              ABOUT NORTHSKY AUTO
            </span>
            <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
              Connecting Vehicle Sellers With Dealership Opportunities
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              NorthSky Auto is a Canadian-focused vehicle acquisition
              marketplace designed to connect vehicle sellers with
              dealerships looking for potential inventory opportunities.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
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
                Dealer Plans
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* INTRO */}
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-sm font-black uppercase tracking-widest text-blue-600">
              Our Mission
            </span>
            <h2 className="mt-4 text-3xl font-black md:text-4xl">
              Making Vehicle Acquisition Simpler
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              Selling a vehicle and finding the right buyer can be
              challenging. At the same time, dealerships are constantly
              looking for vehicles that may fit their inventory needs.
            </p>
            <p className="mt-5 leading-8 text-slate-600">
              NorthSky Auto is designed to help bridge that gap by creating
              a straightforward digital marketplace for vehicle acquisition
              opportunities.
            </p>
            <p className="mt-5 leading-8 text-slate-600">
              Sellers can submit vehicle information, while participating
              dealerships can discover, evaluate, save, and manage
              opportunities through the NorthSky Auto platform.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-950 p-8 text-white shadow-xl md:p-10">
            <div className="text-5xl">🚘</div>
            <h3 className="mt-6 text-2xl font-black">
              One Marketplace.
            </h3>
            <h3 className="mt-1 text-2xl font-black text-blue-400">
              Two Sides.
            </h3>
            <p className="mt-5 leading-7 text-slate-400">
              NorthSky Auto is designed around the needs of both vehicle
              sellers and dealerships.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/10 p-5">
                <div className="text-2xl">👤</div>
                <h4 className="mt-3 font-black">
                  Vehicle Sellers
                </h4>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Submit vehicle information and create opportunities for
                  dealerships and potential buyers.
                </p>
              </div>
              <div className="rounded-2xl bg-white/10 p-5">
                <div className="text-2xl">🏢</div>
                <h4 className="mt-3 font-black">
                  Dealerships
                </h4>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Discover vehicle opportunities and build a more organized
                  acquisition pipeline.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* VALUES */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-black uppercase tracking-widest text-blue-600">
              What We Stand For
            </span>
            <h2 className="mt-4 text-3xl font-black md:text-4xl">
              Built Around Simplicity
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              NorthSky Auto focuses on creating a practical marketplace
              that makes vehicle opportunities easier to discover,
              organize, and manage.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-3xl bg-slate-50 p-7 ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="text-4xl">{value.icon}</div>
                <h3 className="mt-5 text-xl font-black">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* HOW IT WORKS */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span className="text-sm font-black uppercase tracking-widest text-blue-600">
              How It Works
            </span>
            <h2 className="mt-4 text-3xl font-black md:text-4xl">
              From Vehicle Submission to Acquisition Opportunity
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              NorthSky Auto is designed around a straightforward
              seller-to-dealer marketplace process.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200"
              >
                <span className="text-sm font-black text-blue-600">
                  {step.number}
                </span>
                <h3 className="mt-4 text-xl font-black">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* DEALER SECTION */}
      <section className="bg-slate-950 px-6 py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-sm font-black uppercase tracking-widest text-blue-400">
              For Dealerships
            </span>
            <h2 className="mt-4 text-3xl font-black md:text-4xl">
              Build Your Vehicle Acquisition Pipeline
            </h2>
            <p className="mt-5 max-w-2xl leading-8 text-slate-400">
              NorthSky Auto gives participating dealerships a dedicated
              environment for discovering vehicle opportunities, managing
              leads, saving promising vehicles, and monitoring acquisition
              activity.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/buyers"
                className="rounded-xl bg-blue-600 px-6 py-3 font-black text-white transition hover:bg-blue-700"
              >
                View Dealer Plans
              </Link>
              <Link
                href="/dealer"
                className="rounded-xl border border-white/20 px-6 py-3 font-black text-white transition hover:bg-white/10"
              >
                Dealer Portal
              </Link>
            </div>
          </div>
          <div className="rounded-3xl bg-white/10 p-8 ring-1 ring-white/10">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/10 p-6">
                <div className="text-3xl">🚗</div>
                <p className="mt-4 font-black">
                  Vehicle Opportunities
                </p>
              </div>
              <div className="rounded-2xl bg-white/10 p-6">
                <div className="text-3xl">⭐</div>
                <p className="mt-4 font-black">
                  Saved Vehicles
                </p>
              </div>
              <div className="rounded-2xl bg-white/10 p-6">
                <div className="text-3xl">📊</div>
                <p className="mt-4 font-black">
                  Dealer Analytics
                </p>
              </div>
              <div className="rounded-2xl bg-white/10 p-6">
                <div className="text-3xl">💳</div>
                <p className="mt-4 font-black">
                  Membership Plans
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* SELLER CTA */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white md:p-12">
          <div className="grid gap-8 md:grid-cols-3 md:items-center">
            <div className="md:col-span-2">
              <span className="text-sm font-black uppercase tracking-widest text-blue-100">
                Vehicle Sellers
              </span>
              <h2 className="mt-3 text-3xl font-black md:text-4xl">
                Have a Vehicle to Sell?
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-blue-100">
                Submit your vehicle information and create an opportunity
                for dealerships looking for potential inventory.
              </p>
            </div>
            <div>
              <Link
                href="/sell"
                className="block rounded-xl bg-white px-6 py-4 text-center font-black text-blue-700 transition hover:bg-blue-50"
              >
                Submit Your Vehicle →
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* CONTACT */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200 md:p-12">
          <span className="text-sm font-black uppercase tracking-widest text-blue-600">
            Questions?
          </span>
          <h2 className="mt-4 text-3xl font-black">
            Want to Learn More?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
            Whether you are a vehicle seller, dealership, or potential
            business partner, you can contact NorthSky Auto to learn more
            about the platform.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex rounded-xl bg-slate-950 px-7 py-4 font-black text-white transition hover:bg-slate-800"
            >
              Contact NorthSky Auto →
            </Link>
          </div>
        </div>
      </section>
      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-semibold text-slate-500">
            <Link
              href="/"
              className="transition hover:text-blue-600"
            >
              NorthSky Auto
            </Link>
            <Link
              href="/sell"
              className="transition hover:text-blue-600"
            >
              Sell Your Vehicle
            </Link>
            <Link
              href="/dealer"
              className="transition hover:text-blue-600"
            >
              Dealer Portal
            </Link>
            <Link
              href="/buyers"
              className="transition hover:text-blue-600"
            >
              Dealer Plans
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
          </div>
          <p className="mt-6 text-center text-sm text-slate-400">
            © 2026 NorthSky Auto. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}