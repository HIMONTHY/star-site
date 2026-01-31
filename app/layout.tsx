import "./globals.css";

export const metadata = {
  title: "Star Site",
  description: "Secure Discord-verified dashboard powered by Star",

  openGraph: {
    title: "Star Site",
    description: "Secure Discord-verified dashboard powered by Star",
    url: "https://star-site-psi.vercel.app",
    siteName: "Star Site",
    images: [
      {
        url: "https://discord.com/channels/@me/1117716359267225611/1467083237716131852",
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
