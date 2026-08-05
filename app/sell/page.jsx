"use client";

import { useState } from "react";

export default function SellPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
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
    description: "",
    asking_price: "",
  });

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
        setMessage("Your vehicle has been submitted successfully!");

        setForm({
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
          description: "",
          asking_price: "",
        });
      } else {
        setMessage("Something went wrong. Please try again.");
      }

    } catch (error) {
      setMessage("Server error. Please try again later.");
    }

    setLoading(false);
  }


  return (
    <main className="min-h-screen bg-gray-50 py-16">

      <div className="mx-auto max-w-4xl px-6">

        <div className="rounded-2xl bg-white p-8 shadow">

          <h1 className="text-4xl font-bold">
            Sell Your Vehicle
          </h1>

          <p className="mt-3 text-gray-600">
            Submit your vehicle details and connect with verified buyers.
          </p>


          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
              required
            />

            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />

            <input
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
              required
            />

            <input
              name="postal_code"
              placeholder="Postal Code"
              value={form.postal_code}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />


            <div className="grid gap-4 md:grid-cols-2">

              <input
                name="year"
                placeholder="Year"
                value={form.year}
                onChange={handleChange}
                className="rounded-lg border p-3"
              />

              <input
                name="make"
                placeholder="Make"
                value={form.make}
                onChange={handleChange}
                className="rounded-lg border p-3"
              />

              <input
                name="model"
                placeholder="Model"
                value={form.model}
                onChange={handleChange}
                className="rounded-lg border p-3"
              />

              <input
                name="trim"
                placeholder="Trim"
                value={form.trim}
                onChange={handleChange}
                className="rounded-lg border p-3"
              />

              <input
                name="mileage"
                placeholder="Mileage"
                value={form.mileage}
                onChange={handleChange}
                className="rounded-lg border p-3"
              />

              <input
                name="asking_price"
                placeholder="Asking Price"
                value={form.asking_price}
                onChange={handleChange}
                className="rounded-lg border p-3"
              />

            </div>


            <input
              name="vin"
              placeholder="VIN (optional)"
              value={form.vin}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />


            <select
              name="condition"
              value={form.condition}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            >
              <option value="">
                Vehicle Condition
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

            </select>


            <textarea
              name="description"
              placeholder="Vehicle details, upgrades, issues..."
              value={form.description}
              onChange={handleChange}
              rows="5"
              className="w-full rounded-lg border p-3"
            />


            <button
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-4 text-white font-semibold hover:bg-blue-700"
            >
              {loading
                ? "Submitting..."
                : "Submit Vehicle"}
            </button>


            {message && (
              <p className="text-center font-medium text-blue-600">
                {message}
              </p>
            )}

          </form>

        </div>

      </div>

    </main>
  );
}