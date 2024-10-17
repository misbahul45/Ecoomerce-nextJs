import PostProduct from '@/components/ui/PostProduct'
import prisma from '@/lib/prisma'
import React from 'react'

interface pageProps {
    params: {
        category: string
    }
}

const page = async({ params: { category } }: pageProps) => {
  const categoryProduct=await prisma.category.findUnique({
    where:{
      category
    }
  })
  const products=await prisma.product.findMany({
    where:{
      categoryId:categoryProduct?.id
    }
  }) as Product[]

  return (
    <section>
      <h1 className='my-6 capitalize'>{category}</h1>
      <div className='grid grid-cols-auto-fill gap-4'>
        {products.map((product:Product)=>(
          <PostProduct key={product.id} name={product.name} images={product.images} slug={product.slug} price={product.price} />
        ))}
      </div>
    </section>
  )
}

export default page
