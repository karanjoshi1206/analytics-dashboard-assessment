import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "EV Fleet Management",
  description: "An application to manage the electric vehicle fleet"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}>
        <header className=" w-full bg-background/80 backdrop-blur-md border-b border-border/40 z-50">
          <div className=" w-full flex justify-between items-center px-8 py-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image src={"https://www.mapup.ai/mapup-logo.png"} height={20} width={100} alt="MapUp" />
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors">
                Dashboard
              </Link>
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
