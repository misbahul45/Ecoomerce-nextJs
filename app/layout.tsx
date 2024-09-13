import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react"
import { auth } from "@/lib/auth";
import SearchProvider from "@/components/layout/SearchProvider";
import SearchList from "@/components/layout/SearchList";
import UserMenu from "@/components/layout/UserMenu";
import prisma  from "@/lib/prisma";

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
  const user=session?await prisma.user.findUnique({
    where:{
      email:session?.user?.email as string
    }
  }) : null

  const categoriesData=await prisma.category.findMany({})
  const categories=categoriesData?.map((category)=>category.category)
  return (
    <html lang="en">
      <body className={roboto.className}>
        <SearchProvider>
          <SessionProvider session={session}>
            <Header categories={categories} data={{ user: session?.user || undefined }} />
            <main className="w-full max-w-[95%] overflow-hidden mx-auto min-h-[calc(100vh-4rem)] relative">
              {children}
              <SearchList />
              <UserMenu role={(user?.role as 'admin' | 'user') ||'user'} user={session?.user as User || undefined} />
            </main>
            <Toaster />
            <Footer />
          </SessionProvider>
        </SearchProvider>
      </body>
    </html>
  );
}
