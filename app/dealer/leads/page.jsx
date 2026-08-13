"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

const EMPTY_FILTERS = {
  search: "",
  make: "",
  model: "",
  year: "",
  condition: "",
  maxMileage: "",
};

export default function DealerLeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState(EMPTY_FILTERS);

  const loadLeads = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await fetch("/api/leads?limit=100", {
        method: "GET",
        cache: "no-store",
        headers: {
          Accept: "application/json",
        },
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Unable to load vehicle opportunities."
        );
      }

      setLeads(
        Array.isArray(data?.leads)
          ? data.leads
          : []
      );
    } catch (error) {
      console.error("Dealer leads error:", error);

      setError(
        error?.message ||
          "Unable to load vehicle opportunities."
      );

      if (!isRefresh) {
        setLeads([]);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  function handleFilterChange(event) {
    const { name, value } = event.target;

    setFilters((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function clearFilters() {
    setFilters({ ...EMPTY_FILTERS });
  }

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const search = filters.search
        .trim()
        .toLowerCase();

      const make = String(
        lead.make || ""
      ).toLowerCase();

      const model = String(
        lead.model || ""
      ).toLowerCase();

      const trim = String(
        lead.trim || ""
      ).toLowerCase();

      const postalCode = String(
        lead.postal_code || ""
      ).toLowerCase();

      const description = String(
        lead.description || ""
      ).toLowerCase();

      const year = String(
        lead.year || ""
      );

      const condition = String(
        lead.condition || ""
      ).toLowerCase();

      const mileage =
        lead.mileage !== null &&
        lead.mileage !== undefined &&
        lead.mileage !== ""
          ? Number(lead.mileage)
          : null;

      /*
       * GENERAL SEARCH
       */
      if (search) {
        const searchableText = [
          make,
          model,
          trim,
          year,
          postalCode,
          description,
        ]
          .join(" ")
          .toLowerCase();

        if (!searchableText.includes(search)) {
          return false;
        }
      }

      /*
       * MAKE
       */
      if (
        filters.make &&
        !make.includes(
          filters.make.trim().toLowerCase()
        )
      ) {
        return false;
      }

      /*
       * MODEL
       */
      if (
        filters.model &&
        !model.includes(
          filters.model.trim().toLowerCase()
        )
      ) {
        return false;
      }

      /*
       * YEAR
       */
      if (
        filters.year &&
        year !== filters.year
      ) {
        return false;
      }

      /*
       * CONDITION
       */
      if (
        filters.condition &&
        condition !==
          filters.condition.toLowerCase()
      ) {
        return false;
      }

      /*
       * MAXIMUM MILEAGE
       */
      if (filters.maxMileage) {
        const maxMileage = Number(
          filters.maxMileage
        );

        if (
          Number.isFinite(maxMileage) &&
          mileage !== null &&
          mileage > maxMileage
        ) {
          return false;
        }
      }

      return true;
    });
  }, [leads, filters]);

  const hasFilters = Object.values(
    filters
  ).some((value) => value !== "");

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* HERO */}
      <section className="overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full bg-blue-500/15 px-4 py-2 text-xs font-black uppercase tracking-widest text-blue-300 ring-1 ring-blue-400/20">
                Dealer Marketplace
              </span>

              <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
                Vehicle
                <span className="block text-blue-400">
                  Opportunities
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Browse seller-submitted vehicles and
                discover potential inventory acquisition
                opportunities for your dealership.
              </p>

              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-slate-300">
                <span>✓ Canadian submissions</span>
                <span>✓ Vehicle details</span>
                <span>✓ Dealer sourcing</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => loadLeads(true)}
              disabled={loading || refreshing}
              className="inline-flex shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-black text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {refreshing
                ? "Refreshing..."
                : "↻ Refresh Opportunities"}
            </button>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-10">
        <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-blue-600">
                Marketplace Search
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Find Vehicles
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Search and filter available vehicle
                submissions by make, model, year,
                condition, and mileage.
              </p>
            </div>

            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-left text-sm font-black text-blue-600 transition hover:text-blue-800 sm:text-right"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* SEARCH BAR */}
          <div className="mt-6">
            <label
              htmlFor="search"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              Search Marketplace
            </label>

            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                🔎
              </span>

              <input
                id="search"
                name="search"
                type="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search make, model, trim, year, postal code..."
                maxLength={100}
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* FILTERS */}
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <FilterInput
              label="Make"
              name="make"
              value={filters.make}
              onChange={handleFilterChange}
              placeholder="Ford"
            />

            <FilterInput
              label="Model"
              name="model"
              value={filters.model}
              onChange={handleFilterChange}
              placeholder="F-150"
            />

            <FilterInput
              label="Year"
              name="year"
              value={filters.year}
              onChange={handleFilterChange}
              placeholder="2022"
              type="number"
              min="1900"
              max={new Date().getFullYear() + 1}
            />

            <div>
              <label
                htmlFor="condition"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Condition
              </label>

              <select
                id="condition"
                name="condition"
                value={filters.condition}
                onChange={handleFilterChange}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">
                  All Conditions
                </option>
                <option value="Excellent">
                  Excellent
                </option>
                <option value="Good">
                  Good
                </option>
                <option value="Fair">
                  Fair
                </option>
                <option value="Poor">
                  Poor
                </option>
              </select>
            </div>

            <FilterInput
              label="Maximum Mileage"
              name="maxMileage"
              value={filters.maxMileage}
              onChange={handleFilterChange}
              placeholder="100000"
              type="number"
              min="0"
            />
          </div>
        </div>
      </section>

      {/* MARKETPLACE */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 md:pb-20">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-blue-600">
              Available Inventory
            </p>

            <h2 className="mt-2 text-3xl font-black text-slate-950">
              Vehicle Leads
            </h2>
          </div>

          <div className="inline-flex self-start rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-600 ring-1 ring-slate-200 sm:self-auto">
            {loading
              ? "Loading..."
              : `${filteredLeads.length} ${
                  filteredLeads.length === 1
                    ? "Opportunity"
                    : "Opportunities"
                }`}
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mt-7 rounded-2xl border border-red-200 bg-red-50 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-black text-red-900">
                  Unable to load opportunities
                </h3>

                <p className="mt-1 text-sm leading-6 text-red-700">
                  {error}
                </p>
              </div>

              <button
                type="button"
                onClick={() => loadLeads()}
                className="rounded-xl bg-red-600 px-5 py-3 text-sm font-black text-white transition hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="mt-7 grid gap-6 lg:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <LeadSkeleton key={item} />
            ))}
          </div>
        )}

        {/* EMPTY */}
        {!loading &&
          !error &&
          filteredLeads.length === 0 && (
            <div className="mt-7 rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200 sm:p-14">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-4xl">
                🚘
              </div>

              <h3 className="mt-6 text-2xl font-black text-slate-950">
                {hasFilters
                  ? "No matching vehicles"
                  : "No vehicle opportunities yet"}
              </h3>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
                {hasFilters
                  ? "Try adjusting your filters or clearing your search to see more vehicle opportunities."
                  : "New seller submissions will appear here as vehicle opportunities become available."}
              </p>

              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-black text-white transition hover:bg-blue-700"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}

        {/* LEADS */}
        {!loading &&
          !error &&
          filteredLeads.length > 0 && (
            <div className="mt-7 grid gap-6 lg:grid-cols-2">
              {filteredLeads.map((lead) => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                />
              ))}
            </div>
          )}
      </section>

      {/* CTA */}
      <section className="border-t border-slate-200 bg-white px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-slate-950 p-8 text-center text-white shadow-xl sm:p-12 md:p-14">
          <span className="inline-flex rounded-full bg-blue-500/15 px-4 py-2 text-xs font-black uppercase tracking-widest text-blue-300">
            NorthSky Auto Dealer Portal
          </span>

          <h2 className="mt-5 text-3xl font-black sm:text-4xl md:text-5xl">
            Build Your Acquisition Pipeline
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Review vehicle opportunities, manage your
            dealership account, and build a more organized
            sourcing pipeline.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/dealer/dashboard"
              className="rounded-xl bg-blue-600 px-7 py-3.5 font-black text-white transition hover:bg-blue-500"
            >
              Dealer Dashboard →
            </Link>

            <Link
              href="/dealer/subscriptions"
              className="rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 font-black text-white transition hover:bg-white/10"
            >
              Manage Membership
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/*
|--------------------------------------------------------------------------
| LEAD CARD
|--------------------------------------------------------------------------
*/

function LeadCard({ lead }) {
  const vehicleName = [
    lead.year,
    lead.make,
    lead.model,
    lead.trim,
  ]
    .filter(Boolean)
    .join(" ");

  const location =
    lead.postal_code || "Canada";

  const mileage =
    lead.mileage !== null &&
    lead.mileage !== undefined &&
    lead.mileage !== ""
      ? `${Number(
          lead.mileage
        ).toLocaleString("en-CA")} km`
      : "Not provided";

  const askingPrice =
    lead.asking_price !== null &&
    lead.asking_price !== undefined &&
    lead.asking_price !== ""
      ? new Intl.NumberFormat("en-CA", {
          style: "currency",
          currency: "CAD",
          maximumFractionDigits: 0,
        }).format(Number(lead.asking_price))
      : "Not provided";

  const condition =
    lead.condition || "Not provided";

  const timeline =
    lead.selling_timeline ||
    "Not provided";

  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl">
      {/* VEHICLE HEADER */}
      <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.5),transparent_60%)]" />

        <div className="relative text-center">
          <div className="text-5xl">
            🚘
          </div>

          <p className="mt-2 text-xs font-black uppercase tracking-widest text-slate-600">
            Vehicle Opportunity
          </p>
        </div>

        {lead.status && (
          <span className="absolute right-4 top-4 rounded-full bg-green-600 px-3 py-1.5 text-xs font-black text-white shadow-sm">
            Available
          </span>
        )}
      </div>

      <div className="p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-widest text-blue-600">
              Seller Submission
            </p>

            <h3 className="mt-2 break-words text-2xl font-black leading-tight text-slate-950">
              {vehicleName ||
                "Vehicle Opportunity"}
            </h3>
          </div>

          {lead.id && (
            <span className="shrink-0 rounded-lg bg-slate-100 px-2 py-1 text-xs font-bold text-slate-400">
              #{lead.id}
            </span>
          )}
        </div>

        {/* KEY DETAILS */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Info
            icon="📍"
            label="Location"
            value={location}
          />

          <Info
            icon="🛣️"
            label="Mileage"
            value={mileage}
          />

          <Info
            icon="🔧"
            label="Condition"
            value={condition}
          />

          <Info
            icon="💰"
            label="Asking Price"
            value={askingPrice}
            highlight
          />
        </div>

        {/* TIMELINE */}
        <div className="mt-3">
          <Info
            icon="⏱️"
            label="Selling Timeline"
            value={timeline}
          />
        </div>

        {/* DESCRIPTION */}
        {lead.description && (
          <div className="mt-5 rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">
              Description
            </p>

            <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
              {lead.description}
            </p>
          </div>
        )}

        {/* ACTION */}
        <Link
          href={`/dealer/leads/${encodeURIComponent(
            lead.id
          )}`}
          className="mt-6 flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-black text-white transition hover:bg-blue-700"
        >
          View Opportunity Details →
        </Link>

        <p className="mt-3 text-center text-xs text-slate-400">
          Seller contact information is protected.
        </p>
      </div>
    </article>
  );
}

/*
|--------------------------------------------------------------------------
| INFO
|--------------------------------------------------------------------------
*/

function Info({
  icon,
  label,
  value,
  highlight = false,
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-3.5 ring-1 ring-slate-100">
      <div className="flex items-center gap-2">
        <span className="text-sm">
          {icon}
        </span>

        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
          {label}
        </p>
      </div>

      <p
        className={`mt-1 break-words text-sm font-black ${
          highlight
            ? "text-blue-700"
            : "text-slate-700"
        }`}
      >
        {value || "Not provided"}
      </p>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| FILTER INPUT
|--------------------------------------------------------------------------
*/

function FilterInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  min,
  max,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-bold text-slate-700"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        inputMode={
          type === "number"
            ? "numeric"
            : undefined
        }
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| LOADING SKELETON
|--------------------------------------------------------------------------
*/

function LeadSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
      <div className="h-44 bg-slate-200" />

      <div className="p-6 sm:p-7">
        <div className="h-3 w-32 rounded bg-slate-200" />

        <div className="mt-3 h-7 w-2/3 rounded bg-slate-200" />

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="h-16 rounded-xl bg-slate-200" />
          <div className="h-16 rounded-xl bg-slate-200" />
          <div className="h-16 rounded-xl bg-slate-200" />
          <div className="h-16 rounded-xl bg-slate-200" />
        </div>

        <div className="mt-3 h-16 rounded-xl bg-slate-200" />

        <div className="mt-6 h-12 rounded-xl bg-slate-200" />
      </div>
    </div>
  );
}