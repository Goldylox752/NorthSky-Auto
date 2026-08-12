import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const metadata = {
  title: "Dealer Dashboard | NorthSky Auto",
  description:
    "Manage your NorthSky Auto dealer account, subscription, and vehicle acquisition opportunities.",
};

function formatPlan(plan) {
  if (!plan) return "No Active Plan";

  const plans = {
    starter: "Dealer Starter",
    professional: "Dealer Professional",
  };

  return (
    plans[String(plan).toLowerCase()] ||
    String(plan)
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase())
  );
}

function formatStatus(status) {
  if (!status) return "Inactive";

  return String(status)
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function statusClasses(status) {
  const value = String(status || "").toLowerCase();

  if (
    value === "active" ||
    value === "trialing"
  ) {
    return "bg-green-100 text-green-700 ring-green-200";
  }

  if (
    value === "past_due" ||
    value === "unpaid"
  ) {
    return "bg-yellow-100 text-yellow-700 ring-yellow-200";
  }

  if (
    value === "canceled" ||
    value === "cancelled"
  ) {
    return "bg-red-100 text-red-700 ring-red-200";
  }

  return "bg-slate-100 text-slate-600 ring-slate-200";
}

async function getDealer() {
  /*
   * This dashboard supports a dealer ID or email
   * passed through the URL while authentication is
   * being finalized.
   *
   * Example:
   * /dealer/dashboard?dealer_id=YOUR_ID
   */
  return null;
}

async function getVehicleCount() {
  try {
    const { count, error } = await supabase
      .from("vehicles")
      .select("*", {
        count: "exact",
        head: true,
      });

    if (error) {
      console.error(
        "Vehicle count error:",
        error
      );
      return 0;
    }

    return count || 0;
  } catch (error) {
    console.error(
      "Vehicle count failed:",
      error
    );

    return 0;
  }
}

function StatCard({
  icon,
  label,
  value,
  description,
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500">
            {label}
          </p>

          <p className="mt-3 text-3xl font-black text-slate-950">
            {value}
          </p>

          {description && (
            <p className="mt-2 text-sm text-slate-500">
              {description}
            </p>
          )}
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default async function DealerDashboardPage({
  searchParams,
}) {
  const params = await searchParams;

  const checkout =
    params?.checkout || "";

  const sessionId =
    params?.session_id || "";

  /*
   * We intentionally don't fabricate dealer data.
   * Until authentication is connected, the dashboard
   * displays a safe onboarding state.
   */
  const dealer = await getDealer();

  const vehicleCount =
    await getVehicleCount();

  const dealerName =
    dealer?.business_name ||
    dealer?.company_name ||
    dealer?.name ||
    "Dealer";

  const subscriptionStatus =
    dealer?.subscription_status ||
    "inactive";

  const subscriptionPlan =
    dealer?.subscription_plan ||
    null;

  const isActive =
    subscriptionStatus === "active" ||
    subscriptionStatus === "trialing";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5">
          <div>
            <Link
              href="/"
              className="text-xl font-black tracking-tight text-slate-950"
            >
              NorthSky Auto
            </Link>

            <p className="mt-1 text-sm text-slate-500">
              Dealer Dashboard
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/buyers"
              className="hidden rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50 sm:inline-flex"
            >
              Dealer Plans
            </Link>

            <Link
              href="/"
              className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              Home
            </Link>
          </div>
        </div>
      </header>

      {/* CHECKOUT SUCCESS */}
      {checkout === "success" && (
        <section className="border-b border-green-200 bg-green-50">
          <div className="mx-auto max-w-7xl px-6 py-5">
            <div className="flex gap-4">
              <div className="text-2xl">
                ✓
              </div>

              <div>
                <h2 className="font-black text-green-900">
                  Payment successful
                </h2>

                <p className="mt-1 text-sm leading-6 text-green-800">
                  Your Stripe checkout was completed.
                  Your dealer subscription will appear
                  here once the Stripe webhook finishes
                  updating your dealer account.
                </p>

                {sessionId && (
                  <p className="mt-2 break-all text-xs text-green-700">
                    Checkout session: {sessionId}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* HERO */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 px-6 py-14 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-blue-300">
                Dealer Portal
              </p>

              <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
                Welcome, {dealerName}
              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                Manage your NorthSky Auto dealer account
                and discover vehicle acquisition
                opportunities.
              </p>
            </div>

            <div
              className={`inline-flex items-center gap-2 self-start rounded-full px-4 py-2 text-sm font-black ring-1 lg:self-auto ${statusClasses(
                subscriptionStatus
              )}`}
            >
              <span className="h-2 w-2 rounded-full bg-current" />
              {formatStatus(subscriptionStatus)}
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD */}
      <section className="px-6 py-10">
        <div className="mx-auto max-w-7xl">
          {/* ACTIVE SUBSCRIPTION */}
          <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-widest text-blue-600">
                  Membership
                </p>

                <h2 className="mt-2 text-2xl font-black text-slate-950">
                  {formatPlan(
                    subscriptionPlan
                  )}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Subscription status:{" "}
                  <span className="font-bold">
                    {formatStatus(
                      subscriptionStatus
                    )}
                  </span>
                </p>
              </div>

              <Link
                href="/dealer/subscriptions"
                className="inline-flex justify-center rounded-xl bg-blue-600 px-6 py-3 font-black text-white transition hover:bg-blue-700"
              >
                Manage Subscription →
              </Link>
            </div>
          </div>

          {/* STATS */}
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon="🚗"
              label="Vehicle Opportunities"
              value={vehicleCount}
              description="Currently in marketplace"
            />

            <StatCard
              icon="⭐"
              label="Saved Vehicles"
              value="—"
              description="Available in dealer portal"
            />

            <StatCard
              icon="📊"
              label="Active Leads"
              value="—"
              description="Your acquisition pipeline"
            />

            <StatCard
              icon="💳"
              label="Membership"
              value={
                isActive
                  ? "Active"
                  : "Inactive"
              }
              description={formatPlan(
                subscriptionPlan
              )}
            />
          </div>

          {/* ACTIONS */}
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <Link
              href="/dealer/leads"
              className="group rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-4xl">
                🔎
              </div>

              <h2 className="mt-5 text-xl font-black">
                Vehicle Opportunities
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Browse available vehicle submissions
                and identify potential inventory
                opportunities.
              </p>

              <span className="mt-6 inline-block font-black text-blue-600 group-hover:underline">
                View Opportunities →
              </span>
            </Link>

            <Link
              href="/dealer/saved"
              className="group rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-4xl">
                ⭐
              </div>

              <h2 className="mt-5 text-xl font-black">
                Saved Vehicles
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Review vehicle opportunities you've
                saved for additional research or
                follow-up.
              </p>

              <span className="mt-6 inline-block font-black text-blue-600 group-hover:underline">
                View Saved →
              </span>
            </Link>

            <Link
              href="/dealer/analytics"
              className="group rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-4xl">
                📊
              </div>

              <h2 className="mt-5 text-xl font-black">
                Acquisition Analytics
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Monitor your vehicle sourcing activity
                and acquisition pipeline.
              </p>

              <span className="mt-6 inline-block font-black text-blue-600 group-hover:underline">
                View Analytics →
              </span>
            </Link>
          </div>

          {/* ACCOUNT MANAGEMENT */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Link
              href="/dealer/profile"
              className="rounded-3xl bg-slate-950 p-8 text-white transition hover:bg-slate-900"
            >
              <div className="text-3xl">
                👤
              </div>

              <h2 className="mt-5 text-2xl font-black">
                Dealer Profile
              </h2>

              <p className="mt-3 leading-7 text-slate-300">
                Manage your dealership information,
                contact details, and account profile.
              </p>

              <span className="mt-6 inline-block font-black text-blue-400">
                Manage Profile →
              </span>
            </Link>

            <Link
              href="/dealer/settings"
              className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition hover:shadow-lg"
            >
              <div className="text-3xl">
                ⚙️
              </div>

              <h2 className="mt-5 text-2xl font-black">
                Dealer Settings
              </h2>

              <p className="mt-3 leading-7 text-slate-500">
                Manage account preferences,
                notifications, and dealer settings.
              </p>

              <span className="mt-6 inline-block font-black text-blue-600">
                Open Settings →
              </span>
            </Link>
          </div>

          {/* NO SUBSCRIPTION */}
          {!isActive && (
            <div className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-8">
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                <div>
                  <p className="text-sm font-black uppercase tracking-widest text-blue-600">
                    Get Started
                  </p>

                  <h2 className="mt-2 text-2xl font-black text-slate-950">
                    Activate your dealer membership
                  </h2>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                    Choose a NorthSky Auto dealer plan
                    to access the dealer marketplace and
                    available vehicle acquisition
                    opportunities.
                  </p>
                </div>

                <Link
                  href="/buyers#plans"
                  className="inline-flex justify-center rounded-xl bg-blue-600 px-6 py-3 font-black text-white transition hover:bg-blue-700"
                >
                  View Dealer Plans →
                </Link>
              </div>
            </div>
          )}

          {/* DISCLAIMER */}
          <div className="mt-10 rounded-2xl bg-slate-100 p-5 text-center text-xs leading-6 text-slate-500">
            Vehicle opportunities are subject to
            availability and seller activity. NorthSky
            Auto does not guarantee that a particular
            vehicle will be available, purchased, or
            acquired by a dealership.
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} NorthSky Auto.
          Canadian Vehicle Marketplace.
        </div>
      </footer>
    </main>
  );
}