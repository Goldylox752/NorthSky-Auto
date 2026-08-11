import Link from "next/link";
export const metadata = {
  title: "Dealer Dashboard | NorthSky Auto",
  description:
    "Manage your NorthSky Auto dealership account, review vehicle opportunities, saved vehicles, analytics, and dealer membership.",
};
export default async function DealerDashboardPage({
  searchParams,
}) {
  const params = await searchParams;
  const checkoutSuccess = params?.checkout === "success";
  const checkoutCancelled = params?.checkout === "cancelled";
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-8 md:py-10">
        {/* HEADER */}
        <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-800 p-8 text-white shadow-xl md:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="inline-flex rounded-full bg-blue-500/20 px-4 py-2 text-xs font-black tracking-wide text-blue-300 ring-1 ring-blue-400/20">
                NORTHSKY AUTO DEALER PORTAL
              </span>
              <h1 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
                Dealer Dashboard
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
                Manage your dealership account, review vehicle acquisition
                opportunities, track your activity, and manage your dealer
                membership.
              </p>
            </div>
            <Link
              href="/dealer/leads"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-black text-blue-700 transition hover:bg-blue-50"
            >
              Browse Vehicle Leads →
            </Link>
          </div>
        </section>
        {/* CHECKOUT SUCCESS */}
        {checkoutSuccess && (
          <section className="mt-6">
            <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 font-black text-green-700">
                  ✓
                </div>
                <div>
                  <h2 className="font-black text-green-900">
                    Checkout completed
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-green-800">
                    Your Stripe checkout was completed successfully. Your
                    dealer membership is being processed and your account
                    status will update after Stripe confirms the subscription.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      href="/dealer/subscriptions"
                      className="inline-flex rounded-lg bg-green-700 px-4 py-2 text-sm font-black text-white transition hover:bg-green-800"
                    >
                      View Membership
                    </Link>
                    <Link
                      href="/dealer/leads"
                      className="inline-flex rounded-lg border border-green-300 px-4 py-2 text-sm font-black text-green-800 transition hover:bg-green-100"
                    >
                      Browse Leads
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        {/* CHECKOUT CANCELLED */}
        {checkoutCancelled && (
          <section className="mt-6">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 font-black text-amber-700">
                  !
                </div>
                <div>
                  <h2 className="font-black text-amber-900">
                    Checkout cancelled
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-amber-800">
                    No membership payment was completed. You can return to the
                    dealer plans whenever you're ready.
                  </p>
                  <Link
                    href="/buyers"
                    className="mt-4 inline-flex rounded-lg bg-amber-600 px-4 py-2 text-sm font-black text-white transition hover:bg-amber-700"
                  >
                    View Dealer Plans
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}
        {/* DASHBOARD STATS */}
        <section className="mt-8">
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon="🚗"
              label="Vehicle Opportunities"
              value="—"
              description="Available vehicle leads"
              href="/dealer/leads"
            />
            <StatCard
              icon="⭐"
              label="Saved Vehicles"
              value="—"
              description="Vehicles saved for review"
              href="/dealer/saved"
            />
            <StatCard
              icon="📊"
              label="Acquisition Activity"
              value="—"
              description="Your current lead activity"
              href="/dealer/analytics"
            />
            <StatCard
              icon="💳"
              label="Membership"
              value="View"
              description="Manage your dealer plan"
              href="/dealer/subscriptions"
            />
          </div>
        </section>
        {/* MAIN CONTENT */}
        <section className="mt-8 grid gap-6 xl:grid-cols-3">
          {/* VEHICLE MARKETPLACE */}
          <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 md:p-8 xl:col-span-2">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-blue-600">
                  Marketplace
                </span>
                <h2 className="mt-2 text-2xl font-black">
                  Vehicle Opportunities
                </h2>
                <p className="mt-2 text-slate-600">
                  Review vehicles submitted by potential sellers.
                </p>
              </div>
              <Link
                href="/dealer/leads"
                className="inline-flex justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700"
              >
                View Vehicle Leads →
              </Link>
            </div>
            <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
              <div className="text-5xl">🚘</div>
              <h3 className="mt-5 text-xl font-black">
                Vehicle marketplace
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
                Vehicle submissions will appear in the dealer marketplace as
                they become available and meet your dealer access
                requirements.
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
          <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 md:p-8">
            <span className="text-xs font-black uppercase tracking-wider text-blue-600">
              Account
            </span>
            <h2 className="mt-2 text-2xl font-black">
              Dealer Account
            </h2>
            <p className="mt-2 text-slate-600">
              Manage your dealership information and membership.
            </p>
            <div className="mt-7 space-y-3">
              <AccountLink
                href="/dealer/profile"
                icon="🏢"
                title="Dealer Profile"
                description="Business information"
              />
              <AccountLink
                href="/dealer/subscriptions"
                icon="💳"
                title="Membership"
                description="Plan and billing"
              />
              <AccountLink
                href="/dealer/analytics"
                icon="📈"
                title="Analytics"
                description="Dealer activity"
              />
              <AccountLink
                href="/dealer/settings"
                icon="⚙️"
                title="Settings"
                description="Account preferences"
              />
            </div>
          </div>
        </section>
        {/* QUICK ACTIONS */}
        <section className="mt-8 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white shadow-lg md:p-10">
          <div className="grid gap-8 lg:grid-cols-3 lg:items-center">
            <div className="lg:col-span-2">
              <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-wide text-blue-100">
                Quick Actions
              </span>
              <h2 className="mt-5 text-3xl font-black">
                Find Your Next Acquisition
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-blue-100">
                Browse vehicle opportunities, save promising vehicles, and
                organize your dealership's acquisition pipeline.
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
        </section>
        {/* MEMBERSHIP */}
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-blue-600">
                Dealer Membership
              </span>
              <h2 className="mt-2 text-2xl font-black">
                Manage Your Membership
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Your NorthSky Auto dealer membership and recurring billing are
                managed through Stripe. Choose between the available Starter
                and Professional memberships.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                href="/dealer/subscriptions"
                className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800"
              >
                Manage Membership
              </Link>
              <Link
                href="/buyers"
                className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-black text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
              >
                View Plans
              </Link>
            </div>
          </div>
        </section>
        {/* FOOTER */}
        <footer className="py-10">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-semibold text-slate-500">
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
              href="/sell"
              className="transition hover:text-blue-600"
            >
              Sell a Vehicle
            </Link>
            <Link
              href="/contact"
              className="transition hover:text-blue-600"
            >
              Contact
            </Link>
          </div>
          <p className="mt-5 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} NorthSky Auto. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
}
function StatCard({
  icon,
  label,
  value,
  description,
  href,
}) {
  const content = (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="text-3xl">{icon}</div>
        <span className="text-sm font-black text-blue-600">
          →
        </span>
      </div>
      <p className="mt-5 text-sm font-bold text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-3xl font-black">
        {value}
      </p>
      <p className="mt-2 text-sm text-slate-500">
        {description}
      </p>
    </div>
  );
  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }
  return content;
}
function AccountLink({
  href,
  icon,
  title,
  description,
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xl transition group-hover:bg-blue-100">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-black text-slate-900">
          {title}
        </p>
        <p className="mt-1 text-xs font-medium text-slate-500">
          {description}
        </p>
      </div>
      <span className="font-black text-slate-400 transition group-hover:text-blue-600">
        →
      </span>
    </Link>
  );
}