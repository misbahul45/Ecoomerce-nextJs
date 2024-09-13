import CarouselPoster from '@/components/home/CarouselPoster'
import prisma from '@/lib/prisma'
import React from 'react'

const page = async() => {
  const allPoster=await prisma.poster.findMany({})
  return (
    <section className='w-full'>
      {allPoster.length>0 && <CarouselPoster images={allPoster.map((poster)=>poster.image)} />}
    </section>
  )
}

export default page
