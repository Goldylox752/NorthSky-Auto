import Link from "next/link";
export const metadata = {
  title: "Dealer Portal | NorthSky Auto",
  description:
    "Access the NorthSky Auto dealer portal, manage your dealership account, and discover vehicle acquisition opportunities.",
};
export default function DealerPortalPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* HERO */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-800 px-6 py-20 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <span className="inline-flex rounded-full bg-blue-500/20 px-5 py-2 text-sm font-black tracking-wide text-blue-300">
            NORTHSKY AUTO DEALER PORTAL
          </span>
          <h1 className="mx-auto mt-7 max-w-4xl text-5xl font-black leading-tight md:text-6xl">
            Your Dealership.
            <span className="block text-blue-400">
              Your Vehicle Pipeline.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
            Access NorthSky Auto's dealer network, manage your dealership
            account, and find vehicle acquisition opportunities from sellers
            across Canada.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              href="/buyers"
              className="rounded-xl bg-blue-500 px-8 py-4 font-black text-white transition hover:bg-blue-600"
            >
              View Dealer Plans →
            </Link>
            <Link
              href="/sell"
              className="rounded-xl border border-white/30 px-8 py-4 font-black text-white transition hover:bg-white/10"
            >
              Sell a Vehicle
            </Link>
          </div>
        </div>
      </section>
      {/* PORTAL OPTIONS */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-black text-blue-700">
              DEALER ACCESS
            </span>
            <h2 className="mt-6 text-4xl font-black md:text-5xl">
              Welcome to NorthSky Auto
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Choose how you want to access the dealer network.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {/* EXISTING DEALER */}
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
                🔐
              </div>
              <h3 className="mt-7 text-2xl font-black">
                Existing Dealer
              </h3>
              <p className="mt-4 leading-7 text-slate-600">
                Already have a NorthSky Auto dealer account? Continue to your
                dealer dashboard to manage your account and vehicle
                opportunities.
              </p>
              <Link
                href="/dealer/dashboard"
                className="mt-8 inline-flex w-full justify-center rounded-xl bg-blue-600 px-6 py-4 font-black text-white transition hover:bg-blue-700"
              >
                Open Dealer Dashboard →
              </Link>
              <p className="mt-4 text-center text-xs text-slate-500">
                Dealer authentication will be required.
              </p>
            </div>
            {/* NEW DEALER */}
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-3xl">
                🚗
              </div>
              <h3 className="mt-7 text-2xl font-black">
                New Dealer
              </h3>
              <p className="mt-4 leading-7 text-slate-600">
                Join the NorthSky Auto dealer network and gain access to
                vehicle acquisition opportunities from sellers across
                Canada.
              </p>
              <Link
                href="/buyers"
                className="mt-8 inline-flex w-full justify-center rounded-xl bg-slate-950 px-6 py-4 font-black text-white transition hover:bg-slate-800"
              >
                View Dealer Memberships →
              </Link>
              <p className="mt-4 text-center text-xs text-slate-500">
                Choose a membership plan to get started.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* BENEFITS */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="rounded-full bg-slate-100 px-5 py-2 text-sm font-black text-slate-700">
              DEALER NETWORK
            </span>
            <h2 className="mt-6 text-4xl font-black">
              Built for Vehicle Acquisition
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              NorthSky Auto helps dealerships discover and manage potential
              vehicle acquisition opportunities.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <BenefitCard
              icon="🚘"
              title="Vehicle Opportunities"
              description="Discover cars, trucks, SUVs, and commercial vehicles submitted by potential sellers."
            />
            <BenefitCard
              icon="📊"
              title="Dealer Dashboard"
              description="Keep your vehicle opportunities, account information, and dealer activity organized."
            />
            <BenefitCard
              icon="⚡"
              title="Move Faster"
              description="Spend less time searching for inventory and more time evaluating potential acquisitions."
            />
          </div>
        </div>
      </section>
      {/* HOW IT WORKS */}
      <section className="bg-slate-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="rounded-full bg-blue-500/20 px-5 py-2 text-sm font-black text-blue-300">
              HOW IT WORKS
            </span>
            <h2 className="mt-6 text-4xl font-black">
              Get Started in Three Steps
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <StepCard
              number="01"
              title="Choose a Plan"
              description="Select the dealer membership that fits your dealership."
            />
            <StepCard
              number="02"
              title="Complete Checkout"
              description="Complete secure Stripe checkout and begin your dealer onboarding."
            />
            <StepCard
              number="03"
              title="Access Opportunities"
              description="Use your dealer portal to manage your account and access available vehicle opportunities."
            />
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-10 text-center text-white md:p-14">
          <h2 className="text-4xl font-black">
            Ready to Grow Your Inventory?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-100">
            Join the NorthSky Auto dealer network and start exploring
            vehicle acquisition opportunities.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/buyers"
              className="rounded-xl bg-white px-8 py-4 font-black text-blue-700 transition hover:bg-blue-50"
            >
              View Dealer Plans →
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-white/30 px-8 py-4 font-black text-white transition hover:bg-white/10"
            >
              Contact NorthSky Auto
            </Link>
          </div>
        </div>
      </section>
      {/* FOOTER */}
      <footer className="border-t bg-white px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 text-sm text-slate-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} NorthSky Auto. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <Link
              href="/buyers"
              className="font-semibold transition hover:text-blue-600"
            >
              Dealer Plans
            </Link>
            <Link
              href="/sell"
              className="font-semibold transition hover:text-blue-600"
            >
              Sell a Vehicle
            </Link>
            <Link
              href="/contact"
              className="font-semibold transition hover:text-blue-600"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
function BenefitCard({ icon, title, description }) {
  return (
    <div className="rounded-3xl bg-slate-50 p-7 ring-1 ring-slate-200">
      <div className="text-4xl">{icon}</div>
      <h3 className="mt-5 text-xl font-black">
        {title}
      </h3>
      <p className="mt-3 leading-7 text-slate-600">
        {description}
      </p>
    </div>
  );
}
function StepCard({ number, title, description }) {
  return (
    <div className="rounded-3xl bg-white/10 p-8">
      <div className="text-4xl font-black text-blue-400">
        {number}
      </div>
      <h3 className="mt-5 text-xl font-black">
        {title}
      </h3>
      <p className="mt-3 leading-7 text-slate-300">
        {description}
      </p>
    </div>
  );
}