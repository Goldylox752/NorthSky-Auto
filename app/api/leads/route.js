```jsx
import Link from "next/link";

export const metadata = {
  title: "NorthSky Auto | Connect Your Vehicle With Canadian Dealers",
  description:
    "NorthSky Auto connects vehicle sellers with automotive dealers across Canada. Submit your vehicle and create an opportunity for dealer acquisition.",
};

const benefits = [
  {
    number: "01",
    title: "Submit Your Vehicle",
    text: "Provide the key details about your vehicle through a fast, straightforward submission.",
  },
  {
    number: "02",
    title: "Reach Dealer Opportunities",
    text: "Your submission enters the NorthSky Auto marketplace for participating automotive dealers to review.",
  },
  {
    number: "03",
    title: "Let Dealers Evaluate",
    text: "Dealers can discover vehicles that match their inventory needs and acquisition strategy.",
  },
];

const stats = [
  {
    value: "01",
    label: "Simple submission",
  },
  {
    value: "CA",
    label: "Canadian marketplace",
  },
  {
    value: "24/7",
    label: "Online access",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0">
          <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-10 lg:px-8 lg:pb-32">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              Canada's Vehicle Acquisition Marketplace
            </div>
          </div>

          <div className="grid items-center gap-16 pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:pt-28">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
                SELL SMARTER
              </p>

              <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
                Put your vehicle in front of{" "}
                <span className="text-blue-400">
                  dealer opportunities.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                NorthSky Auto connects vehicle sellers with automotive
                dealers across Canada. Submit your vehicle once and create
                an opportunity for participating dealers to discover it.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/sell"
                  className="rounded-xl bg-blue-600 px-8 py-4 text-center font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
                >
                  Submit Your Vehicle →
                </Link>

                <Link
                  href="/inventory"
                  className="rounded-xl border border-white/15 bg-white/5 px-8 py-4 text-center font-bold text-white backdrop-blur transition hover:bg-white/10"
                >
                  Browse Opportunities
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-400">
                <span>✓ Free submission</span>
                <span>✓ Built for Canada</span>
                <span>✓ Dealer marketplace</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-blue-600/10 blur-2xl" />

              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-xl">
                <div className="rounded-2xl bg-white p-6 text-slate-950">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        NorthSky Marketplace
                      </p>

                      <h2 className="mt-2 text-xl font-black">
                        Vehicle Opportunity
                      </h2>
                    </div>

                    <div className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                      NEW
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl bg-slate-100 p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-2xl font-black">
                          2022 Ford F-150
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          XLT • 85,000 km
                        </p>
                      </div>

                      <p className="text-lg font-black text-blue-600">
                        $35,000
                      </p>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-white p-3">
                        <p className="text-xs text-slate-400">
                          Location
                        </p>

                        <p className="mt-1 text-sm font-bold">
                          Alberta, Canada
                        </p>
                      </div>

                      <div className="rounded-xl bg-white p-3">
                        <p className="text-xs text-slate-400">
                          Condition
                        </p>

                        <p className="mt-1 text-sm font-bold">
                          Good
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-black text-blue-600">
                      NS
                    </div>

                    <div>
                      <p className="text-sm font-bold">
                        Dealer Network
                      </p>

                      <p className="text-xs text-slate-400">
                        Reviewing acquisition opportunities
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 grid max-w-3xl gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
              >
                <p className="text-2xl font-black text-white">
                  {stat.value}
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              HOW IT WORKS
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              One submission.
              <br />
              More potential opportunities.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              NorthSky Auto is designed to simplify the connection between
              vehicle sellers and automotive dealers. Instead of reaching
              out to dealerships one at a time, submit your vehicle through
              one centralized marketplace.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.number}
                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 font-black text-blue-600">
                  {benefit.number}
                </div>

                <h3 className="mt-7 text-xl font-black">
                  {benefit.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SELLER CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-blue-600 px-8 py-14 text-white sm:px-14 lg:px-16 lg:py-16">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

            <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-3xl">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-100">
                  SELL YOUR VEHICLE
                </p>

                <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                  Your next buyer could be a dealer.
                </h2>

                <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">
                  Submit your vehicle details and let NorthSky Auto create
                  a potential acquisition opportunity for participating
                  automotive dealers.
                </p>
              </div>

              <Link
                href="/sell"
                className="inline-flex items-center justify-center rounded-xl bg-white px-7 py-4 font-black text-blue-700 shadow-lg transition hover:bg-blue-50"
              >
                Submit My Vehicle →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOR DEALERS */}
      <section className="border-y border-slate-200 bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                FOR DEALERS
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                Find inventory without chasing it.
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                NorthSky Auto gives participating automotive dealers access
                to vehicle acquisition opportunities in one centralized
                environment.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/dealer"
                  className="rounded-xl bg-slate-950 px-7 py-4 text-center font-bold text-white transition hover:bg-slate-800"
                >
                  Dealer Portal →
                </Link>

                <Link
                  href="/pricing"
                  className="rounded-xl border border-slate-300 px-7 py-4 text-center font-bold text-slate-900 transition hover:bg-slate-50"
                >
                  View Dealer Plans
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <div className="rounded-2xl bg-slate-950 p-6 text-white shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                      Dealer Portal
                    </p>

                    <h3 className="mt-2 text-xl font-black">
                      Acquisition Pipeline
                    </h3>
                  </div>

                  <div className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-bold">
                    LIVE
                  </div>
                </div>

                <div className="mt-7 grid grid-cols-3 gap-3">
                  <div className="rounded-xl bg-white/5 p-4">
                    <p className="text-xs text-slate-500">
                      New
                    </p>

                    <p className="mt-2 text-2xl font-black">
                      24
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/5 p-4">
                    <p className="text-xs text-slate-500">
                      Saved
                    </p>

                    <p className="mt-2 text-2xl font-black">
                      12
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/5 p-4">
                    <p className="text-xs text-slate-500">
                      Qualified
                    </p>

                    <p className="mt-2 text-2xl font-black">
                      8
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {[
                    ["2022 Ford F-150", "$35,000", "Alberta"],
                    ["2021 Toyota Tacoma", "$38,500", "British Columbia"],
                    ["2023 Chevrolet Silverado", "$42,000", "Ontario"],
                  ].map(([vehicle, price, location]) => (
                    <div
                      key={vehicle}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4"
                    >
                      <div>
                        <p className="text-sm font-bold">
                          {vehicle}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {location}
                        </p>
                      </div>

                      <p className="text-sm font-black text-blue-400">
                        {price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-slate-950 py-24 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
            NORTHSKY AUTO
          </p>

          <h2 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Turn your vehicle into a dealer opportunity.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Submit your vehicle today and make it discoverable to
            participating automotive dealers across Canada.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/sell"
              className="rounded-xl bg-blue-600 px-8 py-4 font-black text-white transition hover:bg-blue-500"
            >
              Submit Your Vehicle →
            </Link>

            <Link
              href="/inventory"
              className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-black text-white transition hover:bg-white/10"
            >
              Explore Marketplace
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950 px-6 py-10 text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-black text-white">
              NorthSky Auto
            </p>

            <p className="mt-1 text-sm">
              Canadian vehicle acquisition marketplace.
            </p>
          </div>

          <div className="flex flex-wrap gap-5 text-sm">
            <Link
              href="/sell"
              className="transition hover:text-white"
            >
              Sell
            </Link>

            <Link
              href="/inventory"
              className="transition hover:text-white"
            >
              Inventory
            </Link>

            <Link
              href="/dealer"
              className="transition hover:text-white"
            >
              Dealers
            </Link>

            <Link
              href="/pricing"
              className="transition hover:text-white"
            >
              Pricing
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
```
