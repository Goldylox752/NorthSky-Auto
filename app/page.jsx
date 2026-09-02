import Link from "next/link";

export const metadata = {
title: "NorthSky Auto",
description:
"NorthSky Auto connects vehicle sellers with automotive dealers across Canada.",
};

export default function HomePage() {
return ( <main className="min-h-screen bg-white text-gray-900"> <header className="border-b"> <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5"> <Link href="/" className="text-xl font-bold">
NorthSky Auto </Link>

```
      <nav className="flex items-center gap-4 text-sm">
        <Link href="/sell" className="hover:underline">
          Sell Your Vehicle
        </Link>

        <Link href="/dealer/login" className="hover:underline">
          Dealer Login
        </Link>
      </nav>
    </div>
  </header>

  <section className="mx-auto max-w-4xl px-6 py-24 text-center">
    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
      Your Vehicle.
      <br />
      The Right Buyer.
    </h1>

    <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
      NorthSky Auto connects vehicle sellers with automotive dealers
      looking for quality vehicles across Canada.
    </p>

    <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
      <Link
        href="/sell"
        className="rounded-lg bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
      >
        Sell Your Vehicle
      </Link>

      <Link
        href="/dealer"
        className="rounded-lg border border-gray-300 px-6 py-3 font-semibold hover:bg-gray-50"
      >
        Dealer Portal
      </Link>
    </div>
  </section>

  <section className="border-t bg-gray-50">
    <div className="mx-auto grid max-w-5xl gap-8 px-6 py-16 text-center md:grid-cols-3">
      <div>
        <h2 className="font-semibold">Sell</h2>
        <p className="mt-2 text-sm text-gray-600">
          Submit your vehicle and connect with interested buyers.
        </p>
      </div>

      <div>
        <h2 className="font-semibold">Connect</h2>
        <p className="mt-2 text-sm text-gray-600">
          Get your vehicle in front of automotive dealers.
        </p>
      </div>

      <div>
        <h2 className="font-semibold">Move Forward</h2>
        <p className="mt-2 text-sm text-gray-600">
          Manage your vehicle opportunity through NorthSky Auto.
        </p>
      </div>
    </div>
  </section>

  <footer className="border-t px-6 py-8 text-center text-sm text-gray-500">
    © {new Date().getFullYear()} NorthSky Auto. All rights reserved.
  </footer>
</main>
```

);
}
