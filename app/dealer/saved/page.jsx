import Link from "next/link";

export const metadata = {
  title: "Saved Vehicle Leads | NorthSky Auto Dealer Portal",
  description:
    "Manage saved vehicle acquisition opportunities and track potential inventory purchases with NorthSky Auto.",
};

const savedVehicles = [
  {
    id: "1001",
    vehicle: "2022 Ford F-150 XLT",
    location: "Edmonton, Alberta",
    mileage: "61,240 km",
    condition: "Excellent",
    value: "$38,900",
    status: "New Lead",
  },
  {
    id: "1002",
    vehicle: "2023 Toyota RAV4 XLE",
    location: "Calgary, Alberta",
    mileage: "24,115 km",
    condition: "Excellent",
    value: "$41,500",
    status: "Follow Up",
  },
  {
    id: "1003",
    vehicle: "2021 Chevrolet Silverado 1500",
    location: "Red Deer, Alberta",
    mileage: "84,900 km",
    condition: "Very Good",
    value: "$34,700",
    status: "Reviewing",
  },
];

export default function SavedLeadsPage() {
  return (
    <main className="min-h-screen bg-slate-100">

      {/* Header */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16">

          <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold">
            Dealer Workspace
          </span>

          <h1 className="mt-6 text-5xl font-bold">
            Saved Vehicle Leads
          </h1>

          <p className="mt-4 max-w-3xl text-xl text-slate-300">
            Keep track of vehicles you are interested in acquiring and manage
            your follow-up opportunities.
          </p>

        </div>
      </section>


      {/* Saved Leads */}
      <section className="mx-auto max-w-7xl px-6 py-12">

        <div className="flex items-center justify-between">

          <h2 className="text-3xl font-bold">
            Your Saved Opportunities
          </h2>

          <Link
            href="/dealer/leads"
            className="font-semibold text-blue-600 hover:underline"
          >
            Browse More Leads →
          </Link>

        </div>


        <div className="mt-8 space-y-6">

          {savedVehicles.map((vehicle) => (

            <div
              key={vehicle.id}
              className="rounded-3xl bg-white p-8 shadow"
            >

              <div className="grid gap-8 lg:grid-cols-5">


                {/* Vehicle */}
                <div className="lg:col-span-3">

                  <div className="flex items-start justify-between">

                    <div>

                      <h3 className="text-3xl font-bold">
                        {vehicle.vehicle}
                      </h3>

                      <p className="mt-2 text-slate-600">
                        {vehicle.location}
                      </p>

                    </div>


                    <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                      {vehicle.status}
                    </span>

                  </div>


                  <div className="mt-6 grid gap-3 md:grid-cols-2 text-slate-600">

                    <p>
                      <strong>Mileage:</strong> {vehicle.mileage}
                    </p>

                    <p>
                      <strong>Condition:</strong> {vehicle.condition}
                    </p>

                    <p>
                      <strong>Estimated Value:</strong> {vehicle.value}
                    </p>

                    <p>
                      <strong>Lead ID:</strong> #{vehicle.id}
                    </p>

                  </div>

                </div>



                {/* Actions */}
                <div className="flex flex-col justify-center gap-4 lg:col-span-2 lg:flex-row lg:items-center">

                  <Link
                    href={`/dealer/leads/${vehicle.id}`}
                    className="rounded-xl bg-blue-600 px-8 py-4 text-center font-semibold text-white hover:bg-blue-700"
                  >
                    View Lead
                  </Link>


                  <button
                    className="rounded-xl border px-8 py-4 font-semibold hover:bg-slate-100"
                  >
                    Remove
                  </button>

                </div>


              </div>

            </div>

          ))}

        </div>

      </section>


      {/* Empty State Preview */}
      <section className="mx-auto max-w-7xl px-6 pb-20">

        <div className="rounded-3xl bg-white p-10 text-center shadow">

          <h2 className="text-3xl font-bold">
            Need More Inventory Options?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Browse the NorthSky Auto marketplace to discover more vehicles
            available from private sellers across Canada.
          </p>


          <Link
            href="/dealer/leads"
            className="mt-8 inline-block rounded-xl bg-blue-600 px-10 py-4 font-semibold text-white hover:bg-blue-700"
          >
            Find More Leads
          </Link>

        </div>

      </section>


    </main>
  );
}