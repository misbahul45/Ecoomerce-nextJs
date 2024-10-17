import Wrapper from '@/components/store/Wrapper'
import PostProduct from '@/components/ui/PostProduct'
import prisma from '@/lib/prisma'
import React from 'react'

const page = async() => {
  return (
    <section className='w-full space-y-4'>
      <Wrapper />
    </section>
  )
}

export default page
