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
    "NorthSky Auto connects Canadian vehicle sellers with participating dealerships looking for cars, trucks, SUVs, vans, and commercial vehicle inventory.",
  applicationName: "NorthSky Auto",
  keywords: [
    "NorthSky Auto",
    "sell vehicle Canada",
    "sell car to dealer",
    "Canadian vehicle marketplace",
    "sell car Canada",
    "sell truck Canada",
    "dealer vehicle leads",
    "vehicle acquisition",
    "dealer inventory",
    "car dealers Canada",
    "truck dealers Canada",
    "SUV dealers Canada",
    "commercial vehicle dealers Canada",
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
      maxImagePreview: "large",
      maxSnippet: -1,
      maxVideoPreview: -1,
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
  category: "automotive",
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