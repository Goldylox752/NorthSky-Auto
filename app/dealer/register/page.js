"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
const PLANS = {
  starter: {
    name: "Dealer Starter",
    price: "$599/month",
  },
  professional: {
    name: "Dealer Professional",
    price: "$799/month",
  },
};
export default function DealerRegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const requestedPlan = (
    searchParams.get("plan") || "starter"
  )
    .trim()
    .toLowerCase();
  const selectedPlan =
    PLANS[requestedPlan] ? requestedPlan : "starter";
  const planInfo = PLANS[selectedPlan];
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }
  async function createDealerProfile(user) {
    const { error: dealerError } = await supabase
      .from("dealers")
      .upsert(
        {
          id: user.id,
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim() || null,
        },
        {
          onConflict: "id",
        }
      );
    if (dealerError) {
      console.error(
        "Dealer profile creation error:",
        dealerError
      );
      throw new Error(
        "Your account was created, but your dealer profile could not be completed. Please contact NorthSky Auto."
      );
    }
  }
  async function startCheckout() {
    const response = await fetch(
      "/api/payments/checkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan: selectedPlan,
        }),
      }
    );
    let data = null;
    try {
      data = await response.json();
    } catch {
      throw new Error(
        "The checkout service returned an invalid response."
      );
    }
    if (!response.ok) {
      throw new Error(
        data?.error ||
          "Unable to start secure checkout."
      );
    }
    if (
      !data?.url ||
      typeof data.url !== "string"
    ) {
      throw new Error(
        "Stripe checkout URL was not returned."
      );
    }
    window.location.assign(data.url);
  }
  async function handleRegister(event) {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");
    setSuccess(false);
    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const phone = form.phone.trim();
    if (!name || !email || !form.password) {
      setError(
        "Please complete all required fields."
      );
      setLoading(false);
      return;
    }
    if (form.password.length < 8) {
      setError(
        "Your password must be at least 8 characters."
      );
      setLoading(false);
      return;
    }
    if (
      form.password !== form.confirmPassword
    ) {
      setError(
        "Your passwords do not match."
      );
      setLoading(false);
      return;
    }
    try {
      /*
       * Check whether the browser already has
       * an authenticated Supabase user.
       */
      const {
        data: { user: existingUser },
        error: existingUserError,
      } = await supabase.auth.getUser();
      if (
        existingUser &&
        !existingUserError
      ) {
        await createDealerProfile(existingUser);
        router.replace(
          `/dealer/dashboard?plan=${selectedPlan}`
        );
        return;
      }
      /*
       * Create Supabase authentication account.
       */
      const {
        data,
        error: signUpError,
      } = await supabase.auth.signUp({
        email,
        password: form.password,
        options: {
          data: {
            name,
            phone,
            account_type: "dealer",
            dealer_plan: selectedPlan,
          },
          emailRedirectTo:
            `${window.location.origin}/dealer/login`,
        },
      });
      if (signUpError) {
        const message =
          signUpError.message
            ?.toLowerCase() || "";
        if (
          message.includes(
            "already registered"
          ) ||
          message.includes(
            "already exists"
          )
        ) {
          setError(
            "An account with this email already exists. Please sign in instead."
          );
        } else {
          setError(
            signUpError.message ||
              "Unable to create your dealer account."
          );
        }
        setLoading(false);
        return;
      }
      if (!data?.user) {
        throw new Error(
          "Supabase did not return a user account."
        );
      }
      /*
       * When email confirmation is disabled,
       * Supabase returns an active session.
       */
      if (data.session) {
        await createDealerProfile(
          data.user
        );
        /*
         * Start the selected Stripe subscription.
         */
        await startCheckout();
        return;
      }
      /*
       * When email confirmation is enabled,
       * the account exists but there is no active
       * session yet.
       */
      setSuccess(true);
      setLoading(false);
    } catch (registrationError) {
      console.error(
        "Dealer registration error:",
        registrationError
      );
      setError(
        registrationError?.message ||
          "Unable to complete dealer registration. Please try again."
      );
      setLoading(false);
    }
  }
  return (
    <main className="min-h-screen bg-slate-950">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* BRAND PANEL */}
        <section className="relative hidden overflow-hidden bg-slate-950 text-white lg:flex lg:flex-col lg:justify-between lg:p-12 xl:p-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.35),transparent_40%)]" />
          <div className="relative">
            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-sm font-black shadow-lg shadow-blue-600/20">
                NS
              </div>
              <div>
                <div className="text-xl font-black tracking-tight">
                  NorthSky Auto
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200">
                  Dealer Portal
                </div>
              </div>
            </Link>
            <div className="mt-28 max-w-lg">
              <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-blue-100 ring-1 ring-white/10">
                Dealer Registration
              </span>
              <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight">
                Grow your inventory with NorthSky Auto.
              </h1>
              <p className="mt-6 text-lg leading-8 text-blue-100">
                Create your dealer account and gain access
                to vehicle acquisition opportunities through
                the NorthSky Auto marketplace.
              </p>
            </div>
          </div>
          <div className="relative grid gap-4">
            <Feature
              icon="🚘"
              title="Vehicle Opportunities"
              text="Discover vehicles that may fit your dealership."
            />
            <Feature
              icon="📊"
              title="Dealer Dashboard"
              text="Manage opportunities, leads, and account activity from one place."
            />
            <Feature
              icon="🔐"
              title="Secure Account"
              text="Authentication is protected by Supabase and payments are handled by Stripe."
            />
          </div>
        </section>
        {/* REGISTRATION */}
        <section className="flex items-center justify-center bg-slate-50 px-5 py-10 text-slate-900 sm:px-8">
          <div className="w-full max-w-md">
            {/* MOBILE LOGO */}
            <div className="mb-8 flex justify-center lg:hidden">
              <Link
                href="/"
                className="flex items-center gap-3"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-sm font-black text-white shadow-lg shadow-blue-600/20">
                  NS
                </div>
                <div>
                  <div className="font-black tracking-tight text-slate-950">
                    NorthSky Auto
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Dealer Portal
                  </div>
                </div>
              </Link>
            </div>
            <div className="rounded-3xl bg-white p-7 shadow-xl shadow-slate-900/5 ring-1 ring-slate-200 sm:p-9">
              {/* HEADER */}
              <div className="mb-7">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-blue-600">
                      Create Account
                    </p>
                    <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                      Become a NorthSky dealer
                    </h2>
                  </div>
                  <div className="shrink-0 rounded-xl bg-blue-50 px-3 py-2 text-right ring-1 ring-blue-100">
                    <div className="text-[10px] font-black uppercase tracking-wider text-blue-600">
                      Selected Plan
                    </div>
                    <div className="mt-1 text-xs font-black text-slate-900">
                      {planInfo.name}
                    </div>
                    <div className="mt-0.5 text-[10px] font-bold text-slate-500">
                      {planInfo.price}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-500">
                  Create your dealer account to continue
                  to secure subscription checkout.
                </p>
              </div>
              {/* ERROR */}
              {error && (
                <div
                  className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700"
                  role="alert"
                >
                  <div className="font-black">
                    Registration failed
                  </div>
                  <div className="mt-1">
                    {error}
                  </div>
                </div>
              )}
              {/* SUCCESS */}
              {success ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
                    ✉️
                  </div>
                  <h3 className="mt-5 text-xl font-black text-emerald-950">
                    Check your email
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-emerald-800">
                    Your dealer account has been created.
                    Check your email for the confirmation
                    link, then sign in to continue.
                  </p>
                  <div className="mt-4 rounded-xl bg-white/70 p-3 text-xs font-semibold text-emerald-800">
                    Selected plan:{" "}
                    <strong>
                      {planInfo.name}
                    </strong>{" "}
                    — {planInfo.price}
                  </div>
                  <Link
                    href={`/dealer/login?plan=${selectedPlan}`}
                    className="mt-6 block rounded-xl bg-emerald-600 px-5 py-3.5 text-center text-sm font-black text-white transition hover:bg-emerald-700"
                  >
                    Go to Dealer Login
                  </Link>
                </div>
              ) : (
                <form
                  onSubmit={handleRegister}
                  className="space-y-5"
                >
                  {/* DEALERSHIP NAME */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-black text-slate-800"
                    >
                      Dealership name
                    </label>
                    <input
                      id="name"
                      type="text"
                      autoComplete="organization"
                      placeholder="Your Dealership"
                      value={form.name}
                      onChange={(event) =>
                        updateField(
                          "name",
                          event.target.value
                        )
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      required
                    />
                  </div>
                  {/* EMAIL */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-black text-slate-800"
                    >
                      Business email
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="dealer@example.com"
                      value={form.email}
                      onChange={(event) =>
                        updateField(
                          "email",
                          event.target.value
                        )
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      required
                    />
                  </div>
                  {/* PHONE */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-black text-slate-800"
                    >
                      Phone number
                      <span className="ml-2 font-semibold text-slate-400">
                        Optional
                      </span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="780-555-0123"
                      value={form.phone}
                      onChange={(event) =>
                        updateField(
                          "phone",
                          event.target.value
                        )
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>
                  {/* PASSWORD */}
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-black text-slate-800"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        autoComplete="new-password"
                        placeholder="At least 8 characters"
                        value={form.password}
                        onChange={(event) =>
                          updateField(
                            "password",
                            event.target.value
                          )
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-20 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        required
                        minLength={8}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(
                            (current) =>
                              !current
                          )
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-black text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                      >
                        {showPassword
                          ? "Hide"
                          : "Show"}
                      </button>
                    </div>
                  </div>
                  {/* CONFIRM PASSWORD */}
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="mb-2 block text-sm font-black text-slate-800"
                    >
                      Confirm password
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        type={
                          showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        autoComplete="new-password"
                        placeholder="Enter your password again"
                        value={form.confirmPassword}
                        onChange={(event) =>
                          updateField(
                            "confirmPassword",
                            event.target.value
                          )
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-20 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(
                            (current) =>
                              !current
                          )
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-black text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                      >
                        {showConfirmPassword
                          ? "Hide"
                          : "Show"}
                      </button>
                    </div>
                  </div>
                  {/* TERMS */}
                  <div className="rounded-xl bg-slate-50 p-4 text-xs leading-5 text-slate-500 ring-1 ring-slate-100">
                    By creating a dealer account, you
                    agree to use NorthSky Auto for
                    legitimate vehicle acquisition and
                    dealership purposes.
                  </div>
                  {/* SUBMIT */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading
                      ? "Creating Account..."
                      : `Continue with ${planInfo.name} →`}
                  </button>
                </form>
              )}
              {/* LOGIN */}
              {!success && (
                <>
                  <div className="my-7 flex items-center gap-3">
                    <div className="h-px flex-1 bg-slate-200" />
                    <span className="text-xs font-bold text-slate-400">
                      ALREADY A DEALER?
                    </span>
                    <div className="h-px flex-1 bg-slate-200" />
                  </div>
                  <Link
                    href={`/dealer/login?plan=${selectedPlan}`}
                    className="block rounded-xl border border-slate-200 px-5 py-3.5 text-center text-sm font-black text-slate-700 transition hover:bg-slate-50"
                  >
                    Sign In to Dealer Portal
                  </Link>
                </>
              )}
            </div>
            <p className="mt-6 text-center text-xs font-semibold text-slate-400">
              © {new Date().getFullYear()} NorthSky Auto
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
function Feature({ icon, title, text }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-xl">
        {icon}
      </div>
      <div>
        <h3 className="font-black">
          {title}
        </h3>
        <p className="mt-1 text-sm leading-6 text-blue-100">
          {text}
        </p>
      </div>
    </div>
  );
}