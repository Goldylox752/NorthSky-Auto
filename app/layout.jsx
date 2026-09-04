export const metadata = {
  title: "NorthSky Auto Test",
  description: "NorthSky Auto deployment test",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
