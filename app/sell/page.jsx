import Link from "next/link";

export const metadata = {
  title: "Sell Your Vehicle | NorthSky Auto",
  description:
    "Submit your vehicle and receive offers from trusted dealerships and qualified buyers across Canada.",
};

export default function SellPage() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-slate-900 text-white py-16">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h1 className="text-5xl font-bold">
            Sell Your Vehicle
          </h1>

          <p className="mt-4 text-lg text-gray-300">
            Complete the form below to receive offers from verified buyers.
            It's free and takes just a few minutes.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-2xl bg-white p-8 shadow-lg">

          <h2 className="mb-8 text-3xl font-bold">
            Vehicle Information
          </h2>

          <form className="space-y-8">

            {/* Contact */}
            <div>
              <h3 className="mb-4 text-xl font-semibold">
                Contact Information
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="rounded-lg border p-3"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="rounded-lg border p-3"
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="rounded-lg border p-3"
                />

                <input
                  type="text"
                  placeholder="Postal Code"
                  className="rounded-lg border p-3"
                />
              </div>
            </div>

            {/* Vehicle */}
            <div>
              <h3 className="mb-4 text-xl font-semibold">
                Vehicle Details
              </h3>

              <div className="grid gap-4 md:grid-cols-2">

                <input
                  type="number"
                  placeholder="Year"
                  className="rounded-lg border p-3"
                />

                <input
                  type="text"
                  placeholder="Make"
                  className="rounded-lg border p-3"
                />

                <input
                  type="text"
                  placeholder="Model"
                  className="rounded-lg border p-3"
                />

                <input
                  type="text"
                  placeholder="Trim"
                  className="rounded-lg border p-3"
                />

                <input
                  type="number"
                  placeholder="Mileage"
                  className="rounded-lg border p-3"
                />

                <input
                  type="text"
                  placeholder="VIN (Optional)"
                  className="rounded-lg border p-3"
                />

              </div>
            </div>

            {/* Condition */}
            <div>
              <h3 className="mb-4 text-xl font-semibold">
                Vehicle Condition
              </h3>

              <select className="w-full rounded-lg border p-3">
                <option>Excellent</option>
                <option>Very Good</option>
                <option>Good</option>
                <option>Fair</option>
                <option>Poor</option>
              </select>

              <textarea
                rows={5}
                placeholder="Tell us about your vehicle, maintenance history, upgrades, or any damage..."
                className="mt-4 w-full rounded-lg border p-3"
              />
            </div>

            {/* Price */}
            <div>
              <h3 className="mb-4 text-xl font-semibold">
                Asking Price
              </h3>

              <input
                type="number"
                placeholder="$25,000"
                className="w-full rounded-lg border p-3"
              />
            </div>

            {/* Photos */}
            <div>
              <h3 className="mb-4 text-xl font-semibold">
                Upload Photos
              </h3>

              <div className="rounded-xl border-2 border-dashed border-gray-300 p-10 text-center">
                📸
                <p className="mt-2 text-gray-600">
                  Photo upload will be enabled soon.
                </p>
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3">
              <input type="checkbox" className="mt-1" />
              <span className="text-gray-600">
                I agree to the Terms of Service and Privacy Policy.
              </span>
            </label>

            {/* Button */}
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
            >
              Submit My Vehicle
            </button>

          </form>

        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-blue-600 hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </section>

    </main>
  );
}