import Link from "next/link";


export const metadata = {

  title:
    "NorthSky Auto Dealer Network | Get Vehicle Acquisition Leads",

  description:
    "Join NorthSky Auto and connect with motivated vehicle sellers. Grow your dealership inventory with qualified vehicle leads.",

};



export default function DealersPage() {


  return (

    <main className="min-h-screen bg-gray-100">


      {/* Hero */}

      <section className="bg-gradient-to-br from-slate-950 to-blue-900 text-white">

        <div className="mx-auto max-w-7xl px-6 py-24 text-center">


          <span className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold">
            Dealer Partner Program
          </span>


          <h1 className="mt-8 text-5xl font-extrabold md:text-6xl">

            Find More Vehicles.
            <span className="block text-blue-400">
              Grow Your Inventory.
            </span>

          </h1>


          <p className="mx-auto mt-6 max-w-3xl text-xl text-gray-300">

            NorthSky Auto helps dealerships discover motivated sellers
            and acquire quality vehicles before they reach traditional markets.

          </p>



          <Link
            href="/buyers/signup"
            className="mt-10 inline-block rounded-xl bg-blue-600 px-10 py-4 font-bold hover:bg-blue-500"
          >
            Apply As A Dealer Partner
          </Link>


        </div>

      </section>





      {/* Problem */}

      <section className="mx-auto max-w-7xl px-6 py-20">


        <h2 className="text-center text-4xl font-bold">

          Stop Chasing Inventory

        </h2>


        <p className="mx-auto mt-5 max-w-3xl text-center text-lg text-gray-600">

          Dealerships spend countless hours searching auctions,
          marketplaces, and trade-ins. NorthSky Auto brings vehicle
          opportunities directly to you.

        </p>


      </section>





      {/* Benefits */}

      <section className="mx-auto max-w-7xl px-6 pb-20">


        <div className="grid gap-8 md:grid-cols-3">


          <div className="rounded-2xl bg-white p-8 shadow">


            <div className="text-5xl">
              🚘
            </div>


            <h3 className="mt-5 text-2xl font-bold">

              Fresh Vehicle Opportunities

            </h3>


            <p className="mt-3 text-gray-600">

              Receive vehicle submissions from owners looking to sell.

            </p>


          </div>





          <div className="rounded-2xl bg-white p-8 shadow">


            <div className="text-5xl">
              🎯
            </div>


            <h3 className="mt-5 text-2xl font-bold">

              Qualified Leads

            </h3>


            <p className="mt-3 text-gray-600">

              Review vehicle details, location, condition, and seller intent.

            </p>


          </div>





          <div className="rounded-2xl bg-white p-8 shadow">


            <div className="text-5xl">
              📈
            </div>


            <h3 className="mt-5 text-2xl font-bold">

              Increase Profit

            </h3>


            <p className="mt-3 text-gray-600">

              Acquire inventory directly from private sellers.

            </p>


          </div>


        </div>


      </section>





      {/* How Dealers Use Platform */}

      <section className="bg-white px-6 py-20">


        <div className="mx-auto max-w-7xl">


          <h2 className="text-center text-4xl font-bold">

            How The Dealer Network Works

          </h2>



          <div className="mt-12 grid gap-8 md:grid-cols-4">


            {[
              {
                title:"Apply",
                text:"Submit your dealership information."
              },
              {
                title:"Get Approved",
                text:"We verify your dealership."
              },
              {
                title:"Access Leads",
                text:"View available vehicles."
              },
              {
                title:"Acquire Inventory",
                text:"Contact sellers and close deals."
              }

            ].map((item,index)=>(

              <div
                key={item.title}
                className="rounded-xl border p-6"
              >

                <div className="text-3xl font-bold text-blue-600">
                  0{index + 1}
                </div>


                <h3 className="mt-4 text-xl font-bold">
                  {item.title}
                </h3>


                <p className="mt-2 text-gray-600">
                  {item.text}
                </p>


              </div>

            ))}


          </div>


        </div>


      </section>





      {/* Pricing */}

      <section className="mx-auto max-w-7xl px-6 py-20">


        <h2 className="text-center text-4xl font-bold">

          Dealer Membership

        </h2>



        <div className="mt-12 grid gap-8 md:grid-cols-3">



          <div className="rounded-2xl bg-white p-8 shadow">

            <h3 className="text-2xl font-bold">
              Starter
            </h3>

            <p className="mt-4 text-4xl font-bold">
              $299/mo
            </p>

            <p className="mt-4 text-gray-600">
              For independent dealers building inventory.
            </p>

          </div>





          <div className="rounded-2xl border-2 border-blue-600 bg-white p-8 shadow">

            <h3 className="text-2xl font-bold">
              Pro Dealer
            </h3>

            <p className="mt-4 text-4xl font-bold">
              $599/mo
            </p>

            <p className="mt-4 text-gray-600">
              Priority access to more vehicle opportunities.
            </p>

          </div>





          <div className="rounded-2xl bg-white p-8 shadow">

            <h3 className="text-2xl font-bold">
              Enterprise
            </h3>

            <p className="mt-4 text-4xl font-bold">
              Custom
            </p>

            <p className="mt-4 text-gray-600">
              Multi-location dealership solutions.
            </p>

          </div>


        </div>


      </section>





      {/* CTA */}

      <section className="bg-blue-600 px-6 py-20 text-center text-white">


        <h2 className="text-4xl font-bold">

          Ready To Add More Inventory?

        </h2>


        <Link
          href="/buyers/signup"
          className="mt-8 inline-block rounded-xl bg-white px-10 py-4 font-bold text-blue-600"
        >
          Join Dealer Network
        </Link>


      </section>


    </main>

  );

}