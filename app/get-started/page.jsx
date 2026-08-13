import Link from "next/link";
export const metadata = {
  title: "Get Started | NorthSky Auto",
  description:
    "Get started with NorthSky Auto. Sell your vehicle or join our dealer marketplace to discover vehicle acquisition opportunities.",
  alternates: {
    canonical: "https://northsky-auto.vercel.app/get-started",
  },
};
export default function GetStartedPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl text-center">
          <span className="inline-flex rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm font-semibold text-blue-300">
            NORTHSKY AUTO
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl">
            Get Started With NorthSky Auto
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Whether you're selling a vehicle or looking for dealership
            inventory, NorthSky Auto gives you a simple way to get started.
          </p>
        </div>
      </section>
      {/* CHOICES */}
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          {/* SELLER */}
          <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-2xl">
            <div className="text-4xl">🚗</div>
            <h2 className="mt-5 text-2xl font-bold">
              Sell Your Vehicle
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              Have a vehicle you're looking to sell? Submit your vehicle
              information and create an opportunity for dealerships looking
              for inventory.
            </p>
            <div className="mt-8 space-y-3 text-sm text-slate-300">
              <p>✓ Submit vehicle details</p>
              <p>✓ Provide mileage and condition</p>
              <p>✓ Tell us about your selling timeline</p>
              <p>✓ Get your vehicle opportunity into the marketplace</p>
            </div>
            <Link
              href="/sell"
              className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-6 py-4 font-bold transition hover:bg-blue-500"
            >
              Sell Your Vehicle →
            </Link>
          </div>
          {/* DEALER */}
          <div className="rounded-3xl border border-blue-500/30 bg-slate-900 p-8 shadow-2xl">
            <div className="text-4xl">🏢</div>
            <h2 className="mt-5 text-2xl font-bold">
              Join as a Dealer
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              Looking for inventory? Join NorthSky Auto to discover vehicle
              acquisition opportunities and build your dealership pipeline.
            </p>
            <div className="mt-8 space-y-3 text-sm text-slate-300">
              <p>✓ Browse vehicle opportunities</p>
              <p>✓ Filter by make, model, year and province</p>
              <p>✓ Save promising leads</p>
              <p>✓ Build your acquisition pipeline</p>
            </div>
            <Link
              href="/dealer"
              className="mt-8 inline-flex w-full items-center justify-center rounded-xl border border-blue-400 bg-blue-600 px-6 py-4 font-bold transition hover:bg-blue-500"
            >
              Dealer Sign Up →
            </Link>
          </div>
        </div>
      </section>
      {/* HOW IT WORKS */}
      <section className="border-t border-slate-800 bg-slate-900/60 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold">
              How NorthSky Auto Works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              A simple marketplace connecting vehicle sellers with dealerships
              looking for inventory opportunities.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {[
              ["01", "Vehicle Submitted", "A seller submits vehicle information."],
              ["02", "Opportunity Created", "NorthSky Auto organizes the vehicle opportunity."],
              ["03", "Dealer Discovers", "Dealers can discover relevant opportunities."],
              ["04", "Dealer Takes Action", "Dealers can save and pursue promising leads."],
            ].map(([number, title, description]) => (
              <div
                key={number}
                className="rounded-2xl border border-slate-800 bg-slate-950 p-6"
              >
                <div className="text-sm font-bold text-blue-400">
                  {number}
                </div>
                <h3 className="mt-3 font-bold">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* FINAL CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center sm:p-14">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Choose the path that's right for you and start using NorthSky Auto.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/sell"
              className="rounded-xl bg-blue-600 px-7 py-4 font-bold hover:bg-blue-500"
            >
              Sell Your Vehicle
            </Link>
            <Link
              href="/dealer"
              className="rounded-xl border border-slate-600 px-7 py-4 font-bold hover:bg-slate-800"
            >
              I'm a Dealer
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}