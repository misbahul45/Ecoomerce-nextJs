import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Misbahul's Shop",
  description: "Created by Misbahul",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Header />
        <main className="w-full max-w-[90%] mx-auto min-h-[calc(100vh-4rem)]">
          {children}
        </main>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
