export const metadata = {
  title: "NorthSky Auto",
  description: "Canada's vehicle marketplace connecting sellers with dealerships.",
};
export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-5xl font-bold">
          NorthSky Auto
        </h1>
        <p className="mt-6 text-xl text-gray-300">
          Canada's vehicle marketplace connecting sellers with dealerships.
        </p>
        <p className="mt-10 text-green-400">
          Deployment test successful.
        </p>
      </div>
    </main>
  );
}