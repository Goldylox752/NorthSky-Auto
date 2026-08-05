import { supabase } from "@/lib/supabase";
import DealerActions from "@/components/DealerActions";

export const metadata = {
  title: "Dealer Management | NorthSky Auto Admin",
  description:
    "Manage dealer applications, approvals, and subscriptions.",
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
        <div className="rounded-xl bg-red-50 p-6 text-red-600">
          Failed to load dealer applications.
        </div>
      </main>
    );

  }


  const totalDealers = dealers?.length || 0;

  const pendingDealers =
    dealers?.filter(
      (dealer) => dealer.status === "pending"
    ).length || 0;


  const activeDealers =
    dealers?.filter(
      (dealer) => dealer.status === "approved"
    ).length || 0;



  return (

    <main className="min-h-screen bg-gray-100">


      {/* Header */}

      <section className="bg-gradient-to-r from-slate-950 to-blue-900 text-white">

        <div className="mx-auto max-w-7xl px-6 py-12">

          <h1 className="text-4xl font-extrabold">
            Dealer Management
          </h1>

          <p className="mt-3 text-gray-300">
            Review applications and manage NorthSky Auto dealer partners.
          </p>

        </div>

      </section>



      {/* Stats */}

      <section className="mx-auto max-w-7xl px-6 py-10">

        <div className="grid gap-6 md:grid-cols-3">


          <div className="rounded-2xl bg-white p-6 shadow">

            <p className="text-gray-500">
              Total Dealers
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              {totalDealers}
            </h2>

          </div>



          <div className="rounded-2xl bg-white p-6 shadow">

            <p className="text-gray-500">
              Pending Approval
            </p>

            <h2 className="mt-3 text-4xl font-bold text-yellow-600">
              {pendingDealers}
            </h2>

          </div>



          <div className="rounded-2xl bg-white p-6 shadow">

            <p className="text-gray-500">
              Active Dealers
            </p>

            <h2 className="mt-3 text-4xl font-bold text-green-600">
              {activeDealers}
            </h2>

          </div>


        </div>

      </section>




      {/* Dealer Table */}

      <section className="mx-auto max-w-7xl px-6 pb-16">


        <div className="overflow-hidden rounded-2xl bg-white shadow">


          <div className="border-b p-6">

            <h2 className="text-2xl font-bold">
              Dealer Applications
            </h2>

          </div>



          {dealers.length === 0 ? (

            <div className="p-10 text-center text-gray-500">

              No dealer applications yet.

            </div>

          ) : (


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

                  <th className="p-4">
                    Actions
                  </th>

                </tr>

              </thead>



              <tbody>


              {dealers.map((dealer) => (

                <tr
                  key={dealer.id}
                  className="border-t hover:bg-gray-50"
                >


                  <td className="p-4">

                    <div className="font-semibold">
                      {dealer.company}
                    </div>

                    {dealer.website && (

                      <div className="text-sm text-gray-500">
                        {dealer.website}
                      </div>

                    )}

                  </td>



                  <td className="p-4">

                    <div>
                      {dealer.contact}
                    </div>

                    <div className="text-sm text-gray-500">
                      {dealer.email}
                    </div>

                    <div className="text-sm text-gray-500">
                      {dealer.phone}
                    </div>

                  </td>



                  <td className="p-4">

                    {dealer.location}

                    <div className="text-sm text-gray-500">
                      {dealer.province}
                    </div>

                  </td>



                  <td className="p-4">

                    <span
                      className={
                        dealer.status === "approved"
                        ? "rounded-full bg-green-100 px-3 py-1 text-sm text-green-700"
                        : dealer.status === "rejected"
                        ? "rounded-full bg-red-100 px-3 py-1 text-sm text-red-700"
                        : "rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700"
                      }
                    >
                      {dealer.status}
                    </span>

                  </td>



                  <td className="p-4">

                    {dealer.subscription || "None"}

                  </td>



                  <td className="p-4">

                    <DealerActions
                      id={dealer.id}
                    />

                  </td>


                </tr>

              ))}


              </tbody>


            </table>

          </div>

          )}

        </div>


      </section>


    </main>

  );

}