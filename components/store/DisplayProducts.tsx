import prisma from '@/lib/prisma'
import React from 'react'
import PostProduct from '../ui/PostProduct'

interface Props{
    category:Category,
}

const DisplayProducts = async({ category }:Props) => {
    const products=await prisma.product.findMany({
        where:{
            categoryId:category.id,
        },
        take:10,
        orderBy:{
            name:'asc'
        }
    }) as Product[]

  return (
    <>
      <h1>{category.category}</h1>
      <div className='grid grid-cols-auto-fill gap-4'>
        {products.map((product)=>(
          <PostProduct key={product.id} name={product.name} images={product.images} slug={product.slug} price={product.price} />
        ))}
      </div>
    </>
  )
}

export default DisplayProducts
