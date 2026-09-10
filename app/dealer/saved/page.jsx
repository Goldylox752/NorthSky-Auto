“use client”;

import Link from “next/link”;
import { useCallback, useEffect, useState } from “react”;

const DEALER_STORAGE_KEY = “northsky_dealer_id”;

export default function SavedLeadsPage() {
const [saved, setSaved] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(””);
const [removing, setRemoving] = useState(null);

const getDealerId = useCallback(() => {
if (typeof window === “undefined”) {
return null;
}

return window.localStorage.getItem(DEALER_STORAGE_KEY);

}, []);

const loadSaved = useCallback(async () => {
try {
setLoading(true);
setError(””);

  const dealerId = getDealerId();
  const headers = {
    Accept: "application/json",
  };
  if (dealerId) {
    headers["x-dealer-id"] = dealerId;
  }
  const response = await fetch("/api/dealer/saved", {
    method: "GET",
    headers,
    cache: "no-store",
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      data?.error ||
        "Unable to load your saved vehicles."
    );
  }
  setSaved(
    Array.isArray(data?.saved)
      ? data.saved
      : []
  );
} catch (err) {
  console.error("Saved vehicles error:", err);
  setSaved([]);
  setError(
    err?.message ||
      "Unable to load saved vehicles."
  );
} finally {
  setLoading(false);
}

}, [getDealerId]);

useEffect(() => {
loadSaved();
}, [loadSaved]);

async function removeVehicle(vehicleLeadId) {
if (!vehicleLeadId || removing) {
return;
}

const confirmed = window.confirm(
  "Remove this vehicle from your saved opportunities?"
);
if (!confirmed) {
  return;
}
try {
  setRemoving(vehicleLeadId);
  setError("");
  const dealerId = getDealerId();
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (dealerId) {
    headers["x-dealer-id"] = dealerId;
  }
  const response = await fetch("/api/dealer/saved", {
    method: "DELETE",
    headers,
    cache: "no-store",
    body: JSON.stringify({
      vehicle_lead_id: vehicleLeadId,
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      data?.error ||
        "Unable to remove this saved vehicle."
    );
  }
  setSaved((current) =>
    current.filter(
      (item) =>
        String(item?.vehicle_lead_id) !==
        String(vehicleLeadId)
    )
  );
} catch (err) {
  console.error(
    "Remove saved vehicle error:",
    err
  );
  setError(
    err?.message ||
      "Unable to remove the saved vehicle."
  );
} finally {
  setRemoving(null);
}

}

return (
{/* HERO */}

  <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 text-white">
    <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
      <Link
        href="/dealer/dashboard"
        className="text-sm font-bold text-blue-300 transition hover:text-white"
      >
        ← Dealer Dashboard
      </Link>
      <div className="mt-9 max-w-4xl">
        <span className="inline-flex rounded-full bg-blue-500/20 px-4 py-2 text-xs font-black uppercase tracking-widest text-blue-300 ring-1 ring-blue-400/20">
          Dealer Workspace
        </span>
        <h1 className="mt-6 text-4xl font-black tracking-tight md:text-6xl">
          Saved Vehicle
          <span className="block text-blue-400">
            Opportunities
          </span>
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          Keep promising vehicle opportunities
          organized so you can review potential
          inventory when you're ready.
        </p>
      </div>
    </div>
  </section>
  {/* CONTENT */}
  <section className="mx-auto max-w-7xl px-6 py-10 md:py-14">
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-blue-600">
          Saved Pipeline
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-tight">
          Your Saved Vehicles
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          {loading
            ? "Loading saved opportunities..."
            : `${saved.length} ${
                saved.length === 1
                  ? "saved vehicle"
                  : "saved vehicles"
              }`}
        </p>
      </div>
      <Link
        href="/dealer/leads"
        className="inline-flex justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700"
      >
        Browse Vehicle Leads →
      </Link>
    </div>
    {/* ERROR */}
    {error && (
      <div
        role="alert"
        className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700"
      >
        <p className="font-bold">{error}</p>
        <button
          type="button"
          onClick={loadSaved}
          className="mt-3 font-black underline underline-offset-2"
        >
          Try Again
        </button>
      </div>
    )}
    {/* LOADING */}
    {loading && (
      <div className="mt-8 space-y-5">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="animate-pulse rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200"
          >
            <div className="h-5 w-28 rounded bg-slate-200" />
            <div className="mt-5 h-8 w-3/4 rounded bg-slate-200" />
            <div className="mt-4 h-4 w-40 rounded bg-slate-200" />
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="h-16 rounded-xl bg-slate-200" />
              <div className="h-16 rounded-xl bg-slate-200" />
              <div className="h-16 rounded-xl bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    )}
    {/* EMPTY */}
    {!loading &&
      !error &&
      saved.length === 0 && (
        <div className="mt-8 rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200 md:p-14">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-4xl">
            ⭐
          </div>
          <h3 className="mt-6 text-2xl font-black">
            No Saved Vehicles Yet
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600">
            Save promising seller-submitted
            vehicles from the marketplace and
            return here when you want to review
            them.
          </p>
          <Link
            href="/dealer/leads"
            className="mt-8 inline-flex rounded-xl bg-blue-600 px-7 py-3.5 font-black text-white transition hover:bg-blue-700"
          >
            Find Vehicle Opportunities →
          </Link>
        </div>
      )}
    {/* SAVED VEHICLES */}
    {!loading &&
      !error &&
      saved.length > 0 && (
        <div className="mt-8 space-y-6">
          {saved.map((item) => {
            const vehicle = item?.vehicle || {};
            const leadId =
              item?.vehicle_lead_id ||
              vehicle?.id;
            const vehicleName = [
              vehicle?.year,
              vehicle?.make,
              vehicle?.model,
              vehicle?.trim,
            ]
              .filter(Boolean)
              .join(" ");
            const location =
              vehicle?.postal_code ||
              vehicle?.location ||
              "Canada";
            return (
              <article
                key={
                  item?.id ||
                  String(leadId)
                }
                className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 transition hover:shadow-md md:p-8"
              >
                <div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-green-700">
                        {vehicle?.status ||
                          "Available"}
                      </span>
                      {item?.saved_at && (
                        <span className="text-xs font-bold text-slate-400">
                          Saved{" "}
                          {formatDate(
                            item.saved_at
                          )}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-4 break-words text-2xl font-black tracking-tight md:text-3xl">
                      {vehicleName ||
                        "Vehicle Opportunity"}
                    </h3>
                    <p className="mt-2 text-sm font-semibold text-slate-500">
                      📍 {location}
                    </p>
                    <div className="mt-7 grid gap-3 sm:grid-cols-3">
                      <Info
                        label="Mileage"
                        value={formatMileage(
                          vehicle?.mileage
                        )}
                      />
                      <Info
                        label="Condition"
                        value={
                          vehicle?.condition ||
                          "Not provided"
                        }
                      />
                      <Info
                        label="Asking Price"
                        value={formatCurrency(
                          vehicle?.asking_price
                        )}
                      />
                    </div>
                    {vehicle?.description && (
                      <p className="mt-6 line-clamp-2 text-sm leading-6 text-slate-500">
                        {vehicle.description}
                      </p>
                    )}
                  </div>
                  <div className="flex w-full flex-col gap-3 lg:w-52">
                    {leadId && (
                      <Link
                        href={`/dealer/leads/${encodeURIComponent(
                          String(leadId)
                        )}`}
                        className="rounded-xl bg-blue-600 px-5 py-3.5 text-center text-sm font-black text-white transition hover:bg-blue-700"
                      >
                        View Opportunity →
                      </Link>
                    )}
                    <button
                      type="button"
                      disabled={
                        removing !== null
                      }
                      onClick={() =>
                        removeVehicle(
                          leadId
                        )
                      }
                      className="rounded-xl border border-slate-300 px-5 py-3.5 text-sm font-black text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {removing === leadId
                        ? "Removing..."
                        : "Remove Saved"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
  </section>
  {/* CTA */}
  <section className="border-t border-slate-200 bg-white px-6 py-16">
    <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-10 text-center text-white shadow-xl md:p-14">
      <p className="text-xs font-black uppercase tracking-widest text-blue-100">
        NorthSky Auto Dealer Marketplace
      </p>
      <h2 className="mt-5 text-3xl font-black md:text-4xl">
        Build Your Acquisition Pipeline
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-blue-100 md:text-base">
        Discover seller-submitted vehicles,
        save promising opportunities, and organize
        potential inventory for your dealership.
      </p>
      <Link
        href="/dealer/leads"
        className="mt-8 inline-flex rounded-xl bg-white px-8 py-4 font-black text-blue-700 transition hover:bg-blue-50"
      >
        Browse Vehicle Opportunities →
      </Link>
    </div>
  </section>
  {/* DISCLOSURE */}
  <section className="bg-slate-50 px-6 py-8">
    <div className="mx-auto max-w-4xl text-center text-xs leading-6 text-slate-500">
      Saved vehicle opportunities are provided for
      dealer workflow and organization. Vehicle
      availability, condition, pricing, seller
      information, and acquisition opportunities are
      not guaranteed. Dealers should independently
      verify vehicle information and conduct their own
      due diligence before any transaction.
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

function Info({ label, value }) {
return (
{label}
  <p className="mt-1 break-words text-sm font-bold text-slate-700">
    {value || "Not provided"}
  </p>
</div>

);
}

function formatCurrency(value) {
if (
value === null ||
value === undefined ||
value === “”
) {
return “Not provided”;
}

const number = Number(value);

if (!Number.isFinite(number)) {
return “Not provided”;
}

return new Intl.NumberFormat(“en-CA”, {
style: “currency”,
currency: “CAD”,
maximumFractionDigits: 0,
}).format(number);
}

function formatMileage(value) {
if (
value === null ||
value === undefined ||
value === “”
) {
return “Not provided”;
}

const number = Number(value);

if (!Number.isFinite(number)) {
return “Not provided”;
}

return ${Math.round(number).toLocaleString( "en-CA" )} km;
}

function formatDate(value) {
if (!value) {
return “recently”;
}

const date = new Date(value);

if (Number.isNaN(date.getTime())) {
return “recently”;
}

return new Intl.DateTimeFormat(“en-CA”, {
year: “numeric”,
month: “short”,
day: “numeric”,
}).format(date);
}