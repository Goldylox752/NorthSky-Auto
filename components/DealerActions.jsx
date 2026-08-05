"use client";

import { useRouter } from "next/navigation";


export default function DealerActions({ id }) {

  const router = useRouter();


  async function updateStatus(status) {

    await fetch("/api/dealers/status", {

      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        id,
        status,
      }),

    });


    router.refresh();

  }


  return (

    <div className="flex gap-2">

      <button
        onClick={() => updateStatus("approved")}
        className="rounded-lg bg-green-600 px-3 py-2 text-sm text-white"
      >
        Approve
      </button>


      <button
        onClick={() => updateStatus("rejected")}
        className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white"
      >
        Reject
      </button>

    </div>

  );

}