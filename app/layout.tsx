import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VALLEYPEDIA — Premium Digital Access",
  description:
    "VALLEYPEDIA menyediakan akses jaringan premium, VPN, dan tools digital dengan performa tinggi dan keamanan terjamin.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={`${geistSans.variable} antialiased font-sans`}>
        <div className="min-h-screen pb-28">{children}</div>
        <BottomNav />
      </body>
    </html>
  );
}
