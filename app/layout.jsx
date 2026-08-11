import "./globals.css";

export const metadata = {
  title: "NorthSky Auto",
  description:
    "Canada's vehicle marketplace connecting sellers with dealerships.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}