import Link from "next/link";
export const metadata = {
  title: "Dealer Portal | NorthSky Auto",
  description:
    "NorthSky Auto dealer portal for vehicle acquisition opportunities.",
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
export default function DealerPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-black text-white">
              N
            </div>
            <div>
              <div className="font-black text-slate-950">
                NorthSky Auto
              </div>
              <div className="text-xs font-semibold text-slate-500">
                Dealer Portal
              </div>
            </div>
          </Link>
          <nav className="hidden items-center gap-6 sm:flex">
            <Link
              href="/pricing"
              className="text-sm font-bold text-slate-600 hover:text-blue-600"
            >
              Dealer Plans
            </Link>
            <Link
              href="/dealer/login"
              className="text-sm font-bold text-slate-600 hover:text-blue-600"
            >
              Sign In
            </Link>
            <Link
              href="/dealer/register"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700"
            >
              Join as Dealer
            </Link>
          </nav>
        </div>
      </header>
      {/* HERO */}
      <section className="bg-slate-950 px-6 py-20 text-white md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-400">
              NorthSky Auto Dealer Network
            </p>
            <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
              Build your vehicle acquisition pipeline.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              NorthSky Auto connects participating dealerships with
              vehicle acquisition opportunities submitted by sellers
              across Canada.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dealer/register"
                className="rounded-xl bg-blue-600 px-7 py-4 text-center font-black text-white hover:bg-blue-500"
              >
                Create Dealer Account →
              </Link>
              <Link
                href="/pricing"
                className="rounded-xl border border-white/20 bg-white/5 px-7 py-4 text-center font-black text-white hover:bg-white/10"
              >
                View Dealer Plans
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
              <span>✓ Canadian marketplace</span>
              <span>✓ Dealer dashboard</span>
              <span>✓ Vehicle opportunities</span>
            </div>
          </div>
        </div>
      </section>
      {/* BENEFITS */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-widest text-blue-600">
              Dealer Platform
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Everything starts with your dealer account.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Create your account, choose a plan, and access the
              NorthSky Auto dealer platform.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200"
              >
                <div className="text-4xl">
                  {benefit.icon}
                </div>
                <h3 className="mt-6 text-xl font-black">
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
      {/* HOW IT WORKS */}
      <section className="bg-slate-100 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-widest text-blue-600">
              How It Works
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
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
      {/* CTA */}
      <section className="bg-blue-600 px-6 py-20 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-black sm:text-4xl">
            Ready to join NorthSky Auto?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-blue-100">
            Create your dealer account and start building your
            vehicle acquisition pipeline.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/dealer/register"
              className="rounded-xl bg-white px-8 py-4 font-black text-blue-700 hover:bg-blue-50"
            >
              Create Dealer Account →
            </Link>
            <Link
              href="/dealer/login"
              className="rounded-xl border border-white/30 px-8 py-4 font-black text-white hover:bg-white/10"
            >
              Dealer Sign In
            </Link>
          </div>
        </div>
      </section>
      {/* SELLER CTA */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center sm:p-12">
          <p className="text-sm font-black uppercase tracking-widest text-blue-600">
            Selling a Vehicle?
          </p>
          <h2 className="mt-3 text-2xl font-black sm:text-3xl">
            Submit your vehicle to NorthSky Auto.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
            Sellers can submit their vehicle information for review
            and potential dealer acquisition opportunities.
          </p>
          <Link
            href="/sell"
            className="mt-7 inline-flex rounded-xl bg-slate-950 px-7 py-4 font-black text-white hover:bg-slate-800"
          >
            Sell My Vehicle →
          </Link>
        </div>
      </section>
      {/* FOOTER */}
      <footer className="bg-slate-950 px-6 py-10 text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-black text-white">
              NorthSky Auto
            </p>
            <p className="mt-1 text-sm">
              Vehicle marketplace for Canadian dealerships.
            </p>
          </div>
          <div className="flex flex-wrap gap-5 text-sm">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <Link href="/inventory" className="hover:text-white">
              Inventory
            </Link>
            <Link href="/sell" className="hover:text-white">
              Sell
            </Link>
            <Link href="/pricing" className="hover:text-white">
              Dealer Plans
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-7xl border-t border-white/10 pt-6 text-xs">
          © {new Date().getFullYear()} NorthSky Auto. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
function Step({ number, title, text }) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
      <div className="text-3xl font-black text-blue-600">
        {number}
      </div>
      <h3 className="mt-5 text-xl font-black">
        {title}
      </h3>
      <p className="mt-3 leading-7 text-slate-600">
        {text}
      </p>
    </div>
  );
}