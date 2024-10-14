'use client'
import React from 'react'

import { Elements }  from "@stripe/react-stripe-js"
import { loadStripe } from '@stripe/stripe-js'
import Image from 'next/image'
import { Button } from '../ui/button'
import { MdDelete } from 'react-icons/md'
import Link from 'next/link'
import OrderPage from './OrderPage'
import { useToast } from '../ui/use-toast'
import { FaImage } from 'react-icons/fa'



const stripePromise=loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string)

interface Props{
    orderData:Order
}


const Order = ({ orderData }:Props) => {
    const products=orderData.products
    const amount = React.useMemo(() => {
        return orderData.products.reduce((a, b) => a + (b.quantity * b.product.price), 0)
      }, [orderData])


  return (
    <div className='w-full space-y-4'>
      <div className="w-full max-w-3xl mt-4 mx-auto">
        <h1>Total Harga : {amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</h1>
        {orderData.methode!=='cod'?
            <Elements
                stripe={stripePromise}
                options={{
                    mode:"payment",
                    amount: amount,
                    currency: "idr",
                }}
            >
                <OrderPage amount={amount} orderId={orderData.id} />
            </Elements>
            :
            <p className='bg-green-200 text-slate-700 px-4 py-2.5 rounded-md my-4'>
              {orderData.status==='pending'?'Please waiting for product will be delivered':orderData.status==='delivered'?'Product has been delivered':'Product has been buyed'}
            </p>
        }
      </div>
      <div className='w-full max-w-3xl mx-auto'>
        {products.map((product)=>(
            <div key={product.id} className='flex justify-between'>
                <div className='space-x-2 flex'>
                    <Image src={product.product.images[0]} alt={product.product.images[0]} width={200} height={200} className='size-32 object-cover rounded-md shadow-md shadow-slate-700/20' />
                    <div>
                      <h1 className='text-sm'>{product.product.name}</h1>
                      <h2 className='text-sm font-semibold'>Quantity : {product.quantity}</h2>
                      <h2  className='text-sm font-semibold'>Product Price : {product.product.price.toLocaleString('id-ID',{ style:"currency", currency:'IDR' })}</h2>
                    </div>
                </div>
            </div>
        ))}
      </div>
      <div className='mx-auto border-2 space-y-2 border-slate-700 shadow-lg shadow-slate-600/20 py-2 px-3 max-w-3xl rounded-lg'>
        <h2 className='font-semibold'>Address</h2>
        <p className=''>{orderData.address}</p>
        <Link href={`/checkout/${orderData.id}/address`}>
            <Button className='ml-auto block font-semibold uppercase'>edit address</Button>
        </Link>
      </div>
      {orderData.methode==='cod' && orderData.status !=='paid' && (
        <div>
          <h3 className='text-center font-semibold'>You have to pay for this order</h3>
          <div className='w-full max-w-40 p-4 rounded-md h-auto mx-auto'>
            <FaImage className='w-full h-full' />
          </div>

          <Button className='mx-auto block font-semibold uppercase '>Send Evidance</Button>
        </div>
      )}
    </div>
  )
}

export default Order
