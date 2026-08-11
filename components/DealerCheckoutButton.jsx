"use client";
import { useState } from "react";
export default function DealerCheckoutButton({
  plan,
  label,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function handleCheckout() {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(
        "/api/payments/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            plan,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Unable to start checkout."
        );
      }
      if (!data?.url) {
        throw new Error(
          "Stripe checkout URL was not returned."
        );
      }
      window.location.href = data.url;
    } catch (error) {
      console.error(
        "Dealer checkout error:",
        error
      );
      setError(
        error?.message ||
          "Unable to start checkout."
      );
      setLoading(false);
    }
  }
  return (
    <div>
      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
        className="w-full rounded-xl bg-blue-600 px-6 py-4 font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading
          ? "Opening Secure Checkout..."
          : `${label} →`}
      </button>
      {error && (
        <p className="mt-3 text-center text-sm font-semibold text-red-600">
          {error}
        </p>
      )}
      <p className="mt-3 text-center text-xs text-slate-500">
        Secure checkout powered by Stripe
      </p>
    </div>
  );
}