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

export const metadata: Metadata = {
  title: "Backpack Exchange | Trade at the Speed of Light",
  description: "Trade cryptocurrency with sub-millisecond execution speeds, deep liquidity, and institutional-grade security on Backpack. Connect your wallet and start trading spot today.",
  keywords: ["Backpack", "Backpack Exchange", "Crypto Trading", "Spot Trading", "Solana", "Blockchain", "Fast Exchange"],
  openGraph: {
    title: "Backpack Exchange | Trade at the Speed of Light",
    description: "Trade cryptocurrency with sub-millisecond execution speeds, deep liquidity, and institutional-grade security on Backpack.",
    url: "https://backpack.exchange",
    siteName: "Backpack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Backpack Exchange | Trade at the Speed of Light",
    description: "Trade cryptocurrency with sub-millisecond execution speeds, deep liquidity, and institutional-grade security on Backpack.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}


    >
      <body
        className="min-h-full flex flex-col"
        suppressHydrationWarning={true}
      >{children}</body>
    </html>
  );
}
