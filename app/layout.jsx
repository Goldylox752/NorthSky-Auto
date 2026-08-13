import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://northsky-auto.vercel.app";

const SITE_NAME = "NorthSky Auto";

const DESCRIPTION =
  "NorthSky Auto is a Canadian vehicle marketplace connecting vehicle sellers with dealerships looking for inventory and acquisition opportunities.";

const LOGO_URL = `${SITE_URL}/icon.png`;

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default:
      "NorthSky Auto | Canadian Vehicle Marketplace",
    template: "%s | NorthSky Auto",
  },

  description: DESCRIPTION,

  applicationName: SITE_NAME,

  keywords: [
    "Canadian vehicle marketplace",
    "sell vehicle to dealers",
    "sell my car",
    "vehicle acquisition",
    "dealer vehicle leads",
    "dealer inventory",
    "used vehicle marketplace Canada",
    "car dealers Canada",
    "vehicle sourcing",
    "automotive marketplace",
  ],

  authors: [
    {
      name: SITE_NAME,
      url: SITE_URL,
    },
  ],

  creator: SITE_NAME,
  publisher: SITE_NAME,

  category: "automotive",

  alternates: {
    canonical: SITE_URL,
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
    locale: "en_CA",
    url: SITE_URL,
    siteName: SITE_NAME,
    title:
      "NorthSky Auto | Canadian Vehicle Marketplace",
    description: DESCRIPTION,

    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt:
          "NorthSky Auto Canadian Vehicle Marketplace",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "NorthSky Auto | Canadian Vehicle Marketplace",
    description: DESCRIPTION,

    images: [
      `${SITE_URL}/og-image.png`,
    ],
  },

  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },

  manifest: "/manifest.webmanifest",
};

function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",

    "@id": `${SITE_URL}/#organization`,

    name: SITE_NAME,

    url: SITE_URL,

    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
    },

    description: DESCRIPTION,

    areaServed: {
      "@type": "Country",
      name: "Canada",
    },

    knowsAbout: [
      "Vehicle marketplace",
      "Vehicle acquisition",
      "Automotive inventory",
      "Dealer sourcing",
      "Used vehicles",
    ],
  };

  const automotiveBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",

    "@id": `${SITE_URL}/#automotive-business`,

    name: SITE_NAME,

    url: SITE_URL,

    description: DESCRIPTION,

    image: LOGO_URL,

    logo: LOGO_URL,

    areaServed: {
      "@type": "Country",
      name: "Canada",
    },

    knowsAbout: [
      "Vehicle acquisition",
      "Dealer inventory sourcing",
      "Vehicle marketplace",
      "Automotive inventory",
    ],

    sameAs: [],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            organizationSchema
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            automotiveBusinessSchema
          ),
        }}
      />
    </>
  );
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en-CA">
      <head>
        <JsonLd />
      </head>

      <body>{children}</body>
    </html>
  );
}