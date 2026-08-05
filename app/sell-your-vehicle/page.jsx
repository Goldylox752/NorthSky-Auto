import Link from "next/link";

export const metadata = {
  title:
    "Sell Your Vehicle Online | Get Dealer Offers Across Canada | NorthSky Auto",
  description:
    "Sell your car, truck, SUV, or van with NorthSky Auto. Submit your vehicle once and receive competitive offers from verified dealerships across Canada. Free, secure, and with no obligation to sell.",
  keywords: [
    "sell my car",
    "sell my truck",
    "vehicle valuation",
    "dealer offers",
    "sell vehicle Canada",
    "trade in vehicle",
    "NorthSky Auto",
  ],
};

export default function SellVehiclePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <span className="inline-flex rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold">
            Canada's Vehicle Acquisition Marketplace
          </span>

          <h1 className="mt-6 text-5xl font-bold tracking-tight">
            Sell Your Vehicle.
            <br />
            Receive Competitive Dealer Offers.
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-xl text-slate-300">
            Submit your vehicle once and let verified dealerships compete for
            your business. No listing fees. No obligation. Just real offers from
            buyers looking for inventory.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="#vehicle-form"
              className="rounded-lg bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
            >
              Get My Dealer Offers
            </Link>

            <Link
              href="/dealers"
              className="rounded-lg border border-white px-8 py-4 font-semibold hover:bg-white hover:text-slate-900"
            >
              For Dealers
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-4 text-left">
            {[
              "✓ Free to submit",
              "✓ Verified dealer network",
              "✓ No obligation to sell",
              "✓ Secure & private",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl bg-white/10 p-5 backdrop-blur"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-4xl font-bold">
            How NorthSky Auto Works
          </h2>

          <div className="mt-14 grid gap-8 md:grid-cols-4">
            {[
              {
                title: "Submit",
                text: "Tell us about your vehicle in just a few minutes.",
              },
              {
                title: "Match",
                text: "We notify verified dealerships looking for vehicles like yours.",
              },
              {
                title: "Receive Offers",
                text: "Dealers compete by sending you purchase offers.",
              },
              {
                title: "Choose",
                text: "Accept the offer you like best—or walk away with no obligation.",
              },
            ].map((step, index) => (
              <div
                key={step.title}
                className="rounded-2xl border p-8 shadow-sm"
              >
                <div className="mb-4 text-4xl font-bold text-blue-600">
                  {index + 1}
                </div>

                <h3 className="text-2xl font-semibold">{step.title}</h3>

                <p className="mt-4 text-slate-600">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Form */}
      <section
        id="vehicle-form"
        className="bg-slate-50 py-20"
      >
        <div className="mx-auto max-w-5xl rounded-3xl bg-white p-10 shadow-lg">
          <h2 className="text-4xl font-bold">
            Tell Us About Your Vehicle
          </h2>

          <p className="mt-3 text-slate-600">
            Complete the information below to begin receiving dealer offers.
          </p>

          <form className="mt-10 space-y-10">
            {/* Vehicle Details */}
            <div>
              <h3 className="mb-6 text-2xl font-semibold">
                Vehicle Information
              </h3>

              <div className="grid gap-6 md:grid-cols-2">
                {[
                  "Year",
                  "Make",
                  "Model",
                  "Trim",
                  "Mileage",
                  "VIN (Optional)",
                  "Transmission",
                  "Fuel Type",
                  "Drivetrain",
                  "Exterior Colour",
                  "Interior Colour",
                  "Postal Code",
                ].map((field) => (
                  <input
                    key={field}
                    type="text"
                    placeholder={field}
                    className="rounded-lg border p-4 focus:border-blue-600 focus:outline-none"
                  />
                ))}
              </div>
            </div>

            {/* Condition */}
            <div>
              <h3 className="mb-6 text-2xl font-semibold">
                Vehicle Condition
              </h3>

              <textarea
                rows={5}
                placeholder="Describe your vehicle's condition, service history, accident history, modifications, or anything a dealer should know."
                className="w-full rounded-lg border p-4 focus:border-blue-600 focus:outline-none"
              />
            </div>

            {/* Seller */}
            <div>
              <h3 className="mb-6 text-2xl font-semibold">
                Your Information
              </h3>

              <div className="grid gap-6 md:grid-cols-2">
                {[
                  "Full Name",
                  "Email Address",
                  "Phone Number",
                  "Preferred Contact Method",
                ].map((field) => (
                  <input
                    key={field}
                    type="text"
                    placeholder={field}
                    className="rounded-lg border p-4 focus:border-blue-600 focus:outline-none"
                  />
                ))}
              </div>
            </div>

            <button
              className="w-full rounded-xl bg-blue-600 py-5 text-lg font-semibold text-white transition hover:bg-blue-700"
            >
              Submit Vehicle
            </button>

            <p className="text-center text-sm text-slate-500">
              By submitting your vehicle you agree to our Terms of Service and
              Privacy Policy. Submission is completely free and there is no
              obligation to accept any offer.
            </p>
          </form>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-4xl font-bold">
            Why Sellers Choose NorthSky Auto
          </h2>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Competitive Offers",
                text: "Multiple dealerships compete for your vehicle instead of negotiating with just one buyer.",
              },
              {
                title: "Fast Process",
                text: "Most submissions begin receiving dealer interest quickly after approval.",
              },
              {
                title: "Trusted Network",
                text: "We work with verified dealerships actively looking to purchase quality vehicles.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border p-8 shadow-sm"
              >
                <h3 className="text-2xl font-semibold">
                  {card.title}
                </h3>

                <p className="mt-4 text-slate-600">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-100 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-4xl font-bold">
            Frequently Asked Questions
          </h2>

          <div className="mt-12 space-y-8">
            {[
              {
                q: "Is it free?",
                a: "Yes. Submitting your vehicle is completely free.",
              },
              {
                q: "Am I required to sell?",
                a: "No. You decide whether or not to accept any dealer offer.",
              },
              {
                q: "What vehicles can I submit?",
                a: "Cars, trucks, SUVs, vans, commercial vehicles, and more.",
              },
              {
                q: "How do dealers contact me?",
                a: "Dealers contact you using the information you provide after your submission has been reviewed.",
              },
            ].map((faq) => (
              <div
                key={faq.q}
                className="rounded-xl bg-white p-8 shadow"
              >
                <h3 className="text-xl font-semibold">
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
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-5xl font-bold">
            Ready to Sell Your Vehicle?
          </h2>

          <p className="mt-6 text-xl text-blue-100">
            Join thousands of Canadians connecting with dealerships looking to
            purchase quality vehicles.
          </p>

          <Link
            href="#vehicle-form"
            className="mt-10 inline-block rounded-xl bg-white px-10 py-5 font-semibold text-blue-600 transition hover:bg-slate-100"
          >
            Start My Free Submission
          </Link>
        </div>
      </section>
    </main>
  );
}