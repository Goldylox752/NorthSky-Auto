import Link from "next/link";
export const metadata = {
  title: "Dealer Dashboard | NorthSky Auto",
  description:
    "NorthSky Auto dealer dashboard for vehicle acquisition opportunities, subscriptions, and dealer account management.",
};
export default async function DealerDashboardPage({
  searchParams,
}) {
  const params = await searchParams;
  const checkoutSuccess =
    params?.checkout === "success";
  const checkoutCancelled =
    params?.checkout === "cancelled";
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* HEADER */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-800 px-6 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex rounded-full bg-blue-500/20 px-4 py-2 text-xs font-black tracking-wide text-blue-300">
                NORTHSKY AUTO DEALER PORTAL
              </span>
              <h1 className="mt-5 text-4xl font-black md:text-5xl">
                Dealer Dashboard
              </h1>
              <p className="mt-4 max-w-2xl text-slate-300">
                Manage your dealer account, review vehicle opportunities,
                and manage your NorthSky Auto membership.
              </p>
            </div>
            <Link
              href="/buyers"
              className="inline-flex rounded-xl bg-white px-6 py-3 font-black text-blue-700 transition hover:bg-blue-50"
            >
              View Dealer Plans
            </Link>
          </div>
        </div>
      </section>
      {/* CHECKOUT SUCCESS */}
      {checkoutSuccess && (
        <section className="px-6 pt-8">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
              <div className="flex gap-4">
                <div className="text-2xl">✓</div>
                <div>
                  <h2 className="font-black text-green-900">
                    Payment successful
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-green-800">
                    Your NorthSky Auto dealer membership checkout was
                    completed successfully. Your subscription is being
                    activated through Stripe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {/* CHECKOUT CANCELLED */}
      {checkoutCancelled && (
        <section className="px-6 pt-8">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <div className="flex gap-4">
                <div className="text-2xl">!</div>
                <div>
                  <h2 className="font-black text-amber-900">
                    Checkout cancelled
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-amber-800">
                    No payment was completed. You can return to the
                    dealer plans whenever you're ready.
                  </p>
                  <Link
                    href="/buyers"
                    className="mt-4 inline-flex rounded-lg bg-amber-600 px-4 py-2 text-sm font-black text-white transition hover:bg-amber-700"
                  >
                    Return to Dealer Plans
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {/* DASHBOARD */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          {/* STATS */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
              <div className="text-3xl">🚗</div>
              <p className="mt-5 text-sm font-bold text-slate-500">
                Vehicle Opportunities
              </p>
              <p className="mt-2 text-4xl font-black">
                —
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Available opportunities will appear here.
              </p>
            </div>
            <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
              <div className="text-3xl">⭐</div>
              <p className="mt-5 text-sm font-bold text-slate-500">
                Saved Vehicles
              </p>
              <p className="mt-2 text-4xl font-black">
                —
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Save opportunities you want to review later.
              </p>
            </div>
            <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
              <div className="text-3xl">📊</div>
              <p className="mt-5 text-sm font-bold text-slate-500">
                Leads
              </p>
              <p className="mt-2 text-4xl font-black">
                —
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Your vehicle acquisition activity will appear here.
              </p>
            </div>
            <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
              <div className="text-3xl">💳</div>
              <p className="mt-5 text-sm font-bold text-slate-500">
                Membership
              </p>
              <p className="mt-2 text-xl font-black text-blue-600">
                Account
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Manage your dealer subscription.
              </p>
            </div>
          </div>
          {/* MAIN GRID */}
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {/* VEHICLE OPPORTUNITIES */}
            <div className="lg:col-span-2 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-black">
                    Vehicle Opportunities
                  </h2>
                  <p className="mt-2 text-slate-600">
                    Browse available vehicle acquisition opportunities.
                  </p>
                </div>
                <Link
                  href="/dealer/leads"
                  className="inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700"
                >
                  View Leads →
                </Link>
              </div>
              <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
                <div className="text-4xl">🚘</div>
                <h3 className="mt-4 text-xl font-black">
                  No vehicle opportunities yet
                </h3>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
                  New seller submissions will appear in your dealer
                  marketplace when they become available.
                </p>
                <Link
                  href="/dealer/leads"
                  className="mt-6 inline-flex rounded-xl bg-slate-950 px-6 py-3 font-black text-white transition hover:bg-slate-800"
                >
                  Open Vehicle Marketplace
                </Link>
              </div>
            </div>
            {/* ACCOUNT */}
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-2xl font-black">
                Dealer Account
              </h2>
              <p className="mt-2 text-slate-600">
                Manage your dealership information and membership.
              </p>
              <div className="mt-8 space-y-3">
                <Link
                  href="/dealer/profile"
                  className="flex items-center justify-between rounded-xl border border-slate-200 px-5 py-4 font-bold transition hover:bg-slate-50"
                >
                  <span>Dealer Profile</span>
                  <span>→</span>
                </Link>
                <Link
                  href="/dealer/subscriptions"
                  className="flex items-center justify-between rounded-xl border border-slate-200 px-5 py-4 font-bold transition hover:bg-slate-50"
                >
                  <span>Subscription</span>
                  <span>→</span>
                </Link>
                <Link
                  href="/dealer/analytics"
                  className="flex items-center justify-between rounded-xl border border-slate-200 px-5 py-4 font-bold transition hover:bg-slate-50"
                >
                  <span>Analytics</span>
                  <span>→</span>
                </Link>
                <Link
                  href="/dealer/settings"
                  className="flex items-center justify-between rounded-xl border border-slate-200 px-5 py-4 font-bold transition hover:bg-slate-50"
                >
                  <span>Settings</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
          {/* QUICK ACTIONS */}
          <div className="mt-10 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white md:p-10">
            <div className="grid gap-8 md:grid-cols-3 md:items-center">
              <div className="md:col-span-2">
                <h2 className="text-3xl font-black">
                  Ready to find more inventory?
                </h2>
                <p className="mt-3 max-w-2xl leading-7 text-blue-100">
                  Review vehicle opportunities, save promising vehicles,
                  and build your dealership acquisition pipeline.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link
                  href="/dealer/leads"
                  className="rounded-xl bg-white px-6 py-4 text-center font-black text-blue-700 transition hover:bg-blue-50"
                >
                  Browse Vehicle Leads
                </Link>
                <Link
                  href="/dealer/saved"
                  className="rounded-xl border border-white/30 px-6 py-4 text-center font-black text-white transition hover:bg-white/10"
                >
                  View Saved Vehicles
                </Link>
              </div>
            </div>
          </div>
          {/* FOOTER NAV */}
          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-semibold text-slate-500">
            <Link
              href="/"
              className="transition hover:text-blue-600"
            >
              NorthSky Auto
            </Link>
            <Link
              href="/buyers"
              className="transition hover:text-blue-600"
            >
              Dealer Plans
            </Link>
            <Link
              href="/contact"
              className="transition hover:text-blue-600"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}