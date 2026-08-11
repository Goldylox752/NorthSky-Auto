import "./globals.css";
import Navbar from "@/components/Navbar";

const siteUrl = "https://northsky-auto.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "NorthSky Auto | Canadian Vehicle Marketplace",
    template: "%s | NorthSky Auto",
  },

  description:
    "NorthSky Auto connects Canadian vehicle sellers with participating dealerships looking for cars, trucks, SUVs, vans, and commercial vehicles.",

  applicationName: "NorthSky Auto",

  keywords: [
    "NorthSky Auto",
    "sell vehicle Canada",
    "sell car to dealer",
    "Canadian vehicle marketplace",
    "sell car Canada",
    "vehicle acquisition",
    "dealer inventory",
    "car dealers Canada",
  ],

  authors: [
    {
      name: "NorthSky Auto",
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
    title: "NorthSky Auto | Canadian Vehicle Marketplace",
    description:
      "Connect Canadian vehicle sellers with participating dealerships looking for potential vehicle inventory across Canada.",
    locale: "en_CA",
  },

  twitter: {
    card: "summary_large_image",
    title: "NorthSky Auto | Canadian Vehicle Marketplace",
    description:
      "Connect Canadian vehicle sellers with participating dealerships looking for potential vehicle inventory.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-CA">
      <body className="min-h-screen bg-gray-50 text-slate-900 antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}