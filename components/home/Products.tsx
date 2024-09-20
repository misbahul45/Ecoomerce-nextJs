import prisma from '@/lib/prisma'
import React from 'react'
import PostProduct from '../ui/PostProduct'



const Products = ({ children, title }:{ children: React.ReactNode, title:string }) => {
  return (
    <div className='lg:mt-8 mt-6 w-[95%] block mx-auto'>
      <h2 className='lg:text-4xl md:text-3xl text-2xl font-bold lg:mb-4 mb-2 text-center'>{title}</h2>
      <div className='grid grid-cols-auto-fill gap-4'>
        {children}
      </div>
    </div>
  )
}

export default Products
