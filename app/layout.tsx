import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import { auth } from "@/lib/auth";
import Provider from "@/components/layout/Provider";
import SearchList from "@/components/layout/SearchList";
import UserMenu from "@/components/layout/UserMenu";
import prisma  from "@/lib/prisma";
import { SessionProvider } from "next-auth/react";
import Sidebar from "@/components/layout/Sidebar";

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

  const carts=await prisma.cart.findFirst({
    where:{
      userId:user?.id
    },
    include:{
      products:true
    }
  })

  return (
    <html lang="en">
      <body className={roboto.className}>
        <Provider>
          <SessionProvider session={session} basePath="/api/auth">
            <Header carts={carts?.products} categories={categories} data={{ user: session?.user || undefined }} />
            <main className="w-full max-w-[95%] overflow-hidden mx-auto min-h-[calc(100vh-4rem)] relative bg-garay-100">
              <Sidebar user={user as User || undefined} categories={categoriesData} />
              {children}
              <SearchList categories={categoriesData} />
              <UserMenu role={(user?.role as 'admin' | 'user') ||'user'} user={user as User || undefined} />
            </main>
            <Toaster />
            <Footer />
          </SessionProvider>
        </Provider>
      </body>
    </html>
  );
}
