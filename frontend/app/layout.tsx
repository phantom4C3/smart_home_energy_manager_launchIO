import type { Metadata } from "next";
import { Geist, Geist_Mono, Mona_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const monaSans = Mona_Sans({
  subsets: ["latin"],
  variable: "--font-mona-sans",
});

export const metadata: Metadata = {
  title: "Smart Home Energy Manager",
  applicationName: "AI-powered energy optimziation for smart homes",
  keywords: [
    "Smart Home",
    "Energy Management",
    "AI-Powered",
    "Home Automation",
    "Energy Efficiency",
    "Renewable Energy",
    "IoT",
    "MAchine Learning",
    "Energy Optimziation",
  ],
  description:
    "AI agent powered that optimizes energy consumption in smart homes by learning user behavior, predicting energy needs, and integrating with IoT devices and renewable energy sources. The agent minimizes energy costs, reduces environmental impact, and enhances user convenience with minimal human intervention",
  category: "Energy Management",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${monaSans.variable} antialiased scroll-smooth `}
      >
        <div className="flex flex-col min-h-screen font-inter text-white p-4">
          <Header />

          <main className="flex-grow container mx-auto py-32">{children}</main>

          <Footer />
        </div> 
      </body>
    </html>
  );
}
