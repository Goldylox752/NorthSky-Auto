import Link from "next/link";

export const metadata = {
  title: "NorthSky Auto | Vehicle Marketplace",
  description:
    "NorthSky Auto connects vehicle sellers with automotive dealers across Canada.",
};

const benefits = [
  {
    title: "Simple Vehicle Submission",
    text: "Tell us about your vehicle through a straightforward online submission.",
    icon: "🚗",
  },
  {
    title: "Dealer Opportunities",
    text: "Connect qualified vehicle opportunities with dealerships looking for inventory.",
    icon: "🏢",
  },
  {
    title: "Straightforward Process",
    text: "Keep the process simple from vehicle submission through dealer review.",
    icon: "✓",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-2xl font-black tracking-tight text-slate-950"
          >
            NorthSky <span className="text-blue-600">Auto</span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">
            <Link href="/sell" className="hover:text-blue-600">
              Sell Your Vehicle
            </Link>

            <Link href="/buyers" className="hover:text-blue-600">
              Dealers
            </Link>

            <Link href="/pricing" className="hover:text-blue-600">
              Pricing
            </Link>

            <Link href="/about" className="hover:text-blue-600">
              About
            </Link>

            <Link href="/contact" className="hover:text-blue-600">
              Contact
            </Link>
          </nav>

          <Link
            href="/sell"
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
          >
            Submit Vehicle
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-400">
              NorthSky Auto
            </p>

            <h1 className="mt-5 text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              Connecting vehicles with
              <span className="block text-blue-500">
                the right dealers.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              NorthSky Auto makes it easier for vehicle owners to submit
              their vehicles and for automotive dealers to discover new
              inventory opportunities.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/sell"
                className="rounded-xl bg-blue-600 px-7 py-4 text-center font-black text-white transition hover:bg-blue-500"
              >
                Submit Your Vehicle
              </Link>

              <Link
                href="/buyers"
                className="rounded-xl border border-white/15 bg-white/5 px-7 py-4 text-center font-black text-white transition hover:bg-white/10"
              >
                Dealer Information
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 py-8 md:grid-cols-3">
          <Link
            href="/sell"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:border-blue-300 hover:bg-blue-50"
          >
            <div className="text-3xl">🚗</div>

            <h2 className="mt-4 text-xl font-black">
              I Have a Vehicle to Sell
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Submit your vehicle details and tell us about the opportunity.
            </p>

            <span className="mt-4 inline-block text-sm font-black text-blue-600">
              Submit Vehicle →
            </span>
          </Link>

          <Link
            href="/buyers"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:border-blue-300 hover:bg-blue-50"
          >
            <div className="text-3xl">🏢</div>

            <h2 className="mt-4 text-xl font-black">
              I&apos;m a Dealer
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Learn how dealerships can access vehicle opportunities through
              NorthSky Auto.
            </p>

            <span className="mt-4 inline-block text-sm font-black text-blue-600">
              Dealer Information →
            </span>
          </Link>

          <Link
            href="/contact"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:border-blue-300 hover:bg-blue-50"
          >
            <div className="text-3xl">💬</div>

            <h2 className="mt-4 text-xl font-black">
              I Have a Question
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Contact the NorthSky Auto team with questions or partnership
              inquiries.
            </p>

            <span className="mt-4 inline-block text-sm font-black text-blue-600">
              Contact Us →
            </span>
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-widest text-blue-600">
            HOW IT WORKS
          </p>

          <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
            A simpler vehicle marketplace.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            NorthSky Auto is designed to make the connection between vehicle
            sellers and automotive dealers easier.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-lg font-black text-white">
              01
            </div>

            <h3 className="mt-6 text-xl font-black">
              Submit Your Vehicle
            </h3>

            <p className="mt-3 leading-7 text-slate-600">
              Provide the basic information about your vehicle, including
              details that help dealers understand the opportunity.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-lg font-black text-white">
              02
            </div>

            <h3 className="mt-6 text-xl font-black">
              Vehicle Is Reviewed
            </h3>

            <p className="mt-3 leading-7 text-slate-600">
              Your submission can be reviewed as part of the NorthSky Auto
              vehicle opportunity process.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-lg font-black text-white">
              03
            </div>

            <h3 className="mt-6 text-xl font-black">
              Dealer Opportunity
            </h3>

            <p className="mt-3 leading-7 text-slate-600">
              Qualified opportunities can be made available to participating
              automotive dealers.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-widest text-blue-600">
              WHY NORTHSKY
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight">
              Built around the vehicle opportunity.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <div className="text-4xl">{benefit.icon}</div>

                <h3 className="mt-5 text-xl font-black">
                  {benefit.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dealer CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
        <div className="overflow-hidden rounded-3xl bg-slate-950 px-8 py-12 text-white md:px-14 md:py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-widest text-blue-400">
              FOR DEALERS
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight">
              Looking for your next inventory opportunity?
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-300">
              Learn how NorthSky Auto works with dealerships and explore
              available access options.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/buyers"
                className="rounded-xl bg-blue-600 px-7 py-4 text-center font-black transition hover:bg-blue-500"
              >
                Dealer Information
              </Link>

              <Link
                href="/pricing"
                className="rounded-xl border border-white/15 bg-white/5 px-7 py-4 text-center font-black transition hover:bg-white/10"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Seller CTA */}
      <section className="border-y border-slate-200 bg-blue-50">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <p className="text-sm font-black uppercase tracking-widest text-blue-600">
            HAVE A VEHICLE?
          </p>

          <h2 className="mt-3 text-4xl font-black tracking-tight">
            Start your vehicle submission.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Give NorthSky Auto the information needed to understand your
            vehicle and the opportunity it represents.
          </p>

          <Link
            href="/sell"
            className="mt-8 inline-flex rounded-xl bg-blue-600 px-8 py-4 font-black text-white transition hover:bg-blue-500"
          >
            Submit Your Vehicle →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-300">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <Link
                href="/"
                className="text-2xl font-black text-white"
              >
                NorthSky <span className="text-blue-500">Auto</span>
              </Link>

              <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
                Connecting vehicle sellers with automotive dealer
                opportunities across Canada.
              </p>
            </div>

            <div>
              <h3 className="font-black text-white">
                Marketplace
              </h3>

              <div className="mt-4 space-y-3 text-sm">
                <Link
                  href="/sell"
                  className="block hover:text-white"
                >
                  Sell Your Vehicle
                </Link>

                <Link
                  href="/buyers"
                  className="block hover:text-white"
                >
                  Dealers
                </Link>

                <Link
                  href="/pricing"
                  className="block hover:text-white"
                >
                  Pricing
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-black text-white">
                Company
              </h3>

              <div className="mt-4 space-y-3 text-sm">
                <Link
                  href="/about"
                  className="block hover:text-white"
                >
                  About
                </Link>

                <Link
                  href="/contact"
                  className="block hover:text-white"
                >
                  Contact
                </Link>

                <Link
                  href="/"
                  className="block hover:text-white"
                >
                  Home
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-xs text-slate-500">
            © {new Date().getFullYear()} NorthSky Auto. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
