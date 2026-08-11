import "./globals.css";
import Navbar from "@/components/Navbar";
export const metadata = {
  title: {
    default: "NorthSky Auto | Canadian Vehicle Marketplace",
    template: "%s | NorthSky Auto",
  },
  description:
    "NorthSky Auto connects Canadian vehicle sellers with dealerships looking for cars, trucks, SUVs, vans, and commercial vehicles.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-slate-900 antialiased">
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}