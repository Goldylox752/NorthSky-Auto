"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function DealerActions({ id }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function updateStatus(status) {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/dealers/status", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          status,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          result?.error || "Unable to update dealer status."
        );
      }
      router.refresh();
    } catch (err) {
      console.error("Dealer status update error:", err);
      setError(
        err.message || "Unable to update dealer status."
      );
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <button
          type="button"
          disabled={loading}
          onClick={() => updateStatus("approved")}
          className="rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Updating..." : "Approve"}
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={() => updateStatus("rejected")}
          className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Updating..." : "Reject"}
        </button>
      </div>
      {error && (
        <p className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}