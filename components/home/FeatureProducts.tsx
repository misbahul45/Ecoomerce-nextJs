import prisma from '@/lib/prisma'
import React from 'react'
import PostProduct from '../ui/PostProduct'

const FeatureProducts = async() => {
    const products=await prisma.product.findMany({
        where:{
            type:'FEATURE'
        }
    }) as Product[]

  return (
    <div className='lg:mt-8 mt-6 w-[80%] block mx-auto'>
      <h2 className='lg:text-4xl md:text-3xl text-2xl font-bold lg:mb-4 mb-2 text-center'>Feature Products</h2>
      <div className='grid grid-cols-auto-fill gap-4'>
        {products?.map((product:Product)=>(
            <PostProduct key={product.id} name={product.name} images={product.images} slug={product.slug} />
        ))}
      </div>
    </div>
  )
}

export default FeatureProducts
