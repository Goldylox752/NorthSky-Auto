"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

export const dynamic = "force-dynamic";

export default function DealerAnalyticsPage() {
  const [leads, setLeads] = useState([]);
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const dealerId =
        typeof window !== "undefined"
          ? window.localStorage.getItem("northsky_dealer_id")
          : null;

      const headers = {
        Accept: "application/json",
      };

      if (dealerId) {
        headers["x-dealer-id"] = dealerId;
      }

      const [leadsResponse, savedResponse] = await Promise.all([
        fetch("/api/leads", {
          method: "GET",
          headers,
          cache: "no-store",
        }),
        fetch("/api/dealer/saved", {
          method: "GET",
          headers,
          cache: "no-store",
        }),
      ]);

      const leadsData = await leadsResponse
        .json()
        .catch(() => ({}));

      const savedData = await savedResponse
        .json()
        .catch(() => ({}));

      if (!leadsResponse.ok) {
        throw new Error(
          leadsData?.error ||
            "Unable to load vehicle opportunities."
        );
      }

      if (!savedResponse.ok) {
        throw new Error(
          savedData?.error ||
            "Unable to load saved vehicles."
        );
      }

      setLeads(
        Array.isArray(leadsData?.leads)
          ? leadsData.leads
          : []
      );

      setSaved(
        Array.isArray(savedData?.saved)
          ? savedData.saved
          : []
      );
    } catch (error) {
      console.error("Dealer analytics error:", error);

      setError(
        error?.message ||
          "Unable to load dealer analytics."
      );

      setLeads([]);
      setSaved([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  const analytics = useMemo(() => {
    const total = leads.length;

    const savedCount = saved.length;

    const activeCount = leads.filter((lead) => {
      const status = String(
        lead?.status || ""
      ).toLowerCase();

      return [
        "active",
        "available",
        "new",
        "published",
      ].includes(status);
    }).length;

    const pricedLeads = leads.filter((lead) => {
      const price = Number(lead?.asking_price);

      return Number.isFinite(price) && price > 0;
    });

    const averagePrice =
      pricedLeads.length > 0
        ? pricedLeads.reduce(
            (sum, lead) =>
              sum + Number(lead.asking_price),
            0
          ) / pricedLeads.length
        : 0;

    const mileageLeads = leads.filter((lead) => {
      const mileage = Number(lead?.mileage);

      return Number.isFinite(mileage) && mileage >= 0;
    });

    const averageMileage =
      mileageLeads.length > 0
        ? mileageLeads.reduce(
            (sum, lead) =>
              sum + Number(lead.mileage),
            0
          ) / mileageLeads.length
        : 0;

    const provinceCounts = countValues(
      leads,
      (lead) =>
        lead?.province ||
        lead?.province_code ||
        extractProvince(lead?.location) ||
        "Other"
    );

    const makeCounts = countValues(
      leads,
      (lead) => lead?.make || "Other"
    );

    const typeCounts = countValues(
      leads,
      (lead) =>
        lead?.vehicle_type ||
        lead?.type ||
        "Other"
    );

    const savedRate =
      total > 0
        ? (savedCount / total) * 100
        : 0;

    return {
      total,
      savedCount,
      activeCount,
      pricedCount: pricedLeads.length,
      averagePrice,
      averageMileage,
      savedRate,
      topProvinces: getTopValues(
        provinceCounts,
        5
      ),
      topMakes: getTopValues(
        makeCounts,
        8
      ),
      vehicleTypes: getTopValues(
        typeCounts,
        6
      ),
    };
  }, [leads, saved]);

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
            <span className="inline-flex rounded-full bg-blue-500/20 px-5 py-2 text-xs font-black uppercase tracking-widest text-blue-300 ring-1 ring-blue-400/20">
              Dealer Intelligence
            </span>

            <h1 className="mt-6 text-4xl font-black tracking-tight md:text-6xl">
              Acquisition
              <span className="block text-blue-400">
                Analytics
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
              Analyze vehicle opportunities, monitor
              your saved pipeline, and understand
              inventory trends across the NorthSky Auto
              marketplace.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-10 md:py-14">
        {/* ERROR */}
        {error && (
          <div className="mb-8 rounded-3xl border border-red-200 bg-red-50 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-black text-red-900">
                  Analytics unavailable
                </p>

                <p className="mt-1 text-sm text-red-700">
                  {error}
                </p>
              </div>

              <button
                type="button"
                onClick={loadAnalytics}
                className="rounded-xl bg-red-600 px-5 py-3 text-sm font-black text-white transition hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* KPI CARDS */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            icon="🚘"
            label="Vehicle Opportunities"
            value={
              loading ? "—" : analytics.total
            }
            description="Current marketplace submissions"
          />

          <MetricCard
            icon="⭐"
            label="Saved Vehicles"
            value={
              loading
                ? "—"
                : analytics.savedCount
            }
            description="Vehicles in your saved pipeline"
          />

          <MetricCard
            icon="📈"
            label="Active Opportunities"
            value={
              loading
                ? "—"
                : analytics.activeCount
            }
            description="New, active, or available"
          />

          <MetricCard
            icon="💰"
            label="Average Asking Price"
            value={
              loading
                ? "—"
                : formatCurrency(
                    analytics.averagePrice
                  )
            }
            description="Priced marketplace submissions"
          />
        </div>

        {/* PIPELINE */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <section className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 md:p-8">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">
              Acquisition Pipeline
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Marketplace Overview
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Monitor the current inventory opportunity
              available through NorthSky Auto.
            </p>

            <div className="mt-8 space-y-7">
              <ProgressRow
                label="Saved Opportunities"
                value={analytics.savedCount}
                total={analytics.total}
                loading={loading}
              />

              <ProgressRow
                label="Active Opportunities"
                value={analytics.activeCount}
                total={analytics.total}
                loading={loading}
              />

              <ProgressRow
                label="Priced Opportunities"
                value={analytics.pricedCount}
                total={analytics.total}
                loading={loading}
              />
            </div>
          </section>

          {/* SAVED RATE */}
          <section className="rounded-3xl bg-slate-950 p-8 text-white shadow-xl">
            <span className="text-xs font-black uppercase tracking-widest text-blue-400">
              Saved Pipeline Rate
            </span>

            <div className="mt-5">
              <span className="text-5xl font-black">
                {loading
                  ? "—"
                  : `${analytics.savedRate.toFixed(
                      0
                    )}%`}
              </span>
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              Percentage of marketplace opportunities
              currently represented in your saved
              vehicle pipeline.
            </p>

            <Link
              href="/dealer/saved"
              className="mt-7 block rounded-xl bg-blue-600 px-5 py-3.5 text-center text-sm font-black text-white transition hover:bg-blue-500"
            >
              View Saved Vehicles →
            </Link>
          </section>
        </div>

        {/* INVENTORY INSIGHTS */}
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <InsightCard
            eyebrow="Inventory Trends"
            title="Top Vehicle Makes"
            description="Vehicle makes currently appearing most frequently."
          >
            {loading ? (
              <LoadingRows />
            ) : analytics.topMakes.length === 0 ? (
              <EmptyInsight />
            ) : (
              <div className="space-y-5">
                {analytics.topMakes.map(
                  ([make, count]) => (
                    <RankingRow
                      key={make}
                      label={make}
                      value={count}
                      total={analytics.total}
                    />
                  )
                )}
              </div>
            )}
          </InsightCard>

          <InsightCard
            eyebrow="Marketplace Mix"
            title="Vehicle Types"
            description="Current distribution of vehicle categories."
          >
            {loading ? (
              <LoadingRows />
            ) : analytics.vehicleTypes.length ===
              0 ? (
              <EmptyInsight />
            ) : (
              <div className="space-y-5">
                {analytics.vehicleTypes.map(
                  ([type, count]) => (
                    <RankingRow
                      key={type}
                      label={type}
                      value={count}
                      total={analytics.total}
                    />
                  )
                )}
              </div>
            )}
          </InsightCard>
        </div>

        {/* MARKETS + AVERAGES */}
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <InsightCard
            eyebrow="Geographic Activity"
            title="Top Markets"
            description="Provinces currently generating the most vehicle opportunities."
          >
            {loading ? (
              <LoadingRows />
            ) : analytics.topProvinces.length ===
              0 ? (
              <EmptyInsight />
            ) : (
              <div className="space-y-5">
                {analytics.topProvinces.map(
                  ([province, count]) => (
                    <RankingRow
                      key={province}
                      label={province}
                      value={count}
                      total={analytics.total}
                    />
                  )
                )}
              </div>
            )}
          </InsightCard>

          <section className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 md:p-8">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">
              Vehicle Metrics
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Marketplace Averages
            </h2>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <MetricBox
                label="Average Mileage"
                value={
                  loading
                    ? "—"
                    : formatMileage(
                        analytics.averageMileage
                      )
                }
              />

              <MetricBox
                label="Average Asking Price"
                value={
                  loading
                    ? "—"
                    : formatCurrency(
                        analytics.averagePrice
                      )
                }
              />

              <MetricBox
                label="Saved Vehicles"
                value={
                  loading
                    ? "—"
                    : analytics.savedCount
                }
              />

              <MetricBox
                label="Priced Listings"
                value={
                  loading
                    ? "—"
                    : analytics.pricedCount
                }
              />
            </div>
          </section>
        </div>

        {/* ACTIONS */}
        <section className="mt-8 rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-blue-600">
                Dealer Marketplace
              </span>

              <h2 className="mt-2 text-2xl font-black">
                Turn Data Into Inventory
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Review vehicle opportunities, save
                promising inventory, and evaluate seller
                submissions for potential acquisition.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/dealer/leads"
                className="rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-black text-white transition hover:bg-blue-700"
              >
                Browse Vehicle Leads →
              </Link>

              <Link
                href="/dealer/saved"
                className="rounded-xl border border-slate-300 px-6 py-3.5 text-sm font-black text-slate-700 transition hover:bg-slate-50"
              >
                Saved Vehicles
              </Link>
            </div>
          </div>
        </section>
      </section>

      {/* DISCLOSURE */}
      <footer className="border-t border-slate-200 bg-white px-6 py-8">
        <div className="mx-auto max-w-4xl text-center text-xs leading-6 text-slate-500">
          Analytics are calculated from vehicle opportunity
          and saved vehicle data currently available to
          the NorthSky Auto dealer portal. Marketplace
          counts, pricing, mileage, availability, and
          other metrics may change as seller submissions
          are received or updated.
        </div>
      </footer>
    </main>
  );
}

/* --------------------------------
   COMPONENTS
-------------------------------- */

function MetricCard({
  icon,
  label,
  value,
  description,
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">
            {label}
          </p>

          <p className="mt-3 text-3xl font-black text-slate-950">
            {value}
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {description}
          </p>
        </div>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
          {icon}
        </div>
      </div>
    </div>
  );
}

function ProgressRow({
  label,
  value,
  total,
  loading,
}) {
  const percentage =
    total > 0
      ? Math.min(
          100,
          Math.round((value / total) * 100)
        )
      : 0;

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-bold text-slate-700">
          {label}
        </span>

        <span className="text-sm font-black text-slate-900">
          {loading
            ? "—"
            : `${value} (${percentage}%)`}
        </span>
      </div>

      <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}

function InsightCard({
  eyebrow,
  title,
  description,
  children,
}) {
  return (
    <section className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 md:p-8">
      <span className="text-xs font-black uppercase tracking-widest text-blue-600">
        {eyebrow}
      </span>

      <h2 className="mt-2 text-2xl font-black">
        {title}
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>

      <div className="mt-7">
        {children}
      </div>
    </section>
  );
}

function RankingRow({
  label,
  value,
  total,
}) {
  const percentage =
    total > 0
      ? Math.round((value / total) * 100)
      : 0;

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <span className="truncate text-sm font-bold text-slate-700">
          {label}
        </span>

        <span className="shrink-0 text-sm font-black text-slate-950">
          {value}
        </span>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}

function MetricBox({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-100">
      <p className="text-xs font-black uppercase tracking-widest text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-xl font-black text-slate-900">
        {value}
      </p>
    </div>
  );
}

function LoadingRows({ count = 5 }) {
  return (
    <div className="space-y-5">
      {Array.from({ length: count }).map(
        (_, index) => (
          <div key={index}>
            <div className="flex justify-between">
              <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-8 animate-pulse rounded bg-slate-200" />
            </div>

            <div className="mt-3 h-2 animate-pulse rounded-full bg-slate-200" />
          </div>
        )
      )}
    </div>
  );
}

function EmptyInsight() {
  return (
    <div className="rounded-2xl bg-slate-50 p-6 text-center ring-1 ring-slate-100">
      <div className="text-3xl">📊</div>

      <p className="mt-3 text-sm font-bold text-slate-600">
        Not enough marketplace data yet.
      </p>

      <p className="mt-1 text-xs text-slate-400">
        Analytics will populate as vehicle submissions
        are received.
      </p>
    </div>
  );
}

/* --------------------------------
   DATA HELPERS
-------------------------------- */

function countValues(items, callback) {
  const counts = {};

  items.forEach((item) => {
    const rawValue = callback(item);

    const value =
      String(rawValue || "Other").trim() ||
      "Other";

    counts[value] =
      (counts[value] || 0) + 1;
  });

  return counts;
}

function getTopValues(counts, limit) {
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);
}

/* --------------------------------
   FORMATTERS
-------------------------------- */

function formatCurrency(value) {
  const number = Number(value);

  if (
    !Number.isFinite(number) ||
    number <= 0
  ) {
    return "Not available";
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
    !Number.isFinite(number) ||
    number < 0
  ) {
    return "Not available";
  }

  return `${Math.round(
    number
  ).toLocaleString("en-CA")} km`;
}

function extractProvince(location) {
  if (!location) return "";

  const value = String(location);

  const provinces = [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Nova Scotia",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Northwest Territories",
    "Nunavut",
    "Yukon",
  ];

  const match = provinces.find((province) =>
    value
      .toLowerCase()
      .includes(province.toLowerCase())
  );

  return match || "";
}