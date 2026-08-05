import Link from "next/link";

export const metadata = {
  title: "Dealer Profile | NorthSky Auto",
  description:
    "Manage your NorthSky Auto dealer profile, business information, and acquisition preferences.",
};

export default function DealerProfilePage() {
  return (
    <main>

      <section className="rounded-3xl bg-slate-900 p-10 text-white">

        <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold">
          Dealer Account
        </span>

        <h1 className="mt-6 text-5xl font-bold">
          Dealer Profile
        </h1>

        <p className="mt-4 text-xl text-slate-300">
          Manage your dealership information and vehicle acquisition settings.
        </p>

      </section>


      <section className="mt-10 grid gap-8 lg:grid-cols-3">


        {/* Company Info */}
        <div className="rounded-3xl bg-white p-8 shadow lg:col-span-2">

          <h2 className="text-3xl font-bold">
            Dealership Information
          </h2>


          <div className="mt-8 grid gap-6 md:grid-cols-2">

            <input
              placeholder="Dealership Name"
              className="rounded-lg border p-4"
            />


            <input
              placeholder="Contact Person"
              className="rounded-lg border p-4"
            />


            <input
              placeholder="Email Address"
              className="rounded-lg border p-4"
            />


            <input
              placeholder="Phone Number"
              className="rounded-lg border p-4"
            />


            <input
              placeholder="City"
              className="rounded-lg border p-4"
            />


            <input
              placeholder="Province"
              className="rounded-lg border p-4"
            />


          </div>


          <button className="mt-8 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white hover:bg-blue-700">
            Save Profile
          </button>


        </div>



        {/* Account Status */}
        <div className="rounded-3xl bg-white p-8 shadow">

          <h2 className="text-2xl font-bold">
            Account Status
          </h2>


          <div className="mt-6 rounded-xl bg-green-50 p-5">

            <p className="text-sm text-slate-600">
              Membership
            </p>

            <p className="mt-2 text-xl font-bold text-green-700">
              Professional Plan
            </p>

          </div>


          <div className="mt-5 rounded-xl bg-slate-50 p-5">

            <p className="text-sm text-slate-600">
              Account Status
            </p>

            <p className="mt-2 font-bold">
              Verified Dealer
            </p>

          </div>


          <Link
            href="/dealer/subscriptions"
            className="mt-6 block rounded-xl border p-4 text-center font-semibold hover:bg-slate-100"
          >
            Manage Subscription
          </Link>


        </div>


      </section>



      {/* Preferences */}
      <section className="mt-10 rounded-3xl bg-white p-8 shadow">

        <h2 className="text-3xl font-bold">
          Acquisition Preferences
        </h2>


        <p className="mt-3 text-slate-600">
          Tell NorthSky Auto what vehicles your dealership is looking to acquire.
        </p>


        <div className="mt-8 grid gap-6 md:grid-cols-3">


          <input
            placeholder="Preferred Makes"
            className="rounded-lg border p-4"
          />


          <input
            placeholder="Preferred Vehicle Types"
            className="rounded-lg border p-4"
          />


          <input
            placeholder="Maximum Mileage"
            className="rounded-lg border p-4"
          />


        </div>


        <button className="mt-8 rounded-xl bg-slate-900 px-8 py-4 font-semibold text-white">
          Update Preferences
        </button>


      </section>



      {/* Verification */}
      <section className="mt-10 rounded-3xl bg-blue-600 p-10 text-white">

        <h2 className="text-3xl font-bold">
          Dealer Verification
        </h2>


        <p className="mt-4 text-blue-100">
          Verified dealers receive higher quality acquisition opportunities and
          increased seller trust.
        </p>


        <button className="mt-6 rounded-xl bg-white px-8 py-4 font-semibold text-blue-600">
          Submit Verification Documents
        </button>


      </section>


    </main>
  );
}