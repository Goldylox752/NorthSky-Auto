"use client";

import { useState } from "react";

export default function DealerSignupPage() {

  const [form, setForm] = useState({
    company: "",
    contact: "",
    email: "",
    phone: "",
    website: "",
    location: "",
    province: "",
    inventory: "",
    brands: "",
  });


  const [message, setMessage] = useState("");


  function handleChange(e) {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  }


  function handleSubmit(e) {

    e.preventDefault();

    setMessage(
      "Dealer application submitted successfully!"
    );

    console.log(form);

  }


  return (

    <main className="min-h-screen bg-gray-50 py-16">

      <div className="mx-auto max-w-3xl px-6">


        <div className="rounded-2xl bg-white p-8 shadow">


          <h1 className="text-4xl font-bold">
            Become A Dealer Partner
          </h1>


          <p className="mt-3 text-gray-600">
            Join the NorthSky Auto network and receive qualified vehicle
            seller leads.
          </p>



          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >


            <input
              name="company"
              placeholder="Dealership Name"
              value={form.company}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
              required
            />


            <input
              name="contact"
              placeholder="Contact Person"
              value={form.contact}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
              required
            />


            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
              required
            />


            <input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />


            <input
              name="website"
              placeholder="Website"
              value={form.website}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />


            <input
              name="location"
              placeholder="City"
              value={form.location}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />


            <select
              name="province"
              value={form.province}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            >

              <option value="">
                Select Province
              </option>

              <option>
                Alberta
              </option>

              <option>
                British Columbia
              </option>

              <option>
                Saskatchewan
              </option>

              <option>
                Manitoba
              </option>

              <option>
                Ontario
              </option>

            </select>



            <textarea
              name="inventory"
              placeholder="What vehicles are you looking to buy?"
              value={form.inventory}
              onChange={handleChange}
              rows="4"
              className="w-full rounded-lg border p-3"
            />


            <textarea
              name="brands"
              placeholder="Preferred makes and models"
              value={form.brands}
              onChange={handleChange}
              rows="3"
              className="w-full rounded-lg border p-3"
            />



            <button
              className="w-full rounded-xl bg-blue-600 py-4 font-semibold text-white hover:bg-blue-700"
            >
              Submit Dealer Application
            </button>



            {message && (

              <p className="text-center text-green-600">
                {message}
              </p>

            )}



          </form>


        </div>


      </div>


    </main>

  );

}