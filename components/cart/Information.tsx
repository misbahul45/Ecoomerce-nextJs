'use client'
import React from 'react'

interface Props{
    cartOnProducts:any
}

const Information = ({cartOnProducts}:Props) => {
    console.log(cartOnProducts)
  return (
    <div className='w-full py-3 px-4 flex gap-4 rounded-t-xl bg-slate-100 font-semibold'>
      <input type="checkbox" className='size-4 cursor-pointer' />
      <h2>All Products ({cartOnProducts.length})</h2>
    </div>
  )
}

export default Information
