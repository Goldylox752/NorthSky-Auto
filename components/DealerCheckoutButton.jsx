"use client";
import { useState } from "react";
export default function DealerCheckoutButton({
  plan,
  label = "Subscribe",
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function handleCheckout() {
    if (loading) return;
    if (!plan) {
      setError("Please select a dealer plan.");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const response = await fetch("/api/payments/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan,
        }),
      });
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
          data?.error || "Unable to start secure checkout."
        );
      }
      if (!data?.url) {
        throw new Error(
          "Stripe checkout URL was not returned."
        );
      }
      window.location.assign(data.url);
    } catch (checkoutError) {
      console.error("Dealer checkout error:", checkoutError);
      setError(
        checkoutError?.message ||
          "Unable to start checkout. Please try again."
      );
      setLoading(false);
    }
  }
  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
        aria-busy={loading}
        className="w-full rounded-xl bg-blue-600 px-6 py-4 font-black text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
              aria-hidden="true"
            />
            Opening Secure Checkout...
          </span>
        ) : (
          `${label} →`
        )}
      </button>
      {error && (
        <div
          role="alert"
          className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-center text-sm font-semibold text-red-600"
        >
          {error}
        </div>
      )}
      <p className="mt-3 text-center text-xs text-slate-500">
        Secure recurring checkout powered by Stripe.
      </p>
    </div>
  );
}