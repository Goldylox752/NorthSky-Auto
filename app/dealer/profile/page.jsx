import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dealer Profile | NorthSky Auto",
  description:
    "Manage your NorthSky Auto dealership profile, business information, membership, and account details.",
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase =
  supabaseUrl && supabaseServiceKey
    ? createClient(
        supabaseUrl,
        supabaseServiceKey,
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false,
          },
        }
      )
    : null;

async function getDealer(dealerId) {
  if (!supabase || !dealerId) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from("dealers")
      .select(
        `
        id,
        dealership_name,
        business_name,
        email,
        phone,
        website,
        address,
        city,
        province,
        postal_code,
        subscription_plan,
        subscription_status,
        created_at
      `
      )
      .eq("id", dealerId)
      .maybeSingle();

    if (error) {
      console.error(
        "Dealer profile lookup failed:",
        error
      );

      return null;
    }

    return data;
  } catch (error) {
    console.error(
      "Dealer profile error:",
      error
    );

    return null;
  }
}

function formatPlan(plan) {
  if (!plan) {
    return "No Active Plan";
  }

  const plans = {
    starter: "Dealer Starter",
    professional: "Dealer Professional",
    pro: "Dealer Professional",
  };

  const normalized = String(plan).toLowerCase();

  return (
    plans[normalized] ||
    String(plan)
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase()
      )
  );
}

function formatStatus(status) {
  if (!status) {
    return "Inactive";
  }

  const labels = {
    active: "Active",
    trialing: "Trial",
    past_due: "Past Due",
    canceled: "Canceled",
    cancelled: "Canceled",
    incomplete: "Incomplete",
    incomplete_expired: "Expired",
    unpaid: "Unpaid",
  };

  const normalized = String(status).toLowerCase();

  return (
    labels[normalized] ||
    String(status)
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase()
      )
  );
}

function getStatusClasses(status) {
  const normalized = String(
    status || ""
  ).toLowerCase();

  if (
    normalized === "active" ||
    normalized === "trialing"
  ) {
    return "bg-green-100 text-green-700 ring-green-200";
  }

  if (
    normalized === "past_due" ||
    normalized === "incomplete"
  ) {
    return "bg-amber-100 text-amber-700 ring-amber-200";
  }

  if (
    normalized === "canceled" ||
    normalized === "cancelled" ||
    normalized === "incomplete_expired" ||
    normalized === "unpaid"
  ) {
    return "bg-red-100 text-red-700 ring-red-200";
  }

  return "bg-slate-100 text-slate-700 ring-slate-200";
}

function formatDate(value) {
  if (!value) {
    return "Not available";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function ProfileField({
  label,
  value,
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-100">
      <p className="text-xs font-black uppercase tracking-widest text-slate-400">
        {label}
      </p>

      <p className="mt-2 break-words text-sm font-bold text-slate-800">
        {value || "Not provided"}
      </p>
    </div>
  );
}

function QuickLink({
  href,
  icon,
  title,
  description,
  dark = false,
}) {
  return (
    <Link
      href={href}
      className={
        dark
          ? "rounded-3xl bg-slate-950 p-7 text-white transition hover:-translate-y-1 hover:bg-slate-900 hover:shadow-lg"
          : "rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
      }
    >
      <div className="text-3xl">
        {icon}
      </div>

      <h3 className="mt-5 text-xl font-black">
        {title}
      </h3>

      <p
        className={
          dark
            ? "mt-2 text-sm leading-6 text-slate-300"
            : "mt-2 text-sm leading-6 text-slate-600"
        }
      >
        {description}
      </p>

      <span
        className={
          dark
            ? "mt-5 inline-block font-black text-blue-400"
            : "mt-5 inline-block font-black text-blue-600"
        }
      >
        Open →
      </span>
    </Link>
  );
}

export default async function DealerProfilePage({
  searchParams,
}) {
  const params = await searchParams;

  const dealerId =
    params?.dealer_id ||
    params?.dealerId ||
    "";

  const dealer = await getDealer(
    dealerId
  );

  const dealershipName =
    dealer?.dealership_name ||
    dealer?.business_name ||
    "Your Dealership";

  const plan = formatPlan(
    dealer?.subscription_plan
  );

  const status = formatStatus(
    dealer?.subscription_status
  );

  const statusClasses =
    getStatusClasses(
      dealer?.subscription_status
    );

  const initial =
    dealershipName.charAt(0).toUpperCase() ||
    "D";

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">

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
              Dealer Profile
            </p>
          </div>

          <div className="flex items-center gap-3">

            <Link
              href="/dealer/dashboard"
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Dashboard
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

      {/* HERO */}

      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 px-6 py-14 text-white">

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">

            <div>

              <span className="inline-flex rounded-full bg-blue-500/20 px-4 py-2 text-xs font-black uppercase tracking-widest text-blue-300 ring-1 ring-blue-400/20">
                Dealer Portal
              </span>

              <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
                Dealer Profile
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                Manage your dealership information,
                membership, and NorthSky Auto account.
              </p>

            </div>

            <Link
              href="/dealer/dashboard"
              className="inline-flex w-fit rounded-xl border border-white/20 px-6 py-3 font-black text-white transition hover:bg-white/10"
            >
              ← Dashboard
            </Link>

          </div>

        </div>

      </section>

      {/* CONTENT */}

      <section className="px-6 py-10 md:py-14">

        <div className="mx-auto max-w-7xl">

          {/* CONNECTION NOTICE */}

          {!dealer && (
            <div className="mb-8 rounded-3xl border border-amber-200 bg-amber-50 p-7">

              <div className="flex gap-4">

                <div className="text-3xl">
                  ⚠️
                </div>

                <div>

                  <h2 className="text-xl font-black text-amber-950">
                    Dealer profile not connected
                  </h2>

                  <p className="mt-2 max-w-3xl text-sm leading-7 text-amber-800">
                    Your dealer account has not been
                    connected to this profile page yet.
                    Once authentication supplies a valid
                    dealer ID, your dealership information
                    will appear here.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">

                    <Link
                      href="/buyers"
                      className="rounded-xl bg-amber-600 px-5 py-3 text-sm font-black text-white transition hover:bg-amber-700"
                    >
                      View Dealer Plans
                    </Link>

                    <Link
                      href="/contact"
                      className="rounded-xl border border-amber-300 px-5 py-3 text-sm font-black text-amber-900 transition hover:bg-amber-100"
                    >
                      Contact NorthSky Auto
                    </Link>

                  </div>

                </div>

              </div>

            </div>
          )}

          {/* PROFILE SUMMARY */}

          <section className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 md:p-8">

            <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">

              <div className="flex items-center gap-5">

                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-3xl font-black text-white">
                  {initial}
                </div>

                <div>

                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                    Dealership
                  </p>

                  <h2 className="mt-2 text-2xl font-black md:text-3xl">
                    {dealershipName}
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    NorthSky Auto dealer account
                  </p>

                </div>

              </div>

              <div className="flex flex-wrap gap-3">

                <Link
                  href="/dealer/settings"
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
                >
                  Account Settings
                </Link>

                <Link
                  href="/dealer/subscriptions"
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700"
                >
                  Subscription
                </Link>

              </div>

            </div>

          </section>

          {/* BUSINESS INFORMATION */}

          <div className="mt-8 grid gap-8 lg:grid-cols-2">

            <section className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 md:p-8">

              <p className="text-xs font-black uppercase tracking-widest text-blue-600">
                Dealership
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Business Information
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Business and contact information
                associated with your dealer account.
              </p>

              <div className="mt-7 grid gap-4">

                <ProfileField
                  label="Dealership Name"
                  value={
                    dealer?.dealership_name
                  }
                />

                <ProfileField
                  label="Business Name"
                  value={
                    dealer?.business_name
                  }
                />

                <ProfileField
                  label="Email"
                  value={dealer?.email}
                />

                <ProfileField
                  label="Phone"
                  value={dealer?.phone}
                />

                <ProfileField
                  label="Website"
                  value={dealer?.website}
                />

              </div>

            </section>

            {/* LOCATION */}

            <section className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 md:p-8">

              <p className="text-xs font-black uppercase tracking-widest text-blue-600">
                Location
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Dealership Location
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                The location associated with your
                dealership.
              </p>

              <div className="mt-7 grid gap-4">

                <ProfileField
                  label="Address"
                  value={dealer?.address}
                />

                <ProfileField
                  label="City"
                  value={dealer?.city}
                />

                <ProfileField
                  label="Province"
                  value={dealer?.province}
                />

                <ProfileField
                  label="Postal Code"
                  value={dealer?.postal_code}
                />

              </div>

            </section>

          </div>

          {/* MEMBERSHIP */}

          <section className="mt-8 rounded-3xl bg-slate-950 p-8 text-white md:p-10">

            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

              <div>

                <p className="text-xs font-black uppercase tracking-widest text-blue-400">
                  Dealer Membership
                </p>

                <h2 className="mt-3 text-3xl font-black">
                  {plan}
                </h2>

                <div className="mt-4 flex flex-wrap items-center gap-3">

                  <span className="text-sm text-slate-400">
                    Subscription status
                  </span>

                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-black ring-1 ${statusClasses}`}
                  >
                    {status}
                  </span>

                </div>

              </div>

              <Link
                href="/dealer/subscriptions"
                className="rounded-xl bg-blue-600 px-6 py-4 text-center font-black text-white transition hover:bg-blue-700"
              >
                Manage Membership →
              </Link>

            </div>

          </section>

          {/* ACCOUNT STATUS */}

          <section className="mt-8 rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 md:p-8">

            <p className="text-xs font-black uppercase tracking-widest text-blue-600">
              Account Overview
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Account Information
            </h2>

            <div className="mt-7 grid gap-4 md:grid-cols-3">

              <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-100">

                <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Dealer Account
                </p>

                <p className="mt-2 text-lg font-black">
                  {dealer
                    ? "Connected"
                    : "Not Connected"}
                </p>

              </div>

              <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-100">

                <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Membership
                </p>

                <p className="mt-2 text-lg font-black">
                  {plan}
                </p>

              </div>

              <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-100">

                <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Dealer Since
                </p>

                <p className="mt-2 text-lg font-black">
                  {formatDate(
                    dealer?.created_at
                  )}
                </p>

              </div>

            </div>

          </section>

          {/* QUICK ACTIONS */}

          <section className="mt-8">

            <p className="text-xs font-black uppercase tracking-widest text-blue-600">
              Dealer Workspace
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Quick Actions
            </h2>

            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              <QuickLink
                href="/dealer/leads"
                icon="🚘"
                title="Vehicle Opportunities"
                description="Browse seller-submitted vehicles and acquisition opportunities."
              />

              <QuickLink
                href="/dealer/saved"
                icon="⭐"
                title="Saved Vehicles"
                description="Review vehicles you saved for later research and follow-up."
              />

              <QuickLink
                href="/dealer/analytics"
                icon="📊"
                title="Acquisition Analytics"
                description="Review your dealer sourcing activity and marketplace pipeline."
              />

              <QuickLink
                href="/dealer/subscriptions"
                icon="💳"
                title="Membership"
                description="Review and manage your NorthSky Auto dealer subscription."
              />

              <QuickLink
                href="/dealer/settings"
                icon="⚙️"
                title="Account Settings"
                description="Manage dealer account preferences and configuration."
              />

              <QuickLink
                href="/contact"
                icon="💬"
                title="Dealer Support"
                description="Contact NorthSky Auto for account and marketplace assistance."
                dark
              />

            </div>

          </section>

          {/* SUPPORT */}

          <section className="mt-8 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white shadow-xl md:p-10">

            <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">

              <div>

                <p className="text-xs font-black uppercase tracking-widest text-blue-100">
                  NorthSky Auto Support
                </p>

                <h2 className="mt-3 text-2xl font-black md:text-3xl">
                  Need help with your dealer account?
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-100">
                  Contact NorthSky Auto for help with
                  your dealership profile, membership,
                  or vehicle acquisition workflow.
                </p>

              </div>

              <Link
                href="/contact"
                className="shrink-0 rounded-xl bg-white px-6 py-3.5 text-center font-black text-blue-700 transition hover:bg-blue-50"
              >
                Contact Support
              </Link>

            </div>

          </section>

          {/* DISCLOSURE */}

          <div className="mt-10 rounded-2xl bg-white p-5 text-center text-xs leading-6 text-slate-500 ring-1 ring-slate-200">
            Dealer profile information is provided for
            account management purposes. NorthSky Auto
            does not guarantee the accuracy of seller,
            vehicle, pricing, or acquisition information
            submitted through the marketplace.
          </div>

          {/* FOOTER NAV */}

          <nav className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-semibold text-slate-500">

            <Link
              href="/dealer/dashboard"
              className="transition hover:text-blue-600"
            >
              Dashboard
            </Link>

            <Link
              href="/dealer/leads"
              className="transition hover:text-blue-600"
            >
              Vehicle Opportunities
            </Link>

            <Link
              href="/dealer/saved"
              className="transition hover:text-blue-600"
            >
              Saved Vehicles
            </Link>

            <Link
              href="/dealer/analytics"
              className="transition hover:text-blue-600"
            >
              Analytics
            </Link>

            <Link
              href="/dealer/subscriptions"
              className="transition hover:text-blue-600"
            >
              Subscription
            </Link>

            <Link
              href="/dealer/settings"
              className="transition hover:text-blue-600"
            >
              Settings
            </Link>

            <Link
              href="/contact"
              className="transition hover:text-blue-600"
            >
              Contact
            </Link>

          </nav>

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