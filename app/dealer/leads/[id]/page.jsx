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

    if (!response.ok || !data?.success || !data?.lead) {
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
  const normalized = String(status || "new").toLowerCase();

  const config = {
    new: {
      label: "New Opportunity",
      className:
        "bg-blue-100 text-blue-700 ring-blue-200",
    },
    available: {
      label: "Available",
      className:
        "bg-green-100 text-green-700 ring-green-200",
    },
    active: {
      label: "Active",
      className:
        "bg-green-100 text-green-700 ring-green-200",
    },
  };

  const current =
    config[normalized] || config.new;

  return (
    <span
      className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-black uppercase tracking-wide ring-1 ${current.className}`}
    >
      <span className="mr-2">●</span>
      {current.label}
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
        "View a vehicle acquisition opportunity through the NorthSky Auto dealer marketplace.",
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
    title: `${vehicleName || "Vehicle Opportunity"} | NorthSky Auto`,
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

  /*
   * ---------------------------------------------------------
   * NOT FOUND
   * ---------------------------------------------------------
   */

  if (!result.lead) {
    return (
      <main className="min-h-screen bg-slate-100 text-slate-900">
        <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 px-6 py-20 text-white">
          <div className="mx-auto max-w-5xl">
            <Link
              href="/dealer/leads"
              className="text-sm font-bold text-blue-300 transition hover:text-white"
            >
              ← Back to Vehicle Opportunities
            </Link>

            <h1 className="mt-8 text-4xl font-black tracking-tight md:text-5xl">
              Vehicle Opportunity Unavailable
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              {result.error ||
                "This vehicle opportunity is no longer available."}
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
              This seller submission may have been removed,
              changed status, or is no longer available.
            </p>

            <Link
              href="/dealer/leads"
              className="mt-7 inline-flex rounded-xl bg-blue-600 px-7 py-3.5 font-black text-white transition hover:bg-blue-700"
            >
              Browse Available Vehicles →
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

  const askingPrice = formatCurrency(
    lead.asking_price
  );

  const mileage = formatMileage(lead.mileage);

  const location =
    lead.location ||
    lead.postal_code ||
    "Canada";

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 text-white">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">

          <Link
            href="/dealer/leads"
            className="inline-flex text-sm font-bold text-blue-300 transition hover:text-white"
          >
            ← Back to Vehicle Opportunities
          </Link>

          <div className="mt-8 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">

            <div>
              <StatusBadge status={lead.status} />

              <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
                {vehicleName || "Vehicle Opportunity"}
              </h1>

              <p className="mt-4 text-slate-300">
                NorthSky Auto dealer acquisition opportunity
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 px-5 py-4 ring-1 ring-white/10">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                Opportunity ID
              </p>

              <p className="mt-1 break-all text-sm font-bold">
                #{lead.id}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <section className="mx-auto max-w-6xl px-6 py-10 md:py-14">

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

          {/* LEFT COLUMN */}

          <div className="space-y-8">

            {/* VEHICLE DETAILS */}

            <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">

              <div className="flex items-start justify-between gap-5">

                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-blue-600">
                    Vehicle Details
                  </p>

                  <h2 className="mt-2 text-2xl font-black md:text-3xl">
                    {vehicleName || "Vehicle Opportunity"}
                  </h2>
                </div>

                <div
                  className="hidden text-5xl md:block"
                  aria-hidden="true"
                >
                  🚘
                </div>

              </div>

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
                  label="Mileage"
                  value={mileage}
                />

                <DetailCard
                  label="Condition"
                  value={lead.condition}
                />

                <DetailCard
                  label="Asking Price"
                  value={askingPrice}
                />

                <DetailCard
                  label="Location"
                  value={location}
                />

              </div>
            </section>

            {/* ACQUISITION DETAILS */}

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

              {lead.description ? (
                <div className="mt-6 rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                  <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                    {lead.description}
                  </p>
                </div>
              ) : (
                <div className="mt-6 rounded-2xl bg-slate-50 p-6 text-sm text-slate-500 ring-1 ring-slate-200">
                  No additional vehicle notes were provided
                  by the seller.
                </div>
              )}

            </section>

          </div>

          {/* RIGHT COLUMN */}

          <aside className="space-y-6">

            {/* PRICE */}

            <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200">

              <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                Seller Asking Price
              </p>

              <p className="mt-2 text-4xl font-black text-slate-950">
                {askingPrice}
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Seller-provided asking price in Canadian
                dollars.
              </p>

            </div>

            {/* CONTACT */}

            <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-7 text-white shadow-xl">

              <div
                className="text-4xl"
                aria-hidden="true"
              >
                🤝
              </div>

              <h2 className="mt-5 text-2xl font-black">
                Interested in This Vehicle?
              </h2>

              <p className="mt-4 text-sm leading-7 text-blue-100">
                Request seller contact information through
                NorthSky Auto to begin the acquisition process.
              </p>

              <button
                type="button"
                disabled
                className="mt-7 w-full cursor-not-allowed rounded-xl bg-white/20 px-5 py-3.5 text-sm font-black ring-1 ring-white/20"
              >
                Request Seller Contact
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-blue-100/80">
                Contact requests will be connected to the
                dealer workflow next.
              </p>

            </div>

            {/* SAVE */}

            <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200">

              <div
                className="text-3xl"
                aria-hidden="true"
              >
                ⭐
              </div>

              <h2 className="mt-4 text-xl font-black">
                Save Opportunity
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Save this vehicle to your dealer workspace
                for later review.
              </p>

              <Link
                href="/dealer/saved"
                className="mt-6 block w-full rounded-xl border border-slate-300 px-5 py-3 text-center font-black text-slate-700 transition hover:bg-slate-100"
              >
                View Saved Vehicles
              </Link>

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
                Browse additional seller-submitted vehicles
                available through NorthSky Auto.
              </p>

              <Link
                href="/dealer/leads"
                className="mt-6 block w-full rounded-xl bg-blue-600 px-5 py-3.5 text-center text-sm font-black text-white transition hover:bg-blue-500"
              >
                Browse Vehicle Leads →
              </Link>

            </div>

          </aside>

        </div>
      </section>

      {/* =====================================================
          DISCLOSURE
      ===================================================== */}

      <section className="border-t border-slate-200 bg-white px-6 py-8">

        <div className="mx-auto max-w-4xl text-center text-xs leading-6 text-slate-500">
          NorthSky Auto vehicle opportunities are based on
          seller-submitted information. Vehicle availability,
          condition, pricing, seller information, and acquisition
          opportunities are not guaranteed. Dealers should conduct
          their own due diligence before proceeding with any
          transaction.
        </div>

      </section>

    </main>
  );
}