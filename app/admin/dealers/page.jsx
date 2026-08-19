import { createClient } from "../../../lib/supabase/server";
import DealerActions from "../../../components/DealerActions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Dealer Management | NorthSky Auto Admin",
  description:
    "Manage dealer applications, approvals, and subscriptions.",
};

export default async function AdminDealersPage() {
  const supabase = await createClient();

  const { data: dealers, error } = await supabase
    .from("dealers")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("Failed to load dealers:", error);

    return (
      <main className="min-h-screen bg-gray-100 p-6 md:p-10">
        <div className="mx-auto max-w-3xl rounded-2xl bg-red-50 p-6 text-red-700 shadow-sm">
          <h1 className="text-xl font-bold">
            Failed to load dealer applications
          </h1>

          <p className="mt-2">
            Please check your Supabase connection and database configuration.
          </p>
        </div>
      </main>
    );
  }

  const dealerList = dealers ?? [];

  const totalDealers = dealerList.length;

  const pendingDealers = dealerList.filter(
    (dealer) => dealer.status === "pending"
  ).length;

  const activeDealers = dealerList.filter(
    (dealer) => dealer.status === "approved"
  ).length;

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      <section className="bg-gradient-to-r from-slate-950 to-blue-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-300">
            NorthSky Auto Admin
          </p>

          <h1 className="mt-2 text-4xl font-extrabold">
            Dealer Management
          </h1>

          <p className="mt-3 max-w-2xl text-gray-300">
            Review applications and manage NorthSky Auto dealer partners.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Total Dealers
            </p>

            <h2 className="mt-3 text-4xl font-bold text-slate-900">
              {totalDealers}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Pending Approval
            </p>

            <h2 className="mt-3 text-4xl font-bold text-yellow-600">
              {pendingDealers}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Active Dealers
            </p>

            <h2 className="mt-3 text-4xl font-bold text-green-600">
              {activeDealers}
            </h2>
          </div>
        </div>
      </section>

      {/* Dealer Applications */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="border-b border-gray-100 p-6">
            <h2 className="text-2xl font-bold text-slate-900">
              Dealer Applications
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Review and manage dealer applications.
            </p>
          </div>

          {dealerList.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-500">
                No dealer applications yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4 text-sm font-semibold text-gray-600">
                      Company
                    </th>

                    <th className="p-4 text-sm font-semibold text-gray-600">
                      Contact
                    </th>

                    <th className="p-4 text-sm font-semibold text-gray-600">
                      Location
                    </th>

                    <th className="p-4 text-sm font-semibold text-gray-600">
                      Status
                    </th>

                    <th className="p-4 text-sm font-semibold text-gray-600">
                      Plan
                    </th>

                    <th className="p-4 text-sm font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {dealerList.map((dealer) => (
                    <tr
                      key={dealer.id}
                      className="border-t border-gray-100 hover:bg-gray-50"
                    >
                      <td className="p-4">
                        <div className="font-semibold text-slate-900">
                          {dealer.company || "Unknown Company"}
                        </div>

                        {dealer.website && (
                          <div className="mt-1 text-sm text-gray-500">
                            {dealer.website}
                          </div>
                        )}
                      </td>

                      <td className="p-4">
                        <div className="text-slate-900">
                          {dealer.contact || "—"}
                        </div>

                        {dealer.email && (
                          <div className="mt-1 text-sm text-gray-500">
                            {dealer.email}
                          </div>
                        )}

                        {dealer.phone && (
                          <div className="text-sm text-gray-500">
                            {dealer.phone}
                          </div>
                        )}
                      </td>

                      <td className="p-4">
                        <div className="text-slate-900">
                          {dealer.location || "—"}
                        </div>

                        {dealer.province && (
                          <div className="mt-1 text-sm text-gray-500">
                            {dealer.province}
                          </div>
                        )}
                      </td>

                      <td className="p-4">
                        <span
                          className={
                            dealer.status === "approved"
                              ? "inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700"
                              : dealer.status === "rejected"
                              ? "inline-flex rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700"
                              : "inline-flex rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700"
                          }
                        >
                          {dealer.status || "pending"}
                        </span>
                      </td>

                      <td className="p-4 text-gray-700">
                        {dealer.subscription || "None"}
                      </td>

                      <td className="p-4">
                        <DealerActions id={dealer.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
