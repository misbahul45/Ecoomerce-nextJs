import PostProduct from '@/components/ui/PostProduct'
import prisma from '@/lib/prisma'
import React from 'react'

const page = async() => {
  const products = await prisma.product.findMany({
    where: {
      type: 'SELL'
    },
    
    take:12
  })

  return (
    <section className='w-full space-y-4'>
      <div className='grid grid-cols-auto-fill gap-4'>
        {products.map((product)=>(
          <PostProduct key={product.id} name={product.name} images={product.images} slug={product.slug} price={product.price} />
        ))}
      </div>
    </section>
  )
}

export default page
