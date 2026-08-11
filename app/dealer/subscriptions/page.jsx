import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
export const metadata = {
  title: "Dealer Subscription | NorthSky Auto",
  description:
    "Manage your NorthSky Auto dealer membership, subscription status, and dealer plan.",
};
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey)
    : null;
const PLAN_DETAILS = {
  starter: {
    name: "Dealer Starter",
    price: "$99",
    period: "/month",
    description:
      "Essential access to NorthSky Auto vehicle acquisition opportunities.",
    features: [
      "Vehicle opportunities",
      "Dealer account",
      "Seller lead information",
      "Vehicle submission notifications",
      "Marketplace access",
    ],
  },
  professional: {
    name: "Dealer Pro",
    price: "$299",
    period: "/month",
    description:
      "Expanded vehicle acquisition tools for growing dealerships.",
    features: [
      "Everything in Dealer Starter",
      "Priority vehicle opportunities",
      "Advanced lead access",
      "Dealer dashboard",
      "Saved vehicle opportunities",
      "Dealer analytics",
    ],
  },
  enterprise: {
    name: "Dealer Enterprise",
    price: "Custom",
    period: "",
    description:
      "Custom solutions for high-volume dealerships and dealer groups.",
    features: [
      "High-volume dealer support",
      "Custom dealership solutions",
      "Expanded vehicle acquisition",
      "Priority support",
      "Custom account configuration",
      "Dealer group options",
    ],
  },
};
function getPlan(plan) {
  return (
    PLAN_DETAILS[plan] || {
      name: "No Active Plan",
      price: "$0",
      period: "",
      description:
        "Choose a NorthSky Auto dealer membership to access dealer opportunities.",
      features: [],
    }
  );
}
function getStatusLabel(status) {
  if (!status) return "No subscription";
  switch (status) {
    case "active":
      return "Active";
    case "trialing":
      return "Trial";
    case "past_due":
      return "Past Due";
    case "canceled":
      return "Canceled";
    case "incomplete":
      return "Incomplete";
    case "incomplete_expired":
      return "Expired";
    case "unpaid":
      return "Unpaid";
    default:
      return status.replaceAll("_", " ");
  }
}
function getStatusClasses(status) {
  switch (status) {
    case "active":
    case "trialing":
      return "bg-green-100 text-green-700";
    case "past_due":
    case "incomplete":
      return "bg-amber-100 text-amber-700";
    case "canceled":
    case "incomplete_expired":
    case "unpaid":
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}
async function getDealer() {
  if (!supabase) {
    return null;
  }
  /*
   * Temporary dealer lookup.
   *
   * When Supabase Auth is connected to the dealer portal,
   * this should be replaced with the authenticated user's
   * dealer record lookup.
   */
  const { data, error } = await supabase
    .from("dealers")
    .select(
      `
        id,
        business_name,
        dealership_name,
        email,
        subscription_plan,
        subscription_status,
        stripe_customer_id,
        stripe_subscription_id
      `
    )
    .limit(1)
    .maybeSingle();
  if (error) {
    console.error("Dealer subscription lookup failed:", error);
    return null;
  }
  return data;
}
export default async function DealerSubscriptionsPage() {
  const dealer = await getDealer();
  const planKey =
    dealer?.subscription_plan?.toLowerCase() || null;
  const plan = getPlan(planKey);
  const subscriptionStatus =
    dealer?.subscription_status || null;
  const statusLabel =
    getStatusLabel(subscriptionStatus);
  const statusClasses =
    getStatusClasses(subscriptionStatus);
  const dealerName =
    dealer?.dealership_name ||
    dealer?.business_name ||
    "Your Dealership";
  const hasSubscription =
    Boolean(
      dealer?.stripe_subscription_id ||
        dealer?.subscription_status
    );
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* HEADER */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-800 px-6 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex rounded-full bg-blue-500/20 px-4 py-2 text-xs font-black tracking-wide text-blue-300">
                DEALER ACCOUNT
              </span>
              <h1 className="mt-5 text-4xl font-black md:text-5xl">
                Subscription
              </h1>
              <p className="mt-4 max-w-2xl text-slate-300">
                Manage your NorthSky Auto dealer membership and
                subscription status.
              </p>
            </div>
            <Link
              href="/dealer/dashboard"
              className="inline-flex rounded-xl border border-white/20 px-6 py-3 font-black text-white transition hover:bg-white/10"
            >
              ← Dealer Dashboard
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
                    Dealer account not connected
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-amber-800">
                    We could not find a dealer subscription record yet.
                    Complete dealer signup or contact NorthSky Auto if
                    you have already subscribed.
                  </p>
                </div>
              </div>
            </div>
          )}
          {/* CURRENT PLAN */}
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
                    Current Plan
                  </p>
                  <h2 className="mt-2 text-3xl font-black">
                    {plan.name}
                  </h2>
                  <p className="mt-3 max-w-xl leading-7 text-slate-600">
                    {plan.description}
                  </p>
                </div>
                <span
                  className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-black capitalize ${statusClasses}`}
                >
                  {statusLabel}
                </span>
              </div>
              <div className="mt-8 flex items-end gap-2">
                <span className="text-5xl font-black">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="mb-2 font-semibold text-slate-500">
                    {plan.period}
                  </span>
                )}
              </div>
              <div className="my-8 h-px bg-slate-200" />
              <h3 className="text-lg font-black">
                Plan Features
              </h3>
              {plan.features.length > 0 ? (
                <ul className="mt-5 grid gap-4 md:grid-cols-2">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-3 text-sm font-semibold text-slate-700"
                    >
                      <span className="font-black text-blue-600">
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-5 text-sm text-slate-500">
                  No active plan features are currently assigned.
                </p>
              )}
            </div>
            {/* STATUS CARD */}
            <div className="rounded-3xl bg-slate-950 p-8 text-white">
              <div className="text-3xl">💳</div>
              <h2 className="mt-5 text-2xl font-black">
                Subscription Status
              </h2>
              <div className="mt-6 rounded-2xl bg-white/10 p-5">
                <p className="text-sm text-slate-400">
                  Status
                </p>
                <p className="mt-2 text-xl font-black capitalize">
                  {statusLabel}
                </p>
              </div>
              <div className="mt-4 rounded-2xl bg-white/10 p-5">
                <p className="text-sm text-slate-400">
                  Dealer
                </p>
                <p className="mt-2 font-black">
                  {dealerName}
                </p>
              </div>
              {hasSubscription && (
                <div className="mt-4 rounded-2xl bg-white/10 p-5">
                  <p className="text-sm text-slate-400">
                    Stripe Subscription
                  </p>
                  <p className="mt-2 break-all text-xs font-mono text-slate-300">
                    {dealer?.stripe_subscription_id ||
                      "Connected"}
                  </p>
                </div>
              )}
            </div>
          </div>
          {/* SUBSCRIPTION DETAILS */}
          <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-2xl font-black">
              Subscription Details
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-bold uppercase text-slate-500">
                  Plan
                </p>
                <p className="mt-2 font-black">
                  {plan.name}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-bold uppercase text-slate-500">
                  Billing
                </p>
                <p className="mt-2 font-black">
                  {plan.period
                    ? `${plan.price} ${plan.period}`
                    : "Custom"}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-bold uppercase text-slate-500">
                  Status
                </p>
                <p className="mt-2 font-black capitalize">
                  {statusLabel}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-bold uppercase text-slate-500">
                  Payment Provider
                </p>
                <p className="mt-2 font-black">
                  Stripe
                </p>
              </div>
            </div>
          </div>
          {/* ACTIONS */}
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <Link
              href="/buyers"
              className="rounded-3xl bg-blue-600 p-7 text-white transition hover:bg-blue-700"
            >
              <div className="text-3xl">⬆️</div>
              <h3 className="mt-5 text-xl font-black">
                Change Plan
              </h3>
              <p className="mt-2 text-sm leading-6 text-blue-100">
                Review available dealer membership plans.
              </p>
            </Link>
            <Link
              href="/dealer/profile"
              className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-3xl">🏢</div>
              <h3 className="mt-5 text-xl font-black">
                Dealer Profile
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Update your dealership information.
              </p>
            </Link>
            <Link
              href="/contact"
              className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-3xl">💬</div>
              <h3 className="mt-5 text-xl font-black">
                Need Help?
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Contact NorthSky Auto about your membership.
              </p>
            </Link>
          </div>
          {/* BILLING NOTICE */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-center">
            <p className="text-sm leading-6 text-slate-500">
              NorthSky Auto memberships are billed through Stripe.
              Subscription status may take a short time to update after
              checkout while Stripe processes the subscription webhook.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}