import Link from "next/link";

export const dynamic = "force-dynamic";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://northsky-auto.vercel.app";

async function getLead(id) {
  if (!id) {
    return {
      lead: null,
      error: "Vehicle opportunity ID is required.",
    };
  }

  try {
    const response = await fetch(
      `${SITE_URL}/api/leads/${encodeURIComponent(id)}`,
      {
        cache: "no-store",
      }
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok || !data?.lead) {
      return {
        lead: null,
        error:
          data?.error ||
          "Unable to load this vehicle opportunity.",
      };
    }

    return {
      lead: data.lead,
      error: "",
    };
  } catch (error) {
    console.error("Dealer lead detail error:", error);

    return {
      lead: null,
      error:
        "Unable to connect to the NorthSky Auto marketplace.",
    };
  }
}

function formatCurrency(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "Not provided";
  }

  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(number);
}

function formatMileage(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "Not provided";
  }

  return `${number.toLocaleString("en-CA")} km`;
}

function formatDate(value) {
  if (!value) return "Recently submitted";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Recently submitted";
  }

  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function DetailCard({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
      <p className="text-xs font-black uppercase tracking-widest text-slate-400">
        {label}
      </p>

      <p className="mt-2 break-words text-base font-bold text-slate-800">
        {value || "Not provided"}
      </p>
    </div>
  );
}

function StatusBadge({ status }) {
  const value = String(status || "new").toLowerCase();

  const styles = {
    new: "bg-blue-100 text-blue-700 ring-blue-200",
    available:
      "bg-green-100 text-green-700 ring-green-200",
    active:
      "bg-green-100 text-green-700 ring-green-200",
    pending:
      "bg-yellow-100 text-yellow-700 ring-yellow-200",
    sold:
      "bg-slate-100 text-slate-600 ring-slate-200",
    closed:
      "bg-slate-100 text-slate-600 ring-slate-200",
  };

  const labels = {
    new: "New Opportunity",
    available: "Available",
    active: "Active",
    pending: "Pending",
    sold: "Sold",
    closed: "Closed",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-black uppercase tracking-wide ring-1 ${
        styles[value] || styles.new
      }`}
    >
      <span className="mr-2">●</span>
      {labels[value] ||
        value.replace(/[-_]/g, " ")}
    </span>
  );
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const result = await getLead(id);

  if (!result.lead) {
    return {
      title: "Vehicle Opportunity | NorthSky Auto",
      description:
        "Review vehicle acquisition opportunities through the NorthSky Auto dealer marketplace.",
    };
  }

  const lead = result.lead;

  const vehicleName = [
    lead.year,
    lead.make,
    lead.model,
    lead.trim,
  ]
    .filter(Boolean)
    .join(" ");

  return {
    title: `${
      vehicleName || "Vehicle Opportunity"
    } | NorthSky Auto`,
    description:
      "Review vehicle details and acquisition information through the NorthSky Auto dealer marketplace.",
    alternates: {
      canonical: `/dealer/leads/${encodeURIComponent(id)}`,
    },
  };
}

export default async function DealerLeadDetailPage({
  params,
}) {
  const { id } = await params;

  const result = await getLead(id);

  if (!result.lead) {
    return (
      <main className="min-h-screen bg-slate-100">
        <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 px-6 py-20 text-white">
          <div className="mx-auto max-w-5xl">
            <Link
              href="/dealer/leads"
              className="text-sm font-bold text-blue-300 hover:text-white"
            >
              ← Back to Vehicle Opportunities
            </Link>

            <h1 className="mt-8 text-4xl font-black md:text-5xl">
              Vehicle Opportunity Unavailable
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              {result.error}
            </p>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
            <div className="text-6xl">🚘</div>

            <h2 className="mt-6 text-2xl font-black">
              Opportunity Not Found
            </h2>

            <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-600">
              This seller submission may have been
              removed, updated, or is no longer available.
            </p>

            <Link
              href="/dealer/leads"
              className="mt-7 inline-flex rounded-xl bg-blue-600 px-7 py-3.5 font-black text-white hover:bg-blue-700"
            >
              Browse Vehicle Opportunities →
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const lead = result.lead;

  const vehicleName = [
    lead.year,
    lead.make,
    lead.model,
    lead.trim,
  ]
    .filter(Boolean)
    .join(" ");

  const location =
    lead.location ||
    [lead.city, lead.province]
      .filter(Boolean)
      .join(", ") ||
    lead.postal_code ||
    "Canada";

  const vehicleType =
    lead.vehicle_type ||
    lead.type ||
    "Vehicle";

  const askingPrice = formatCurrency(
    lead.asking_price
  );

  const mileage = formatMileage(lead.mileage);

  const isAvailable =
    !lead.status ||
    ["new", "available", "active"].includes(
      String(lead.status).toLowerCase()
    );

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">

      {/* HERO */}

      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 text-white">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">

          <Link
            href="/dealer/leads"
            className="text-sm font-bold text-blue-300 hover:text-white"
          >
            ← Back to Vehicle Opportunities
          </Link>

          <div className="mt-8">
            <StatusBadge status={lead.status} />

            <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
              {vehicleName || "Vehicle Opportunity"}
            </h1>

            <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-300">
              <span>📍 {location}</span>
              <span>•</span>
              <span>{vehicleType}</span>
              <span>•</span>
              <span>
                Submitted {formatDate(lead.created_at)}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}

      <section className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

          {/* MAIN COLUMN */}

          <div className="space-y-8">

            {/* VEHICLE DETAILS */}

            <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
              <p className="text-xs font-black uppercase tracking-widest text-blue-600">
                Vehicle Details
              </p>

              <h2 className="mt-2 text-2xl font-black md:text-3xl">
                {vehicleName || "Vehicle Opportunity"}
              </h2>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <DetailCard
                  label="Year"
                  value={lead.year}
                />

                <DetailCard
                  label="Make"
                  value={lead.make}
                />

                <DetailCard
                  label="Model"
                  value={lead.model}
                />

                <DetailCard
                  label="Trim"
                  value={lead.trim}
                />

                <DetailCard
                  label="Vehicle Type"
                  value={vehicleType}
                />

                <DetailCard
                  label="Mileage"
                  value={mileage}
                />

                <DetailCard
                  label="Condition"
                  value={lead.condition}
                />

                <DetailCard
                  label="Location"
                  value={location}
                />
              </div>
            </section>

            {/* PRICING */}

            <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
              <p className="text-xs font-black uppercase tracking-widest text-blue-600">
                Seller Pricing
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Asking Price
              </h2>

              <div className="mt-6 rounded-2xl bg-blue-50 p-6 ring-1 ring-blue-100">
                <p className="text-4xl font-black text-slate-950">
                  {askingPrice}
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Seller-provided asking price in CAD.
                </p>
              </div>
            </section>

            {/* ACQUISITION */}

            <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
              <p className="text-xs font-black uppercase tracking-widest text-blue-600">
                Acquisition Information
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Seller Submission
              </h2>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <DetailCard
                  label="Selling Timeline"
                  value={lead.selling_timeline}
                />

                <DetailCard
                  label="Accident History"
                  value={lead.accident_history}
                />

                <DetailCard
                  label="VIN"
                  value={
                    lead.vin
                      ? "Available"
                      : "Not provided"
                  }
                />

                <DetailCard
                  label="Submitted"
                  value={formatDate(
                    lead.created_at
                  )}
                />
              </div>
            </section>

            {/* DESCRIPTION */}

            <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
              <p className="text-xs font-black uppercase tracking-widest text-blue-600">
                Seller Description
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Vehicle Notes
              </h2>

              <div className="mt-6 rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                {lead.description ? (
                  <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                    {lead.description}
                  </p>
                ) : (
                  <p className="text-sm leading-7 text-slate-500">
                    No additional vehicle notes were
                    provided by the seller.
                  </p>
                )}
              </div>
            </section>

          </div>

          {/* SIDEBAR */}

          <aside className="space-y-6">

            {/* OPPORTUNITY */}

            <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                Opportunity
              </p>

              <p className="mt-2 text-3xl font-black">
                #{lead.id}
              </p>

              <div className="mt-5">
                <StatusBadge status={lead.status} />
              </div>
            </div>

            {/* DEALER ACTION */}

            <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-7 text-white shadow-xl">
              <div className="text-4xl">🤝</div>

              <h2 className="mt-5 text-2xl font-black">
                Interested in This Vehicle?
              </h2>

              <p className="mt-4 text-sm leading-7 text-blue-100">
                This vehicle is currently listed as a
                potential acquisition opportunity.
              </p>

              {isAvailable ? (
                <Link
                  href="/contact?topic=vehicle-opportunity"
                  className="mt-7 block w-full rounded-xl bg-white px-5 py-3.5 text-center text-sm font-black text-blue-700 transition hover:bg-blue-50"
                >
                  Contact NorthSky Auto →
                </Link>
              ) : (
                <div className="mt-7 rounded-xl bg-white/10 px-5 py-3.5 text-center text-sm font-black ring-1 ring-white/20">
                  Opportunity Unavailable
                </div>
              )}

              <p className="mt-4 text-center text-xs leading-5 text-blue-100/80">
                NorthSky Auto does not guarantee vehicle
                availability or transaction completion.
              </p>
            </div>

            {/* MARKETPLACE */}

            <div className="rounded-3xl bg-slate-950 p-7 text-white">
              <p className="text-xs font-black uppercase tracking-widest text-blue-400">
                Dealer Marketplace
              </p>

              <h2 className="mt-3 text-xl font-black">
                Find More Inventory
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Browse additional seller-submitted
                vehicles available through NorthSky Auto.
              </p>

              <Link
                href="/dealer/leads"
                className="mt-6 block w-full rounded-xl bg-blue-600 px-5 py-3.5 text-center text-sm font-black text-white hover:bg-blue-500"
              >
                Browse Vehicle Leads →
              </Link>
            </div>

            {/* ACCOUNT */}

            <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                Dealer Account
              </p>

              <h2 className="mt-3 text-xl font-black">
                Manage Your Workspace
              </h2>

              <div className="mt-5 space-y-3">
                <Link
                  href="/dealer/dashboard"
                  className="block rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-black text-slate-700 hover:bg-slate-50"
                >
                  Dealer Dashboard
                </Link>

                <Link
                  href="/dealer/saved"
                  className="block rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-black text-slate-700 hover:bg-slate-50"
                >
                  Saved Vehicles
                </Link>
              </div>
            </div>

          </aside>
        </div>
      </section>

      {/* DISCLOSURE */}

      <section className="border-t border-slate-200 bg-white px-6 py-8">
        <div className="mx-auto max-w-4xl text-center text-xs leading-6 text-slate-500">
          NorthSky Auto vehicle opportunities are based on
          seller-submitted information. Vehicle availability,
          condition, mileage, pricing, seller information,
          and acquisition opportunities are not guaranteed.
          Dealers should independently verify vehicle details
          and conduct appropriate due diligence before entering
          into a transaction.
        </div>
      </section>

      {/* FOOTER */}

      <footer className="border-t border-slate-200 bg-slate-950 px-6 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} NorthSky Auto.
        Canadian Vehicle Marketplace.
      </footer>
    </main>
  );
}