import "./globals.css";

export const metadata = {
  title: "NorthSky Auto",
  description: "Canadian Vehicle Marketplace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-CA">
      <body>{children}</body>
    </html>
  );
}
