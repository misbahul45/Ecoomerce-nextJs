import CheckoutNav from '@/components/checkout/checkoutNav'
import prisma from '@/lib/prisma'
import React from 'react'

interface Props {
  params:{
    order:string[]
  }
}

const Checkout = async({params:{ order }}:Props) => {
  const orderData=await prisma.order.findUnique({where:{
    id:order[0]
  },include:{products:{include:{product:true}}}})
  return (
    <section>
      <CheckoutNav />
      <h1 className='text-3xl font-bold text-center'>Checkout Products</h1>
    </section>
  )
}

export default Checkout
