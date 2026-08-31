import Link from “next/link”;
import { redirect } from “next/navigation”;
import { createClient } from “@/lib/supabase/server”;

export const dynamic = “force-dynamic”;

export const metadata = {
title: “Dealer Dashboard | NorthSky Auto”,
description:
“NorthSky Auto dealer dashboard for vehicle acquisition opportunities.”,
};

function getPlanName(plan) {
if (!plan) return “No Active Plan”;

const value = String(plan).toLowerCase();

if (value === “starter”) return “Dealer Starter”;
if (value === “pro”) return “Dealer Professional”;
if (value === “professional”) return “Dealer Professional”;

return String(plan)
.replace(/[-_]/g, “ “)
.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getStatus(status) {
if (!status) return “Pending”;

return String(status)
.replace(/[-_]/g, “ “)
.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function isActive(status) {
const value = String(status || “”).toLowerCase();

return value === “active” || value === “trialing”;
}

async function loadDealer(supabase, user) {
const { data, error } = await supabase
.from(“dealers”)
.select(”*”)
.eq(“user_id”, user.id)
.maybeSingle();

if (!error && data) {
return data;
}

return {
id: user.id,
dealership_name:
user.user_metadata?.dealership_name ||
“Dealer Account”,
contact_name:
user.user_metadata?.contact_name ||
“”,
email: user.email || “”,
phone:
user.user_metadata?.phone ||
“”,
plan:
user.user_metadata?.plan ||
null,
subscription_status:
user.user_metadata?.subscription_status ||
null,
};
}

async function countAvailableVehicles(supabase) {
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
    "Vehicle count error:",
    error
  );
  return 0;
}
return count || 0;

} catch (error) {
console.error(
“Vehicle count exception:”,
error
);

return 0;

}
}

async function countSavedVehicles(supabase, dealerId) {
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
return count || 0;

} catch (error) {
console.error(
“Saved vehicle count exception:”,
error
);

return 0;

}
}

function StatCard({
icon,
title,
value,
description,
}) {
return (
{title}
      <p className="mt-3 text-3xl font-black text-slate-950">
        {value}
      </p>
      <p className="mt-2 text-xs text-slate-500">
        {description}
      </p>
    </div>
    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
      {icon}
    </div>
  </div>
</div>

);
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

function ActionCard({
href,
icon,
title,
description,
}) {
return (
{icon}
  <h3 className="mt-4 text-lg font-black text-slate-950">
    {title}
  </h3>
  <p className="mt-2 text-sm leading-6 text-slate-500">
    {description}
  </p>
  <p className="mt-4 text-sm font-black text-blue-600">
    Open →
  </p>
</Link>

);
}

export default async function DealerDashboardPage() {
const supabase = await createClient();

const {
data: { user },
error: authError,
} = await supabase.auth.getUser();

if (authError || !user) {
redirect(”/dealer/login”);
}

const dealer = await loadDealer(
supabase,
user
);

if (!dealer) {
redirect(”/dealer/register”);
}

const dealershipName =
dealer.dealership_name ||
dealer.company_name ||
“Dealer Account”;

const contactName =
dealer.contact_name ||
“”;

const email =
dealer.email ||
user.email ||
“”;

const phone =
dealer.phone ||
“”;

const plan =
dealer.plan ||
dealer.subscription_plan ||
dealer.plan_name ||
null;

const subscriptionStatus =
dealer.subscription_status ||
null;

const active = isActive(
subscriptionStatus
);

const availableVehicles =
await countAvailableVehicles(
supabase
);

const savedVehicles =
await countSavedVehicles(
supabase,
dealer.id
);

return (
  {/* HEADER */}
  <header className="border-b border-slate-200 bg-white">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
      <Link
        href="/"
        className="flex items-center gap-3"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-black text-white">
          N
        </div>
        <div>
          <p className="font-black text-slate-950">
            NorthSky Auto
          </p>
          <p className="text-xs font-semibold text-slate-500">
            Dealer Portal
          </p>
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
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100"
        >
          Sign Out
        </button>
      </form>
    </div>
  </header>
  {/* MAIN */}
  <section className="px-6 py-10">
    <div className="mx-auto max-w-7xl">
      {/* WELCOME */}
      <div className="rounded-3xl bg-slate-950 p-8 text-white md:p-10">
        <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-blue-400">
              Dealer Dashboard
            </p>
            <h1 className="mt-3 text-3xl font-black md:text-4xl">
              Welcome, {dealershipName}
            </h1>
            <p className="mt-4 max-w-2xl leading-7 text-slate-300">
              Manage your dealership and discover vehicle
              acquisition opportunities through NorthSky Auto.
            </p>
            {contactName && (
              <p className="mt-4 text-sm font-semibold text-blue-300">
                Account contact: {contactName}
              </p>
            )}
          </div>
          <Link
            href="/dealer/vehicles"
            className="rounded-xl bg-blue-600 px-6 py-4 text-center font-black text-white hover:bg-blue-500"
          >
            Browse Vehicles →
          </Link>
        </div>
      </div>
      {/* STATS */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon="🚗"
          title="Available Vehicles"
          value={availableVehicles}
          description="Current opportunities"
        />
        <StatCard
          icon="⭐"
          title="Saved Vehicles"
          value={savedVehicles}
          description="Your saved vehicles"
        />
        <StatCard
          icon="💳"
          title="Dealer Plan"
          value={getPlanName(plan)}
          description="Current subscription"
        />
        <StatCard
          icon="✓"
          title="Account Status"
          value={
            active
              ? "Active"
              : "Pending"
          }
          description="Dealer account"
        />
      </div>
      {/* CONTENT */}
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* VEHICLE MARKETPLACE */}
        <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 lg:col-span-2">
          <p className="text-sm font-black uppercase tracking-widest text-blue-600">
            Vehicle Marketplace
          </p>
          <h2 className="mt-2 text-2xl font-black">
            Find Your Next Vehicle
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Browse vehicles submitted by sellers and
            approved for participating dealerships.
          </p>
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <div className="text-5xl">
              🚘
            </div>
            <h3 className="mt-5 text-xl font-black">
              {availableVehicles > 0
                ? `${availableVehicles} Opportunities Available`
                : "No Vehicles Available Yet"}
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
              Approved vehicle submissions will appear
              in the dealer marketplace.
            </p>
            <Link
              href="/dealer/vehicles"
              className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-black text-white hover:bg-blue-700"
            >
              View Vehicles →
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
            className="mt-7 block rounded-xl border border-slate-300 px-5 py-3 text-center text-sm font-black text-slate-700 hover:bg-slate-50"
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
        <div className="mt-3 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-black">
              {getPlanName(plan)}
            </h2>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-black ${
                  active
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {getStatus(
                  subscriptionStatus
                )}
              </span>
              <span className="text-sm text-slate-500">
                {active
                  ? "Your dealer subscription is active."
                  : "Choose a dealer plan to unlock platform features."}
              </span>
            </div>
          </div>
          <Link
            href="/pricing"
            className="rounded-xl bg-blue-600 px-6 py-3 text-center text-sm font-black text-white hover:bg-blue-700"
          >
            {active
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
            description="Review current vehicle acquisition opportunities."
          />
          <ActionCard
            href="/dealer/profile"
            icon="🏢"
            title="Dealer Profile"
            description="Update your dealership and contact information."
          />
          <ActionCard
            href="/pricing"
            icon="💳"
            title="Plans & Billing"
            description="Review dealer plans and subscription options."
          />
        </div>
      </div>
      {/* FOOTER NOTICE */}
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