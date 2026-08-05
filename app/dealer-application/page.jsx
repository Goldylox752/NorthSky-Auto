import Link from "next/link";

export const metadata = {
  title:
    "Dealer Application | Join NorthSky Auto Vehicle Acquisition Network",
  description:
    "Apply to become a NorthSky Auto dealer partner and access exclusive vehicle acquisition opportunities from sellers across Canada.",
};

export default function DealerApplicationPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">

          <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold">
            Dealer Partner Program
          </span>

          <h1 className="mt-6 text-5xl font-bold">
            Grow Your Inventory With
            <br />
            NorthSky Auto
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-xl text-slate-300">
            Connect with vehicle sellers across Canada and discover acquisition
            opportunities before your competitors.
          </p>

          <Link
            href="#application"
            className="mt-10 inline-block rounded-xl bg-blue-600 px-10 py-5 font-semibold hover:bg-blue-700"
          >
            Apply As A Dealer
          </Link>

        </div>
      </section>


      {/* Benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">

          <h2 className="text-center text-4xl font-bold">
            Why Dealers Choose NorthSky Auto
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-3">

            {[
              {
                title:"More Inventory",
                text:"Access private sellers looking to sell cars, trucks, SUVs and commercial vehicles."
              },
              {
                title:"Less Prospecting",
                text:"Spend less time searching and more time acquiring vehicles."
              },
              {
                title:"Better Opportunities",
                text:"Filter opportunities by location, make, model, year and condition."
              }
            ].map((item)=>(
              <div
                key={item.title}
                className="rounded-2xl border p-8 shadow-sm"
              >
                <h3 className="text-2xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-4 text-slate-600">
                  {item.text}
                </p>

              </div>
            ))}

          </div>

        </div>
      </section>


      {/* Application */}
      <section
        id="application"
        className="bg-slate-100 py-20"
      >

        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-10 shadow">

          <h2 className="text-4xl font-bold">
            Dealer Application
          </h2>

          <p className="mt-4 text-slate-600">
            Tell us about your dealership. Our team will review your application
            and contact you with next steps.
          </p>


          <form className="mt-10 grid gap-6 md:grid-cols-2">

            {[
              "Dealership Name",
              "Primary Contact",
              "Email Address",
              "Phone Number",
              "Website",
              "City",
              "Province",
              "Dealer License Number",
              "Years In Business",
              "Monthly Vehicle Sales"
            ].map((field)=>(
              <input
                key={field}
                placeholder={field}
                className="rounded-lg border p-4"
              />
            ))}


            <textarea
              placeholder="Tell us about your dealership and inventory needs"
              rows={5}
              className="rounded-lg border p-4 md:col-span-2"
            />


            <button
              className="rounded-xl bg-blue-600 py-5 font-semibold text-white hover:bg-blue-700 md:col-span-2"
            >
              Submit Dealer Application
            </button>

          </form>

        </div>

      </section>


      {/* Process */}
      <section className="py-20">

        <div className="mx-auto max-w-6xl px-6">

          <h2 className="text-center text-4xl font-bold">
            How It Works
          </h2>


          <div className="mt-12 grid gap-8 md:grid-cols-4">

            {[
              "Apply",
              "Get Approved",
              "Access Leads",
              "Acquire Vehicles"
            ].map((step,index)=>(
              <div
                key={step}
                className="rounded-xl border p-8 text-center"
              >
                <div className="text-4xl font-bold text-blue-600">
                  {index + 1}
                </div>

                <h3 className="mt-4 text-xl font-bold">
                  {step}
                </h3>

              </div>
            ))}

          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="bg-blue-600 py-20 text-center text-white">

        <h2 className="text-5xl font-bold">
          Ready To Grow Your Inventory?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-xl text-blue-100">
          Join NorthSky Auto and connect with motivated vehicle sellers.
        </p>

        <Link
          href="#application"
          className="mt-10 inline-block rounded-xl bg-white px-10 py-5 font-semibold text-blue-600"
        >
          Start Application
        </Link>

      </section>


    </main>
  );
}