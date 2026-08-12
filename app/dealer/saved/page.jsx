import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Saved Vehicle Leads | NorthSky Auto Dealer Portal",
  description:
    "Manage saved vehicle acquisition opportunities and review potential inventory purchases through NorthSky Auto.",
};

export default function SavedLeadsPage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      {/* HERO */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <Link
            href="/dealer/dashboard"
            className="text-sm font-bold text-blue-300 transition hover:text-white"
          >
            ← Dealer Dashboard
          </Link>

          <div className="mt-8 max-w-4xl">
            <span className="inline-flex rounded-full bg-blue-500/20 px-5 py-2 text-xs font-black uppercase tracking-widest text-blue-300 ring-1 ring-blue-400/20">
              Dealer Workspace
            </span>

            <h1 className="mt-6 text-4xl font-black tracking-tight md:text-6xl">
              Saved Vehicle
              <span className="block text-blue-400">
                Opportunities
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
              Keep track of vehicle acquisition opportunities
              you want to review, follow up on, or potentially
              purchase for your dealership.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* SAVED OPPORTUNITIES */}
          <div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-blue-600">
                  Dealer Marketplace
                </span>

                <h2 className="mt-2 text-3xl font-black">
                  Your Saved Vehicles
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Vehicles you save from the marketplace will
                  appear here.
                </p>
              </div>

              <Link
                href="/dealer/leads"
                className="inline-flex rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-blue-700"
              >
                Browse Vehicle Leads →
              </Link>
            </div>

            {/* EMPTY STATE */}
            <div className="mt-8 rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200 md:p-14">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-4xl">
                ⭐
              </div>

              <h3 className="mt-6 text-2xl font-black">
                No Saved Vehicles Yet
              </h3>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600">
                When you find a promising vehicle acquisition
                opportunity, save it here so you can quickly
                return to it later.
              </p>

              <Link
                href="/dealer/leads"
                className="mt-8 inline-flex rounded-xl bg-blue-600 px-7 py-3.5 font-black text-white transition hover:bg-blue-700"
              >
                Find Vehicle Opportunities
              </Link>
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-6">
            <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
              <span className="text-xs font-black uppercase tracking-widest text-blue-600">
                Saved Pipeline
              </span>

              <h2 className="mt-3 text-2xl font-black">
                Organize Your Inventory Search
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                Save promising seller submissions while you
                compare vehicles, pricing, mileage, location,
                and acquisition potential.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-950 p-7 text-white shadow-xl">
              <div className="text-3xl">🚘</div>

              <h2 className="mt-4 text-xl font-black">
                Looking for Inventory?
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                Browse current seller-submitted vehicle
                opportunities available through NorthSky Auto.
              </p>

              <Link
                href="/dealer/leads"
                className="mt-6 block rounded-xl bg-blue-600 px-5 py-3.5 text-center text-sm font-black text-white transition hover:bg-blue-500"
              >
                Browse Leads
              </Link>
            </div>

            <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-xl font-black">
                Dealer Membership
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Manage your dealer membership and account
                settings from your dealer portal.
              </p>

              <Link
                href="/buyers"
                className="mt-5 block rounded-xl border border-slate-300 px-5 py-3 text-center text-sm font-black text-slate-700 transition hover:bg-slate-50"
              >
                Manage Membership
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-10 text-center text-white shadow-xl md:p-14">
          <span className="text-xs font-black uppercase tracking-widest text-blue-100">
            NorthSky Auto
          </span>

          <h2 className="mt-5 text-3xl font-black md:text-4xl">
            Build Your Acquisition Pipeline
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-blue-100 md:text-base">
            Discover seller-submitted vehicles, evaluate
            acquisition opportunities, and build your dealership
            inventory pipeline.
          </p>

          <Link
            href="/dealer/leads"
            className="mt-8 inline-flex rounded-xl bg-white px-8 py-4 font-black text-blue-700 transition hover:bg-blue-50"
          >
            Browse Vehicle Opportunities →
          </Link>
        </div>
      </section>

      {/* DISCLOSURE */}
      <section className="bg-slate-50 px-6 py-8">
        <div className="mx-auto max-w-4xl text-center text-xs leading-6 text-slate-500">
          Saved vehicle opportunities are intended for dealer
          workflow and organization. Vehicle availability,
          condition, pricing, seller information, and acquisition
          opportunities are not guaranteed. Dealers should conduct
          their own due diligence before proceeding with any
          transaction.
        </div>
      </section>
    </main>
  );
}