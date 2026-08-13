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
        method: "GET",
        cache: "no-store",
        headers: {
          Accept: "application/json",
        },
      }
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok || !data?.lead) {
      return {
        lead: null,
        error:
          data?.error ||
          "This vehicle opportunity could not be found.",
      };
    }

    return {
      lead: data.lead,
      error: "",
    };
  } catch (error) {
    console.error("NorthSky Auto lead detail error:", error);

    return {
      lead: null,
      error:
        "Unable to connect to the NorthSky Auto marketplace.",
    };
  }
}

/*
|--------------------------------------------------------------------------
| FORMATTING
|--------------------------------------------------------------------------
*/

function formatCurrency(value) {
  const number = Number(value);

  if (
    value === null ||
    value === undefined ||
    value === "" ||
    !Number.isFinite(number) ||
    number <= 0
  ) {
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

  if (
    value === null ||
    value === undefined ||
    value === "" ||
    !Number.isFinite(number) ||
    number < 0
  ) {
    return "Not provided";
  }

  return `${Math.round(number).toLocaleString(
    "en-CA"
  )} km`;
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

function getVehicleName(lead) {
  return [
    lead?.year,
    lead?.make,
    lead?.model,
    lead?.trim,
  ]
    .filter(Boolean)
    .join(" ");
}

function getLocation(lead) {
  return (
    lead?.location ||
    [lead?.city, lead?.province]
      .filter(Boolean)
      .join(", ") ||
    lead?.postal_code ||
    "Canada"
  );
}

function getVehicleType(lead) {
  return (
    lead?.vehicle_type ||
    lead?.type ||
    "Vehicle"
  );
}

function getStatus(lead) {
  const status = String(
    lead?.status || "new"
  ).toLowerCase();

  return status;
}

function isAvailableStatus(status) {
  return [
    "new",
    "available",
    "active",
  ].includes(status);
}

/*
|--------------------------------------------------------------------------
| METADATA
|--------------------------------------------------------------------------
*/

export async function generateMetadata({ params }) {
  const { id } = await params;
  const result = await getLead(id);

  if (!result.lead) {
    return {
      title:
        "Vehicle Opportunity | NorthSky Auto",
      description:
        "Review vehicle acquisition opportunities through the NorthSky Auto dealer marketplace.",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const vehicleName =
    getVehicleName(result.lead) ||
    "Vehicle Opportunity";

  return {
    title: `${vehicleName} | NorthSky Auto`,
    description: `Review ${vehicleName} acquisition details through the NorthSky Auto dealer marketplace.`,
    alternates: {
      canonical: `/dealer/leads/${encodeURIComponent(
        id
      )}`,
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

/*
|--------------------------------------------------------------------------
| PAGE
|--------------------------------------------------------------------------
*/

export default async function DealerLeadDetailPage({
  params,
}) {
  const { id } = await params;

  const result = await getLead(id);

  /*
   * NOT FOUND
   */

  if (!result.lead) {
    return (
      <main className="min-h-screen bg-slate-100 text-slate-900">
        <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 text-white">
          <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
            <Link
              href="/dealer/leads"
              className="inline-flex text-sm font-bold text-blue-300 transition hover:text-white"
            >
              ← Back to Vehicle Opportunities
            </Link>

            <div className="mt-10 max-w-3xl">
              <span className="inline-flex rounded-full bg-red-500/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-red-300 ring-1 ring-red-400/20">
                Opportunity Unavailable
              </span>

              <h1 className="mt-6 text-4xl font-black tracking-tight md:text-6xl">
                Vehicle Opportunity
                <span className="block text-blue-400">
                  Not Available
                </span>
              </h1>

              <p className="mt-6 text-lg leading-8 text-slate-300">
                {result.error}
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-14 md:py-20">
          <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200 md:p-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-4xl">
              🚘
            </div>

            <h2 className="mt-7 text-2xl font-black text-slate-950 md:text-3xl">
              Opportunity Not Found
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600">
              This seller submission may have been
              removed, updated, sold, or is no longer
              available through the marketplace.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/dealer/leads"
                className="rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-black text-white transition hover:bg-blue-700"
              >
                Browse Vehicle Opportunities →
              </Link>

              <Link
                href="/dealer/dashboard"
                className="rounded-xl border border-slate-300 px-7 py-3.5 text-sm font-black text-slate-700 transition hover:bg-slate-50"
              >
                Dealer Dashboard
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const lead = result.lead;

  const vehicleName =
    getVehicleName(lead) ||
    "Vehicle Opportunity";

  const location = getLocation(lead);

  const vehicleType =
    getVehicleType(lead);

  const status = getStatus(lead);

  const available =
    isAvailableStatus(status);

  /*
   * RENDER
   */

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      {/* HERO */}

      <section className="overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 text-white">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
          <Link
            href="/dealer/leads"
            className="inline-flex text-sm font-bold text-blue-300 transition hover:text-white"
          >
            ← Back to Vehicle Opportunities
          </Link>

          <div className="mt-9">
            <StatusBadge status={status} />

            <h1 className="mt-5 max-w-5xl text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
              {vehicleName}
            </h1>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-300">
              <span>
                📍 {location}
              </span>

              <span className="hidden sm:inline">
                •
              </span>

              <span>
                🚘 {vehicleType}
              </span>

              <span className="hidden sm:inline">
                •
              </span>

              <span>
                Submitted{" "}
                {formatDate(
                  lead.created_at
                )}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}

      <section className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* MAIN */}

          <div className="space-y-8">
            {/* VEHICLE DETAILS */}

            <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
              <SectionHeading
                eyebrow="Vehicle Details"
                title="Vehicle Information"
                description="Review the information submitted by the seller."
              />

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
                  value={formatMileage(
                    lead.mileage
                  )}
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
              <SectionHeading
                eyebrow="Seller Pricing"
                title="Asking Price"
                description="Seller-provided pricing information."
              />

              <div className="mt-7 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 ring-1 ring-blue-100">
                <p className="text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
                  {formatCurrency(
                    lead.asking_price
                  )}
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Seller-provided asking price in
                  Canadian dollars. Pricing should
                  be independently verified before
                  any transaction.
                </p>
              </div>
            </section>

            {/* ACQUISITION */}

            <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
              <SectionHeading
                eyebrow="Acquisition Information"
                title="Seller Submission"
                description="Additional information provided with the vehicle opportunity."
              />

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
                    lead.vin
                      ? "Available after review"
                      : "Not provided"
                  }
                />

                <DetailCard
                  label="Submission Date"
                  value={formatDate(
                    lead.created_at
                  )}
                />
              </div>
            </section>

            {/* DESCRIPTION */}

            <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
              <SectionHeading
                eyebrow="Seller Description"
                title="Vehicle Notes"
                description="Additional details supplied by the seller."
              />

              <div className="mt-7 rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                {lead.description ? (
                  <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                    {lead.description}
                  </p>
                ) : (
                  <p className="text-sm leading-7 text-slate-500">
                    No additional vehicle notes
                    were provided by the seller.
                  </p>
                )}
              </div>
            </section>

            {/* NEXT STEPS */}

            <section className="rounded-3xl bg-slate-950 p-7 text-white shadow-xl md:p-8">
              <span className="text-xs font-black uppercase tracking-widest text-blue-400">
                Acquisition Next Step
              </span>

              <h2 className="mt-3 text-2xl font-black md:text-3xl">
                Ready to Review This Vehicle?
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                Contact NorthSky Auto to express
                interest and begin the acquisition
                review process.
              </p>

              {available ? (
                <Link
                  href="/contact?topic=vehicle-opportunity"
                  className="mt-7 inline-flex rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-black text-white transition hover:bg-blue-500"
                >
                  Contact NorthSky Auto →
                </Link>
              ) : (
                <div className="mt-7 inline-flex rounded-xl bg-white/10 px-6 py-3.5 text-sm font-black text-slate-300 ring-1 ring-white/10">
                  Opportunity Currently Unavailable
                </div>
              )}
            </section>
          </div>

          {/* SIDEBAR */}

          <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            {/* OPPORTUNITY SUMMARY */}

            <section className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                Opportunity
              </p>

              <p className="mt-2 break-all text-2xl font-black text-slate-950">
                #{lead.id}
              </p>

              <div className="mt-5">
                <StatusBadge status={status} />
              </div>

              <div className="mt-6 space-y-3 border-t border-slate-100 pt-6">
                <SummaryRow
                  label="Vehicle"
                  value={
                    vehicleName
                  }
                />

                <SummaryRow
                  label="Location"
                  value={location}
                />

                <SummaryRow
                  label="Mileage"
                  value={formatMileage(
                    lead.mileage
                  )}
                />

                <SummaryRow
                  label="Asking Price"
                  value={formatCurrency(
                    lead.asking_price
                  )}
                />
              </div>
            </section>

            {/* DEALER CTA */}

            <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-7 text-white shadow-xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl ring-1 ring-white/10">
                🤝
              </div>

              <h2 className="mt-6 text-2xl font-black">
                Interested in This Vehicle?
              </h2>

              <p className="mt-4 text-sm leading-7 text-blue-100">
                Let NorthSky Auto know you're
                interested in this acquisition
                opportunity.
              </p>

              {available ? (
                <Link
                  href="/contact?topic=vehicle-opportunity"
                  className="mt-7 block rounded-xl bg-white px-5 py-3.5 text-center text-sm font-black text-blue-700 transition hover:bg-blue-50"
                >
                  Contact NorthSky Auto →
                </Link>
              ) : (
                <div className="mt-7 rounded-xl bg-white/10 px-5 py-3.5 text-center text-sm font-black ring-1 ring-white/20">
                  Opportunity Unavailable
                </div>
              )}

              <p className="mt-4 text-center text-xs leading-5 text-blue-100/80">
                NorthSky Auto does not guarantee
                vehicle availability, pricing, condition,
                or transaction completion.
              </p>
            </section>

            {/* MARKETPLACE */}

            <section className="rounded-3xl bg-slate-950 p-7 text-white">
              <span className="text-xs font-black uppercase tracking-widest text-blue-400">
                Dealer Marketplace
              </span>

              <h2 className="mt-3 text-xl font-black">
                Find More Inventory
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Browse additional seller-submitted
                vehicles available through NorthSky
                Auto.
              </p>

              <Link
                href="/dealer/leads"
                className="mt-6 block rounded-xl bg-blue-600 px-5 py-3.5 text-center text-sm font-black text-white transition hover:bg-blue-500"
              >
                Browse Vehicle Leads →
              </Link>
            </section>

            {/* ACCOUNT */}

            <section className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                Dealer Workspace
              </p>

              <h2 className="mt-3 text-xl font-black text-slate-950">
                Manage Your Account
              </h2>

              <div className="mt-5 space-y-3">
                <Link
                  href="/dealer/dashboard"
                  className="block rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-black text-slate-700 transition hover:bg-slate-50"
                >
                  Dealer Dashboard
                </Link>

                <Link
                  href="/dealer/saved"
                  className="block rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-black text-slate-700 transition hover:bg-slate-50"
                >
                  Saved Vehicles
                </Link>

                <Link
                  href="/dealer/analytics"
                  className="block rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-black text-slate-700 transition hover:bg-slate-50"
                >
                  Acquisition Analytics
                </Link>
              </div>
            </section>
          </aside>
        </div>
      </section>

      {/* DISCLOSURE */}

      <section className="border-t border-slate-200 bg-white px-6 py-9">
        <div className="mx-auto max-w-4xl text-center text-xs leading-6 text-slate-500">
          NorthSky Auto vehicle opportunities are
          based on information submitted by vehicle
          sellers. Vehicle availability, condition,
          mileage, pricing, ownership, seller
          information, and acquisition opportunities
          are not guaranteed. Dealers should independently
          verify all vehicle information and conduct
          appropriate due diligence before entering
          into any transaction.
        </div>
      </section>

      {/* FOOTER */}

      <footer className="border-t border-slate-800 bg-slate-950 px-6 py-9 text-center">
        <p className="text-sm font-bold text-slate-400">
          © {new Date().getFullYear()} NorthSky Auto
        </p>

        <p className="mt-1 text-xs text-slate-600">
          Canadian Vehicle Marketplace
        </p>
      </footer>
    </main>
  );
}

/*
|--------------------------------------------------------------------------
| COMPONENTS
|--------------------------------------------------------------------------
*/

function SectionHeading({
  eyebrow,
  title,
  description,
}) {
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-widest text-blue-600">
        {eyebrow}
      </p>

      <h2 className="mt-2 text-2xl font-black text-slate-950 md:text-3xl">
        {title}
      </h2>

      {description && (
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          {description}
        </p>
      )}
    </div>
  );
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

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
        {label}
      </span>

      <span className="max-w-[60%] break-words text-right text-sm font-black text-slate-800">
        {value || "Not provided"}
      </span>
    </div>
  );
}

function StatusBadge({ status }) {
  const value = String(
    status || "new"
  ).toLowerCase();

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
      <span className="mr-2 text-[8px]">
        ●
      </span>

      {labels[value] ||
        value.replace(/[-_]/g, " ")}
    </span>
  );
}