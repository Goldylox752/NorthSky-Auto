import Link from "next/link";

export const metadata = {
  title: "Admin Dashboard | NorthSky Auto",
  description: "Manage vehicle leads and dealership requests.",
};

const leads = [
  {
    id: 1,
    name: "John Smith",
    vehicle: "2022 Ford F-150",
    mileage: "45,000 km",
    location: "Edmonton, AB",
    price: "$42,000",
    status: "New",
  },
  {
    id: 2,
    name: "Sarah Wilson",
    vehicle: "2020 Toyota RAV4",
    mileage: "65,000 km",
    location: "Calgary, AB",
    price: "$28,500",
    status: "Contacted",
  },
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-100">

      {/* Header */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-10">

          <h1 className="text-4xl font-bold">
            NorthSky Auto Admin
          </h1>

          <p className="mt-2 text-gray-300">
            Manage vehicle leads and dealer requests.
          </p>

        </div>
      </section>


      {/* Stats */}
      <section className="mx-auto max-w-7xl px-6 py-10">

        <div className="grid gap-6 md:grid-cols-4">

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-gray-500">
              Total Leads
            </h2>
            <p className="mt-2 text-4xl font-bold">
              248
            </p>
          </div>


          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-gray-500">
              New Today
            </h2>
            <p className="mt-2 text-4xl font-bold text-blue-600">
              12
            </p>
          </div>


          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-gray-500">
              Dealers
            </h2>
            <p className="mt-2 text-4xl font-bold">
              36
            </p>
          </div>


          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-gray-500">
              Revenue
            </h2>
            <p className="mt-2 text-4xl font-bold text-green-600">
              $8,450
            </p>
          </div>

        </div>

      </section>


      {/* Leads Table */}
      <section className="mx-auto max-w-7xl px-6 pb-16">

        <div className="rounded-xl bg-white shadow">

          <div className="border-b p-6">

            <h2 className="text-2xl font-bold">
              Vehicle Leads
            </h2>

          </div>


          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead className="bg-gray-50">

                <tr>
                  <th className="p-4">
                    Seller
                  </th>

                  <th className="p-4">
                    Vehicle
                  </th>

                  <th className="p-4">
                    Location
                  </th>

                  <th className="p-4">
                    Price
                  </th>

                  <th className="p-4">
                    Status
                  </th>

                  <th className="p-4">
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {leads.map((lead) => (

                  <tr
                    key={lead.id}
                    className="border-t"
                  >

                    <td className="p-4">
                      {lead.name}
                    </td>

                    <td className="p-4">
                      {lead.vehicle}
                      <br />
                      <span className="text-sm text-gray-500">
                        {lead.mileage}
                      </span>
                    </td>


                    <td className="p-4">
                      {lead.location}
                    </td>


                    <td className="p-4">
                      {lead.price}
                    </td>


                    <td className="p-4">

                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                        {lead.status}
                      </span>

                    </td>


                    <td className="p-4">

                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </Link>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </section>

    </main>
  );
}