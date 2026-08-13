import "./globals.css";
import Navbar from "@/components/Navbar";

const siteUrl = "https://northsky-auto.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "NorthSky Auto | Canadian Vehicle Acquisition Marketplace",
    template: "%s | NorthSky Auto",
  },

  description:
    "NorthSky Auto connects Canadian vehicle sellers with participating dealerships looking for cars, trucks, SUVs, vans, and commercial vehicle acquisition opportunities.",

  applicationName: "NorthSky Auto",

  category: "automotive",

  keywords: [
    "NorthSky Auto",
    "Canadian vehicle marketplace",
    "sell vehicle Canada",
    "sell car to dealer Canada",
    "sell truck Canada",
    "vehicle acquisition Canada",
    "dealer inventory Canada",
    "vehicle leads Canada",
    "car dealers Canada",
    "dealer vehicle sourcing",
  ],

  authors: [
    {
      name: "NorthSky Auto",
      url: siteUrl,
    },
  ],

  creator: "NorthSky Auto",
  publisher: "NorthSky Auto",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "NorthSky Auto",
    title: "NorthSky Auto | Canadian Vehicle Acquisition Marketplace",
    description:
      "Connect Canadian vehicle sellers with participating dealerships looking for potential vehicle inventory and acquisition opportunities.",
    locale: "en_CA",
  },

  twitter: {
    card: "summary_large_image",
    title: "NorthSky Auto | Canadian Vehicle Marketplace",
    description:
      "Connect Canadian vehicle sellers with participating dealerships looking for potential vehicle inventory.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#020617",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-CA">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <Navbar />

        <main>{children}</main>
      </body>
    </html>
  );
}