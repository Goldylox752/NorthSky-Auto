import { supabase } from "@/lib/supabase";

export const metadata = {
  title: "Dealer Management | NorthSky Auto Admin",
};

export default async function AdminDealersPage() {

  const { data: dealers, error } = await supabase
    .from("dealers")
    .select("*")
    .order("created_at", {
      ascending: false,
    });


  if (error) {
    return (
      <main className="p-10">
        Error loading dealers.
      </main>
    );
  }


  return (
    <main className="min-h-screen bg-gray-100">


      {/* Header */}

      <section className="bg-slate-900 text-white">

        <div className="mx-auto max-w-7xl px-6 py-10">

          <h1 className="text-4xl font-bold">
            Dealer Management
          </h1>

          <p className="mt-2 text-gray-300">
            Review and manage NorthSky Auto dealer partners.
          </p>

        </div>

      </section>



      {/* Stats */}

      <section className="mx-auto max-w-7xl px-6 py-10">

        <div className="grid gap-6 md:grid-cols-3">


          <div className="rounded-xl bg-white p-6 shadow">

            <p className="text-gray-500">
              Total Dealers
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              {dealers.length}
            </h2>

          </div>



          <div className="rounded-xl bg-white p-6 shadow">

            <p className="text-gray-500">
              Pending Approval
            </p>

            <h2 className="mt-2 text-4xl font-bold text-yellow-600">
              {
                dealers.filter(
                  dealer => dealer.status === "pending"
                ).length
              }
            </h2>

          </div>



          <div className="rounded-xl bg-white p-6 shadow">

            <p className="text-gray-500">
              Active Dealers
            </p>

            <h2 className="mt-2 text-4xl font-bold text-green-600">
              {
                dealers.filter(
                  dealer => dealer.status === "approved"
                ).length
              }
            </h2>

          </div>


        </div>

      </section>



      {/* Dealer Table */}

      <section className="mx-auto max-w-7xl px-6 pb-16">

        <div className="overflow-hidden rounded-xl bg-white shadow">


          <div className="border-b p-6">

            <h2 className="text-2xl font-bold">
              Dealer Applications
            </h2>

          </div>



          <div className="overflow-x-auto">


            <table className="w-full text-left">


              <thead className="bg-gray-50">

                <tr>

                  <th className="p-4">
                    Company
                  </th>

                  <th className="p-4">
                    Contact
                  </th>

                  <th className="p-4">
                    Location
                  </th>

                  <th className="p-4">
                    Status
                  </th>

                  <th className="p-4">
                    Plan
                  </th>

                </tr>

              </thead>



              <tbody>


                {dealers.map((dealer) => (

                  <tr
                    key={dealer.id}
                    className="border-t"
                  >


                    <td className="p-4">

                      <div className="font-semibold">
                        {dealer.company}
                      </div>

                      <div className="text-sm text-gray-500">
                        {dealer.website}
                      </div>

                    </td>



                    <td className="p-4">

                      {dealer.contact}

                      <div className="text-sm text-gray-500">
                        {dealer.email}
                      </div>

                    </td>



                    <td className="p-4">

                      {dealer.location}

                      <br />

                      {dealer.province}

                    </td>



                    <td className="p-4">

                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                        {dealer.status}
                      </span>

                    </td>



                    <td className="p-4">

                      {dealer.subscription}

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