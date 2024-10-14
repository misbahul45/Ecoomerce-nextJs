import FormCategory from '@/components/create-post/FormCategory'
import FormPoster from '@/components/create-post/FormPoster'
import FormProducts from '@/components/create-post/FormProducts'
import TypeMenu from '@/components/create-post/TypeMenu'
import prisma from '@/lib/prisma'
import React from 'react'

interface Props{
  params:{
    type:string[]
  }
}

const page = async ({ params: { type } }:Props) => {
  const categories=await prisma.category.findMany({})
  return (
    <section className='relative w-full rounded-xl'>
      <div className="flex flex-col items-center my-4">
        <h1 className='text-3xl font-bold text-center mb-4 capitalize'>Create {type}</h1>

        <TypeMenu routerType={type[0]} />
      </div>
      {type[0] === 'products'&& <FormProducts categories={categories} /> }
      {type[0] === 'category' && <FormCategory />}
      {type[0] === 'poster' && <FormPoster />}
    </section>
  )
}

export default page
