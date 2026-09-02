import Link from "next/link";

export default function HomePage() {
return ( <main className="min-h-screen flex items-center justify-center bg-white px-6"> <div className="text-center"> <h1 className="text-4xl font-bold text-gray-900">
NorthSky Auto </h1>

```
    <p className="mt-4 text-gray-600">
      Buy. Sell. Connect.
    </p>

    <div className="mt-8 flex gap-4 justify-center">
      <Link
        href="/sell"
        className="rounded-lg bg-black px-6 py-3 text-white"
      >
        Sell Your Vehicle
      </Link>

      <Link
        href="/dealer"
        className="rounded-lg border border-gray-300 px-6 py-3 text-gray-900"
      >
        Dealer Portal
      </Link>
    </div>
  </div>
</main>
```

);
}
