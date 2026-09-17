import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://north-sky-auto-green.vercel.app";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "NorthSky Auto | Canadian Vehicle Marketplace",
    template: "%s | NorthSky Auto",
  },
  description:
    "NorthSky Auto connects vehicle sellers with Canadian dealers looking for inventory.",
  applicationName: "NorthSky Auto",
  keywords: [
    "sell my car Canada",
    "dealer vehicle sourcing",
    "Canadian vehicle marketplace",
    "NorthSky Auto",
  ],
  authors: [{ name: "NorthSky Auto" }],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: SITE_URL,
    siteName: "NorthSky Auto",
    title: "NorthSky Auto | Canadian Vehicle Marketplace",
    description:
      "Sell a vehicle or source inventory through a Canadian dealer marketplace.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NorthSky Auto | Canadian Vehicle Marketplace",
    description:
      "Connect vehicle sellers with Canadian dealers looking for inventory.",
  },
};

export const viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-CA">
      <body className="flex min-h-screen flex-col bg-white text-slate-900 antialiased">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}