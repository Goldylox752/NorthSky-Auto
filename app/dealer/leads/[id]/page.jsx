import Link from "next/link";

export const dynamic = "force-dynamic";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://northsky-auto.vercel.app";

async function getLead(id) {
  try {
    const response = await fetch(
      `${SITE_URL}/api/leads/${encodeURIComponent(id)}`,
      {
        cache: "no-store",
      }
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok || !data?.success) {
      return {
        error:
          data?.error ||
          "Unable to load this vehicle opportunity.",
      };
    }

    return {
      lead: data.lead,
    };
  } catch (error) {
    console.error("Lead detail fetch error:", error);

    return {
      error:
        "Unable to connect to the NorthSky Auto marketplace.",
    };
  }
}

function formatCurrency(value) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "Not provided";
  }

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
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "Not provided";
  }

  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "Not provided";
  }

  return `${number.toLocaleString("en-CA")} km`;
}

function formatDate(value) {
  if (!value) {
    return "Recently submitted";
  }

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

  const label =
    normalized === "available"
      ? "Available"
      : normalized === "active"
      ? "Active"
      : "New Opportunity";

  return (
    <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-xs font-black uppercase tracking-wide text-green-700 ring-1 ring-green-200">
      ● {label}
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
        "View a NorthSky Auto vehicle acquisition opportunity.",
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
      "Review a vehicle acquisition opportunity available through the NorthSky Auto dealer marketplace.",
  };
}

export default async function DealerLeadDetailPage({
  params,
}) {
  const { id } = await params;

  const result = await getLead(id);

  if (!result.lead) {
    return (
      <main className="min-h-screen bg-slate-100 text-slate-900">
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
              {result.error ||
                "This vehicle opportunity could not be found or is no longer available."}
            </p>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
            <div className="text-5xl">🚘</div>

            <h2 className="mt-5 text-2xl font-black">
              Opportunity not available
            </h2>

            <p className="mt-3 text-slate-600">
              The seller submission may have been removed,
              changed status, or is no longer available in
              the marketplace.
            </p>

            <Link
              href="/dealer/leads"
              className="mt-7 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-black text-white transition hover:bg-blue-700"
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

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      {/* HERO */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 text-white">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
          <Link
            href="/dealer/leads"
            className="inline-flex text-sm font-bold text-blue-300 transition hover:text-white"
          >
            ← Back to Vehicle Opportunities
          </Link>

          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <StatusBadge status={lead.status} />

              <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
                {vehicleName ||
                  "Vehicle Opportunity"}
              </h1>

              <p className="mt-4 text-slate-300">
                NorthSky Auto vehicle acquisition opportunity
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 px-5 py-4 ring-1 ring-white/10">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                Opportunity ID
              </p>

              <p className="mt-1 break-all text-sm font-bold text-white">
                #{lead.id}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <section className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* LEFT */}
          <div className="space-y-8">
            {/* VEHICLE SUMMARY */}
            <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-blue-600">
                    Vehicle Details
                  </p>

                  <h2 className="mt-2 text-2xl font-black md:text-3xl">
                    {vehicleName ||
                      "Vehicle Opportunity"}
                  </h2>
                </div>

                <div className="hidden text-5xl md:block">
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
                  value={formatMileage(
                    lead.mileage
                  )}
                />

                <DetailCard
                  label="Condition"
                  value={lead.condition}
                />

                <DetailCard
                  label="Asking Price"
                  value={formatCurrency(
                    lead.asking_price
                  )}
                />

                <DetailCard
                  label="Location"
                  value={
                    lead.postal_code ||
                    "Canada"
                  }
                />
              </div>
            </section>

            {/* SELLING INFORMATION */}
            <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
              <p className="text-xs font-black uppercase tracking-widest text-blue-600">
                Seller Information
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Acquisition Details
              </h2>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <DetailCard
                  label="Selling Timeline"
                  value={
                    lead.selling_timeline
                  }
                />

                <DetailCard
                  label="Accident History"
                  value={
                    lead.accident_history
                  }
                />

                <DetailCard
                  label="VIN"
                  value={
                    lead.has_vin
                      ? "Available after contact request"
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
                <p className="mt-5 text-slate-500">
                  The seller did not provide additional
                  vehicle notes.
                </p>
              )}
            </section>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-6">
            {/* PRICE */}
            <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                Asking Price
              </p>

              <p className="mt-2 text-4xl font-black text-slate-950">
                {formatCurrency(
                  lead.asking_price
                )}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Seller-provided asking price in Canadian
                dollars.
              </p>
            </div>

            {/* CONTACT REQUEST */}
            <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-7 text-white shadow-xl">
              <div className="text-4xl">
                🤝
              </div>

              <h2 className="mt-5 text-2xl font-black">
                Interested in this vehicle?
              </h2>

              <p className="mt-4 text-sm leading-7 text-blue-100">
                Request seller contact information through
                NorthSky Auto to continue the acquisition
                process.
              </p>

              <button
                type="button"
                disabled
                className="mt-7 w-full cursor-not-allowed rounded-xl bg-white/20 px-5 py-3.5 text-sm font-black text-white ring-1 ring-white/20"
                title="Contact request workflow coming next"
              >
                Request Seller Contact
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-blue-100/80">
                Contact-request functionality will be
                connected to the dealer workflow.
              </p>
            </div>

            {/* SAVE */}
            <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
              <div className="text-3xl">
                ⭐
              </div>

              <h2 className="mt-4 text-xl font-black">
                Save Opportunity
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Save promising vehicles to your dealer
                opportunity list for later review.
              </p>

              <button
                type="button"
                disabled
                className="mt-6 w-full cursor-not-allowed rounded-xl border border-slate-300 px-5 py-3 font-black text-slate-500"
                title="Saved opportunities coming next"
              >
                Save Vehicle
              </button>
            </div>

            {/* BACK */}
            <Link
              href="/dealer/leads"
              className="block w-full rounded-xl bg-slate-950 px-5 py-3.5 text-center text-sm font-black text-white transition hover:bg-slate-800"
            >
              ← Browse All Opportunities
            </Link>
          </aside>
        </div>
      </section>

      {/* DISCLOSURE */}
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