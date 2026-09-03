import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
  title: "Amiro Cafe and Restaurant - Digital Menu",
  description: "Discover our delicious menu featuring authentic Ethiopian cuisine and international favorites. Fresh ingredients, traditional recipes, modern presentation.",
  keywords: ["restaurant", "cafe", "menu", "Ethiopian food", "Addis Ababa", "dining"],
  openGraph: {
    title: "Amiro Cafe and Restaurant",
    description: "Authentic Ethiopian cuisine and international favorites",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
