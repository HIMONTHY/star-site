import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        url: "https://star-site-psi.vercel.app/og.png", // optional image
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};
