import Link from "next/link";

export const metadata = {
  title: "Vehicle Leads Marketplace | NorthSky Auto Dealer Portal",
  description:
    "Browse exclusive vehicle acquisition opportunities from sellers across Canada with the NorthSky Auto dealer marketplace.",
};

const leads = [
  {
    id: "1001",
    year: "2022",
    make: "Ford",
    model: "F-150 XLT",
    type: "Truck",
    location: "Edmonton, Alberta",
    mileage: "61,240 km",
    condition: "Excellent",
    value: "$38,900",
  },
  {
    id: "1002",
    year: "2023",
    make: "Toyota",
    model: "RAV4 XLE",
    type: "SUV",
    location: "Calgary, Alberta",
    mileage: "24,115 km",
    condition: "Excellent",
    value: "$41,500",
  },
  {
    id: "1003",
    year: "2021",
    make: "Chevrolet",
    model: "Silverado 1500",
    type: "Truck",
    location: "Red Deer, Alberta",
    mileage: "84,900 km",
    condition: "Very Good",
    value: "$34,700",
  },
  {
    id: "1004",
    year: "2020",
    make: "Honda",
    model: "Civic Touring",
    type: "Car",
    location: "Vancouver, BC",
    mileage: "52,600 km",
    condition: "Excellent",
    value: "$25,900",
  },
];

export default function DealerLeadsPage() {
  return (
    <main className="min-h-screen bg-slate-100">

      {/* Header */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16">

          <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold">
            Dealer Marketplace
          </span>

          <h1 className="mt-6 text-5xl font-bold">
            Find Your Next Vehicle Acquisition
          </h1>

          <p className="mt-5 max-w-3xl text-xl text-slate-300">
            Browse seller submissions and discover vehicles available for
            dealership acquisition across Canada.
          </p>

        </div>
      </section>


      {/* Filters */}
      <section className="mx-auto max-w-7xl px-6 py-10">

        <div className="rounded-2xl bg-white p-8 shadow">

          <h2 className="text-3xl font-bold">
            Search Vehicle Leads
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3 lg:grid-cols-6">

            {[
              "Province",
              "Make",
              "Model",
              "Year",
              "Vehicle Type",
              "Mileage",
            ].map((filter) => (

              <input
                key={filter}
                placeholder={filter}
                className="rounded-lg border p-3"
              />

            ))}

          </div>

          <button className="mt-6 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700">
            Search Leads
          </button>

        </div>

      </section>


      {/* Lead Cards */}
      <section className="mx-auto max-w-7xl px-6 pb-20">

        <div className="flex items-center justify-between">

          <h2 className="text-3xl font-bold">
            Available Vehicle Opportunities
          </h2>

          <span className="text-slate-600">
            {leads.length} Available
          </span>

        </div>


        <div className="mt-8 grid gap-8 lg:grid-cols-2">

          {leads.map((lead) => (

            <div
              key={lead.id}
              className="rounded-3xl bg-white p-8 shadow"
            >

              {/* Vehicle Image Placeholder */}
              <div className="flex h-48 items-center justify-center rounded-xl bg-slate-200 text-slate-500">
                Vehicle Photo
              </div>


              <div className="mt-6">

                <h3 className="text-3xl font-bold">
                  {lead.year} {lead.make} {lead.model}
                </h3>


                <div className="mt-5 grid gap-3 text-slate-600">

                  <p>
                    <strong>Type:</strong> {lead.type}
                  </p>

                  <p>
                    <strong>Location:</strong> {lead.location}
                  </p>

                  <p>
                    <strong>Mileage:</strong> {lead.mileage}
                  </p>

                  <p>
                    <strong>Condition:</strong> {lead.condition}
                  </p>

                  <p>
                    <strong>Estimated Value:</strong> {lead.value}
                  </p>

                </div>


                <div className="mt-8 flex gap-4">

                  <Link
                    href={`/dealer/leads/${lead.id}`}
                    className="flex-1 rounded-xl bg-blue-600 py-4 text-center font-semibold text-white hover:bg-blue-700"
                  >
                    View Details
                  </Link>


                  <button className="rounded-xl border px-6 font-semibold hover:bg-slate-100">
                    Save
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* Upgrade */}
      <section className="bg-slate-900 py-20 text-center text-white">

        <div className="mx-auto max-w-4xl px-6">

          <h2 className="text-4xl font-bold">
            Want More Vehicle Opportunities?
          </h2>

          <p className="mt-5 text-xl text-slate-300">
            Upgrade your membership for priority access, advanced filters,
            and premium acquisition opportunities.
          </p>


          <Link
            href="/pricing"
            className="mt-8 inline-block rounded-xl bg-blue-600 px-10 py-5 font-semibold hover:bg-blue-700"
          >
            Upgrade Dealer Plan
          </Link>

        </div>

      </section>

    </main>
  );
}