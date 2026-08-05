import Link from "next/link";


export const metadata = {

  title:
    "How NorthSky Auto Works | Sell Your Vehicle & Connect With Buyers",

  description:
    "Learn how NorthSky Auto connects vehicle sellers with verified automotive buyers and dealership partners.",

};



export default function HowItWorksPage() {


  return (

    <main className="min-h-screen bg-gray-100">


      {/* Hero */}

      <section className="bg-gradient-to-br from-slate-950 to-blue-900 text-white">

        <div className="mx-auto max-w-7xl px-6 py-24 text-center">


          <span className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold">
            How NorthSky Auto Works
          </span>


          <h1 className="mt-8 text-5xl font-extrabold md:text-6xl">

            A Smarter Way To
            <span className="block text-blue-400">
              Sell & Buy Vehicles
            </span>

          </h1>


          <p className="mx-auto mt-6 max-w-3xl text-xl text-gray-300">

            NorthSky Auto connects vehicle owners with verified buyers
            and dealerships looking for quality inventory.

          </p>


        </div>

      </section>




      {/* Seller Process */}

      <section className="mx-auto max-w-7xl px-6 py-20">


        <h2 className="text-center text-4xl font-bold">

          For Vehicle Sellers

        </h2>



        <div className="mt-12 grid gap-8 md:grid-cols-4">


          {[
            {
              step:"1",
              title:"Submit Your Vehicle",
              text:"Provide your vehicle details, photos, and contact information."
            },
            {
              step:"2",
              title:"Vehicle Review",
              text:"Our system reviews your information and prepares your listing."
            },
            {
              step:"3",
              title:"Matched With Buyers",
              text:"Your vehicle is shared with interested automotive buyers."
            },
            {
              step:"4",
              title:"Receive Offers",
              text:"Connect with buyers and choose the offer that works for you."
            },

          ].map((item)=>(

            <div
              key={item.step}
              className="rounded-2xl bg-white p-8 shadow"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">

                {item.step}

              </div>


              <h3 className="mt-6 text-xl font-bold">

                {item.title}

              </h3>


              <p className="mt-3 text-gray-600">

                {item.text}

              </p>


            </div>

          ))}


        </div>


      </section>





      {/* Dealer Process */}

      <section className="bg-white px-6 py-20">


        <div className="mx-auto max-w-7xl">


          <h2 className="text-center text-4xl font-bold">

            For Dealership Partners

          </h2>



          <div className="mt-12 grid gap-8 md:grid-cols-4">


            {[
              {
                step:"1",
                title:"Join The Network",
                text:"Apply to become a NorthSky Auto dealer partner."
              },
              {
                step:"2",
                title:"Access Leads",
                text:"View qualified vehicle sellers in your market."
              },
              {
                step:"3",
                title:"Contact Sellers",
                text:"Connect directly with motivated vehicle owners."
              },
              {
                step:"4",
                title:"Acquire Inventory",
                text:"Purchase vehicles and grow your dealership inventory."
              },

            ].map((item)=>(


              <div
                key={item.step}
                className="rounded-2xl border p-8"
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-xl font-bold text-white">

                  {item.step}

                </div>


                <h3 className="mt-6 text-xl font-bold">

                  {item.title}

                </h3>


                <p className="mt-3 text-gray-600">

                  {item.text}

                </p>


              </div>


            ))}


          </div>


        </div>


      </section>





      {/* Why NorthSky */}

      <section className="mx-auto max-w-7xl px-6 py-20">


        <div className="grid gap-8 md:grid-cols-3">


          <div className="rounded-2xl bg-white p-8 shadow">

            <h3 className="text-xl font-bold">
              Verified Buyers
            </h3>

            <p className="mt-3 text-gray-600">
              Connect with serious automotive buyers and dealership partners.
            </p>

          </div>



          <div className="rounded-2xl bg-white p-8 shadow">

            <h3 className="text-xl font-bold">
              Better Vehicle Matches
            </h3>

            <p className="mt-3 text-gray-600">
              Vehicle information helps match sellers with the right buyers.
            </p>

          </div>



          <div className="rounded-2xl bg-white p-8 shadow">

            <h3 className="text-xl font-bold">
              Simple Process
            </h3>

            <p className="mt-3 text-gray-600">
              Submit your vehicle once and let buyers come to you.
            </p>

          </div>


        </div>


      </section>





      {/* CTA */}

      <section className="bg-blue-600 px-6 py-20 text-center text-white">


        <h2 className="text-4xl font-bold">

          Ready To Get Started?

        </h2>


        <p className="mt-4 text-lg text-blue-100">

          Submit your vehicle or join our dealer network today.

        </p>



        <div className="mt-8 flex justify-center gap-4">


          <Link
            href="/sell"
            className="rounded-xl bg-white px-8 py-4 font-bold text-blue-600"
          >
            Sell My Vehicle
          </Link>



          <Link
            href="/dealers"
            className="rounded-xl border border-white px-8 py-4 font-bold text-white"
          >
            Become A Dealer
          </Link>


        </div>


      </section>


    </main>

  );

}