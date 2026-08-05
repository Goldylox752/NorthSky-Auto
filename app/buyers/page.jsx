import Link from "next/link";

export const metadata = {
  title: "Dealer Network | NorthSky Auto",
  description:
    "Join NorthSky Auto and get exclusive access to qualified vehicle seller leads across Canada.",
};

export default function DealersPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">

        <div className="mx-auto max-w-7xl px-6 py-24 text-center">

          <span className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold">
            Dealer Acquisition Platform
          </span>


          <h1 className="mt-8 text-5xl font-extrabold md:text-6xl">
            Find More Vehicles.
            <span className="block text-blue-400">
              Grow Your Inventory.
            </span>
          </h1>


          <p className="mx-auto mt-6 max-w-3xl text-xl text-gray-300">
            NorthSky Auto connects dealerships with motivated vehicle sellers
            across Canada. Stop chasing inventory and start receiving qualified
            acquisition opportunities.
          </p>


          <Link
            href="/buyers/signup"
            className="mt-10 inline-block rounded-xl bg-blue-600 px-10 py-4 text-lg font-bold hover:bg-blue-500"
          >
            Apply As A Dealer Partner
          </Link>

        </div>

      </section>



      {/* Benefits */}
      <section className="mx-auto max-w-7xl px-6 py-20">

        <h2 className="text-center text-4xl font-bold">
          Built For Vehicle Acquisition Teams
        </h2>


        <div className="mt-12 grid gap-8 md:grid-cols-3">


          <div className="rounded-2xl border p-8 shadow-sm">

            <div className="text-5xl">
              🚘
            </div>

            <h3 className="mt-5 text-2xl font-bold">
              Fresh Inventory Opportunities
            </h3>

            <p className="mt-3 text-gray-600">
              Discover private sellers looking to sell cars, trucks, SUVs,
              and commercial vehicles.
            </p>

          </div>



          <div className="rounded-2xl border p-8 shadow-sm">

            <div className="text-5xl">
              🎯
            </div>

            <h3 className="mt-5 text-2xl font-bold">
              Qualified Seller Leads
            </h3>

            <p className="mt-3 text-gray-600">
              Receive detailed vehicle information including mileage,
              condition, photos, and seller contact details.
            </p>

          </div>



          <div className="rounded-2xl border p-8 shadow-sm">

            <div className="text-5xl">
              📈
            </div>

            <h3 className="mt-5 text-2xl font-bold">
              Increase Profits
            </h3>

            <p className="mt-3 text-gray-600">
              Improve your acquisition process and spend less time searching
              for your next vehicle.
            </p>

          </div>


        </div>

      </section>



      {/* How It Works */}
      <section className="bg-gray-100 px-6 py-20">

        <div className="mx-auto max-w-6xl">

          <h2 className="text-center text-4xl font-bold">
            How The Dealer Program Works
          </h2>


          <div className="mt-12 grid gap-8 md:grid-cols-4">


            <div className="rounded-xl bg-white p-6">

              <h3 className="text-xl font-bold">
                1. Apply
              </h3>

              <p className="mt-3 text-gray-600">
                Submit your dealership information.
              </p>

            </div>


            <div className="rounded-xl bg-white p-6">

              <h3 className="text-xl font-bold">
                2. Get Approved
              </h3>

              <p className="mt-3 text-gray-600">
                Our team reviews your application.
              </p>

            </div>


            <div className="rounded-xl bg-white p-6">

              <h3 className="text-xl font-bold">
                3. Receive Leads
              </h3>

              <p className="mt-3 text-gray-600">
                Access matching vehicle sellers.
              </p>

            </div>


            <div className="rounded-xl bg-white p-6">

              <h3 className="text-xl font-bold">
                4. Buy Inventory
              </h3>

              <p className="mt-3 text-gray-600">
                Connect and acquire vehicles.
              </p>

            </div>


          </div>

        </div>

      </section>



      {/* Pricing */}
      <section className="px-6 py-20">

        <div className="mx-auto max-w-6xl">

          <h2 className="text-center text-4xl font-bold">
            Dealer Membership
          </h2>


          <div className="mt-12 grid gap-8 md:grid-cols-3">


            <div className="rounded-2xl border p-8">

              <h3 className="text-2xl font-bold">
                Starter
              </h3>

              <p className="mt-4 text-4xl font-bold">
                $99/mo
              </p>

              <ul className="mt-6 space-y-3 text-gray-600">
                <li>✓ Basic lead access</li>
                <li>✓ Email notifications</li>
                <li>✓ Dealer profile</li>
              </ul>

            </div>



            <div className="rounded-2xl border-2 border-blue-600 p-8">

              <h3 className="text-2xl font-bold">
                Pro Dealer
              </h3>

              <p className="mt-4 text-4xl font-bold">
                $299/mo
              </p>

              <ul className="mt-6 space-y-3 text-gray-600">
                <li>✓ Priority leads</li>
                <li>✓ Advanced matching</li>
                <li>✓ Dealer dashboard</li>
              </ul>

            </div>



            <div className="rounded-2xl border p-8">

              <h3 className="text-2xl font-bold">
                Enterprise
              </h3>

              <p className="mt-4 text-4xl font-bold">
                Custom
              </p>

              <ul className="mt-6 space-y-3 text-gray-600">
                <li>✓ Multiple locations</li>
                <li>✓ API integrations</li>
                <li>✓ Dedicated support</li>
              </ul>

            </div>


          </div>

        </div>

      </section>



      {/* CTA */}
      <section className="bg-blue-600 px-6 py-20 text-center text-white">

        <h2 className="text-4xl font-bold">
          Ready To Grow Your Inventory?
        </h2>


        <p className="mt-4 text-lg text-blue-100">
          Join NorthSky Auto and receive vehicle acquisition opportunities.
        </p>


        <Link
          href="/buyers/signup"
          className="mt-8 inline-block rounded-xl bg-white px-10 py-4 font-bold text-blue-600"
        >
          Become A Dealer Partner
        </Link>


      </section>


    </main>
  );
}