import Link from "next/link";
export const metadata = {
  title: "Dealer Dashboard | NorthSky Auto",
  description:
    "Manage your NorthSky Auto dealership account, vehicle opportunities, saved vehicles, analytics, and subscription.",
};
export default async function DealerDashboardPage({ searchParams }) {
  const params = await searchParams;
  const checkoutSuccess = params?.checkout === "success";
  const checkoutCancelled = params?.checkout === "cancelled";
  return (
    <div className="mx-auto max-w-7xl">
      {/* PAGE HEADER */}
      <section className="rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-800 p-8 text-white shadow-xl md:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-flex rounded-full bg-blue-500/20 px-4 py-2 text-xs font-black tracking-wide text-blue-300">
              DEALER PORTAL
            </span>
            <h1 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
              Dealer Dashboard
            </h1>
            <p className="mt-4 max-w-2xl leading-7 text-slate-300">
              Manage your dealership, review vehicle opportunities, track
              activity, and manage your NorthSky Auto membership.
            </p>
          </div>
          <Link
            href="/dealer/leads"
            className="inline-flex justify-center rounded-xl bg-white px-6 py-3 font-black text-blue-700 transition hover:bg-blue-50"
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
                  Payment successful
                </h2>
                <p className="mt-1 text-sm leading-6 text-green-800">
                  Your dealer membership checkout was completed successfully.
                  Stripe is processing your subscription and your account will
                  be updated through the subscription webhook.
                </p>
                <Link
                  href="/dealer/subscriptions"
                  className="mt-3 inline-flex font-bold text-green-800 underline"
                >
                  View Subscription →
                </Link>
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
                  No payment was completed. Your existing account has not been
                  changed.
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
      {/* STATS */}
      <section className="mt-8">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon="🚗"
            label="Vehicle Opportunities"
            value="—"
            description="Available vehicle leads"
          />
          <StatCard
            icon="⭐"
            label="Saved Vehicles"
            value="—"
            description="Vehicles saved for review"
          />
          <StatCard
            icon="📊"
            label="Acquisition Leads"
            value="—"
            description="Your current lead activity"
          />
          <StatCard
            icon="💳"
            label="Membership"
            value="Active"
            description="Subscription status"
            href="/dealer/subscriptions"
          />
        </div>
      </section>
      {/* MAIN CONTENT */}
      <section className="mt-8 grid gap-6 xl:grid-cols-3">
        {/* VEHICLE OPPORTUNITIES */}
        <div className="xl:col-span-2 rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 md:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-blue-600">
                Marketplace
              </span>
              <h2 className="mt-2 text-2xl font-black">
                Vehicle Opportunities
              </h2>
              <p className="mt-2 text-slate-600">
                Review available vehicles submitted by potential sellers.
              </p>
            </div>
            <Link
              href="/dealer/leads"
              className="inline-flex justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700"
            >
              View All Leads →
            </Link>
          </div>
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
            <div className="text-5xl">🚘</div>
            <h3 className="mt-5 text-xl font-black">
              Vehicle marketplace ready
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
              Vehicle submissions will appear here as they become available
              to your dealership.
            </p>
            <Link
              href="/dealer/leads"
              className="mt-6 inline-flex rounded-xl bg-slate-950 px-6 py-3 font-black text-white transition hover:bg-slate-800"
            >
              Open Vehicle Marketplace
            </Link>
          </div>
        </div>
        {/* DEALER ACCOUNT */}
        <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 md:p-8">
          <span className="text-xs font-black uppercase tracking-wider text-blue-600">
            Account
          </span>
          <h2 className="mt-2 text-2xl font-black">
            Dealer Account
          </h2>
          <p className="mt-2 text-slate-600">
            Manage your dealership account and membership.
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
              title="Subscription"
              description="Manage membership"
            />
            <AccountLink
              href="/dealer/analytics"
              icon="📈"
              title="Analytics"
              description="View dealer activity"
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
      <section className="mt-8 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white shadow-lg md:p-10">
        <div className="grid gap-8 lg:grid-cols-3 lg:items-center">
          <div className="lg:col-span-2">
            <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-wide text-blue-100">
              Quick Actions
            </span>
            <h2 className="mt-5 text-3xl font-black">
              Ready to find more inventory?
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-blue-100">
              Browse vehicle opportunities, save promising vehicles, and
              build your dealership acquisition pipeline.
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
      {/* ACCOUNT STATUS */}
      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-black">
              Dealer Membership
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Your subscription status and billing information are managed
              through Stripe.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/dealer/subscriptions"
              className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800"
            >
              Manage Subscription
            </Link>
            <Link
              href="/buyers"
              className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
            >
              View Plans
            </Link>
          </div>
        </div>
      </section>
      {/* FOOTER LINKS */}
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
            href="/contact"
            className="transition hover:text-blue-600"
          >
            Contact
          </Link>
        </div>
      </footer>
    </div>
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
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="text-3xl">{icon}</div>
        {href && (
          <span className="text-sm font-black text-blue-600">
            →
          </span>
        )}
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