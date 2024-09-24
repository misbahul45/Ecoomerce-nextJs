'use client'
import { usePathname } from 'next/navigation'
import React from 'react'

const CheckoutNav = () => {
    const pathName=usePathname()

    console.log(pathName)

  return (
    <div className='w-full max-w-2xl mx-auto flex gap-4 items-center'>
      {}
    </div>
  )
}

export default CheckoutNav
