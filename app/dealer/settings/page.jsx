import Link from "next/link";

export const metadata = {
  title: "Dealer Settings | NorthSky Auto",
  description:
    "Manage NorthSky Auto dealer notifications, preferences, security, and account settings.",
};

export default function DealerSettingsPage() {
  return (
    <main>

      {/* Header */}
      <section className="rounded-3xl bg-slate-900 p-10 text-white">

        <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold">
          Account Settings
        </span>

        <h1 className="mt-6 text-5xl font-bold">
          Dealer Settings
        </h1>

        <p className="mt-4 text-xl text-slate-300">
          Manage notifications, lead preferences, and account security.
        </p>

      </section>


      {/* Settings Grid */}
      <section className="mt-10 grid gap-8 lg:grid-cols-2">


        {/* Notifications */}
        <div className="rounded-3xl bg-white p-8 shadow">

          <h2 className="text-3xl font-bold">
            Notifications
          </h2>

          <div className="mt-8 space-y-5">


            {[
              "New vehicle lead alerts",
              "Dealer offer updates",
              "Seller responses",
              "Subscription reminders",
            ].map((item) => (

              <label
                key={item}
                className="flex items-center justify-between rounded-xl bg-slate-50 p-4"
              >

                <span className="font-semibold">
                  {item}
                </span>


                <input
                  type="checkbox"
                  defaultChecked
                  className="h-5 w-5"
                />

              </label>

            ))}


          </div>

        </div>



        {/* Lead Preferences */}
        <div className="rounded-3xl bg-white p-8 shadow">

          <h2 className="text-3xl font-bold">
            Lead Preferences
          </h2>


          <div className="mt-8 space-y-5">


            <select className="w-full rounded-lg border p-4">

              <option>
                Preferred Vehicle Type
              </option>

              <option>
                Trucks
              </option>

              <option>
                SUVs
              </option>

              <option>
                Cars
              </option>

              <option>
                Commercial Vehicles
              </option>

            </select>



            <select className="w-full rounded-lg border p-4">

              <option>
                Maximum Mileage
              </option>

              <option>
                Under 50,000 km
              </option>

              <option>
                Under 100,000 km
              </option>

              <option>
                Any Mileage
              </option>

            </select>



            <input
              placeholder="Preferred Makes (Ford, Toyota, GM...)"
              className="w-full rounded-lg border p-4"
            />


          </div>


          <button className="mt-6 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white">
            Save Preferences
          </button>


        </div>


      </section>



      {/* Security */}
      <section className="mt-10 rounded-3xl bg-white p-8 shadow">


        <h2 className="text-3xl font-bold">
          Account Security
        </h2>


        <div className="mt-8 grid gap-6 md:grid-cols-2">


          <button className="rounded-xl border p-5 text-left hover:bg-slate-50">

            <h3 className="font-bold">
              Change Password
            </h3>

            <p className="mt-2 text-slate-600">
              Update your dealer account password.
            </p>

          </button>



          <button className="rounded-xl border p-5 text-left hover:bg-slate-50">

            <h3 className="font-bold">
              Two-Factor Authentication
            </h3>

            <p className="mt-2 text-slate-600">
              Add extra protection to your account.
            </p>

          </button>


        </div>


      </section>



      {/* Danger Zone */}
      <section className="mt-10 rounded-3xl border border-red-200 bg-red-50 p-8">


        <h2 className="text-3xl font-bold text-red-700">
          Account Actions
        </h2>


        <p className="mt-3 text-red-600">
          Manage account cancellation and data settings.
        </p>


        <div className="mt-6 flex flex-wrap gap-4">


          <Link
            href="/dealer/subscriptions"
            className="rounded-xl bg-slate-900 px-6 py-4 font-semibold text-white"
          >
            Manage Subscription
          </Link>


          <button className="rounded-xl border border-red-400 px-6 py-4 font-semibold text-red-700">
            Deactivate Account
          </button>


        </div>


      </section>


    </main>
  );
}