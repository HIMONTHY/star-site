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
        url: "https://media.discordapp.net/attachments/1117716359267225611/1467083237816930386/ChatGPT_Image_Jan_31_2026_03_59_20_AM.png?ex=697f173c&is=697dc5bc&hm=575ebf5cd704f3e5bb558cfbf76d8dd11a88eb98115bbe1655290d1fde01fa51&=&format=webp&quality=lossless&width=1310&height=873",
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
