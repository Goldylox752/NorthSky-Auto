import Link from "next/link";

export const metadata = {
  title: "For Dealers | NorthSky Auto",
  description:
    "Build your vehicle acquisition pipeline with NorthSky Auto. Access seller-submitted vehicle opportunities across Canada.",
};

const benefits = [
  {
    icon: "🚗",
    title: "Vehicle Opportunities",
    text: "Discover vehicles submitted by sellers and available for dealer acquisition.",
  },
  {
    icon: "📋",
    title: "Lead Management",
    text: "Review and manage vehicle opportunities from one dealer dashboard.",
  },
  {
    icon: "📊",
    title: "Dealer Dashboard",
    text: "Manage your dealership account, subscription, saved vehicles, and opportunities.",
  },
];

function Step({ number, title, text }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md">
      <div className="text-sm font-bold tracking-widest text-blue-600">
        {number}
      </div>
      <h3 className="mt-4 text-xl font-bold text-slate-900">{title}</h3>
      <p className="mt-3 leading-relaxed text-slate-600">{text}</p>
    </div>
  );
}

export default function DealerPage() {
  return (
    <div className="bg-white text-slate-900">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(37,99,235,0.25),transparent_40%),radial-gradient(circle_at_15%_85%,rgba(14,165,233,0.1),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
              NorthSky Auto Dealer Network
            </p>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Build your vehicle acquisition pipeline.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
              NorthSky Auto connects participating dealerships with vehicle
              acquisition opportunities submitted by sellers across Canada.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dealer/register"
                className="rounded-xl bg-blue-600 px-7 py-4 text-center font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-500"
              >
                Create Dealer Account →
              </Link>
              <Link
                href="/pricing"
                className="rounded-xl border border-white/20 bg-white/5 px-7 py-4 text-center font-semibold text-white transition hover:bg-white/10"
              >
                View Dealer Plans
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
              <span>✓ Canadian marketplace</span>
              <span>✓ Dealer dashboard</span>
              <span>✓ Vehicle opportunities</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BENEFITS ================= */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Dealer Platform
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Everything starts with your dealer account.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Create your account, choose a plan, and access the NorthSky Auto
            dealer platform.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-8 transition hover:shadow-md"
            >
              <div className="text-4xl">{benefit.icon}</div>
              <h3 className="mt-5 text-xl font-bold text-slate-900">
                {benefit.title}
              </h3>
              <p className="mt-3 leading-relaxed text-slate-600">
                {benefit.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="border-y border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
              How It Works
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Get started in three steps.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Step
              number="01"
              title="Create Your Account"
              text="Register your dealership with your business and contact information."
            />
            <Step
              number="02"
              title="Choose a Plan"
              text="Select the dealer subscription that fits your dealership."
            />
            <Step
              number="03"
              title="Browse Vehicles"
              text="Access available vehicle opportunities through your dealer dashboard."
            />
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-blue-600">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center text-white sm:py-24">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ready to join NorthSky Auto?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-blue-100">
            Create your dealer account and start building your vehicle
            acquisition pipeline.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/dealer/register"
              className="rounded-xl bg-white px-8 py-4 font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              Create Dealer Account →
            </Link>
            <Link
              href="/dealer/login"
              className="rounded-xl border border-white/30 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              Dealer Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* ================= SELLER CTA ================= */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 px-8 py-12 text-center sm:px-12">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Selling a Vehicle?
          </p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
            Submit your vehicle to NorthSky Auto.
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-slate-600">
            Sellers can submit their vehicle information for review and
            potential dealer acquisition opportunities.
          </p>
          <Link
            href="/sell"
            className="mt-8 inline-flex rounded-xl bg-slate-900 px-7 py-3.5 font-semibold text-white transition hover:bg-slate-800"
          >
            Sell My Vehicle →
          </Link>
        </div>
      </section>
    </div>
  );
}