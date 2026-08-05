import { supabase } from "@/lib/supabase";

export const metadata = {
  title: "Dealer Dashboard | NorthSky Auto",
  description:
    "Access vehicle acquisition leads through NorthSky Auto.",
};


export default async function DealerDashboardPage() {


  const { data: vehicles, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("status", "approved")
    .order("created_at", {
      ascending: false,
    });



  if (error) {

    return (
      <main className="p-10">
        Unable to load vehicle leads.
      </main>
    );

  }



  return (

    <main className="min-h-screen bg-gray-100">


      {/* Header */}

      <section className="bg-slate-900 text-white">

        <div className="mx-auto max-w-7xl px-6 py-12">

          <h1 className="text-4xl font-bold">
            Dealer Dashboard
          </h1>

          <p className="mt-3 text-gray-300">
            Find your next vehicle acquisition opportunity.
          </p>

        </div>

      </section>




      {/* Stats */}

      <section className="mx-auto max-w-7xl px-6 py-10">

        <div className="grid gap-6 md:grid-cols-3">


          <div className="rounded-xl bg-white p-6 shadow">

            <p className="text-gray-500">
              Available Leads
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              {vehicles.length}
            </h2>

          </div>



          <div className="rounded-xl bg-white p-6 shadow">

            <p className="text-gray-500">
              Membership
            </p>

            <h2 className="mt-2 text-3xl font-bold text-blue-600">
              Pro Dealer
            </h2>

          </div>



          <div className="rounded-xl bg-white p-6 shadow">

            <p className="text-gray-500">
              Account Status
            </p>

            <h2 className="mt-2 text-3xl font-bold text-green-600">
              Active
            </h2>

          </div>


        </div>

      </section>




      {/* Leads */}

      <section className="mx-auto max-w-7xl px-6 pb-16">


        <h2 className="mb-6 text-3xl font-bold">
          Available Vehicle Leads
        </h2>



        <div className="grid gap-8 md:grid-cols-3">


          {vehicles.map((vehicle) => (

            <div
              key={vehicle.id}
              className="rounded-2xl bg-white p-6 shadow"
            >


              <div className="h-40 rounded-xl bg-gray-200 flex items-center justify-center">

                🚘

              </div>



              <h3 className="mt-5 text-2xl font-bold">

                {vehicle.year} {vehicle.make} {vehicle.model}

              </h3>



              <div className="mt-3 space-y-2 text-gray-600">

                <p>
                  Mileage: {vehicle.mileage} km
                </p>

                <p>
                  Location: {vehicle.location}
                </p>

                <p>
                  Asking Price: ${vehicle.asking_price}
                </p>

              </div>




              <button
                className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
              >
                View Lead Details
              </button>


            </div>

          ))}


        </div>


      </section>


    </main>

  );

}