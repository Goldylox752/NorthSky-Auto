const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://northsky-auto.vercel.app";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/dealer/",
          "/dashboard/",
          "/login/",
          "/signup/",
          "/account/",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}