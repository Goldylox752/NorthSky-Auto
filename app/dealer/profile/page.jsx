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
    return null;
  }
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
        stripe_customer_id,
        stripe_subscription_id,
        created_at
      `
    )
    .limit(1)
    .maybeSingle();
  if (error) {
    console.error("Dealer profile lookup failed:", error);
    return null;
  }
  return data;
}
function formatPlan(plan) {
  if (!plan) return "No plan";
  const plans = {
    starter: "Dealer Starter",
    professional: "Dealer Pro",
    enterprise: "Dealer Enterprise",
  };
  return plans[plan] || plan;
}
function formatStatus(status) {
  if (!status) return "Not active";
  return status
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}
function formatDate(date) {
  if (!date) return "—";
  try {
    return new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  } catch {
    return "—";
  }
}
export default async function DealerProfilePage() {
  const dealer = await getDealer();
  const dealershipName =
    dealer?.dealership_name ||
    dealer?.business_name ||
    "Your Dealership";
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
                Manage your dealership information and account details.
              </p>
            </div>
            <Link
              href="/dealer/dashboard"
              className="inline-flex rounded-xl border border-white/20 px-6 py-3 font-black text-white transition hover:bg-white/10"
            >
              ← Dashboard
            </Link>
          </div>
        </div>
      </section>
      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          {/* ACCOUNT NOTICE */}
          {!dealer && (
            <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <div className="flex gap-4">
                <div className="text-2xl">!</div>
                <div>
                  <h2 className="font-black text-amber-900">
                    Dealer profile not found
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-amber-800">
                    Your dealer profile has not been connected yet.
                    Complete your dealer application or contact NorthSky
                    Auto if you already have an account.
                  </p>
                </div>
              </div>
            </div>
          )}
          {/* PROFILE HEADER */}
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-5">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-600 text-3xl font-black text-white">
                  {dealershipName
                    .charAt(0)
                    .toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
                    Dealership
                  </p>
                  <h2 className="mt-1 text-3xl font-black">
                    {dealershipName}
                  </h2>
                  <p className="mt-2 text-slate-500">
                    Dealer account
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
                  View Subscription
                </Link>
              </div>
            </div>
          </div>
          {/* PROFILE INFORMATION */}
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {/* BUSINESS INFORMATION */}
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
                  value={dealer?.dealership_name || "Not provided"}
                />
                <ProfileField
                  label="Business Name"
                  value={dealer?.business_name || "Not provided"}
                />
                <ProfileField
                  label="Website"
                  value={dealer?.website || "Not provided"}
                />
                <ProfileField
                  label="Email"
                  value={dealer?.email || "Not provided"}
                />
                <ProfileField
                  label="Phone"
                  value={dealer?.phone || "Not provided"}
                />
              </div>
            </div>
            {/* LOCATION */}
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-2xl font-black">
                Dealership Location
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Your dealership's business location.
              </p>
              <div className="mt-8 space-y-5">
                <ProfileField
                  label="Address"
                  value={dealer?.address || "Not provided"}
                />
                <ProfileField
                  label="City"
                  value={dealer?.city || "Not provided"}
                />
                <ProfileField
                  label="Province"
                  value={dealer?.province || "Not provided"}
                />
                <ProfileField
                  label="Postal Code"
                  value={dealer?.postal_code || "Not provided"}
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
                  {formatPlan(
                    dealer?.subscription_plan
                  )}
                </h2>
                <p className="mt-2 text-slate-400">
                  Status:{" "}
                  <span className="font-bold text-white">
                    {formatStatus(
                      dealer?.subscription_status
                    )}
                  </span>
                </p>
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
                  Account ID
                </p>
                <p className="mt-2 break-all text-sm font-bold">
                  {dealer?.id || "Not available"}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Stripe Customer
                </p>
                <p className="mt-2 break-all text-sm font-bold">
                  {dealer?.stripe_customer_id ||
                    "Not connected"}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Dealer Since
                </p>
                <p className="mt-2 text-sm font-bold">
                  {formatDate(dealer?.created_at)}
                </p>
              </div>
            </div>
          </div>
          {/* HELP */}
          <div className="mt-8 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-black">
                  Need to update your dealership information?
                </h2>
                <p className="mt-2 text-blue-100">
                  Use account settings or contact NorthSky Auto for
                  assistance with your dealer account.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/dealer/settings"
                  className="rounded-xl bg-white px-6 py-3 font-black text-blue-700 transition hover:bg-blue-50"
                >
                  Settings
                </Link>
                <Link
                  href="/contact"
                  className="rounded-xl border border-white/30 px-6 py-3 font-black text-white transition hover:bg-white/10"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
          {/* FOOTER */}
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
function ProfileField({ label, value }) {
  return (
    <div className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 break-words font-semibold text-slate-900">
        {value}
      </p>
    </div>
  );
}