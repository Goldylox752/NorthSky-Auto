import Link from "next/link";

export const metadata = {
  title: "Dealer Network | NorthSky Auto",
  description:
    "Join the NorthSky Auto dealer network and receive qualified vehicle seller leads across Canada.",
};

export default function BuyersPage() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-slate-900 text-white py-20">

        <div className="mx-auto max-w-6xl px-6 text-center">

          <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold">
            Dealer Partner Program
          </span>

          <h1 className="mt-8 text-5xl font-extrabold">
            Get More Vehicles Into Your Inventory
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-xl text-gray-300">
            Access high-intent vehicle sellers and grow your dealership
            without wasting money on traditional advertising.
          </p>

          <Link
            href="/buyers/signup"
            className="mt-10 inline-block rounded-xl bg-blue-600 px-8 py-4 font-semibold hover:bg-blue-500"
          >
            Become A Dealer Partner
          </Link>

        </div>

      </section>


      {/* Benefits */}
      <section className="mx-auto max-w-7xl px-6 py-20">

        <h2 className="text-center text-4xl font-bold">
          Why Dealers Choose NorthSky Auto
        </h2>


        <div className="mt-12 grid gap-8 md:grid-cols-3">


          <div className="rounded-2xl bg-white p-8 shadow">

            <div className="text-4xl">
              🚘
            </div>

            <h3 className="mt-4 text-2xl font-bold">
              Fresh Inventory
            </h3>

            <p className="mt-3 text-gray-600">
              Connect with people actively looking to sell their vehicles.
            </p>

          </div>


          <div className="rounded-2xl bg-white p-8 shadow">

            <div className="text-4xl">
              🎯
            </div>

            <h3 className="mt-4 text-2xl font-bold">
              Qualified Leads
            </h3>

            <p className="mt-3 text-gray-600">
              Receive seller information instead of chasing cold prospects.
            </p>

          </div>


          <div className="rounded-2xl bg-white p-8 shadow">

            <div className="text-4xl">
              📈
            </div>

            <h3 className="mt-4 text-2xl font-bold">
              Grow Sales
            </h3>

            <p className="mt-3 text-gray-600">
              Build inventory faster and improve acquisition efficiency.
            </p>

          </div>


        </div>

      </section>


      {/* Pricing */}
      <section className="bg-slate-100 px-6 py-20">

        <div className="mx-auto max-w-5xl">

          <h2 className="text-center text-4xl font-bold">
            Dealer Plans
          </h2>


          <div className="mt-12 grid gap-8 md:grid-cols-3">


            <div className="rounded-2xl bg-white p-8 shadow">

              <h3 className="text-2xl font-bold">
                Starter
              </h3>

              <p className="mt-4 text-4xl font-bold">
                $99/mo
              </p>

              <ul className="mt-6 space-y-3 text-gray-600">
                <li>✓ Access to leads</li>
                <li>✓ Basic dashboard</li>
                <li>✓ Email notifications</li>
              </ul>

            </div>


            <div className="rounded-2xl border-2 border-blue-600 bg-white p-8 shadow">

              <h3 className="text-2xl font-bold">
                Professional
              </h3>

              <p className="mt-4 text-4xl font-bold">
                $299/mo
              </p>

              <ul className="mt-6 space-y-3 text-gray-600">
                <li>✓ More vehicle leads</li>
                <li>✓ Priority matching</li>
                <li>✓ Dealer dashboard</li>
              </ul>

            </div>


            <div className="rounded-2xl bg-white p-8 shadow">

              <h3 className="text-2xl font-bold">
                Enterprise
              </h3>

              <p className="mt-4 text-4xl font-bold">
                Custom
              </p>

              <ul className="mt-6 space-y-3 text-gray-600">
                <li>✓ Multiple locations</li>
                <li>✓ API access</li>
                <li>✓ Dedicated support</li>
              </ul>

            </div>


          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="bg-blue-600 py-20 text-center text-white">

        <h2 className="text-4xl font-bold">
          Start Receiving Vehicle Leads
        </h2>

        <Link
          href="/buyers/signup"
          className="mt-8 inline-block rounded-xl bg-white px-10 py-4 font-bold text-blue-600"
        >
          Join Dealer Network
        </Link>

      </section>

    </main>
  );
}