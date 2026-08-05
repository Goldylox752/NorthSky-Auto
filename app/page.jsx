import Link from "next/link";

export const metadata = {
  title: "NorthSky Auto | Sell Your Vehicle Fast Across Canada",
  description:
    "NorthSky Auto connects vehicle sellers with verified dealerships and qualified buyers. Submit your car, truck, SUV, or commercial vehicle today.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen">

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">

        <div className="mx-auto max-w-7xl px-6 py-24 lg:flex lg:items-center lg:justify-between">

          <div className="max-w-3xl">

            <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold">
              🇨🇦 Canada Vehicle Marketplace
            </span>


            <h1 className="mt-8 text-5xl font-extrabold leading-tight md:text-6xl">

              Sell Your Vehicle.
              <span className="block text-blue-400">
                Get Better Offers.
              </span>

            </h1>


            <p className="mt-6 text-xl text-gray-300">

              NorthSky Auto connects vehicle owners with trusted dealerships
              and qualified buyers. Submit your vehicle details and start
              receiving offers.

            </p>


            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                href="/sell"
                className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold transition hover:bg-blue-500"
              >
                Sell My Vehicle
              </Link>


              <Link
                href="/buyers"
                className="rounded-xl border border-white px-8 py-4 text-lg transition hover:bg-white hover:text-slate-900"
              >
                Join Dealer Network
              </Link>

            </div>

          </div>


          <div className="mt-12 lg:mt-0">

            <div className="rounded-3xl bg-white/10 p-8 backdrop-blur">

              <h2 className="text-2xl font-bold">
                Why Sell With Us?
              </h2>


              <ul className="mt-6 space-y-4 text-gray-200">

                <li>
                  ✓ Connect with verified buyers
                </li>

                <li>
                  ✓ No expensive vehicle listings
                </li>

                <li>
                  ✓ Fast response from dealers
                </li>

                <li>
                  ✓ Secure information handling
                </li>

              </ul>

            </div>

          </div>


        </div>

      </section>



      {/* How It Works */}
      <section className="bg-white px-6 py-20">

        <div className="mx-auto max-w-7xl">

          <h2 className="text-center text-4xl font-bold text-slate-900">
            How NorthSky Auto Works
          </h2>


          <div className="mt-12 grid gap-8 md:grid-cols-3">


            <div className="rounded-2xl border p-8">

              <div className="text-4xl">
                🚗
              </div>

              <h3 className="mt-5 text-2xl font-bold">
                1. Submit Your Vehicle
              </h3>

              <p className="mt-3 text-gray-600">
                Tell us about your car, truck, SUV, or commercial vehicle.
              </p>

            </div>



            <div className="rounded-2xl border p-8">

              <div className="text-4xl">
                🤝
              </div>

              <h3 className="mt-5 text-2xl font-bold">
                2. Get Connected
              </h3>

              <p className="mt-3 text-gray-600">
                Your vehicle is matched with interested dealerships and buyers.
              </p>

            </div>



            <div className="rounded-2xl border p-8">

              <div className="text-4xl">
                💰
              </div>

              <h3 className="mt-5 text-2xl font-bold">
                3. Accept Your Offer
              </h3>

              <p className="mt-3 text-gray-600">
                Choose the offer that works best for you.
              </p>

            </div>


          </div>

        </div>

      </section>



      {/* Dealer Section */}
      <section className="bg-slate-100 px-6 py-20">

        <div className="mx-auto max-w-6xl text-center">

          <h2 className="text-4xl font-bold">
            Are You A Dealer?
          </h2>


          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600">

            Access qualified vehicle sellers before your competitors.
            Build your inventory with high-intent leads.

          </p>


          <Link
            href="/buyers"
            className="mt-8 inline-block rounded-xl bg-slate-900 px-8 py-4 font-semibold text-white hover:bg-slate-700"
          >
            Become A Partner Dealer
          </Link>


        </div>

      </section>



      {/* Stats */}
      <section className="bg-white px-6 py-20">

        <div className="mx-auto grid max-w-6xl gap-8 text-center md:grid-cols-4">

          <div>
            <h3 className="text-4xl font-bold text-blue-600">
              24/7
            </h3>

            <p className="mt-2 text-gray-600">
              Lead Platform
            </p>
          </div>


          <div>
            <h3 className="text-4xl font-bold text-blue-600">
              Canada
            </h3>

            <p className="mt-2 text-gray-600">
              Nationwide Reach
            </p>
          </div>


          <div>
            <h3 className="text-4xl font-bold text-blue-600">
              Fast
            </h3>

            <p className="mt-2 text-gray-600">
              Dealer Response
            </p>
          </div>


          <div>
            <h3 className="text-4xl font-bold text-blue-600">
              Free
            </h3>

            <p className="mt-2 text-gray-600">
              Seller Submission
            </p>
          </div>

        </div>

      </section>



      {/* Final CTA */}
      <section className="bg-blue-600 px-6 py-20 text-center text-white">

        <h2 className="text-4xl font-bold">
          Ready To Sell Your Vehicle?
        </h2>


        <p className="mt-4 text-lg text-blue-100">
          Submit your vehicle today and connect with buyers.
        </p>


        <Link
          href="/sell"
          className="mt-8 inline-block rounded-xl bg-white px-10 py-4 font-bold text-blue-600 hover:bg-gray-100"
        >
          Start Your Submission
        </Link>


      </section>


    </main>
  );
}