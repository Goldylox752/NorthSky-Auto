```jsx
import Link from "next/link";

export const metadata = {
  title: "NorthSky Auto | Buy, Sell & Connect With Canadian Dealers",
  description:
    "NorthSky Auto connects vehicle sellers with dealerships across Canada, helping sellers explore vehicle opportunities and dealers discover potential inventory and customers.",
};

const steps = [
  {
    number: "01",
    title: "Tell Us About Your Vehicle",
    description:
      "Submit a few details about the vehicle you want to sell, trade, or explore an offer for.",
  },
  {
    number: "02",
    title: "Find the Right Opportunity",
    description:
      "Your vehicle information can be reviewed and matched with participating automotive dealers.",
  },
  {
    number: "03",
    title: "Connect With a Dealer",
    description:
      "Qualified opportunities can be shared with participating dealers for direct follow-up.",
  },
];

const benefits = [
  "Built for the Canadian automotive market",
  "Simple online vehicle submission",
  "Dealer-focused vehicle opportunities",
  "Designed for sellers and dealerships",
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <header className="border-b border-white/10 bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-xl font-extrabold tracking-tight sm:text-2xl"
          >
            NorthSky <span className="text-sky-400">Auto</span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
            <Link
              href="#how-it-works"
              className="transition hover:text-white"
            >
              How It Works
            </Link>

            <Link
              href="#dealers"
              className="transition hover:text-white"
            >
              For Dealers
            </Link>

            <Link
              href="/dealer"
              className="transition hover:text-white"
            >
              Dealer Portal
            </Link>
          </nav>

          <Link
            href="/dealer/login"
            className="rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
          >
            Dealer Sign In
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.18),transparent_40%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-7 inline-flex items-center rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-sm font-semibold text-sky-300">
              🇨🇦 Built for Canadian Auto Sales
            </div>

            <h1 className="text-5xl font-black tracking-tight sm:text-6xl lg:text-8xl">
              Turn Vehicle Sellers Into{" "}
              <span className="block text-sky-400">
                Dealer Opportunities.
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              NorthSky Auto connects vehicle sellers with
              participating dealerships looking for their
              next customer, next trade, and next vehicle
              opportunity.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/sell"
                className="rounded-xl bg-sky-500 px-7 py-4 text-base font-bold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400"
              >
                Sell Your Vehicle
              </Link>

              <Link
                href="/dealer"
                className="rounded-xl border border-white/15 bg-white/5 px-7 py-4 text-base font-bold text-white transition hover:bg-white/10"
              >
                Dealer Portal
              </Link>
            </div>

            <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-4 text-left sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-2xl font-black">01</p>
                <p className="mt-2 text-sm text-slate-400">
                  Submit a vehicle
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-2xl font-black">02</p>
                <p className="mt-2 text-sm text-slate-400">
                  Discover opportunities
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-2xl font-black">03</p>
                <p className="mt-2 text-sm text-slate-400">
                  Connect with dealers
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="border-t border-white/10 bg-white py-24 text-slate-950 sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-600">
              Simple Process
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              How NorthSky Auto Works
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              We make it easier for vehicle sellers and
              participating dealerships to discover
              potential opportunities.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 text-sm font-black text-white">
                  {step.number}
                </div>

                <h3 className="mt-7 text-xl font-bold">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seller Section */}
      <section className="bg-slate-100 py-24 text-slate-950 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-600">
              For Vehicle Sellers
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Thinking About Selling or Trading?
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Submit your vehicle information through
              NorthSky Auto and explore opportunities to
              connect with participating dealerships.
            </p>

            <div className="mt-8">
              <Link
                href="/sell"
                className="inline-flex rounded-xl bg-slate-950 px-7 py-4 font-bold text-white transition hover:bg-slate-800"
              >
                Start Your Vehicle Submission
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <h3 className="text-2xl font-black">
              Why use NorthSky Auto?
            </h3>

            <div className="mt-7 space-y-5">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-start gap-4"
                >
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sm font-black text-sky-700">
                    ✓
                  </div>

                  <p className="text-slate-700">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dealer Section */}
      <section
        id="dealers"
        className="border-t border-white/10 bg-slate-950 py-24 sm:py-32"
      >
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="inline-flex rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-sm font-semibold text-sky-300">
            Dealer Network
          </div>

          <h2 className="mt-6 text-4xl font-black tracking-tight sm:text-6xl">
            Built for Canadian Dealerships
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400 sm:text-xl">
            Give your dealership another way to discover
            vehicle opportunities and potential customers.
            Manage your dealer account and access your
            opportunities through the NorthSky Auto dealer
            portal.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/dealer/register"
              className="rounded-xl bg-sky-500 px-7 py-4 font-bold text-white transition hover:bg-sky-400"
            >
              Create Dealer Account
            </Link>

            <Link
              href="/dealer"
              className="rounded-xl border border-white/15 px-7 py-4 font-bold text-white transition hover:bg-white/5"
            >
              Explore Dealer Portal
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sky-500 py-20 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
            Your next vehicle opportunity could be closer
            than you think.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-sky-50">
            Whether you&apos;re selling a vehicle or looking
            for opportunities as a dealership, NorthSky Auto
            is built to help make the connection.
          </p>

          <div className="mt-8">
            <Link
              href="/sell"
              className="inline-flex rounded-xl bg-white px-7 py-4 font-bold text-slate-950 transition hover:bg-slate-100"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col justify-between gap-8 md:flex-row">
            <div>
              <Link
                href="/"
                className="text-xl font-extrabold"
              >
                NorthSky{" "}
                <span className="text-sky-400">
                  Auto
                </span>
              </Link>

              <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
                Connecting vehicle sellers and
                participating automotive dealerships
                across Canada.
              </p>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm text-slate-400">
              <Link
                href="/sell"
                className="transition hover:text-white"
              >
                Sell Your Vehicle
              </Link>

              <Link
                href="/dealer"
                className="transition hover:text-white"
              >
                Dealer Portal
              </Link>

              <Link
                href="/dealer/login"
                className="transition hover:text-white"
              >
                Dealer Login
              </Link>

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
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-sm text-slate-600">
            © 2026 NorthSky Auto. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
```
