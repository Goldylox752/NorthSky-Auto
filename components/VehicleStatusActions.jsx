"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function VehicleStatusActions({
  vehicleId,
  currentStatus,
}) {
  const router = useRouter();
  const [loadingStatus, setLoadingStatus] = useState(null);
  const [message, setMessage] = useState("");
  async function updateStatus(status) {
    if (status === "rejected") {
      const confirmed = window.confirm(
        "Are you sure you want to reject this vehicle lead?"
      );
      if (!confirmed) {
        return;
      }
    }
    setLoadingStatus(status);
    setMessage("");
    try {
      const response = await fetch(
        `/api/admin/vehicles/${vehicleId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Unable to update vehicle status."
        );
      }
      setMessage(
        `Lead successfully marked as ${status}.`
      );
      router.refresh();
    } catch (error) {
      console.error(
        "Vehicle status update error:",
        error
      );
      setMessage(
        error.message ||
          "Something went wrong while updating the lead."
      );
    } finally {
      setLoadingStatus(null);
    }
  }
  const isCurrent = (status) =>
    currentStatus?.toLowerCase() === status;
  return (
    <div className="space-y-3">
      {/* Approve */}
      <button
        type="button"
        onClick={() => updateStatus("approved")}
        disabled={
          loadingStatus !== null ||
          isCurrent("approved")
        }
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loadingStatus === "approved" ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Approving...
          </>
        ) : isCurrent("approved") ? (
          "✓ Lead Approved"
        ) : (
          "✓ Approve Lead"
        )}
      </button>
      {/* Review */}
      <button
        type="button"
        onClick={() => updateStatus("review")}
        disabled={
          loadingStatus !== null ||
          isCurrent("review")
        }
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-500 px-4 py-3 font-bold text-white transition hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loadingStatus === "review" ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Updating...
          </>
        ) : isCurrent("review") ? (
          "↻ Under Review"
        ) : (
          "Mark Under Review"
        )}
      </button>
      {/* Reject */}
      <button
        type="button"
        onClick={() => updateStatus("rejected")}
        disabled={
          loadingStatus !== null ||
          isCurrent("rejected")
        }
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loadingStatus === "rejected" ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Rejecting...
          </>
        ) : isCurrent("rejected") ? (
          "✕ Lead Rejected"
        ) : (
          "Reject Lead"
        )}
      </button>
      {/* Status message */}
      {message && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center text-sm font-medium text-slate-600">
          {message}
        </div>
      )}
    </div>
  );
}