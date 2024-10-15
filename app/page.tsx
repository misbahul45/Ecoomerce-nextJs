import CarouselPoster from '@/components/home/CarouselPoster'
import Information from '@/components/home/Information'
import Products from '@/components/home/Products'
import PostProduct from '@/components/ui/PostProduct'
import prisma from '@/lib/prisma'
import React from 'react'

const page = async() => {
  const allPoster=await prisma.poster.findMany({})
  const featureProducts=await prisma.product.findMany({
      where:{
          type:'FEATURE'
      },
      take:4
  }) as any

  const sellProducts=await prisma.product.findMany({
      where:{
          type:'SELL',
      },
      take:8
  }) as any

  const comments=await prisma.comment.findMany({
    orderBy:{
      createdAt:'desc'
    },
    include:{
      author:true,
    },
    take:6
  })
  return (
    <section className='w-full pb-6'>
      {allPoster.length>0 && <CarouselPoster images={allPoster.map((poster)=>poster.image)} />}
        <Products title='Sell Products'>
          {sellProducts.map((product:Product,index:number)=>(
                <PostProduct key={product.id} name={product.name} images={product.images} slug={product.slug} price={product.price} />
          ))}
        </Products> 
        <Information />
        {featureProducts.length>0 &&(
          <Products title='Featured Products'>
            {featureProducts.map((product:Product,index:number)=>(
                  <PostProduct key={product.id} name={product.name} images={product.images} slug={product.slug} price={product.price} />
            ))}
          </Products>
        )}
        <h2 className='text-center font-semibold lg:text-2xl md:text-xl text-lg'>Our Service Response</h2>
 
    </section>
  )
}

export default page
