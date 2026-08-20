import Link from "next/link";

export const metadata = {
  title: "NorthSky Auto | Sell Your Vehicle & Connect With Dealers",
  description:
    "NorthSky Auto connects vehicle sellers with automotive dealers across Canada. Submit your vehicle, connect with dealers, and discover your next automotive opportunity.",
};

const benefits = [
  {
    number: "01",
    title: "Submit Your Vehicle",
    text: "Tell us about your vehicle once. Our streamlined submission process collects the details dealers need.",
  },
  {
    number: "02",
    title: "Reach Dealers",
    text: "Your vehicle becomes an opportunity for participating automotive dealers looking for inventory.",
  },
  {
    number: "03",
    title: "Explore Opportunities",
    text: "Interested dealers can review vehicle information and pursue opportunities that fit their inventory needs.",
  },
];

const dealerFeatures = [
  "Vehicle acquisition opportunities",
  "Lead management",
  "Saved opportunities",
  "Dealer analytics",
];

const faqs = [
  {
    question: "What is NorthSky Auto?",
    answer:
      "NorthSky Auto is a Canadian automotive marketplace designed to connect vehicle sellers with participating automotive dealers.",
  },
  {
    question: "How do I submit my vehicle?",
    answer:
      "Click Submit Your Vehicle and provide the basic information about your vehicle, including its year, make, model, condition, and location.",
  },
  {
    question: "Does NorthSky Auto buy my vehicle?",
    answer:
      "NorthSky Auto is designed to facilitate connections between sellers and participating dealers. Any purchase or offer is determined directly by the participating dealer.",
  },
  {
    question: "Can automotive dealers join NorthSky?",
    answer:
      "Yes. Automotive dealers can access the dealer platform and explore available dealer plans and opportunities.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(37,99,235,0.28),transparent_38%),radial-gradient(circle_at_15%_90%,rgba(14,165,233,0.12),transparent_35%)]" />

        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:60px_60px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8 lg:py-32">
          <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_.9fr]">

            <div className="max-w-3xl">

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-medium text-slate-300 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Built for the Canadian automotive market
              </div>

              <h1 className="mt-7 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Your vehicle.
                <br />
                <span className="text-blue-400">
                  More opportunities.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                NorthSky Auto connects vehicle sellers with automotive
                dealers across Canada. Submit your vehicle and put your
                opportunity in front of businesses looking for their next
                acquisition.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/sell"
                  className="rounded-xl bg-blue-600 px-7 py-4 text-center font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500"
                >
                  Submit Your Vehicle →
                </Link>

                <Link
                  href="/dealer"
                  className="rounded-xl border border-white/15 bg-white/[0.06] px-7 py-4 text-center font-semibold text-white backdrop-blur transition hover:bg-white/[0.1]"
                >
                  I'm a Dealer
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-400">
                <span>✓ Simple submission</span>
                <span>✓ Dealer opportunities</span>
                <span>✓ Canada-wide marketplace</span>
              </div>
            </div>

            {/* HERO CARD */}
            <div className="relative hidden lg:block">
              <div className="absolute -inset-6 rounded-[2rem] bg-blue-500/10 blur-3xl" />

              <div className="relative rounded-3xl border border-white/10 bg-white/[0.07] p-5 shadow-2xl backdrop-blur-xl">

                <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-6">

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        NorthSky Marketplace
                      </p>
                      <p className="mt-1 font-semibold">
                        Vehicle Opportunity
                      </p>
                    </div>

                    <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                      New
                    </span>
                  </div>

                  <div className="mt-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 p-6">
                    <div className="text-6xl">🚙</div>

                    <p className="mt-5 text-xl font-bold">
                      Your Vehicle
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      Submitted to the NorthSky network
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-white/[0.05] p-3">
                        <p className="text-xs text-slate-500">Location</p>
                        <p className="mt-1 text-sm font-medium">
                          Canada
                        </p>
                      </div>

                      <div className="rounded-xl bg-white/[0.05] p-3">
                        <p className="text-xs text-slate-500">Status</p>
                        <p className="mt-1 text-sm font-medium text-emerald-400">
                          Available
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500">
                        Dealer Network
                      </p>
                      <p className="mt-1 font-semibold">
                        Acquisition Opportunity
                      </p>
                    </div>

                    <span className="text-2xl text-blue-400">→</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= INTRO ================= */}
      <section className="border-b border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:items-center">

            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                The NorthSky difference
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                One connection can create a better opportunity.
              </h2>
            </div>

            <p className="text-lg leading-8 text-slate-600">
              Selling a vehicle shouldn't mean calling dealership after
              dealership. NorthSky Auto creates a streamlined marketplace
              where vehicle information can reach participating automotive
              businesses looking for inventory.
            </p>

          </div>
        </div>
      </section>

      {/* ================= BENEFITS ================= */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              How it works
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Simple for sellers.
              <br />
              Valuable for dealers.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">

            {benefits.map((benefit) => (
              <div
                key={benefit.number}
                className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="text-sm font-bold text-blue-600">
                  {benefit.number}
                </span>

                <h3 className="mt-7 text-xl font-bold">
                  {benefit.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {benefit.text}
                </p>

                <div className="mt-8 h-1 w-10 rounded-full bg-blue-600 transition-all group-hover:w-20" />
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= SELLER CTA ================= */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="relative overflow-hidden rounded-[2rem] bg-blue-600 px-8 py-14 text-white sm:px-14 lg:px-16 lg:py-16">

            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

            <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">

              <div className="max-w-2xl">
                <p className="text-sm font-bold uppercase tracking-wider text-blue-100">
                  Sell your vehicle
                </p>

                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                  Put your vehicle in front of the right opportunity.
                </h2>

                <p className="mt-5 text-lg leading-8 text-blue-100">
                  Submit your vehicle details through NorthSky Auto and
                  connect with participating automotive dealers.
                </p>
              </div>

              <Link
                href="/sell"
                className="rounded-xl bg-white px-7 py-4 text-center font-bold text-blue-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"
              >
                Start My Submission →
              </Link>

            </div>
          </div>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="bg-slate-950 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-400">
              The process
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              From submission to opportunity.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-400">
              NorthSky keeps the process simple so sellers can submit
              information and dealers can discover potential inventory.
            </p>
          </div>

          <div className="mt-16 grid gap-10 md:grid-cols-3">

            {[
              ["01", "Submit", "Tell us about your vehicle."],
              ["02", "Connect", "Your vehicle becomes a dealer opportunity."],
              ["03", "Explore", "Interested dealers review the opportunity."],
            ].map(([number, title, text]) => (
              <div
                key={number}
                className="border-t border-white/10 pt-8"
              >
                <span className="text-sm font-bold text-blue-400">
                  {number}
                </span>

                <h3 className="mt-5 text-2xl font-bold">
                  {title}
                </h3>

                <p className="mt-3 leading-7 text-slate-400">
                  {text}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= DEALERS ================= */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

            <div>

              <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                For automotive dealers
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Build your inventory pipeline with NorthSky.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                Discover vehicle acquisition opportunities and manage your
                dealer pipeline through one centralized platform.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/dealer"
                  className="rounded-xl bg-slate-950 px-6 py-3.5 text-center font-semibold text-white transition hover:bg-slate-800"
                >
                  Dealer Portal →
                </Link>

                <Link
                  href="/pricing"
                  className="rounded-xl border border-slate-300 px-6 py-3.5 text-center font-semibold transition hover:bg-slate-50"
                >
                  View Plans
                </Link>
              </div>

            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 sm:p-8">

              <div className="rounded-2xl bg-white p-7 shadow-sm">

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Dealer Platform
                    </p>

                    <h3 className="mt-1 text-xl font-bold">
                      NorthSky Network
                    </h3>
                  </div>

                  <div className="rounded-xl bg-blue-50 px-3 py-2 text-sm font-bold text-blue-600">
                    LIVE
                  </div>
                </div>

                <div className="mt-7 space-y-3">

                  {dealerFeatures.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center justify-between rounded-xl bg-slate-50 p-4"
                    >
                      <span className="font-medium">
                        {feature}
                      </span>

                      <span className="text-blue-600">
                        →
                      </span>
                    </div>
                  ))}

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="border-t border-slate-200 bg-slate-50 py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">

          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Frequently asked questions
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Questions, answered.
            </h2>
          </div>

          <div className="mt-12 space-y-4">

            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <summary className="cursor-pointer list-none pr-8 font-bold">
                  <div className="flex items-center justify-between">
                    <span>{faq.question}</span>
                    <span className="text-xl text-blue-600 transition group-open:rotate-45">
                      +
                    </span>
                  </div>
                </summary>

                <p className="mt-4 max-w-3xl leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}

          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white shadow-lg shadow-blue-600/20">
            🚗
          </div>

          <h2 className="mt-7 text-3xl font-bold tracking-tight sm:text-5xl">
            Your next automotive opportunity starts here.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Whether you're selling a vehicle or looking for your next
            acquisition, NorthSky Auto is building a simpler way to connect.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              href="/sell"
              className="rounded-xl bg-blue-600 px-7 py-4 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500"
            >
              Submit Your Vehicle
            </Link>

            <Link
              href="/dealer"
              className="rounded-xl bg-slate-950 px-7 py-4 font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Join as a Dealer
            </Link>

          </div>
        </div>
      </section>

    </main>
  );
}