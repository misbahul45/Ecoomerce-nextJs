import CheckoutNav from '@/components/checkout/CheckoutNav'
import FormAddress from '@/components/checkout/FormAddress'
import FormPayment from '@/components/checkout/FormPayment'
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

  const pathName=order[1]
 
  return (
    <section className='pb-6'>
      <CheckoutNav pathName={pathName} />
      <h1 className='text-3xl font-bold capitalize text-center mt-5'>{pathName} Checkout</h1>
      <p className='text-center text-slate-400 mt-3'>Please enter the address that you want to ship to</p>
      {pathName==='address' && (
        <FormAddress id={order[0]} />
      )}
      {pathName==='payment'&&(
        <FormPayment id={order[0]} />
      )}
    </section>
  )
}

export default Checkout
