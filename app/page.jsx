import Link from "next/link";

export const metadata = {
  title: "Sell Your Vehicle Fast | NorthSky Auto",
  description:
    "Sell your car, truck, SUV, van, or commercial vehicle with NorthSky Auto. Receive offers from verified dealerships and serious buyers across Canada.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:flex lg:items-center lg:justify-between">

          <div className="max-w-3xl">
            <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold">
              🇨🇦 Canada Wide
            </span>

            <h1 className="mt-6 text-5xl font-extrabold leading-tight">
              Sell Your Vehicle
              <span className="block text-blue-400">
                Faster Than Ever.
              </span>
            </h1>

            <p className="mt-6 text-xl text-gray-300">
              Submit your vehicle once and receive offers from verified
              dealerships and qualified buyers. No listing fees. No hassle.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/sell"
                className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold hover:bg-blue-500 transition"
              >
                Sell My Vehicle
              </Link>

              <Link
                href="/buyers"
                className="rounded-xl border border-white px-8 py-4 text-lg hover:bg-white hover:text-slate-900 transition"
              >
                Dealer Signup
              </Link>
            </div>
          </div>

          <div className="mt-16 lg:mt-0">
            <div className="rounded-3xl bg-white/10 p-8 backdrop-blur">
              <h2 className="text-2xl font-bold">
                Why NorthSky Auto?
              </h2>

              <ul className="mt-6 space-y-4 text-gray-200">
                <li>✔ Free vehicle submissions</li>
                <li>✔ Verified dealerships</li>
                <li>✔ Canada-wide network</li>
                <li>✔ Fast offers</li>
                <li>✔ Secure lead handling</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-center text-4xl font-bold">
          How It Works
        </h2>

        <div className="mt-14 grid gap-8 md:grid-cols-3">

          <div className="rounded-2xl border p-8 shadow-sm">
            <div className="text-4xl">🚗</div>
            <h3 className="mt-4 text-2xl font-bold">
              Submit Your Vehicle
            </h3>
            <p className="mt-3 text-gray-600">
              Complete a quick form with your vehicle details and upload photos.
            </p>
          </div>

          <div className="rounded-2xl border p-8 shadow-sm">
            <div className="text-4xl">📨</div>
            <h3 className="mt-4 text-2xl font-bold">
              Receive Offers
            </h3>
            <p className="mt-3 text-gray-600">
              Qualified dealerships review your vehicle and submit offers.
            </p>
          </div>

          <div className="rounded-2xl border p-8 shadow-sm">
            <div className="text-4xl">💰</div>
            <h3 className="mt-4 text-2xl font-bold">
              Get Paid
            </h3>
            <p className="mt-3 text-gray-600">
              Choose the offer that works best for you and complete the sale.
            </p>
          </div>

        </div>
      </section>

      {/* Stats */}
      <section className="bg-slate-100 py-20">
        <div className="mx-auto max-w-6xl grid gap-8 text-center md:grid-cols-4 px-6">

          <div>
            <h3 className="text-4xl font-bold text-blue-600">500+</h3>
            <p className="mt-2 text-gray-600">
              Dealers
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-blue-600">25,000+</h3>
            <p className="mt-2 text-gray-600">
              Vehicles Submitted
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-blue-600">98%</h3>
            <p className="mt-2 text-gray-600">
              Satisfaction
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-blue-600">24 Hours</h3>
            <p className="mt-2 text-gray-600">
              Average Response
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 text-white py-24">
        <div className="mx-auto max-w-5xl text-center px-6">

          <h2 className="text-5xl font-bold">
            Ready to Sell?
          </h2>

          <p className="mt-6 text-xl text-gray-300">
            Join thousands of Canadians using NorthSky Auto to connect with
            trusted buyers and dealerships.
          </p>

          <Link
            href="/sell"
            className="mt-10 inline-block rounded-xl bg-blue-600 px-10 py-4 text-lg font-semibold hover:bg-blue-500 transition"
          >
            Start Selling Today
          </Link>

        </div>
      </section>

    </main>
  );
}