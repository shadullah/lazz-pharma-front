import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { Sidebard } from "@/components/Sidebard";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lazz Pharma",
  description: "A pharmacautical site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div>
          <Toaster />
        </div>
        <div className="flex justify-between">
          <div className="w-1/5 fixed h-full bg-gray-800">
            <Sidebard />
          </div>

          {/* Scrollable Content Area */}
          <div className="ml-[20%] w-[80%] overflow-y-auto h-full">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
