import Link from "next/link";

export const metadata = {
  title: "NorthSky Auto | Sell Your Vehicle & Connect With Dealers",
  description:
    "NorthSky Auto connects vehicle sellers with automotive dealers across Canada. Submit your vehicle and create a dealer acquisition opportunity.",
};

const benefits = [
  {
    number: "01",
    title: "Submit Your Vehicle",
    text: "Tell us about your vehicle once through a simple online submission.",
  },
  {
    number: "02",
    title: "Reach Dealer Opportunities",
    text: "Your vehicle can be presented to participating automotive dealers looking for inventory.",
  },
  {
    number: "03",
    title: "Move the Opportunity Forward",
    text: "Interested dealers can review the vehicle and determine whether it fits their acquisition needs.",
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
      "Click Submit Your Vehicle and provide the basic information about your vehicle. The process is designed to take only a few minutes.",
  },
  {
    question: "Does NorthSky Auto buy vehicles directly?",
    answer:
      "NorthSky Auto facilitates connections between sellers and participating dealers. Any purchase decision or offer is determined by the participating dealer.",
  },
  {
    question: "Can dealerships join NorthSky Auto?",
    answer:
      "Yes. Automotive dealers can access the dealer platform and explore available plans and vehicle opportunities.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-slate-950 text-white">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(37,99,235,0.30),transparent_40%),radial-gradient(circle_at_10%_90%,rgba(14,165,233,0.12),transparent_35%)]" />

        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:60px_60px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-32">

          <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_.9fr]">

            <div className="max-w-3xl">

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-slate-300 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Canadian automotive marketplace
              </div>

              <h1 className="mt-7 text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
                Sell your vehicle.
                <br />
                <span className="text-blue-400">
                  Connect with dealers.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                NorthSky Auto creates a simpler connection between vehicle
                sellers and automotive dealers across Canada.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">

                <Link
                  href="/sell"
                  className="rounded-xl bg-blue-600 px-7 py-4 text-center font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500"
                >
                  Submit Your Vehicle →
                </Link>

                <Link
                  href="/dealer"
                  className="rounded-xl border border-white/15 bg-white/[0.06] px-7 py-4 text-center font-bold text-white backdrop-blur transition hover:bg-white/[0.1]"
                >
                  I'm a Dealer
                </Link>

              </div>

              <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-400">
                <span>✓ Free vehicle submission</span>
                <span>✓ Canadian marketplace</span>
                <span>✓ Dealer opportunities</span>
              </div>

            </div>

            {/* HERO MARKETPLACE CARD */}

            <div className="hidden lg:block">

              <div className="relative">

                <div className="absolute -inset-8 rounded-[3rem] bg-blue-500/10 blur-3xl" />

                <div className="relative rounded-3xl border border-white/10 bg-white/[0.07] p-5 shadow-2xl backdrop-blur-xl">

                  <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">

                    <div className="flex items-center justify-between">

                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                          NorthSky Marketplace
                        </p>

                        <p className="mt-1 font-bold">
                          Vehicle Opportunity
                        </p>
                      </div>

                      <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-400">
                        NEW
                      </span>

                    </div>

                    <div className="mt-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 p-6">

                      <div className="flex h-32 items-center justify-center rounded-xl border border-white/5 bg-white/[0.03] text-7xl">
                        🚙
                      </div>

                      <p className="mt-5 text-xl font-black">
                        Vehicle Submission
                      </p>

                      <p className="mt-1 text-sm text-slate-400">
                        Available for dealer review
                      </p>

                      <div className="mt-6 grid grid-cols-2 gap-3">

                        <div className="rounded-xl bg-white/[0.05] p-3">
                          <p className="text-xs text-slate-500">
                            Marketplace
                          </p>

                          <p className="mt-1 text-sm font-bold">
                            Canada
                          </p>
                        </div>

                        <div className="rounded-xl bg-white/[0.05] p-3">
                          <p className="text-xs text-slate-500">
                            Status
                          </p>

                          <p className="mt-1 text-sm font-bold text-emerald-400">
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

                        <p className="mt-1 font-bold">
                          Acquisition Opportunity
                        </p>
                      </div>

                      <span className="text-2xl text-blue-400">
                        →
                      </span>

                    </div>

                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          VALUE PROPOSITION
      ===================================================== */}

      <section className="border-b border-slate-200 bg-white py-16">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">

            <div>

              <p className="text-sm font-black uppercase tracking-widest text-blue-600">
                The NorthSky difference
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                A better connection between sellers and dealers.
              </h2>

            </div>

            <p className="text-lg leading-8 text-slate-600">
              Instead of contacting dealerships one at a time, NorthSky gives
              vehicle sellers a streamlined way to submit their vehicle and
              create an opportunity for participating automotive businesses.
            </p>

          </div>

        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}

      <section className="bg-slate-50 py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="max-w-2xl">

            <p className="text-sm font-black uppercase tracking-widest text-blue-600">
              How it works
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Simple for sellers.
              <br />
              Useful for dealers.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              NorthSky is designed to make vehicle acquisition and vehicle
              submission more straightforward.
            </p>

          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">

            {benefits.map((benefit) => (
              <div
                key={benefit.number}
                className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                <span className="text-sm font-black text-blue-600">
                  {benefit.number}
                </span>

                <h3 className="mt-7 text-xl font-black">
                  {benefit.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {benefit.text}
                </p>

                <div className="mt-8 h-1 w-10 rounded-full bg-blue-600 transition-all duration-300 group-hover:w-20" />

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* =====================================================
          SELLER CTA
      ===================================================== */}

      <section className="py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="relative overflow-hidden rounded-[2rem] bg-blue-600 px-8 py-14 text-white sm:px-14 lg:px-16 lg:py-16">

            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

            <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">

              <div className="max-w-2xl">

                <p className="text-sm font-black uppercase tracking-widest text-blue-100">
                  For vehicle sellers
                </p>

                <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                  Have a vehicle you're ready to sell?
                </h2>

                <p className="mt-5 text-lg leading-8 text-blue-100">
                  Submit your vehicle details and let NorthSky create a
                  potential dealer acquisition opportunity.
                </p>

              </div>

              <Link
                href="/sell"
                className="rounded-xl bg-white px-7 py-4 text-center font-black text-blue-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"
              >
                Start My Submission →
              </Link>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          PROCESS
      ===================================================== */}

      <section className="bg-slate-950 py-24 text-white">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="max-w-2xl">

            <p className="text-sm font-black uppercase tracking-widest text-blue-400">
              The process
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              From vehicle submission to dealer opportunity.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-400">
              A straightforward process built around connecting the right
              vehicle information with the right automotive businesses.
            </p>

          </div>

          <div className="mt-16 grid gap-10 md:grid-cols-3">

            {[
              {
                number: "01",
                title: "Submit",
                text: "Tell us about your vehicle, condition, location and expectations.",
              },
              {
                number: "02",
                title: "Review",
                text: "NorthSky receives and reviews the vehicle submission.",
              },
              {
                number: "03",
                title: "Connect",
                text: "Participating dealers can evaluate opportunities that fit their needs.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="border-t border-white/10 pt-8"
              >

                <span className="text-sm font-black text-blue-400">
                  {step.number}
                </span>

                <h3 className="mt-5 text-2xl font-black">
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

      {/* =====================================================
          DEALER SECTION
      ===================================================== */}

      <section className="py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

            <div>

              <p className="text-sm font-black uppercase tracking-widest text-blue-600">
                For automotive dealers
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Find your next inventory opportunity.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                NorthSky is building a dealer network designed to help
                automotive businesses discover vehicle acquisition
                opportunities and manage their pipeline in one place.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                <Link
                  href="/dealer"
                  className="rounded-xl bg-slate-950 px-6 py-3.5 text-center font-bold text-white transition hover:bg-slate-800"
                >
                  Dealer Portal →
                </Link>

                <Link
                  href="/pricing"
                  className="rounded-xl border border-slate-300 px-6 py-3.5 text-center font-bold transition hover:bg-slate-50"
                >
                  View Dealer Plans
                </Link>

              </div>

            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 sm:p-8">

              <div className="rounded-2xl bg-white p-7 shadow-sm">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                      Dealer Platform
                    </p>

                    <h3 className="mt-1 text-xl font-black">
                      NorthSky Network
                    </h3>

                  </div>

                  <div className="rounded-xl bg-blue-50 px-3 py-2 text-sm font-black text-blue-600">
                    PLATFORM
                  </div>

                </div>

                <div className="mt-7 space-y-3">

                  {dealerFeatures.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center justify-between rounded-xl bg-slate-50 p-4"
                    >

                      <span className="font-semibold">
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

      {/* =====================================================
          FAQ
      ===================================================== */}

      <section className="border-t border-slate-200 bg-slate-50 py-24">

        <div className="mx-auto max-w-4xl px-6 lg:px-8">

          <div className="text-center">

            <p className="text-sm font-black uppercase tracking-widest text-blue-600">
              Frequently asked questions
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Questions, answered.
            </h2>

          </div>

          <div className="mt-12 space-y-4">

            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >

                <summary className="cursor-pointer list-none font-bold">

                  <div className="flex items-center justify-between gap-6">

                    <span>
                      {faq.question}
                    </span>

                    <span className="shrink-0 text-xl font-normal text-blue-600 transition group-open:rotate-45">
                      +
                    </span>

                  </div>

                </summary>

                <p className="mt-4 leading-7 text-slate-600">
                  {faq.answer}
                </p>

              </details>
            ))}

          </div>

        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="bg-white py-24">

        <div className="mx-auto max-w-4xl px-6 text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white shadow-lg shadow-blue-600/20">
            🚗
          </div>

          <h2 className="mt-7 text-3xl font-black tracking-tight sm:text-5xl">
            Your next automotive opportunity starts here.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Whether you're selling a vehicle or looking for your next
            acquisition opportunity, NorthSky Auto is building a simpler way
            to connect.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              href="/sell"
              className="rounded-xl bg-blue-600 px-7 py-4 font-black text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500"
            >
              Submit Your Vehicle
            </Link>

            <Link
              href="/dealer"
              className="rounded-xl bg-slate-950 px-7 py-4 font-black text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Join as a Dealer
            </Link>

          </div>

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-slate-200 bg-slate-950 py-10 text-white">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="text-lg font-black">
                NorthSky Auto
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Connecting vehicles with opportunities across Canada.
              </p>

            </div>

            <div className="flex flex-wrap gap-6 text-sm text-slate-400">

              <Link
                href="/inventory"
                className="transition hover:text-white"
              >
                Inventory
              </Link>

              <Link
                href="/sell"
                className="transition hover:text-white"
              >
                Sell
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

          <div className="mt-8 border-t border-white/10 pt-6 text-xs text-slate-500">
            © {new Date().getFullYear()} NorthSky Auto. All rights reserved.
          </div>

        </div>

      </footer>

    </main>
  );
}