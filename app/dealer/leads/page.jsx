"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
const EMPTY_FILTERS = {
  province: "",
  make: "",
  model: "",
  year: "",
  type: "",
  maxMileage: "",
};
export default function DealerLeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  useEffect(() => {
    let cancelled = false;
    async function loadLeads() {
      try {
        setLoading(true);
        setError("");
        const response = await fetch("/api/leads", {
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
        if (!cancelled) {
          setLeads(
            Array.isArray(data?.leads)
              ? data.leads
              : []
          );
        }
      } catch (err) {
        console.error("Dealer leads error:", err);
        if (!cancelled) {
          setError(
            err?.message ||
              "Unable to load vehicle opportunities."
          );
          setLeads([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    loadLeads();
    return () => {
      cancelled = true;
    };
  }, []);
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
      const province = String(
        lead.province ||
          lead.province_code ||
          ""
      ).toLowerCase();
      const location = String(
        lead.location || ""
      ).toLowerCase();
      const make = String(
        lead.make || ""
      ).toLowerCase();
      const model = String(
        lead.model || ""
      ).toLowerCase();
      const year = String(
        lead.year || ""
      );
      const type = String(
        lead.vehicle_type ||
          lead.type ||
          ""
      ).toLowerCase();
      const mileage =
        lead.mileage !== null &&
        lead.mileage !== undefined &&
        lead.mileage !== ""
          ? Number(lead.mileage)
          : null;
      /*
       * Province filtering:
       *
       * Your current API does not have a dedicated
       * province field, so also check location.
       */
      if (filters.province) {
        const provinceSearch =
          filters.province.toLowerCase();
        const provinceMatches =
          province.includes(provinceSearch) ||
          location.includes(provinceSearch);
        if (!provinceMatches) {
          return false;
        }
      }
      if (
        filters.make &&
        !make.includes(
          filters.make.toLowerCase()
        )
      ) {
        return false;
      }
      if (
        filters.model &&
        !model.includes(
          filters.model.toLowerCase()
        )
      ) {
        return false;
      }
      if (
        filters.year &&
        year !== filters.year
      ) {
        return false;
      }
      if (filters.type) {
        if (
          !type ||
          type !== filters.type.toLowerCase()
        ) {
          return false;
        }
      }
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
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      {/* HERO */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full bg-blue-500/20 px-5 py-2 text-sm font-black tracking-wide text-blue-300 ring-1 ring-blue-400/20">
              NORTHSKY AUTO DEALER MARKETPLACE
            </span>
            <h1 className="mt-7 text-4xl font-black tracking-tight md:text-6xl">
              Find Your Next
              <span className="block text-blue-400">
                Vehicle Acquisition
              </span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
              Browse seller-submitted vehicles and discover
              acquisition opportunities for your dealership
              across Canada.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-slate-300">
              <span>✓ Seller submissions</span>
              <span>✓ Canadian marketplace</span>
              <span>✓ Dealer opportunities</span>
            </div>
          </div>
        </div>
      </section>
      {/* FILTERS */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-blue-600">
                Marketplace Search
              </span>
              <h2 className="mt-2 text-2xl font-black">
                Search Vehicle Opportunities
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Filter available vehicle submissions by make,
                model, year, vehicle type, location, and mileage.
              </p>
            </div>
            <button
              type="button"
              onClick={clearFilters}
              className="self-start text-sm font-black text-blue-600 transition hover:text-blue-800 md:self-auto"
            >
              Clear Filters
            </button>
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FilterInput
              label="Province / Location"
              name="province"
              value={filters.province}
              onChange={handleFilterChange}
              placeholder="Alberta"
            />
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
                htmlFor="type"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Vehicle Type
              </label>
              <select
                id="type"
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">
                  All Types
                </option>
                <option value="Car">
                  Car
                </option>
                <option value="Truck">
                  Truck
                </option>
                <option value="SUV">
                  SUV
                </option>
                <option value="Van">
                  Van
                </option>
                <option value="Commercial">
                  Commercial
                </option>
              </select>
            </div>
            <FilterInput
              label="Maximum Mileage (km)"
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
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">
              Available Opportunities
            </span>
            <h2 className="mt-2 text-3xl font-black">
              Vehicle Leads
            </h2>
          </div>
          <div className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-600 ring-1 ring-slate-200">
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
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-semibold text-red-700">
            <p>{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-3 font-black underline"
            >
              Try Again
            </button>
          </div>
        )}
        {/* LOADING */}
        {loading && (
          <div className="mt-8 grid gap-7 lg:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200"
              >
                <div className="h-48 bg-slate-200" />
                <div className="p-7">
                  <div className="h-4 w-20 rounded bg-slate-200" />
                  <div className="mt-5 h-7 w-2/3 rounded bg-slate-200" />
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="h-16 rounded-xl bg-slate-200" />
                    <div className="h-16 rounded-xl bg-slate-200" />
                    <div className="h-16 rounded-xl bg-slate-200" />
                    <div className="h-16 rounded-xl bg-slate-200" />
                  </div>
                  <div className="mt-7 h-12 rounded-xl bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        )}
        {/* NO RESULTS */}
        {!loading &&
          !error &&
          filteredLeads.length === 0 && (
            <div className="mt-8 rounded-3xl bg-white p-12 text-center shadow-sm ring-1 ring-slate-200">
              <div className="text-5xl">
                🚘
              </div>
              <h3 className="mt-5 text-2xl font-black">
                No vehicle opportunities found
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
                There are currently no vehicle submissions
                matching your search. Clear your filters or
                check back as new seller submissions become
                available.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-black text-white transition hover:bg-blue-700"
              >
                Clear Filters
              </button>
            </div>
          )}
        {/* LEADS */}
        {!loading &&
          !error &&
          filteredLeads.length > 0 && (
            <div className="mt-8 grid gap-7 lg:grid-cols-2">
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
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-slate-950 p-10 text-center text-white shadow-xl md:p-14">
          <span className="inline-flex rounded-full bg-blue-500/20 px-4 py-2 text-xs font-black uppercase tracking-widest text-blue-300">
            NorthSky Auto
          </span>
          <h2 className="mt-6 text-4xl font-black md:text-5xl">
            Build Your Acquisition Pipeline
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Manage your dealership membership, review vehicle
            opportunities, and build your inventory pipeline with
            NorthSky Auto.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/buyers"
              className="rounded-xl bg-blue-600 px-8 py-4 font-black text-white transition hover:bg-blue-500"
            >
              Manage Dealer Membership
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-white/20 px-8 py-4 font-black text-white transition hover:bg-white/10"
            >
              Contact NorthSky Auto
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
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
    lead.location ||
    lead.postal_code ||
    [lead.city, lead.province]
      .filter(Boolean)
      .join(", ") ||
    "Canada";
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
  const type =
    lead.vehicle_type ||
    lead.type ||
    "Vehicle";
  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl">
      {/* IMAGE PLACEHOLDER */}
      <div className="flex h-48 items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300">
        <div className="text-center">
          <div className="text-5xl">
            🚘
          </div>
          <p className="mt-2 text-xs font-bold uppercase tracking-widest text-slate-500">
            Vehicle Opportunity
          </p>
        </div>
      </div>
      <div className="p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
              {type}
            </span>
            <h3 className="mt-4 break-words text-2xl font-black">
              {vehicleName || "Vehicle Opportunity"}
            </h3>
          </div>
          {lead.id && (
            <span className="shrink-0 text-xs font-bold text-slate-400">
              #{lead.id}
            </span>
          )}
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Info
            label="Location"
            value={location}
          />
          <Info
            label="Mileage"
            value={mileage}
          />
          <Info
            label="Condition"
            value={condition}
          />
          <Info
            label="Asking Price"
            value={askingPrice}
          />
        </div>
        {lead.description && (
          <p className="mt-5 line-clamp-2 text-sm leading-6 text-slate-500">
            {lead.description}
          </p>
        )}
        <div className="mt-7">
          <Link
            href={`/dealer/leads/${encodeURIComponent(
              lead.id
            )}`}
            className="block w-full rounded-xl bg-blue-600 px-5 py-3.5 text-center text-sm font-black text-white transition hover:bg-blue-700"
          >
            View Lead Details →
          </Link>
        </div>
      </div>
    </article>
  );
}
function Info({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 break-words text-sm font-bold text-slate-700">
        {value || "Not provided"}
      </p>
    </div>
  );
}
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