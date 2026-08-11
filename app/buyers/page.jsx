import Link from "next/link";
import DealerCheckoutButton from "@/components/DealerCheckoutButton";
export const metadata = {
  title: "Dealer Plans | NorthSky Auto",
  description:
    "Choose a NorthSky Auto dealer plan and get access to vehicle acquisition opportunities from sellers across Canada.",
};
const plans = [
  {
    name: "Dealer Starter",
    plan: "starter",
    price: "$99",
    period: "/month",
    description:
      "A simple way for dealerships to start finding new vehicle acquisition opportunities.",
    badge: "GET STARTED",
    features: [
      "Access vehicle opportunities",
      "Dealer account",
      "Seller lead information",
      "Vehicle submission notifications",
      "NorthSky Auto marketplace access",
    ],
  },
  {
    name: "Dealer Pro",
    plan: "professional",
    price: "$299",
    period: "/month",
    description:
      "Built for dealerships that want more opportunities and a stronger vehicle acquisition pipeline.",
    badge: "MOST POPULAR",
    popular: true,
    features: [
      "Everything in Dealer Starter",
      "Priority vehicle opportunities",
      "Advanced lead access",
      "Dealer dashboard",
      "Saved vehicle opportunities",
      "Dealer analytics",
    ],
  },
  {
    name: "Dealer Enterprise",
    plan: "enterprise",
    price: "Custom",
    period: "",
    description:
      "For high-volume dealerships and dealer groups looking for a larger vehicle acquisition solution.",
    badge: "ENTERPRISE",
    features: [
      "High-volume dealer support",
      "Custom dealership solutions",
      "Expanded vehicle acquisition",
      "Priority support",
      "Custom account configuration",
      "Dealer group options",
    ],
  },
];
export default function BuyersPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* HERO */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-800 px-6 py-24 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <span className="inline-flex rounded-full bg-blue-500/20 px-5 py-2 text-sm font-black text-blue-300">
            NORTHSKY AUTO DEALER NETWORK
          </span>
          <h1 className="mx-auto mt-7 max-w-4xl text-5xl font-black leading-tight md:text-6xl">
            Find More Vehicles.
            <span className="block text-blue-400">
              Grow Your Dealership.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
            Join NorthSky Auto and discover vehicle acquisition
            opportunities from sellers looking to sell cars, trucks,
            SUVs, and commercial vehicles across Canada.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a
              href="#plans"
              className="rounded-xl bg-blue-500 px-8 py-4 font-black text-white transition hover:bg-blue-600"
            >
              View Dealer Plans →
            </a>
            <Link
              href="/dealer"
              className="rounded-xl border border-white/30 px-8 py-4 font-black text-white transition hover:bg-white/10"
            >
              Dealer Login
            </Link>
          </div>
        </div>
      </section>
      {/* VALUE PROPOSITION */}
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
            <div className="text-4xl">🚗</div>
            <h2 className="mt-5 text-xl font-black">
              Find Vehicles
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              Discover vehicle sellers and acquisition opportunities
              in one place.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
            <div className="text-4xl">📈</div>
            <h2 className="mt-5 text-xl font-black">
              Grow Inventory
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              Build a stronger pipeline of vehicles for your dealership.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
            <div className="text-4xl">⚡</div>
            <h2 className="mt-5 text-xl font-black">
              Move Faster
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              Spend less time searching and more time connecting with
              potential sellers.
            </p>
          </div>
        </div>
      </section>
      {/* PLANS */}
      <section id="plans" className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-black text-blue-700">
              DEALER MEMBERSHIPS
            </span>
            <h2 className="mt-6 text-4xl font-black md:text-5xl">
              Choose Your Dealer Plan
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
              Select the plan that fits your dealership and start
              accessing NorthSky Auto vehicle opportunities.
            </p>
          </div>
          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.plan}
                className={`relative flex flex-col rounded-3xl bg-white p-8 shadow-sm ring-1 transition hover:-translate-y-1 hover:shadow-xl ${
                  plan.popular
                    ? "ring-2 ring-blue-500"
                    : "ring-slate-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-5 py-2 text-xs font-black text-white">
                    MOST POPULAR
                  </div>
                )}
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">
                    {plan.badge}
                  </span>
                  {plan.popular && (
                    <span className="text-xl">
                      ⭐
                    </span>
                  )}
                </div>
                <h3 className="mt-7 text-3xl font-black">
                  {plan.name}
                </h3>
                <p className="mt-4 min-h-[84px] leading-7 text-slate-600">
                  {plan.description}
                </p>
                <div className="mt-7">
                  <span className="text-5xl font-black">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="ml-2 font-semibold text-slate-500">
                      {plan.period}
                    </span>
                  )}
                </div>
                <div className="my-8 h-px bg-slate-200" />
                <ul className="space-y-4">
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
                <div className="mt-auto pt-8">
                  {plan.plan === "enterprise" ? (
                    <Link
                      href="/contact"
                      className="flex w-full justify-center rounded-xl bg-slate-950 px-6 py-4 font-black text-white transition hover:bg-slate-800"
                    >
                      Contact NorthSky →
                    </Link>
                  ) : (
                    <DealerCheckoutButton
                      plan={plan.plan}
                      label={`Subscribe to ${plan.name}`}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* HOW IT WORKS */}
      <section className="bg-slate-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="rounded-full bg-blue-500/20 px-5 py-2 text-sm font-black text-blue-300">
              HOW IT WORKS
            </span>
            <h2 className="mt-6 text-4xl font-black">
              Start Finding Vehicles
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-white/10 p-8">
              <div className="text-4xl font-black text-blue-400">
                01
              </div>
              <h3 className="mt-5 text-xl font-black">
                Choose a Plan
              </h3>
              <p className="mt-3 leading-7 text-slate-300">
                Select the NorthSky Auto membership that fits your
                dealership.
              </p>
            </div>
            <div className="rounded-3xl bg-white/10 p-8">
              <div className="text-4xl font-black text-blue-400">
                02
              </div>
              <h3 className="mt-5 text-xl font-black">
                Complete Checkout
              </h3>
              <p className="mt-3 leading-7 text-slate-300">
                Complete your secure Stripe checkout and begin the
                dealer onboarding process.
              </p>
            </div>
            <div className="rounded-3xl bg-white/10 p-8">
              <div className="text-4xl font-black text-blue-400">
                03
              </div>
              <h3 className="mt-5 text-xl font-black">
                Find Opportunities
              </h3>
              <p className="mt-3 leading-7 text-slate-300">
                Access available vehicle opportunities and connect
                with potential sellers.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-10 text-center text-white md:p-14">
          <h2 className="text-4xl font-black">
            Have Questions Before Joining?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-blue-100">
            Contact NorthSky Auto if you want to discuss dealer
            membership, enterprise options, or the vehicle acquisition
            network.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-xl bg-white px-8 py-4 font-black text-blue-600 transition hover:bg-blue-50"
          >
            Contact NorthSky Auto →
          </Link>
        </div>
      </section>
      {/* DISCLOSURE */}
      <section className="border-t bg-white px-6 py-8">
        <div className="mx-auto max-w-4xl text-center text-sm leading-6 text-slate-500">
          NorthSky Auto dealer memberships are subject to applicable
          membership terms and account requirements. Subscription
          payments are securely processed through Stripe.
        </div>
      </section>
    </main>
  );
}