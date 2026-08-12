"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function SavedLeadsPage() {
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removing, setRemoving] = useState(null);

  const loadSaved = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const dealerId =
        typeof window !== "undefined"
          ? window.localStorage.getItem(
              "northsky_dealer_id"
            )
          : null;

      const headers = {
        Accept: "application/json",
      };

      if (dealerId) {
        headers["x-dealer-id"] = dealerId;
      }

      const response = await fetch(
        "/api/dealer/saved",
        {
          method: "GET",
          headers,
          cache: "no-store",
        }
      );

      const data =
        await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Unable to load saved vehicles."
        );
      }

      setSaved(
        Array.isArray(data?.saved)
          ? data.saved
          : []
      );
    } catch (err) {
      console.error(
        "Saved vehicles error:",
        err
      );

      setError(
        err?.message ||
          "Unable to load saved vehicles."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSaved();
  }, [loadSaved]);

  async function removeVehicle(vehicleLeadId) {
    if (!vehicleLeadId) return;

    const confirmed = window.confirm(
      "Remove this vehicle from your saved opportunities?"
    );

    if (!confirmed) return;

    try {
      setRemoving(vehicleLeadId);
      setError("");

      const dealerId =
        window.localStorage.getItem(
          "northsky_dealer_id"
        );

      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      if (dealerId) {
        headers["x-dealer-id"] = dealerId;
      }

      const response = await fetch(
        "/api/dealer/saved",
        {
          method: "DELETE",
          headers,
          body: JSON.stringify({
            vehicle_lead_id:
              vehicleLeadId,
          }),
        }
      );

      const data =
        await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Unable to remove saved vehicle."
        );
      }

      setSaved((current) =>
        current.filter(
          (item) =>
            String(
              item.vehicle_lead_id
            ) !== String(vehicleLeadId)
        )
      );
    } catch (err) {
      console.error(
        "Remove saved vehicle error:",
        err
      );

      setError(
        err?.message ||
          "Unable to remove saved vehicle."
      );
    } finally {
      setRemoving(null);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      {/* HERO */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <Link
            href="/dealer/dashboard"
            className="text-sm font-bold text-blue-300 transition hover:text-white"
          >
            ← Dealer Dashboard
          </Link>

          <div className="mt-8 max-w-4xl">
            <span className="inline-flex rounded-full bg-blue-500/20 px-5 py-2 text-xs font-black uppercase tracking-widest text-blue-300 ring-1 ring-blue-400/20">
              Dealer Workspace
            </span>

            <h1 className="mt-6 text-4xl font-black tracking-tight md:text-6xl">
              Saved Vehicle
              <span className="block text-blue-400">
                Opportunities
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
              Keep track of vehicle acquisition
              opportunities you want to review,
              follow up on, or potentially purchase
              for your dealership.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* SAVED */}
          <div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-blue-600">
                  Dealer Marketplace
                </span>

                <h2 className="mt-2 text-3xl font-black">
                  Your Saved Vehicles
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
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
                className="inline-flex rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-blue-700"
              >
                Browse Vehicle Leads →
              </Link>
            </div>

            {/* ERROR */}
            {error && (
              <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-semibold text-red-700">
                <p>{error}</p>

                <button
                  type="button"
                  onClick={loadSaved}
                  className="mt-3 font-black underline"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* LOADING */}
            {loading && (
              <div className="mt-8 space-y-6">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="animate-pulse rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200"
                  >
                    <div className="h-4 w-24 rounded bg-slate-200" />
                    <div className="mt-5 h-8 w-2/3 rounded bg-slate-200" />
                    <div className="mt-3 h-4 w-1/3 rounded bg-slate-200" />

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
                    When you find a promising vehicle
                    acquisition opportunity, save it
                    here so you can quickly return to
                    it later.
                  </p>

                  <Link
                    href="/dealer/leads"
                    className="mt-8 inline-flex rounded-xl bg-blue-600 px-7 py-3.5 font-black text-white transition hover:bg-blue-700"
                  >
                    Find Vehicle Opportunities
                  </Link>
                </div>
              )}

            {/* SAVED VEHICLES */}
            {!loading &&
              saved.length > 0 && (
                <div className="mt-8 space-y-6">
                  {saved.map((item) => {
                    const vehicle =
                      item?.vehicle || {};

                    const leadId =
                      item?.vehicle_lead_id ||
                      vehicle?.id;

                    const vehicleName = [
                      vehicle.year,
                      vehicle.make,
                      vehicle.model,
                      vehicle.trim,
                    ]
                      .filter(Boolean)
                      .join(" ");

                    const location =
                      vehicle.postal_code ||
                      "Canada";

                    return (
                      <article
                        key={
                          item.id ||
                          leadId
                        }
                        className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 transition hover:shadow-lg md:p-8"
                      >
                        <div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:justify-between">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="inline-flex rounded-full bg-green-100 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-green-700">
                                {vehicle.status ||
                                  "New"}
                              </span>

                              <span className="text-xs font-bold text-slate-400">
                                Saved{" "}
                                {formatDate(
                                  item.saved_at
                                )}
                              </span>
                            </div>

                            <h3 className="mt-4 break-words text-2xl font-black md:text-3xl">
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
                                  vehicle.mileage
                                )}
                              />

                              <Info
                                label="Condition"
                                value={
                                  vehicle.condition ||
                                  "Not provided"
                                }
                              />

                              <Info
                                label="Asking Price"
                                value={formatCurrency(
                                  vehicle.asking_price
                                )}
                              />
                            </div>
                          </div>

                          <div className="flex w-full flex-col gap-3 lg:w-52">
                            {leadId && (
                              <Link
                                href={`/dealer/leads/${encodeURIComponent(
                                  leadId
                                )}`}
                                className="rounded-xl bg-blue-600 px-5 py-3.5 text-center text-sm font-black text-white transition hover:bg-blue-700"
                              >
                                View Lead →
                              </Link>
                            )}

                            <button
                              type="button"
                              disabled={
                                removing ===
                                leadId
                              }
                              onClick={() =>
                                removeVehicle(
                                  leadId
                                )
                              }
                              className="rounded-xl border border-slate-300 px-5 py-3.5 text-sm font-black text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {removing ===
                              leadId
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
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-6">
            <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
              <span className="text-xs font-black uppercase tracking-widest text-blue-600">
                Saved Pipeline
              </span>

              <h2 className="mt-3 text-2xl font-black">
                Organize Your Inventory Search
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                Save promising seller submissions
                while you compare vehicles, pricing,
                mileage, location, and acquisition
                potential.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-950 p-7 text-white shadow-xl">
              <div className="text-3xl">🚘</div>

              <h2 className="mt-4 text-xl font-black">
                Looking for Inventory?
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                Browse current seller-submitted
                vehicle opportunities available through
                NorthSky Auto.
              </p>

              <Link
                href="/dealer/leads"
                className="mt-6 block rounded-xl bg-blue-600 px-5 py-3.5 text-center text-sm font-black text-white transition hover:bg-blue-500"
              >
                Browse Leads
              </Link>
            </div>

            <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-xl font-black">
                Dealer Membership
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Manage your dealer membership and
                account settings from your dealer portal.
              </p>

              <Link
                href="/buyers"
                className="mt-5 block rounded-xl border border-slate-300 px-5 py-3 text-center text-sm font-black text-slate-700 transition hover:bg-slate-50"
              >
                Manage Membership
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-10 text-center text-white shadow-xl md:p-14">
          <span className="text-xs font-black uppercase tracking-widest text-blue-100">
            NorthSky Auto
          </span>

          <h2 className="mt-5 text-3xl font-black md:text-4xl">
            Build Your Acquisition Pipeline
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-blue-100 md:text-base">
            Discover seller-submitted vehicles,
            evaluate acquisition opportunities, and
            build your dealership inventory pipeline.
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
          Saved vehicle opportunities are intended for
          dealer workflow and organization. Vehicle
          availability, condition, pricing, seller
          information, and acquisition opportunities are
          not guaranteed. Dealers should conduct their own
          due diligence before proceeding with any
          transaction.
        </div>
      </section>
    </main>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
      <p className="text-xs font-black uppercase tracking-widest text-slate-400">
        {label}
      </p>

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
    return "recently";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "recently";
  }

  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}