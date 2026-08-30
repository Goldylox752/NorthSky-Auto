import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Vehicle Opportunity | NorthSky Auto",
  description:
    "Review a vehicle acquisition opportunity through the NorthSky Auto dealer marketplace.",
};
function formatCurrency(value) {
  if (value === null || value === undefined || value === "") {
    return "Price not provided";
  }
  const number = Number(value);
  if (Number.isNaN(number)) {
    return String(value);
  }
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(number);
}
function formatNumber(value) {
  if (value === null || value === undefined || value === "") {
    return "Not provided";
  }
  const number = Number(value);
  if (Number.isNaN(number)) {
    return String(value);
  }
  return new Intl.NumberFormat("en-CA").format(number);
}
function formatMileage(vehicle) {
  const value =
    vehicle.mileage ??
    vehicle.odometer ??
    vehicle.kilometers ??
    null;
  if (value === null || value === "") {
    return "Not provided";
  }
  return `${formatNumber(value)} km`;
}
function formatDate(value) {
  if (!value) {
    return "Not provided";
  }
  try {
    return new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(value));
  } catch {
    return "Not provided";
  }
}
function vehicleTitle(vehicle) {
  const title = [
    vehicle.year,
    vehicle.make,
    vehicle.model,
  ]
    .filter(Boolean)
    .join(" ");
  return title || "Vehicle Opportunity";
}
function getImages(vehicle) {
  const images = [];
  if (Array.isArray(vehicle.photos)) {
    images.push(...vehicle.photos);
  }
  if (Array.isArray(vehicle.images)) {
    images.push(...vehicle.images);
  }
  const singleImages = [
    vehicle.image_url,
    vehicle.image,
    vehicle.photo_url,
    vehicle.thumbnail_url,
  ];
  images.push(...singleImages.filter(Boolean));
  return [...new Set(
    images
      .map((image) => {
        if (typeof image === "string") {
          return image;
        }
        if (image?.url) {
          return image.url;
        }
        return null;
      })
      .filter(Boolean)
  )];
}
function DetailRow({ label, value }) {
  return (
    <div className="border-b border-slate-100 py-4 last:border-0">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className="text-sm font-bold text-slate-500">
          {label}
        </p>
        <p className="text-sm font-black text-slate-900 sm:text-right">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
}
async function getDealer(supabase, user) {
  if (!user?.id) {
    return null;
  }
  const { data, error } = await supabase
    .from("dealers")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();
  if (error) {
    console.error("Dealer lookup failed:", error);
    return null;
  }
  return data;
}
async function getVehicle(supabase, id) {
  if (!id) {
    return null;
  }
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", id)
    .eq("status", "available")
    .maybeSingle();
  if (error) {
    console.error("Vehicle lookup failed:", error);
    return null;
  }
  return data;
}
export default async function DealerVehicleDetailPage({ params }) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    redirect("/dealer/login");
  }
  const dealer = await getDealer(supabase, user);
  if (!dealer) {
    redirect("/dealer/register");
  }
  const { id } = await params;
  const vehicle = await getVehicle(
    supabase,
    id
  );
  if (!vehicle) {
    notFound();
  }
  const title = vehicleTitle(vehicle);
  const images = getImages(vehicle);
  const dealershipName =
    dealer.dealership_name ||
    dealer.company_name ||
    "Dealer Account";
  const description =
    vehicle.description ||
    vehicle.notes ||
    "No additional vehicle description was provided.";
  const location =
    [
      vehicle.city,
      vehicle.province,
      vehicle.postal_code,
    ]
      .filter(Boolean)
      .join(", ") ||
    vehicle.location ||
    "Canada";
  const sellerName =
    vehicle.seller_name ||
    vehicle.contact_name ||
    "Vehicle Seller";
  const sellerPhone =
    vehicle.seller_phone ||
    vehicle.phone ||
    "";
  const sellerEmail =
    vehicle.seller_email ||
    vehicle.email ||
    "";
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <Link
            href="/dealer/dashboard"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-black text-white">
              N
            </div>
            <div>
              <div className="font-black text-slate-950">
                NorthSky Auto
              </div>
              <div className="text-xs font-semibold text-slate-500">
                Dealer Portal
              </div>
            </div>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/dealer/dashboard"
              className="text-sm font-semibold text-slate-600 hover:text-slate-950"
            >
              Dashboard
            </Link>
            <Link
              href="/dealer/vehicles"
              className="text-sm font-black text-blue-600"
            >
              Vehicles
            </Link>
            <Link
              href="/dealer/profile"
              className="text-sm font-semibold text-slate-600 hover:text-slate-950"
            >
              Profile
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-semibold text-slate-600 hover:text-slate-950"
            >
              Plans
            </Link>
          </nav>
          <Link
            href="/dealer/vehicles"
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
          >
            ← Vehicles
          </Link>
        </div>
      </header>
      {/* MAIN */}
      <section className="px-6 py-10 md:py-14">
        <div className="mx-auto max-w-7xl">
          {/* BREADCRUMB */}
          <div className="mb-6 text-sm font-semibold text-slate-500">
            <Link
              href="/dealer/dashboard"
              className="hover:text-blue-600"
            >
              Dashboard
            </Link>
            <span className="mx-2">/</span>
            <Link
              href="/dealer/vehicles"
              className="hover:text-blue-600"
            >
              Vehicles
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900">
              {title}
            </span>
          </div>
          {/* VEHICLE HEADER */}
          <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
            <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-8 text-white md:p-10">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="mb-4">
                    <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-black text-green-300 ring-1 ring-green-400/30">
                      Available Opportunity
                    </span>
                  </div>
                  <h1 className="text-3xl font-black tracking-tight md:text-5xl">
                    {title}
                  </h1>
                  {vehicle.trim && (
                    <p className="mt-3 text-lg font-semibold text-blue-200">
                      {vehicle.trim}
                    </p>
                  )}
                  <p className="mt-4 text-sm font-semibold text-slate-300">
                    Opportunity ID: {vehicle.id}
                  </p>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-sm font-bold uppercase tracking-wider text-slate-400">
                    Asking Price
                  </p>
                  <p className="mt-1 text-3xl font-black text-white md:text-4xl">
                    {formatCurrency(
                      vehicle.asking_price ||
                        vehicle.price ||
                        vehicle.list_price
                    )}
                  </p>
                </div>
              </div>
            </div>
            {/* CONTENT */}
            <div className="grid gap-0 lg:grid-cols-3">
              {/* PHOTOS */}
              <div className="border-b border-slate-200 bg-slate-50 p-6 lg:col-span-2 lg:border-b-0 lg:border-r">
                <div className="aspect-video overflow-hidden rounded-2xl bg-slate-200">
                  {images[0] ? (
                    <img
                      src={images[0]}
                      alt={title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <div className="text-center">
                        <div className="text-7xl">🚗</div>
                        <p className="mt-4 text-sm font-bold text-slate-400">
                          No vehicle photos available
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                {images.length > 1 && (
                  <div className="mt-4 grid grid-cols-4 gap-3">
                    {images.slice(0, 8).map(
                      (image, index) => (
                        <div
                          key={`${image}-${index}`}
                          className="aspect-square overflow-hidden rounded-xl bg-slate-200"
                        >
                          <img
                            src={image}
                            alt={`${title} photo ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
              {/* ACTION PANEL */}
              <div className="p-6 md:p-8">
                <p className="text-sm font-black uppercase tracking-widest text-blue-600">
                  Dealer Actions
                </p>
                <h2 className="mt-2 text-2xl font-black text-slate-950">
                  Interested in this vehicle?
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Save the opportunity for later or express
                  interest with NorthSky Auto.
                </p>
                <div className="mt-7 space-y-3">
                  <form
                    action="/api/dealer/saved"
                    method="POST"
                  >
                    <input
                      type="hidden"
                      name="vehicle_id"
                      value={vehicle.id}
                    />
                    <input
                      type="hidden"
                      name="dealer_id"
                      value={dealer.id}
                    />
                    <button
                      type="submit"
                      className="w-full rounded-xl border border-blue-200 bg-blue-50 px-5 py-4 text-sm font-black text-blue-700 transition hover:bg-blue-100"
                    >
                      ⭐ Save Vehicle
                    </button>
                  </form>
                  <form
                    action="/api/leads"
                    method="POST"
                  >
                    <input
                      type="hidden"
                      name="vehicle_id"
                      value={vehicle.id}
                    />
                    <input
                      type="hidden"
                      name="dealer_id"
                      value={dealer.id}
                    />
                    <button
                      type="submit"
                      className="w-full rounded-xl bg-blue-600 px-5 py-4 text-sm font-black text-white transition hover:bg-blue-700"
                    >
                      Express Interest →
                    </button>
                  </form>
                </div>
                <div className="mt-7 rounded-2xl bg-slate-50 p-5">
                  <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                    Dealer
                  </p>
                  <p className="mt-2 text-sm font-black text-slate-900">
                    {dealershipName}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Your interest will be associated with your
                    dealer account.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* DETAILS */}
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <section className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 lg:col-span-2">
              <p className="text-sm font-black uppercase tracking-widest text-blue-600">
                Vehicle Details
              </p>
              <h2 className="mt-2 text-2xl font-black">
                Specifications
              </h2>
              <div className="mt-6">
                <DetailRow
                  label="Year"
                  value={vehicle.year}
                />
                <DetailRow
                  label="Make"
                  value={vehicle.make}
                />
                <DetailRow
                  label="Model"
                  value={vehicle.model}
                />
                <DetailRow
                  label="Trim"
                  value={vehicle.trim}
                />
                <DetailRow
                  label="Condition"
                  value={vehicle.condition}
                />
                <DetailRow
                  label="Mileage"
                  value={formatMileage(vehicle)}
                />
                <DetailRow
                  label="Asking Price"
                  value={formatCurrency(
                    vehicle.asking_price ||
                      vehicle.price ||
                      vehicle.list_price
                  )}
                />
                <DetailRow
                  label="Location"
                  value={location}
                />
                <DetailRow
                  label="Submitted"
                  value={formatDate(
                    vehicle.created_at
                  )}
                />
              </div>
            </section>
            {/* SELLER */}
            <section className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm font-black uppercase tracking-widest text-blue-600">
                Seller
              </p>
              <h2 className="mt-2 text-2xl font-black">
                Seller Information
              </h2>
              <div className="mt-7 space-y-5">
                <DetailRow
                  label="Name"
                  value={sellerName}
                />
                {sellerPhone && (
                  <DetailRow
                    label="Phone"
                    value={sellerPhone}
                  />
                )}
                {sellerEmail && (
                  <DetailRow
                    label="Email"
                    value={sellerEmail}
                  />
                )}
                <DetailRow
                  label="Location"
                  value={location}
                />
              </div>
              <div className="mt-7 rounded-2xl border border-blue-100 bg-blue-50 p-5">
                <p className="text-sm font-black text-slate-900">
                  Protect seller privacy
                </p>
                <p className="mt-2 text-xs leading-5 text-slate-600">
                  Seller contact information should only be
                  displayed when permitted by your marketplace
                  workflow and applicable privacy requirements.
                </p>
              </div>
            </section>
          </div>
          {/* DESCRIPTION */}
          <section className="mt-8 rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-black uppercase tracking-widest text-blue-600">
              Vehicle Description
            </p>
            <h2 className="mt-2 text-2xl font-black">
              About This Vehicle
            </h2>
            <p className="mt-5 max-w-4xl whitespace-pre-line text-sm leading-7 text-slate-600">
              {description}
            </p>
          </section>
          {/* DISCLAIMER */}
          <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <h3 className="font-black text-slate-950">
              NorthSky Auto Dealer Marketplace
            </h3>
            <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600">
              Vehicle submissions are opportunities submitted
              through the NorthSky Auto marketplace. NorthSky
              Auto does not guarantee vehicle condition, seller
              representations, availability, an offer, purchase,
              financing approval, or completion of a transaction.
              Dealers should perform their own due diligence
              before proceeding with any vehicle opportunity.
            </p>
            <div className="mt-5 flex flex-wrap gap-5 text-sm font-bold">
              <Link
                href="/terms"
                className="text-blue-600 hover:underline"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-blue-600 hover:underline"
              >
                Privacy
              </Link>
              <Link
                href="/contact"
                className="text-blue-600 hover:underline"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}