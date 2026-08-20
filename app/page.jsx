import Link from "next/link";

export const metadata = {
  title: "NorthSky Auto | Sell Your Vehicle & Connect With Dealers",
  description:
    "NorthSky Auto connects vehicle sellers with automotive dealers across Canada. Submit your vehicle, receive dealer opportunities, and move your vehicle forward.",
};

const benefits = [
  {
    title: "Submit Your Vehicle",
    text: "Tell us about your vehicle through a simple online submission. No complicated process.",
    icon: "🚗",
  },
  {
    title: "Reach Canadian Dealers",
    text: "Your vehicle can be presented to dealers looking for inventory and acquisition opportunities.",
    icon: "🤝",
  },
  {
    title: "Move Faster",
    text: "Get your vehicle in front of the right automotive businesses without contacting dealerships one by one.",
    icon: "⚡",
  },
];

const steps = [
  {
    number: "01",
    title: "Tell us about your vehicle",
    text: "Submit the year, make, model, condition, location, and other important details.",
  },
  {
    number: "02",
    title: "We connect the opportunity",
    text: "Your vehicle information becomes available for participating automotive dealers.",
  },
  {
    number: "03",
    title: "Dealers review the opportunity",
    text: "Interested dealers can evaluate the vehicle and determine whether it fits their inventory needs.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.25),_transparent_40%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              🇨🇦 Built for the Canadian automotive market
            </div>

            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Your vehicle.
              <br />
              <span className="text-blue-400">More opportunities.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              NorthSky Auto connects vehicle sellers with automotive dealers
              across Canada. Submit your vehicle and put it in front of
              businesses looking for their next opportunity.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/sell"
                className="rounded-xl bg-blue-600 px-7 py-4 text-center font-semibold text-white transition hover:bg-blue-500"
              >
                Sell Your Vehicle
              </Link>

              <Link
                href="/inventory"
                className="rounded-xl border border-white/20 bg-white/5 px-7 py-4 text-center font-semibold text-white transition hover:bg-white/10"
              >
                Browse Vehicles
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-400">
              <span>✓ Simple submission</span>
              <span>✓ Dealer network</span>
              <span>✓ Canada-wide opportunities</span>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-semibold text-blue-600">HOW NORTHSKY WORKS</p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              A smarter way to connect vehicles with dealers.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Selling a vehicle shouldn't mean calling dealership after
              dealership. NorthSky Auto creates a streamlined connection
              between vehicle sellers and automotive businesses.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
              >
                <div className="text-3xl">{benefit.icon}</div>

                <h3 className="mt-6 text-xl font-bold">
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

      {/* SELLER CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-blue-600 px-8 py-14 text-white sm:px-14 lg:flex lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="font-semibold text-blue-100">
                SELL YOUR VEHICLE
              </p>

              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Ready to see what your vehicle could be worth to a dealer?
              </h2>

              <p className="mt-5 text-lg leading-8 text-blue-100">
                Submit your vehicle details and let NorthSky Auto help connect
                the opportunity with participating automotive dealers.
              </p>
            </div>

            <div className="mt-8 lg:mt-0 lg:ml-10">
              <Link
                href="/sell"
                className="inline-block rounded-xl bg-white px-7 py-4 font-semibold text-blue-700 transition hover:bg-blue-50"
              >
                Submit My Vehicle →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-slate-950 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-semibold text-blue-400">THE PROCESS</p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              From vehicle submission to dealer opportunity.
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="border-t border-white/10 pt-8"
              >
                <span className="text-sm font-bold text-blue-400">
                  {step.number}
                </span>

                <h3 className="mt-4 text-xl font-bold">
                  {step.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-400">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEALER SECTION */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="font-semibold text-blue-600">
                FOR AUTOMOTIVE DEALERS
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Find your next inventory opportunity.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                NorthSky Auto is building a dealer network designed to help
                automotive businesses discover vehicle acquisition
                opportunities and manage their pipeline in one place.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/dealer"
                  className="rounded-xl bg-slate-950 px-6 py-3.5 text-center font-semibold text-white transition hover:bg-slate-800"
                >
                  Dealer Login
                </Link>

                <Link
                  href="/pricing"
                  className="rounded-xl border border-slate-300 px-6 py-3.5 text-center font-semibold transition hover:bg-slate-50"
                >
                  View Dealer Plans
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">
                  NORTHSKY DEALER NETWORK
                </p>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                    <span className="font-medium">Vehicle opportunities</span>
                    <span className="text-blue-600">→</span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                    <span className="font-medium">Lead management</span>
                    <span className="text-blue-600">→</span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                    <span className="font-medium">Dealer analytics</span>
                    <span className="text-blue-600">→</span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                    <span className="font-medium">Saved opportunities</span>
                    <span className="text-blue-600">→</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-slate-200 bg-slate-50 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Let's move the automotive market forward.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Whether you're selling a vehicle or looking for your next
            acquisition opportunity, NorthSky Auto is building a simpler way
            to connect.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/sell"
              className="rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white transition hover:bg-blue-500"
            >
              Submit a Vehicle
            </Link>

            <Link
              href="/dealer"
              className="rounded-xl bg-slate-950 px-7 py-4 font-semibold text-white transition hover:bg-slate-800"
            >
              I'm a Dealer
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}