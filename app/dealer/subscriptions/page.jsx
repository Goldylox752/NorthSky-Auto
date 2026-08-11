import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
export const metadata = {
  title: "Dealer Subscription | NorthSky Auto",
  description:
    "Manage your NorthSky Auto dealer membership, subscription plan, and billing status.",
};
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey)
    : null;
const PLANS = {
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
function normalizePlan(plan) {
  if (!plan) return null;
  const value = String(plan).toLowerCase().trim();
  if (
    value === "starter" ||
    value === "dealer starter"
  ) {
    return "starter";
  }
  if (
    value === "professional" ||
    value === "pro" ||
    value === "dealer pro"
  ) {
    return "professional";
  }
  if (
    value === "enterprise" ||
    value === "dealer enterprise"
  ) {
    return "enterprise";
  }
  return null;
}
function getStatusLabel(status) {
  if (!status) return "No subscription";
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
    String(status).replaceAll("_", " ")
  );
}
function getStatusClasses(status) {
  if (status === "active" || status === "trialing") {
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
async function getDealer() {
  if (!supabase) {
    console.error(
      "Supabase is not configured for the dealer subscription page."
    );
    return null;
  }
  try {
    /*
     * Temporary lookup until Supabase Auth is connected
     * directly to the dealer portal.
     *
     * IMPORTANT:
     * Replace this lookup with the authenticated dealer ID
     * once dealer authentication is enabled.
     */
    const { data, error } = await supabase
      .from("dealers")
      .select(`
        id,
        business_name,
        dealership_name,
        email,
        subscription_plan,
        subscription_status,
        stripe_customer_id,
        stripe_subscription_id
      `)
      .order("created_at", {
        ascending: true,
      })
      .limit(1)
      .maybeSingle();
    if (error) {
      console.error(
        "Dealer subscription lookup failed:",
        error
      );
      return null;
    }
    return data;
  } catch (error) {
    console.error(
      "Dealer subscription page error:",
      error
    );
    return null;
  }
}
export default async function DealerSubscriptionsPage() {
  const dealer = await getDealer();
  const planKey = normalizePlan(
    dealer?.subscription_plan
  );
  const plan =
    PLANS[planKey] || {
      name: "No Active Plan",
      price: "$0",
      period: "",
      description:
        "Choose a NorthSky Auto dealer membership to access vehicle acquisition opportunities.",
      features: [],
    };
  const status =
    dealer?.subscription_status || null;
  const statusLabel =
    getStatusLabel(status);
  const statusClasses =
    getStatusClasses(status);
  const dealershipName =
    dealer?.dealership_name ||
    dealer?.business_name ||
    "Your Dealership";
  const hasSubscription =
    Boolean(dealer?.stripe_subscription_id);
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
                Manage your NorthSky Auto dealer membership,
                subscription status, and plan.
              </p>
            </div>
            <Link
              href="/dealer/dashboard"
              className="inline-flex w-fit rounded-xl border border-white/20 px-6 py-3 font-black text-white transition hover:bg-white/10"
            >
              ← Dealer Dashboard
            </Link>
          </div>
        </div>
      </section>
      {/* CONTENT */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          {/* ACCOUNT NOT FOUND */}
          {!dealer && (
            <div className="mb-8 rounded-3xl border border-amber-200 bg-amber-50 p-6">
              <div className="flex gap-4">
                <div className="text-2xl">
                  ⚠️
                </div>
                <div>
                  <h2 className="font-black text-amber-900">
                    Dealer account not connected
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-amber-800">
                    We could not find a dealer account associated
                    with this portal yet. Complete your dealer
                    registration or contact NorthSky Auto if you
                    have already subscribed.
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
                      Contact Support
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* CURRENT PLAN */}
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:col-span-2">
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
                  className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-black ${statusClasses}`}
                >
                  {statusLabel}
                </span>
              </div>
              {/* PRICE */}
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
              {/* FEATURES */}
              <h3 className="text-lg font-black">
                Included Features
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
                      <span>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-5 text-sm text-slate-500">
                  No active membership features are currently
                  assigned to this dealer account.
                </p>
              )}
            </div>
            {/* STATUS CARD */}
            <div className="rounded-3xl bg-slate-950 p-8 text-white">
              <div className="text-3xl">
                💳
              </div>
              <h2 className="mt-5 text-2xl font-black">
                Billing Status
              </h2>
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-sm text-slate-400">
                    Status
                  </p>
                  <p className="mt-2 text-xl font-black capitalize">
                    {statusLabel}
                  </p>
                </div>
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-sm text-slate-400">
                    Dealership
                  </p>
                  <p className="mt-2 font-black">
                    {dealershipName}
                  </p>
                </div>
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-sm text-slate-400">
                    Payment Provider
                  </p>
                  <p className="mt-2 font-black">
                    Stripe
                  </p>
                </div>
              </div>
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
                  Billing Provider
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
              className="rounded-3xl bg-blue-600 p-7 text-white transition hover:-translate-y-1 hover:bg-blue-700"
            >
              <div className="text-3xl">
                💳
              </div>
              <h3 className="mt-5 text-xl font-black">
                Change Plan
              </h3>
              <p className="mt-2 text-sm leading-6 text-blue-100">
                Review NorthSky Auto dealer membership options.
              </p>
            </Link>
            <Link
              href="/dealer/profile"
              className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-3xl">
                🏢
              </div>
              <h3 className="mt-5 text-xl font-black">
                Dealer Profile
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Manage your dealership information.
              </p>
            </Link>
            <Link
              href="/contact"
              className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-3xl">
                💬
              </div>
              <h3 className="mt-5 text-xl font-black">
                Need Help?
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Contact NorthSky Auto about your membership.
              </p>
            </Link>
          </div>
          {/* STRIPE NOTICE */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-center">
            <p className="text-sm leading-6 text-slate-500">
              NorthSky Auto dealer memberships are securely
              processed through Stripe. Subscription status is
              synchronized automatically through Stripe webhooks.
            </p>
            {hasSubscription && (
              <p className="mt-2 text-xs font-semibold text-green-600">
                Stripe subscription connected
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}