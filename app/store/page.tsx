import DisplayProducts from '@/components/store/DisplayProducts'
import prisma from '@/lib/prisma'
import React from 'react'

const page = async() => {
  const categories=await prisma.category.findMany({
    orderBy:{
      category:'desc'
    }
  })

  return (
    <section className='w-full space-y-4'>
      {categories.map((category)=>(
        <DisplayProducts key={category.id} category={category} />
      ))}
    </section>
  )
}

export default page
