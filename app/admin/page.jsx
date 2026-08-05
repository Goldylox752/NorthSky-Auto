import { supabase } from "@/lib/supabase";

export const metadata = {
  title: "Admin Dashboard | NorthSky Auto",
};

export default async function AdminPage() {

  const { data: leads, error } = await supabase
    .from("vehicles")
    .select("*")
    .order("created_at", {
      ascending: false,
    });


  if (error) {
    return (
      <div className="p-10">
        Error loading leads.
      </div>
    );
  }


  return (
    <main className="min-h-screen bg-gray-100">

      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-10">

          <h1 className="text-4xl font-bold">
            NorthSky Auto Admin
          </h1>

          <p className="mt-2 text-gray-300">
            Manage incoming vehicle leads.
          </p>

        </div>
      </section>


      <section className="mx-auto max-w-7xl px-6 py-10">

        <div className="rounded-xl bg-white shadow overflow-hidden">

          <div className="border-b p-6">
            <h2 className="text-2xl font-bold">
              Vehicle Leads ({leads.length})
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
                    Mileage
                  </th>

                  <th className="p-4">
                    Price
                  </th>

                  <th className="p-4">
                    Status
                  </th>
                </tr>

              </thead>


              <tbody>

                {leads.map((vehicle) => (

                  <tr
                    key={vehicle.id}
                    className="border-t"
                  >

                    <td className="p-4">

                      <div className="font-semibold">
                        {vehicle.name}
                      </div>

                      <div className="text-sm text-gray-500">
                        {vehicle.phone}
                      </div>

                    </td>


                    <td className="p-4">

                      {vehicle.year}{" "}
                      {vehicle.make}{" "}
                      {vehicle.model}

                      <div className="text-sm text-gray-500">
                        {vehicle.trim}
                      </div>

                    </td>


                    <td className="p-4">
                      {vehicle.mileage} km
                    </td>


                    <td className="p-4">
                      ${vehicle.asking_price}
                    </td>


                    <td className="p-4">

                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                        {vehicle.status}
                      </span>

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