import CarouselPoster from '@/components/home/CarouselPoster'
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
  }) as any

  const sellProducts=await prisma.product.findMany({
      where:{
          type:'SELL'
      },
      take:10
  }) as any


  return (
    <section className='w-full pb-6'>
      {allPoster.length>0 && <CarouselPoster images={allPoster.map((poster)=>poster.image)} />}
        {featureProducts.length>0 &&(
          <Products title='Featured Products'>
            {featureProducts.map((product:Product,index:number)=>(
                  <PostProduct key={product.id} name={product.name} images={product.images} slug={product.slug} price={product.price} />
            ))}
          </Products>
        )}
        <Products title='Sell Products'>
          {sellProducts.map((product:Product,index:number)=>(
                <PostProduct key={product.id} name={product.name} images={product.images} slug={product.slug} price={product.price} />
          ))}
        </Products> 
    </section>
  )
}

export default page
