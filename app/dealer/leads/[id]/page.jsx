import Link from "next/link";

export async function generateMetadata({ params }) {
  return {
    title: `Vehicle Lead ${params.id} | NorthSky Auto Dealer Portal`,
    description:
      "View vehicle acquisition details and submit an offer through the NorthSky Auto dealer marketplace.",
  };
}

const vehicle = {
  id: "1001",
  year: "2022",
  make: "Ford",
  model: "F-150 XLT",
  type: "Truck",
  location: "Edmonton, Alberta",
  mileage: "61,240 km",
  condition: "Excellent",
  estimatedValue: "$38,900",
  description:
    "Well maintained Ford F-150 with service history available. Seller is looking for a competitive dealer offer.",
  features: [
    "4x4",
    "Crew Cab",
    "Backup Camera",
    "Apple CarPlay",
    "Heated Seats",
    "Bluetooth",
  ],
};

export default function VehicleLeadPage({ params }) {
  return (
    <main className="min-h-screen bg-slate-100">

      {/* Header */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16">

          <Link
            href="/dealer/leads"
            className="text-blue-400 hover:underline"
          >
            ← Back to Leads
          </Link>

          <h1 className="mt-6 text-5xl font-bold">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h1>

          <p className="mt-4 text-xl text-slate-300">
            Vehicle Acquisition Opportunity #{params.id}
          </p>

        </div>
      </section>


      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid gap-8 lg:grid-cols-3">


          {/* Vehicle Details */}
          <div className="lg:col-span-2 space-y-8">


            {/* Photos */}
            <div className="rounded-3xl bg-white p-8 shadow">

              <h2 className="text-3xl font-bold">
                Vehicle Photos
              </h2>

              <div className="mt-6 grid gap-4 md:grid-cols-3">

                {[1,2,3,4,5,6].map((photo)=>(
                  <div
                    key={photo}
                    className="flex h-40 items-center justify-center rounded-xl bg-slate-200 text-slate-500"
                  >
                    Photo {photo}
                  </div>
                ))}

              </div>

            </div>


            {/* Information */}
            <div className="rounded-3xl bg-white p-8 shadow">

              <h2 className="text-3xl font-bold">
                Vehicle Information
              </h2>


              <div className="mt-6 grid gap-4 md:grid-cols-2">

                <p>
                  <strong>Make:</strong> {vehicle.make}
                </p>

                <p>
                  <strong>Model:</strong> {vehicle.model}
                </p>

                <p>
                  <strong>Year:</strong> {vehicle.year}
                </p>

                <p>
                  <strong>Type:</strong> {vehicle.type}
                </p>

                <p>
                  <strong>Mileage:</strong> {vehicle.mileage}
                </p>

                <p>
                  <strong>Condition:</strong> {vehicle.condition}
                </p>

                <p>
                  <strong>Location:</strong> {vehicle.location}
                </p>

                <p>
                  <strong>Estimated Value:</strong>{" "}
                  {vehicle.estimatedValue}
                </p>

              </div>

            </div>


            {/* Description */}
            <div className="rounded-3xl bg-white p-8 shadow">

              <h2 className="text-3xl font-bold">
                Seller Notes
              </h2>

              <p className="mt-5 text-slate-600">
                {vehicle.description}
              </p>

            </div>


            {/* Features */}
            <div className="rounded-3xl bg-white p-8 shadow">

              <h2 className="text-3xl font-bold">
                Vehicle Features
              </h2>


              <div className="mt-6 flex flex-wrap gap-3">

                {vehicle.features.map((feature)=>(
                  <span
                    key={feature}
                    className="rounded-full bg-blue-100 px-4 py-2 text-blue-700"
                  >
                    ✓ {feature}
                  </span>
                ))}

              </div>

            </div>


          </div>



          {/* Sidebar */}
          <aside className="space-y-6">


            {/* Unlock */}
            <div className="rounded-3xl bg-white p-8 shadow">

              <h2 className="text-2xl font-bold">
                Seller Contact Locked
              </h2>

              <p className="mt-4 text-slate-600">
                Unlock this lead to view seller contact information and submit
                your acquisition offer.
              </p>


              <button className="mt-6 w-full rounded-xl bg-blue-600 py-4 font-semibold text-white hover:bg-blue-700">
                Unlock Lead
              </button>

            </div>



            {/* Offer */}
            <div className="rounded-3xl bg-white p-8 shadow">

              <h2 className="text-2xl font-bold">
                Submit Offer
              </h2>


              <input
                placeholder="Offer Amount"
                className="mt-5 w-full rounded-lg border p-4"
              />


              <textarea
                placeholder="Message to seller"
                rows={5}
                className="mt-4 w-full rounded-lg border p-4"
              />


              <button className="mt-4 w-full rounded-xl bg-slate-900 py-4 font-semibold text-white">
                Send Offer
              </button>

            </div>



            {/* Trust */}
            <div className="rounded-3xl bg-blue-600 p-8 text-white">

              <h2 className="text-2xl font-bold">
                NorthSky Auto Dealer Network
              </h2>

              <p className="mt-4 text-blue-100">
                Access qualified vehicle sellers and build your inventory
                pipeline.
              </p>

            </div>


          </aside>


        </div>

      </section>

    </main>
  );
}