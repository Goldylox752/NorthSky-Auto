import Link from "next/link";

export const metadata = {
  title: "Sign In | NorthSky Auto",
  description:
    "Sign in to your NorthSky Auto dealer account to manage leads, vehicles, analytics and your subscription.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-50 px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50 sm:p-10">
        {/* Logo */}
        <Link
          href="/"
          className="mb-8 block text-center text-2xl font-extrabold tracking-tight text-slate-900"
        >
          NorthSky <span className="text-blue-600">Auto</span>{" "}
          <span className="text-base">🇨🇦</span>
        </Link>

        {/* Badge */}
        <div className="mb-3 text-center text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
          NorthSky Auto
        </div>

        {/* Title */}
        <h1 className="text-center text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Welcome back
        </h1>

        <p className="mx-auto mt-3 max-w-sm text-center text-sm leading-relaxed text-slate-600 sm:text-base">
          Sign in to your NorthSky Auto dealer account to manage leads,
          vehicles, analytics and your subscription.
        </p>

        {/* Actions */}
        <div className="mt-8 space-y-3">
          <Link
            href="/dealer/login"
            className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-center font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-500"
          >
            Dealer Login →
          </Link>

          <Link
            href="/dealer/register"
            className="flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-center font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            Create Dealer Account
          </Link>
        </div>

        {/* Divider */}
        <div className="my-8 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Or
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Seller link */}
        <Link
          href="/sell"
          className="block text-center text-sm text-slate-600 transition hover:text-slate-900"
        >
          Selling a vehicle?
          <span className="mt-1 block font-semibold text-blue-600 hover:text-blue-500">
            Submit Your Vehicle →
          </span>
        </Link>

        {/* Back */}
        <Link
          href="/"
          className="mt-8 block text-center text-sm text-slate-500 transition hover:text-slate-800"
        >
          ← Back to NorthSky Auto
        </Link>
      </div>
    </div>
  );
}