import Link from "next/link";

export const metadata = {
  title:
    "Dealer Pricing Plans | NorthSky Auto Vehicle Acquisition Platform",
  description:
    "Choose a NorthSky Auto dealer membership plan and access exclusive vehicle acquisition opportunities from sellers across Canada.",
};

const plans = [
  {
    name: "Starter Dealer",
    price: "$299",
    description:
      "Perfect for independent dealers looking to increase vehicle sourcing.",
    features: [
      "Access to vehicle acquisition leads",
      "Dealer dashboard access",
      "Basic vehicle filters",
      "Lead notifications",
      "Monthly account reports",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "$599",
    description:
      "Designed for growing dealerships that need consistent inventory opportunities.",
    features: [
      "Everything in Starter",
      "Priority lead access",
      "Advanced vehicle filters",
      "Saved searches",
      "Lead analytics",
      "Priority dealer support",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$999",
    description:
      "Built for high-volume dealers and multi-location operations.",
    features: [
      "Everything in Professional",
      "Unlimited team members",
      "Advanced reporting",
      "Multi-location support",
      "Premium acquisition opportunities",
      "Dedicated account support",
    ],
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">

          <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold">
            NorthSky Auto Dealer Membership
          </span>

          <h1 className="mt-6 text-5xl font-bold">
            Get Access To Quality Vehicle Opportunities
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-xl text-slate-300">
            Choose a dealer plan and connect with vehicle sellers across Canada.
            Build your inventory pipeline with real acquisition opportunities.
          </p>

        </div>
      </section>


      {/* Pricing Cards */}
      <section className="py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="grid gap-8 lg:grid-cols-3">

            {plans.map((plan) => (

              <div
                key={plan.name}
                className={`relative rounded-3xl border p-8 shadow-lg ${
                  plan.popular
                    ? "border-blue-600"
                    : "border-slate-200"
                }`}
              >

                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white">
                    Most Popular
                  </div>
                )}


                <h2 className="text-3xl font-bold">
                  {plan.name}
                </h2>


                <p className="mt-4 text-slate-600">
                  {plan.description}
                </p>


                <div className="mt-8">
                  <span className="text-5xl font-bold">
                    {plan.price}
                  </span>

                  <span className="text-slate-500">
                    /month
                  </span>
                </div>


                <Link
                  href="/dealer-application"
                  className={`mt-8 block rounded-xl py-4 text-center font-semibold ${
                    plan.popular
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                >
                  Apply Now
                </Link>


                <ul className="mt-8 space-y-4">

                  {plan.features.map((feature) => (

                    <li
                      key={feature}
                      className="flex gap-3 text-slate-700"
                    >
                      <span className="text-blue-600">
                        ✓
                      </span>

                      {feature}

                    </li>

                  ))}

                </ul>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* How Billing Works */}
      <section className="bg-slate-100 py-20">

        <div className="mx-auto max-w-6xl px-6">

          <h2 className="text-center text-4xl font-bold">
            How Dealer Membership Works
          </h2>


          <div className="mt-12 grid gap-8 md:grid-cols-4">

            {[
              "Choose Your Plan",
              "Complete Dealer Application",
              "Get Approved",
              "Access Vehicle Leads",
            ].map((item, index) => (

              <div
                key={item}
                className="rounded-2xl bg-white p-8 text-center shadow"
              >

                <div className="text-4xl font-bold text-blue-600">
                  {index + 1}
                </div>

                <h3 className="mt-4 text-xl font-bold">
                  {item}
                </h3>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* FAQ */}
      <section className="py-20">

        <div className="mx-auto max-w-5xl px-6">

          <h2 className="text-center text-4xl font-bold">
            Dealer Pricing FAQ
          </h2>


          <div className="mt-10 space-y-6">

            {[
              {
                q: "Can I cancel anytime?",
                a: "Yes. Dealer memberships can be managed based on your business needs.",
              },
              {
                q: "Are leads exclusive?",
                a: "Premium plans can include priority access to acquisition opportunities.",
              },
              {
                q: "Do I pay to apply?",
                a: "No. Submit your dealer application first and we will review your account.",
              },
              {
                q: "What type of vehicles are available?",
                a: "Cars, trucks, SUVs, vans, and commercial vehicles from sellers across Canada.",
              },
            ].map((faq) => (

              <div
                key={faq.q}
                className="rounded-xl border p-6"
              >

                <h3 className="text-xl font-bold">
                  {faq.q}
                </h3>

                <p className="mt-3 text-slate-600">
                  {faq.a}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="bg-blue-600 py-20 text-center text-white">

        <h2 className="text-5xl font-bold">
          Start Building Your Inventory Pipeline
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-xl text-blue-100">
          Join NorthSky Auto and connect with sellers before vehicles reach
          traditional marketplaces.
        </p>


        <Link
          href="/dealer-application"
          className="mt-10 inline-block rounded-xl bg-white px-10 py-5 font-semibold text-blue-600"
        >
          Become A Dealer Partner
        </Link>

      </section>

    </main>
  );
}