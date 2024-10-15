import AdminMiddleware from '@/components/dashboard/middleware'
import Sidebar from '@/components/dashboard/Sidebar'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import React from 'react'


const layout = async({ children }:{ children: React.ReactNode}) => {
  const session=await auth()
  const user=session?await prisma.user.findUnique({
    where:{
      email:session?.user?.email as string
    }
  }):null
  return (
    <section className='w-full'>
      <Sidebar />
      {children}
      <AdminMiddleware user={user as User | null} />
    </section>
  )
}

export default layout
