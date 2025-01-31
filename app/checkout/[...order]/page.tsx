import CheckoutNav from '@/components/checkout/CheckoutNav'
import FormAddress from '@/components/checkout/FormAddress'
import FormPayment from '@/components/checkout/FormPayment'
import Order from '@/components/checkout/Order'
import prisma from '@/lib/prisma'
import React from 'react'

interface Props {
  params:{
    order:string[]
  }
}

export async function generateMetadata({ params: { order } }: Props) {
  return {
    title: `${order[1]} - Misbahul's Shop`,
    description: `${order[1]} for Misbahul's Shop`,
  }
}

const Checkout = async({params:{ order }}:Props) => {
  const orderData = await prisma.order.findUnique({
    where: {
      id: order[0]
    },
    include: {
      products: {
        include: {
          product: true
        }
      }
    }
  }) as any;


  const pathName=order[1]
 
  return (
    <section className='py-6 relative'>
      <CheckoutNav pathName={pathName} />
      <h1 className='text-3xl font-bold capitalize text-center mt-5'>{pathName} Checkout</h1>
      {pathName==='address' && (
        <>
          <p className='text-center text-slate-400 mt-3'>Please enter the address that you want to ship to</p>
          <FormAddress id={order[0]} orderData={orderData} />
        </>
      )}
      {pathName==='payment'&&(
        <FormPayment id={order[0]} methode={orderData.methode as 'stripe' | 'cod'} />
      )}
      {pathName==='order'&&(
        <Order orderData={orderData} />
      )}
    </section>
  )
}

export default Checkout
