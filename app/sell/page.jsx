"use client";

import { useState } from "react";

export default function SellPage() {

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const initialForm = {
    name: "",
    email: "",
    phone: "",
    postal_code: "",

    year: "",
    make: "",
    model: "",
    trim: "",
    mileage: "",
    vin: "",

    condition: "",
    selling_timeline: "",
    accident_history: "",

    description: "",
    asking_price: "",
  };


  const [form, setForm] = useState(initialForm);



  function handleChange(e) {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  }



  async function handleSubmit(e) {

    e.preventDefault();

    setLoading(true);
    setMessage("");


    try {

      const response = await fetch("/api/vehicles", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(form),

      });



      const data = await response.json();



      if (data.success) {

        setMessage(
          "Your vehicle has been submitted. A buyer will review your listing shortly."
        );

        setForm(initialForm);

      } else {

        setMessage(
          "Unable to submit vehicle. Please try again."
        );

      }


    } catch(error) {

      setMessage(
        "Server error. Please try again later."
      );

    }


    setLoading(false);

  }




  return (

    <main className="min-h-screen bg-gray-100 py-16">


      <div className="mx-auto max-w-5xl px-6">


        <div className="rounded-3xl bg-white p-8 shadow-xl md:p-12">


          {/* Header */}

          <div className="text-center">

            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              Free Vehicle Evaluation
            </span>


            <h1 className="mt-6 text-4xl font-extrabold text-slate-900 md:text-5xl">
              Sell Your Vehicle To Verified Buyers
            </h1>


            <p className="mt-4 text-lg text-gray-600">
              Submit your vehicle details and connect with dealerships
              looking for inventory.
            </p>

          </div>




          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-8"
          >



            {/* Seller Information */}

            <section>

              <h2 className="mb-4 text-2xl font-bold">
                Your Information
              </h2>


              <div className="grid gap-4 md:grid-cols-2">


                <input
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  className="rounded-xl border p-3"
                  required
                />


                <input
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  className="rounded-xl border p-3"
                  required
                />


                <input
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className="rounded-xl border p-3"
                />


                <input
                  name="postal_code"
                  placeholder="Postal Code"
                  value={form.postal_code}
                  onChange={handleChange}
                  className="rounded-xl border p-3"
                />

              </div>

            </section>





            {/* Vehicle Information */}

            <section>

              <h2 className="mb-4 text-2xl font-bold">
                Vehicle Information
              </h2>


              <div className="grid gap-4 md:grid-cols-2">


                {[
                  ["year","Year"],
                  ["make","Make"],
                  ["model","Model"],
                  ["trim","Trim"],
                  ["mileage","Mileage"],
                  ["asking_price","Expected Price"],
                ].map(([name,placeholder]) => (

                  <input
                    key={name}
                    name={name}
                    placeholder={placeholder}
                    value={form[name]}
                    onChange={handleChange}
                    className="rounded-xl border p-3"
                  />

                ))}


              </div>


              <input
                name="vin"
                placeholder="VIN Number (Optional)"
                value={form.vin}
                onChange={handleChange}
                className="mt-4 w-full rounded-xl border p-3"
              />


            </section>





            {/* Vehicle Condition */}

            <section>

              <h2 className="mb-4 text-2xl font-bold">
                Vehicle Condition
              </h2>


              <div className="grid gap-4 md:grid-cols-2">


                <select
                  name="condition"
                  value={form.condition}
                  onChange={handleChange}
                  className="rounded-xl border p-3"
                >

                  <option value="">
                    Overall Condition
                  </option>

                  <option>
                    Excellent
                  </option>

                  <option>
                    Good
                  </option>

                  <option>
                    Fair
                  </option>

                  <option>
                    Needs Work
                  </option>

                </select>




                <select
                  name="selling_timeline"
                  value={form.selling_timeline}
                  onChange={handleChange}
                  className="rounded-xl border p-3"
                >

                  <option value="">
                    When Are You Selling?
                  </option>

                  <option>
                    Immediately
                  </option>

                  <option>
                    Within 30 Days
                  </option>

                  <option>
                    Just Exploring
                  </option>

                </select>


              </div>


            </section>





            <textarea
              name="description"
              placeholder="Vehicle details, upgrades, maintenance history, issues..."
              value={form.description}
              onChange={handleChange}
              rows="5"
              className="w-full rounded-xl border p-3"
            />





            <button
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-4 text-lg font-bold text-white hover:bg-blue-700 disabled:opacity-50"
            >

              {loading
                ? "Submitting Vehicle..."
                : "Get My Vehicle Reviewed"
              }

            </button>



            {message && (

              <p className="text-center font-semibold text-blue-600">
                {message}
              </p>

            )}



          </form>


        </div>


      </div>


    </main>

  );

}