import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react"
import { auth } from "@/lib/auth";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Misbahul's Shop",
  description: "Created by Misbahul",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session=await auth()
  return (
    <html lang="en">
      <body className={roboto.className}>
        <SessionProvider session={session}>
          <Header />
          <main className="w-full max-w-[90%] mx-auto min-h-[calc(100vh-4rem)]">
            {children}
          </main>
          <Toaster />
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
