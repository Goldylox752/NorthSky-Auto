"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const DEALER_STORAGE_KEY = "northsky_dealer_id";

export default function SavedLeadsPage() {
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removing, setRemoving] = useState(null);

  const getDealerId = () => {
    if (typeof window === "undefined") return null;

    return window.localStorage.getItem(
      DEALER_STORAGE_KEY
    );
  };

  const loadSaved = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const dealerId = getDealerId();

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
            "Unable to load your saved vehicle opportunities."
        );
      }

      setSaved(
        Array.isArray(data?.saved)
          ? data.saved
          : []
      );
    } catch (error) {
      console.error(
        "Saved vehicle loading error:",
        error
      );

      setSaved([]);

      setError(
        error?.message ||
          "Unable to load saved vehicle opportunities."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSaved();
  }, [loadSaved]);

  async function removeVehicle(vehicleLeadId) {
    if (!vehicleLeadId || removing) return;

    const confirmed = window.confirm(
      "Remove this vehicle from your saved opportunities?"
    );

    if (!confirmed) return;

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

      const response = await fetch(
        "/api/dealer/saved",
        {
          method: "DELETE",
          headers,
          cache: "no-store",
          body: JSON.stringify({
            vehicle_lead_id: vehicleLeadId,
          }),
        }
      );

      const data =
        await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Unable to remove this saved vehicle."
        );
      }

      setSaved((current) =>
        current.filter(
          (item) =>
            String(
              item?.vehicle_lead_id
            ) !== String(vehicleLeadId)
        )
      );
    } catch (error) {
      console.error(
        "Remove saved vehicle error:",
        error
      );

      setError(
        error?.message ||
          "Unable to remove the saved vehicle."
      );
    } finally {
      setRemoving(null);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      {/* HERO */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-18">
          <Link
            href="/dealer/dashboard"
            className="inline-flex text-sm font-bold text-blue-300 transition hover:text-white"
          >
            ← Dealer Dashboard
          </Link>

          <div className="mt-8 max-w-4xl">
            <span className="inline-flex rounded-full bg-blue-500/20 px-4 py-2 text-xs font-black uppercase tracking-widest text-blue-300 ring-1 ring-blue-400/20">
              Dealer Workspace
            </span>

            <h1 className="mt-6 text-4xl font-black tracking-tight md:text-6xl">
              Saved Vehicle
              <span className="block text-blue-400">
                Opportunities
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
              Keep promising vehicle opportunities
              organized so your dealership can review
              inventory options and follow up when ready.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <section className="mx-auto max-w-7xl px-6 py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* CONTENT */}
          <div>
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
                Browse Opportunities →
              </Link>
            </div>

            {/* ERROR */}
            {error && (
              <div
                role="alert"
                className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700"
              >
                <p className="font-bold">
                  {error}
                </p>

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
              <div
                className="mt-8 space-y-6"
                aria-label="Loading saved vehicles"
              >
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="animate-pulse rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 md:p-8"
                  >
                    <div className="h-5 w-24 rounded bg-slate-200" />

                    <div className="mt-5 h-8 w-3/4 rounded bg-slate-200" />

                    <div className="mt-3 h-4 w-40 rounded bg-slate-200" />

                    <div className="mt-7 grid gap-3 sm:grid-cols-3">
                      <div className="h-16 rounded-xl bg-slate-200" />
                      <div className="h-16 rounded-xl bg-slate-200" />
                      <div className="h-16 rounded-xl bg-slate-200" />
                    </div>

                    <div className="mt-7 h-11 w-full rounded-xl bg-slate-200" />
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
                    return to them here whenever you
                    need to review your acquisition
                    pipeline.
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
                    const vehicle =
                      item?.vehicle || {};

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
                      vehicle?.location ||
                      vehicle?.city ||
                      vehicle?.postal_code ||
                      "Canada";

                    return (
                      <article
                        key={
                          item?.id ||
                          String(leadId)
                        }
                        className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 transition hover:shadow-lg md:p-8"
                      >
                        <div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:justify-between">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="inline-flex rounded-full bg-green-100 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-green-700">
                                {vehicle?.status ||
                                  "Available"}
                              </span>

                              <span className="text-xs font-bold text-slate-400">
                                Saved{" "}
                                {formatDate(
                                  item?.saved_at
                                )}
                              </span>
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
              <p className="text-xs font-black uppercase tracking-widest text-blue-600">
                Acquisition Pipeline
              </p>

              <h2 className="mt-3 text-2xl font-black">
                Organize Your Search
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                Save promising vehicles while you
                compare pricing, mileage, condition,
                location, and potential inventory fit.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-950 p-7 text-white shadow-xl">
              <div className="text-3xl">
                🚘
              </div>

              <h2 className="mt-4 text-xl font-black">
                Find More Inventory
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
                Browse Vehicle Leads →
              </Link>
            </div>

            <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-black uppercase tracking-widest text-blue-600">
                Dealer Account
              </p>

              <h2 className="mt-3 text-xl font-black">
                Manage Your Membership
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Manage your dealer subscription,
                profile, and account settings from the
                dealer portal.
              </p>

              <Link
                href="/dealer/subscriptions"
                className="mt-5 block rounded-xl border border-slate-300 px-5 py-3 text-center text-sm font-black text-slate-700 transition hover:bg-slate-50"
              >
                Manage Subscription
              </Link>
            </div>
          </aside>
        </div>
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
            evaluate acquisition opportunities, and
            organize potential inventory for your
            dealership.
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