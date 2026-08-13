import "./globals.css";

export const metadata = {
  title: "NorthSky Auto",
  description: "Build test",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
