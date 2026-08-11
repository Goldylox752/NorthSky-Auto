"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function DealerLeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    province: "",
    make: "",
    model: "",
    year: "",
    type: "",
    maxMileage: "",
  });

  useEffect(() => {
    async function loadLeads() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/leads", {
          method: "GET",
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.error || "Unable to load vehicle opportunities."
          );
        }

        setLeads(Array.isArray(data?.leads) ? data.leads : []);
      } catch (err) {
        console.error("Dealer leads error:", err);
        setError(
          err?.message ||
            "Unable to load vehicle opportunities."
        );
        setLeads([]);
      } finally {
        setLoading(false);
      }
    }

    loadLeads();
  }, []);

  function handleFilterChange(event) {
    const { name, value } = event.target;

    setFilters((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function clearFilters() {
    setFilters({
      province: "",
      make: "",
      model: "",
      year: "",
      type: "",
      maxMileage: "",
    });
  }

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const province = String(
        lead.province ||
          lead.province_code ||
          lead.location ||
          ""
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

      const mileage = Number(
        lead.mileage || 0
      );

      if (
        filters.province &&
        !province.includes(
          filters.province.toLowerCase()
        )
      ) {
        return false;
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

      if (
        filters.type &&
        type !== filters.type.toLowerCase()
      ) {
        return false;
      }

      if (
        filters.maxMileage &&
        mileage > Number(filters.maxMileage)
      ) {
        return false;
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
              Browse vehicle submissions from sellers across Canada
              and discover potential acquisition opportunities for
              your dealership.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-300">
              <span>✓ Seller-submitted vehicles</span>
              <span>✓ Canadian marketplace</span>
              <span>✓ Dealer-only opportunities</span>
            </div>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-blue-600">
                Marketplace Search
              </span>

              <h2 className="mt-2 text-2xl font-black">
                Search Vehicle Opportunities
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Filter available seller submissions by vehicle,
                location, year, and mileage.
              </p>
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-black text-blue-600 hover:text-blue-700"
            >
              Clear Filters
            </button>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FilterInput
              label="Province"
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
                <option value="">All Types</option>
                <option value="Car">Car</option>
                <option value="Truck">Truck</option>
                <option value="SUV">SUV</option>
                <option value="Van">Van</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            <FilterInput
              label="Maximum Mileage (km)"
              name="maxMileage"
              value={filters.maxMileage}
              onChange={handleFilterChange}
              placeholder="100000"
              type="number"
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
              : `${filteredLeads.length} Available`}
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200"
              >
                <div className="h-44 rounded-2xl bg-slate-200" />
                <div className="mt-6 h-7 w-2/3 rounded bg-slate-200" />
                <div className="mt-4 h-4 w-1/2 rounded bg-slate-200" />
                <div className="mt-3 h-4 w-3/4 rounded bg-slate-200" />
                <div className="mt-6 h-12 rounded-xl bg-slate-200" />
              </div>
            ))}
          </div>
        )}

        {/* NO RESULTS */}
        {!loading &&
          !error &&
          filteredLeads.length === 0 && (
            <div className="mt-8 rounded-3xl bg-white p-12 text-center shadow-sm ring-1 ring-slate-200">
              <div className="text-5xl">🚘</div>

              <h3 className="mt-5 text-2xl font-black">
                No vehicle opportunities found
              </h3>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
                There are currently no vehicle submissions matching
                your search. Try clearing your filters or check back
                as new seller submissions become available.
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

      {/* SELLER CTA */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-slate-950 p-10 text-center text-white shadow-xl md:p-14">
          <span className="inline-flex rounded-full bg-blue-500/20 px-4 py-2 text-xs font-black uppercase tracking-widest text-blue-300">
            Growing Marketplace
          </span>

          <h2 className="mt-6 text-4xl font-black md:text-5xl">
            More Vehicles Are Coming
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            NorthSky Auto connects dealerships with vehicle sellers
            looking for potential acquisition opportunities across
            Canada.
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
  const year = lead.year || "";
  const make = lead.make || "";
  const model = lead.model || "";

  const location =
    lead.location ||
    [lead.city, lead.province]
      .filter(Boolean)
      .join(", ") ||
    "Canada";

  const mileage =
    lead.mileage !== undefined &&
    lead.mileage !== null &&
    lead.mileage !== ""
      ? `${Number(lead.mileage).toLocaleString()} km`
      : "Not provided";

  const condition =
    lead.condition || "Not provided";

  const askingPrice =
    lead.asking_price !== undefined &&
    lead.asking_price !== null &&
    lead.asking_price !== ""
      ? `$${Number(
          lead.asking_price
        ).toLocaleString()} CAD`
      : "Not provided";

  const type =
    lead.vehicle_type ||
    lead.type ||
    "Vehicle";

  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex h-48 items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300">
        <div className="text-center">
          <div className="text-5xl">🚘</div>
          <p className="mt-2 text-xs font-bold uppercase tracking-widest text-slate-500">
            Vehicle Opportunity
          </p>
        </div>
      </div>

      <div className="p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
              {type}
            </span>

            <h3 className="mt-4 text-2xl font-black">
              {year} {make} {model}
            </h3>
          </div>

          {lead.id && (
            <span className="text-xs font-bold text-slate-400">
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

        <div className="mt-7 flex gap-3">
          <Link
            href={`/dealer/leads/${lead.id}`}
            className="flex-1 rounded-xl bg-blue-600 px-5 py-3.5 text-center text-sm font-black text-white transition hover:bg-blue-700"
          >
            View Details →
          </Link>

          <Link
            href={`/dealer/leads/${lead.id}`}
            className="rounded-xl border border-slate-300 px-5 py-3.5 text-sm font-black text-slate-700 transition hover:bg-slate-50"
          >
            Review
          </Link>
        </div>
      </div>
    </article>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-slate-700">
        {value}
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
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}