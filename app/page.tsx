import CarouselPoster from '@/components/home/CarouselPoster'
import Products from '@/components/home/Products'
import PostProduct from '@/components/ui/PostProduct'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import React from 'react'
import { FaArrowTrendUp } from "react-icons/fa6";

const page = async() => {
  const allPoster=await prisma.poster.findMany({})
  const featureProducts=await prisma.product.findMany({
      where:{
          type:'FEATURE'
      },
      take:4
  }) as Product[]

  const sellProducts=await prisma.product.findMany({
      where:{
          type:'SELL'
      },
      take:8
  }) as Product[]


  return (
    <section className='w-full pb-6'>
      {allPoster.length>0 && <CarouselPoster images={allPoster.map((poster)=>poster.image)} />}
        <Products title='Feature Products'>
          {featureProducts.map((product:Product)=>(
              <PostProduct key={product.id} name={product.name} images={product.images} slug={product.slug} />
          ))}
        </Products>
        <Products title='Sell Products'>
          {sellProducts.map((product:Product,index)=>(
                <PostProduct key={product.id} name={product.name} images={product.images} slug={product.slug} />
          ))}
        </Products> 
    </section>
  )
}

export default page
