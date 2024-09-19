import CarouselPoster from '@/components/home/CarouselPoster'
import FeatureProducts from '@/components/home/FeatureProducts'
import prisma from '@/lib/prisma'
import React from 'react'

const page = async() => {
  const allPoster=await prisma.poster.findMany({})
  return (
    <section className='w-full pb-6'>
      {allPoster.length>0 && <CarouselPoster images={allPoster.map((poster)=>poster.image)} />}
        <FeatureProducts />
    </section>
  )
}

export default page
