import Link from “next/link”;
import { redirect } from “next/navigation”;
import { createClient } from “@/lib/supabase/server”;

export const dynamic = “force-dynamic”;

export const metadata = {
title: “Dealer Dashboard | NorthSky Auto”,
description:
“Manage your NorthSky Auto dealer account and vehicle acquisition opportunities.”,
};

function formatPlan(plan) {
if (!plan) return “No Active Plan”;

const value = String(plan).toLowerCase();

if (value === “starter”) return “Dealer Starter”;
if (value === “pro” || value === “professional”) {
return “Dealer Professional”;
}

return String(plan)
.replace(/[-_]/g, “ “)
.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatStatus(status) {
if (!status) return “Inactive”;

return String(status)
.replace(/[-_]/g, “ “)
.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function isActiveStatus(status) {
const value = String(status || “”).toLowerCase();

return value === “active” || value === “trialing”;
}

function InfoRow({ label, value }) {
return (
{label}
  <p className="mt-1 break-words text-sm font-bold text-slate-800">
    {value || "Not provided"}
  </p>
</div>

);
}

function StatCard({ icon, label, value, description }) {
return (
{label}
      <p className="mt-3 text-3xl font-black text-slate-950">
        {value}
      </p>
      <p className="mt-2 text-sm text-slate-500">
        {description}
      </p>
    </div>
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
      {icon}
    </div>
  </div>
</div>

);
}

function ActionCard({ href, icon, title, text }) {
return (
{icon}

  <h3 className="mt-5 text-lg font-black text-slate-950">
    {title}
  </h3>
  <p className="mt-2 text-sm leading-6 text-slate-500">
    {text}
  </p>
  <div className="mt-5 text-sm font-black text-blue-600">
    Open →
  </div>
</Link>

);
}

async function getDealer(supabase, user) {
if (!user?.id) return null;

const { data, error } = await supabase
.from(“dealers”)
.select(”*”)
.eq(“user_id”, user.id)
.maybeSingle();

if (!error && data) {
return data;
}

/*

* If a dealer record has not been created yet,
* use the authenticated user’s metadata.
    */
    return {
    id: user.id,
    user_id: user.id,
    dealership_name:
    user.user_metadata?.dealership_name || “Dealer Account”,
    contact_name:
    user.user_metadata?.contact_name || “”,
    email: user.email || “”,
    phone:
    user.user_metadata?.phone || “”,
    plan:
    user.user_metadata?.plan || null,
    subscription_status:
    user.user_metadata?.subscription_status || null,
    };
    }

async function getAvailableVehicleCount(supabase) {
try {
const { count, error } = await supabase
.from(“vehicles”)
.select(“id”, {
count: “exact”,
head: true,
})
.eq(“status”, “available”);

if (error) {
  console.error(
    "Available vehicle count error:",
    error
  );
  return 0;
}
return typeof count === "number" ? count : 0;

} catch (error) {
console.error(
“Vehicle count exception:”,
error
);

return 0;

}
}

async function getSavedVehicleCount(supabase, dealerId) {
if (!dealerId) return 0;

try {
const { count, error } = await supabase
.from(“saved_vehicles”)
.select(“id”, {
count: “exact”,
head: true,
})
.eq(“dealer_id”, dealerId);

if (error) {
  console.error(
    "Saved vehicle count error:",
    error
  );
  return 0;
}
return typeof count === "number" ? count : 0;

} catch (error) {
console.error(
“Saved vehicle count exception:”,
error
);

return 0;

}
}

export default async function DealerDashboardPage() {
const supabase = await createClient();

/*

* Verify the authenticated user.
    */
    const {
    data: { user },
    error: authError,
    } = await supabase.auth.getUser();

if (authError || !user) {
redirect(”/dealer/login”);
}

/*

* Load dealer information.
    */
    const dealer = await getDealer(supabase, user);

if (!dealer) {
redirect(”/dealer/register”);
}

const dealershipName =
dealer.dealership_name ||
dealer.company_name ||
user.user_metadata?.dealership_name ||
“Dealer Account”;

const contactName =
dealer.contact_name ||
user.user_metadata?.contact_name ||
“”;

const email =
dealer.email ||
user.email ||
“”;

const phone =
dealer.phone ||
user.user_metadata?.phone ||
“”;

const plan =
dealer.plan ||
dealer.subscription_plan ||
dealer.plan_name ||
user.user_metadata?.plan ||
null;

const subscriptionStatus =
dealer.subscription_status ||
user.user_metadata?.subscription_status ||
null;

const activeSubscription =
isActiveStatus(subscriptionStatus);

/*

* Load dashboard statistics.
    */
    const vehicleCount =
    await getAvailableVehicleCount(supabase);

const savedCount =
await getSavedVehicleCount(
supabase,
dealer.id
);

return (
  {/* HEADER */}
  <header className="border-b border-slate-200 bg-white">
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
      <Link
        href="/"
        className="flex items-center gap-3"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-black text-white">
          N
        </div>
        <div>
          <div className="font-black text-slate-950">
            NorthSky Auto
          </div>
          <div className="text-xs font-semibold text-slate-500">
            Dealer Portal
          </div>
        </div>
      </Link>
      <nav className="hidden items-center gap-6 md:flex">
        <Link
          href="/dealer/dashboard"
          className="text-sm font-black text-blue-600"
        >
          Dashboard
        </Link>
        <Link
          href="/dealer/vehicles"
          className="text-sm font-semibold text-slate-600 hover:text-slate-950"
        >
          Vehicles
        </Link>
        <Link
          href="/dealer/profile"
          className="text-sm font-semibold text-slate-600 hover:text-slate-950"
        >
          Profile
        </Link>
        <Link
          href="/pricing"
          className="text-sm font-semibold text-slate-600 hover:text-slate-950"
        >
          Plans
        </Link>
      </nav>
      <form
        action="/api/auth/signout"
        method="POST"
      >
        <button
          type="submit"
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
        >
          Sign Out
        </button>
      </form>
    </div>
  </header>
  {/* MAIN */}
  <section className="px-6 py-10 md:py-14">
    <div className="mx-auto max-w-7xl">
      {/* HERO */}
      <div className="overflow-hidden rounded-3xl bg-slate-950 p-8 text-white md:p-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-400">
              Dealer Dashboard
            </p>
            <h1 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
              Welcome, {dealershipName}
            </h1>
            <p className="mt-4 max-w-2xl leading-7 text-slate-300">
              Manage your dealership account and discover
              vehicle acquisition opportunities through
              NorthSky Auto.
            </p>
            {contactName && (
              <p className="mt-4 text-sm font-semibold text-blue-300">
                Account contact: {contactName}
              </p>
            )}
          </div>
          <Link
            href="/dealer/vehicles"
            className="inline-flex shrink-0 rounded-xl bg-blue-600 px-6 py-4 font-black text-white transition hover:bg-blue-500"
          >
            Browse Vehicles →
          </Link>
        </div>
      </div>
      {/* STATS */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon="🚗"
          label="Available Vehicles"
          value={vehicleCount}
          description="Current opportunities"
        />
        <StatCard
          icon="⭐"
          label="Saved Vehicles"
          value={savedCount}
          description="Your saved opportunities"
        />
        <StatCard
          icon="💳"
          label="Dealer Plan"
          value={formatPlan(plan)}
          description="Current subscription"
        />
        <StatCard
          icon="✓"
          label="Account Status"
          value={
            activeSubscription
              ? "Active"
              : "Pending"
          }
          description="Dealer account"
        />
      </div>
      {/* MAIN CONTENT */}
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* VEHICLES */}
        <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 lg:col-span-2">
          <p className="text-sm font-black uppercase tracking-widest text-blue-600">
            Acquisition Opportunities
          </p>
          <h2 className="mt-2 text-2xl font-black">
            Find Your Next Vehicle
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Browse vehicle submissions that have been
            approved for dealer opportunities.
          </p>
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <div className="text-5xl">
              🚘
            </div>
            <h3 className="mt-5 text-xl font-black">
              {vehicleCount > 0
                ? `${vehicleCount} Vehicle Opportunities Available`
                : "Vehicle Marketplace"}
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
              Approved seller submissions will appear
              in the dealer marketplace.
            </p>
            <Link
              href="/dealer/vehicles"
              className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-black text-white transition hover:bg-blue-700"
            >
              Explore Vehicles →
            </Link>
          </div>
        </div>
        {/* ACCOUNT */}
        <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-black uppercase tracking-widest text-blue-600">
            Dealer Account
          </p>
          <h2 className="mt-2 text-2xl font-black">
            Account Details
          </h2>
          <div className="mt-7 space-y-5">
            <InfoRow
              label="Dealership"
              value={dealershipName}
            />
            <InfoRow
              label="Contact"
              value={contactName}
            />
            <InfoRow
              label="Email"
              value={email}
            />
            <InfoRow
              label="Phone"
              value={phone}
            />
          </div>
          <Link
            href="/dealer/profile"
            className="mt-7 block rounded-xl border border-slate-300 px-5 py-3 text-center text-sm font-black text-slate-700 transition hover:bg-slate-50"
          >
            Manage Profile
          </Link>
        </div>
      </div>
      {/* SUBSCRIPTION */}
      <div className="mt-8 rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-black uppercase tracking-widest text-blue-600">
          Subscription
        </p>
        <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-black">
              {formatPlan(plan)}
            </h2>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-black ${
                  activeSubscription
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {formatStatus(
                  subscriptionStatus
                )}
              </span>
              <span className="text-sm text-slate-500">
                {activeSubscription
                  ? "Your dealer subscription is active."
                  : "Choose a plan to unlock dealer features."}
              </span>
            </div>
          </div>
          <Link
            href="/pricing"
            className="rounded-xl bg-blue-600 px-6 py-3 text-center text-sm font-black text-white transition hover:bg-blue-700"
          >
            {activeSubscription
              ? "Manage Plan"
              : "View Dealer Plans"}
          </Link>
        </div>
      </div>
      {/* QUICK ACTIONS */}
      <div className="mt-8">
        <p className="text-sm font-black uppercase tracking-widest text-blue-600">
          Quick Actions
        </p>
        <h2 className="mt-2 text-2xl font-black">
          Dealer Tools
        </h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <ActionCard
            href="/dealer/vehicles"
            icon="🚗"
            title="Browse Vehicles"
            text="Review current vehicle acquisition opportunities."
          />
          <ActionCard
            href="/dealer/profile"
            icon="🏢"
            title="Dealer Profile"
            text="Update your dealership and contact information."
          />
          <ActionCard
            href="/pricing"
            icon="💳"
            title="Plans & Billing"
            text="Review dealer plans and subscription options."
          />
        </div>
      </div>
      {/* NOTICE */}
      <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
        <h3 className="font-black text-slate-950">
          NorthSky Auto Dealer Portal
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
          NorthSky Auto connects vehicle sellers with
          participating dealerships. Vehicle submissions
          do not guarantee an offer, purchase, or completed
          transaction.
        </p>
        <div className="mt-5 flex flex-wrap gap-5 text-sm font-bold">
          <Link
            href="/terms"
            className="text-blue-600 hover:underline"
          >
            Terms
          </Link>
          <Link
            href="/privacy"
            className="text-blue-600 hover:underline"
          >
            Privacy
          </Link>
          <Link
            href="/contact"
            className="text-blue-600 hover:underline"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  </section>
</main>

);
}