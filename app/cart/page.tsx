import React from 'react'

import ParentCart from '@/components/cart/ParentCart'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Cart - Misbahul's Shop",
  description: "Cart for Misbahul's Shop",
};


const page = async() => {
  const session=await auth()
  const user=session?await prisma.user.findUnique({
    where:{
      email:session?.user?.email || ''
    }
  }):null

  const cart=await prisma.cart.findFirst({
    where:{
      userId:user?.id || ''
    }
  })

  const cartOnProducts=await prisma.cartOnProduct.findMany({
    where: {
      cartId: cart?.id || '',
    },
    include: {
      product: true
    }
  }) as unknown as CartOnProduct[]


  return (
    <section className='w-full relative min-h-[calc(100vh-4rem)]'>
      <ParentCart cartOnProducts={cartOnProducts} userId={user?.id || ''} />
    </section>
  )
}

export default page
