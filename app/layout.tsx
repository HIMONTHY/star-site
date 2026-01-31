import "./globals.css";

export const metadata = {
  title: "Star Bypass",
  description: "Private Discord-verified Star Bypass dashboard",

  openGraph: {
    title: "Star Bypass",
    description: "Private Discord-verified Star Bypass dashboard",
    siteName: "Star Bypass",
    images: [
      {
        url: "/og.png",   // same image on both sites
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
