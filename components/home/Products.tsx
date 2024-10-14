import prisma from '@/lib/prisma'
import React from 'react'
import PostProduct from '../ui/PostProduct'



const Products = ({ children, title }:{ children: React.ReactNode, title:string }) => {
  return (
    <div className='lg:mt-8 mt-6 w-[95%] block mx-auto'>
      <h1 className='text-2xl font-bold'>{title}</h1>
      <div className='grid grid-cols-auto-fill gap-4'>
        {children}
      </div>
    </div>
  )
}

export default Products
