import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
export const metadata = {
  title: "Dealer Profile | NorthSky Auto",
  description:
    "Manage your NorthSky Auto dealership profile and account information.",
};
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey)
    : null;
async function getDealer() {
  if (!supabase) {
    console.error(
      "Supabase is not configured for the dealer profile page."
    );
    return null;
  }
  try {
    const { data, error } = await supabase
      .from("dealers")
      .select(`
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
      `)
      .order("created_at", {
        ascending: true,
      })
      .limit(1)
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
    professional: "Dealer Pro",
    enterprise: "Dealer Enterprise",
  };
  return (
    plans[String(plan).toLowerCase()] ||
    plan
  );
}
function formatStatus(status) {
  if (!status) {
    return "Not Active";
  }
  const labels = {
    active: "Active",
    trialing: "Trial",
    past_due: "Past Due",
    canceled: "Canceled",
    incomplete: "Incomplete",
    incomplete_expired: "Expired",
    unpaid: "Unpaid",
  };
  return (
    labels[status] ||
    String(status)
      .replaceAll("_", " ")
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase()
      )
  );
}
function getStatusClasses(status) {
  if (
    status === "active" ||
    status === "trialing"
  ) {
    return "bg-green-100 text-green-700";
  }
  if (
    status === "past_due" ||
    status === "incomplete"
  ) {
    return "bg-amber-100 text-amber-700";
  }
  if (
    status === "canceled" ||
    status === "incomplete_expired" ||
    status === "unpaid"
  ) {
    return "bg-red-100 text-red-700";
  }
  return "bg-slate-100 text-slate-700";
}
function formatDate(date) {
  if (!date) {
    return "Not available";
  }
  try {
    return new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  } catch {
    return "Not available";
  }
}
function ProfileField({ label, value }) {
  return (
    <div className="border-b border-slate-100 pb-5 last:border-0 last:pb-0">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 break-words font-semibold text-slate-900">
        {value || "Not provided"}
      </p>
    </div>
  );
}
export default async function DealerProfilePage() {
  const dealer = await getDealer();
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
  const statusClasses = getStatusClasses(
    dealer?.subscription_status
  );
  const initial =
    dealershipName.charAt(0).toUpperCase();
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
                Dealer Profile
              </h1>
              <p className="mt-4 max-w-2xl text-slate-300">
                View your dealership information, membership,
                and account details.
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
      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          {/* PROFILE NOT FOUND */}
          {!dealer && (
            <div className="mb-8 rounded-3xl border border-amber-200 bg-amber-50 p-6">
              <div className="flex gap-4">
                <div className="text-2xl">
                  ⚠️
                </div>
                <div>
                  <h2 className="font-black text-amber-900">
                    Dealer profile not connected
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-amber-800">
                    We could not find a dealer profile in the
                    NorthSky Auto dealer database yet.
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
                      className="rounded-xl border border-amber-300 px-5 py-3 text-sm font-black text-amber-800 transition hover:bg-amber-100"
                    >
                      Contact NorthSky Auto
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* PROFILE SUMMARY */}
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-5">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-3xl font-black text-white">
                  {initial}
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
                    Dealership
                  </p>
                  <h2 className="mt-1 text-3xl font-black">
                    {dealershipName}
                  </h2>
                  <p className="mt-2 text-slate-500">
                    NorthSky Auto dealer account
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/dealer/settings"
                  className="rounded-xl border border-slate-200 px-5 py-3 font-black transition hover:bg-slate-50"
                >
                  Account Settings
                </Link>
                <Link
                  href="/dealer/subscriptions"
                  className="rounded-xl bg-blue-600 px-5 py-3 font-black text-white transition hover:bg-blue-700"
                >
                  Subscription
                </Link>
              </div>
            </div>
          </div>
          {/* BUSINESS + LOCATION */}
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {/* BUSINESS */}
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-2xl font-black">
                Business Information
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Information associated with your dealership.
              </p>
              <div className="mt-8 space-y-5">
                <ProfileField
                  label="Dealership Name"
                  value={dealer?.dealership_name}
                />
                <ProfileField
                  label="Business Name"
                  value={dealer?.business_name}
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
            </div>
            {/* LOCATION */}
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-2xl font-black">
                Dealership Location
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Your dealership business location.
              </p>
              <div className="mt-8 space-y-5">
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
            </div>
          </div>
          {/* MEMBERSHIP */}
          <div className="mt-8 rounded-3xl bg-slate-950 p-8 text-white">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="text-sm font-bold uppercase tracking-wide text-blue-400">
                  Dealer Membership
                </span>
                <h2 className="mt-3 text-3xl font-black">
                  {plan}
                </h2>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span className="text-slate-400">
                    Subscription status:
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-black ${statusClasses}`}
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
          </div>
          {/* ACCOUNT INFORMATION */}
          <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-2xl font-black">
              Account Information
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Dealer Account
                </p>
                <p className="mt-2 font-black">
                  {dealer ? "Connected" : "Not connected"}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Membership
                </p>
                <p className="mt-2 font-black">
                  {plan}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Dealer Since
                </p>
                <p className="mt-2 font-black">
                  {formatDate(dealer?.created_at)}
                </p>
              </div>
            </div>
          </div>
          {/* QUICK LINKS */}
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <Link
              href="/dealer/dashboard"
              className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-3xl">
                📊
              </div>
              <h3 className="mt-5 text-xl font-black">
                Dashboard
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                View your dealer activity and vehicle opportunities.
              </p>
            </Link>
            <Link
              href="/dealer/subscriptions"
              className="rounded-3xl bg-blue-600 p-7 text-white transition hover:-translate-y-1 hover:bg-blue-700"
            >
              <div className="text-3xl">
                💳
              </div>
              <h3 className="mt-5 text-xl font-black">
                Subscription
              </h3>
              <p className="mt-2 text-sm leading-6 text-blue-100">
                Manage your NorthSky Auto dealer membership.
              </p>
            </Link>
            <Link
              href="/dealer/settings"
              className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-3xl">
                ⚙️
              </div>
              <h3 className="mt-5 text-xl font-black">
                Settings
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Manage your dealer account settings.
              </p>
            </Link>
          </div>
          {/* SUPPORT */}
          <div className="mt-8 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-black">
                  Need help with your dealer account?
                </h2>
                <p className="mt-2 text-blue-100">
                  Contact NorthSky Auto for assistance with your
                  dealership profile or membership.
                </p>
              </div>
              <Link
                href="/contact"
                className="rounded-xl bg-white px-6 py-3 text-center font-black text-blue-700 transition hover:bg-blue-50"
              >
                Contact NorthSky Auto
              </Link>
            </div>
          </div>
          {/* FOOTER NAV */}
          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-semibold text-slate-500">
            <Link
              href="/dealer/dashboard"
              className="transition hover:text-blue-600"
            >
              Dashboard
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