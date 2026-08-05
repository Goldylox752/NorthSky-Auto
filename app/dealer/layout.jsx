import Link from "next/link";

export default function DealerLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100">

      <header className="bg-slate-900 p-6 text-white">
        <Link
          href="/dealer"
          className="text-2xl font-bold"
        >
          NorthSky Auto Dealer Portal
        </Link>
      </header>


      <div className="flex">

        <aside className="hidden w-64 bg-white p-6 shadow md:block">

          <nav className="space-y-3">

            <Link
              href="/dealer"
              className="block rounded-lg p-3 hover:bg-slate-100"
            >
              Dashboard
            </Link>


            <Link
              href="/dealer/leads"
              className="block rounded-lg p-3 hover:bg-slate-100"
            >
              Vehicle Leads
            </Link>


            <Link
              href="/dealer/saved"
              className="block rounded-lg p-3 hover:bg-slate-100"
            >
              Saved Leads
            </Link>


            <Link
              href="/dealer/subscriptions"
              className="block rounded-lg p-3 hover:bg-slate-100"
            >
              Subscription
            </Link>


            <Link
              href="/dealer/profile"
              className="block rounded-lg p-3 hover:bg-slate-100"
            >
              Profile
            </Link>

          </nav>

        </aside>


        <main className="flex-1 p-6">

          {children}

        </main>


      </div>

    </div>
  );
}