import Link from “next/link”;
import { notFound } from “next/navigation”;
import { createClient } from “@/lib/supabase/server”;

export const dynamic = “force-dynamic”;

async function getLead(id) {
if (!id) {
return null;
}

const supabase = await createClient();

const { data, error } = await supabase
.from(“leads”)
.select(
id, year, make, model, trim, mileage, condition, selling_timeline, accident_history, asking_price, postal_code, description, status, created_at
)
.eq(“id”, id)
.in(“status”, [“new”, “available”, “active”])
.maybeSingle();

if (error) {
console.error(“Lead detail error:”, error);
return null;
}

return data;
}

function formatCurrency(value) {
const number = Number(value);

if (!Number.isFinite(number) || number <= 0) {
return “Not provided”;
}

return new Intl.NumberFormat(“en-CA”, {
style: “currency”,
currency: “CAD”,
maximumFractionDigits: 0,
}).format(number);
}

function formatMileage(value) {
const number = Number(value);

if (!Number.isFinite(number) || number < 0) {
return “Not provided”;
}

return ${Math.round(number).toLocaleString("en-CA")} km;
}

function formatDate(value) {
if (!value) {
return “Recently submitted”;
}

const date = new Date(value);

if (Number.isNaN(date.getTime())) {
return “Recently submitted”;
}

return new Intl.DateTimeFormat(“en-CA”, {
year: “numeric”,
month: “long”,
day: “numeric”,
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
.join(” “);
}

function getStatusLabel(status) {
const value = String(status || “new”).toLowerCase();

const labels = {
new: “New Opportunity”,
available: “Available”,
active: “Active”,
};

return labels[value] || “Opportunity”;
}

export async function generateMetadata({ params }) {
const { id } = await params;
const lead = await getLead(id);

if (!lead) {
return {
title: “Vehicle Opportunity | NorthSky Auto”,
robots: {
index: false,
follow: true,
},
};
}

const vehicleName =
getVehicleName(lead) || “Vehicle Opportunity”;

return {
title: ${vehicleName} | NorthSky Auto,
description: Review ${vehicleName} through the NorthSky Auto dealer marketplace.,
robots: {
index: false,
follow: true,
},
};
}

export default async function DealerLeadDetailPage({
params,
}) {
const { id } = await params;

const lead = await getLead(id);

if (!lead) {
notFound();
}

const vehicleName =
getVehicleName(lead) || “Vehicle Opportunity”;

const status = String(
lead.status || “new”
).toLowerCase();

return (
{/* HERO */}

  <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 text-white">
    <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <Link
        href="/dealer/leads"
        className="text-sm font-bold text-blue-300 transition hover:text-white"
      >
        ← Back to Vehicle Leads
      </Link>
      <div className="mt-8">
        <span className="inline-flex rounded-full bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-blue-300 ring-1 ring-blue-400/20">
          {getStatusLabel(status)}
        </span>
        <h1 className="mt-5 max-w-5xl text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
          {vehicleName}
        </h1>
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-300">
          {lead.postal_code && (
            <span>
              📍 {lead.postal_code}
            </span>
          )}
          <span>
            🚘 Vehicle Opportunity
          </span>
          <span>
            Submitted {formatDate(lead.created_at)}
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
        {/* VEHICLE */}
        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
          <SectionHeading
            eyebrow="Vehicle Details"
            title="Vehicle Information"
            description="Information submitted by the vehicle seller."
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
              label="Mileage"
              value={formatMileage(lead.mileage)}
            />
            <DetailCard
              label="Condition"
              value={lead.condition}
            />
            <DetailCard
              label="Location"
              value={lead.postal_code}
            />
            <DetailCard
              label="Status"
              value={getStatusLabel(status)}
            />
          </div>
        </section>
        {/* PRICE */}
        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
          <SectionHeading
            eyebrow="Seller Pricing"
            title="Asking Price"
            description="Seller-provided pricing information."
          />
          <div className="mt-7 rounded-2xl bg-blue-50 p-6 ring-1 ring-blue-100">
            <p className="text-4xl font-black text-slate-950 md:text-5xl">
              {formatCurrency(lead.asking_price)}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Seller-provided asking price in Canadian
              dollars. Dealers should independently verify
              pricing before proceeding.
            </p>
          </div>
        </section>
        {/* SELLER INFORMATION */}
        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
          <SectionHeading
            eyebrow="Acquisition Information"
            title="Seller Submission"
            description="Additional information supplied with this vehicle opportunity."
          />
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
              value="Available for review"
            />
            <DetailCard
              label="Submitted"
              value={formatDate(lead.created_at)}
            />
          </div>
        </section>
        {/* DESCRIPTION */}
        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
          <SectionHeading
            eyebrow="Seller Description"
            title="Vehicle Notes"
            description="Additional details provided by the seller."
          />
          <div className="mt-7 rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
            {lead.description ? (
              <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                {lead.description}
              </p>
            ) : (
              <p className="text-sm leading-7 text-slate-500">
                No additional vehicle notes were provided.
              </p>
            )}
          </div>
        </section>
        {/* CTA */}
        <section className="rounded-3xl bg-slate-950 p-7 text-white shadow-xl md:p-8">
          <p className="text-xs font-black uppercase tracking-widest text-blue-400">
            Acquisition Opportunity
          </p>
          <h2 className="mt-3 text-2xl font-black md:text-3xl">
            Interested in This Vehicle?
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
            Contact NorthSky Auto to express interest and
            begin the acquisition review process.
          </p>
          <Link
            href={`/contact?topic=vehicle-opportunity&lead=${encodeURIComponent(
              lead.id
            )}`}
            className="mt-7 inline-flex rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-black text-white transition hover:bg-blue-500"
          >
            Contact NorthSky Auto →
          </Link>
        </section>
      </div>
      {/* SIDEBAR */}
      <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
        {/* SUMMARY */}
        <section className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">
            Opportunity
          </p>
          <h2 className="mt-2 text-xl font-black text-slate-950">
            {vehicleName}
          </h2>
          <div className="mt-5">
            <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-wide text-blue-700 ring-1 ring-blue-100">
              {getStatusLabel(status)}
            </span>
          </div>
          <div className="mt-6 space-y-4 border-t border-slate-100 pt-6">
            <SummaryRow
              label="Mileage"
              value={formatMileage(lead.mileage)}
            />
            <SummaryRow
              label="Condition"
              value={lead.condition}
            />
            <SummaryRow
              label="Location"
              value={lead.postal_code}
            />
            <SummaryRow
              label="Asking Price"
              value={formatCurrency(lead.asking_price)}
            />
          </div>
        </section>
        {/* CTA */}
        <section className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-7 text-white shadow-xl">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl">
            🤝
          </div>
          <h2 className="mt-6 text-2xl font-black">
            Interested?
          </h2>
          <p className="mt-4 text-sm leading-7 text-blue-100">
            Let NorthSky Auto know you're interested in
            this vehicle acquisition opportunity.
          </p>
          <Link
            href={`/contact?topic=vehicle-opportunity&lead=${encodeURIComponent(
              lead.id
            )}`}
            className="mt-7 block rounded-xl bg-white px-5 py-3.5 text-center text-sm font-black text-blue-700 transition hover:bg-blue-50"
          >
            Contact NorthSky Auto →
          </Link>
        </section>
        {/* NAVIGATION */}
        <section className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">
            Dealer Workspace
          </p>
          <div className="mt-5 space-y-3">
            <Link
              href="/dealer/dashboard"
              className="block rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-black text-slate-700 transition hover:bg-slate-50"
            >
              Dealer Dashboard
            </Link>
            <Link
              href="/dealer/leads"
              className="block rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-black text-slate-700 transition hover:bg-slate-50"
            >
              Vehicle Leads
            </Link>
            <Link
              href="/dealer/saved"
              className="block rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-black text-slate-700 transition hover:bg-slate-50"
            >
              Saved Vehicles
            </Link>
          </div>
        </section>
      </aside>
    </div>
  </section>
  {/* DISCLOSURE */}
  <section className="border-t border-slate-200 bg-white px-6 py-9">
    <div className="mx-auto max-w-4xl text-center text-xs leading-6 text-slate-500">
      NorthSky Auto vehicle opportunities are based on
      information submitted by vehicle sellers. Vehicle
      availability, condition, mileage, pricing, ownership,
      seller information, and acquisition opportunities are
      not guaranteed. Dealers should independently verify
      vehicle information and conduct appropriate due
      diligence before entering into any transaction.
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

function SectionHeading({
eyebrow,
title,
description,
}) {
return (
{eyebrow}
  <h2 className="mt-2 text-2xl font-black text-slate-950 md:text-3xl">
    {title}
  </h2>
  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
    {description}
  </p>
</div>

);
}

function DetailCard({ label, value }) {
return (
{label}
  <p className="mt-2 break-words text-base font-bold text-slate-800">
    {value || "Not provided"}
  </p>
</div>

);
}

function SummaryRow({ label, value }) {
return (
{label}
  <span className="max-w-[60%] break-words text-right text-sm font-black text-slate-800">
    {value || "Not provided"}
  </span>
</div>

);
}