import ProductImages from '@/components/products/ProductImages'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import React from 'react'


interface Props {
    params:{
        slug:string
    }  
} 

const page = async({ params: { slug } }: Props) => {
  const product=await prisma.product.findUnique({
    where:{
      slug
    }
  })

  if(!product) return notFound()

  return (
    <section className='w-full pb-8 pt-2 px-4'>
      <div className='flex gap-2 my-4'>
        <ProductImages images={product?.images as string[]} />
      </div>
    </section>
  )
}

export default page
