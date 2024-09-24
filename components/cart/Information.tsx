'use client'
import React, { useMemo } from 'react'

interface Props{
    cartOnProducts:any
    total:number
    productChechout:any
    setProductCheckout:any
}

const Information = ({ cartOnProducts, total, productChechout, setProductCheckout }:Props) => {
    const totalProduct=useMemo(()=>{
      return cartOnProducts.reduce((prev:any,curr:any)=>prev+curr.quantity,0) 
    },[cartOnProducts])


  return (
    <div className='w-full py-3 px-4 flex justify-between rounded-t-xl bg-slate-100 font-semibold'>
      <div className='flex gap-4'>
        <input type="checkbox" checked={productChechout.length===cartOnProducts.length && cartOnProducts.length>0} onChange={()=>productChechout.length===cartOnProducts.length?setProductCheckout([]):setProductCheckout(cartOnProducts)} className='size-4 cursor-pointer' />
        <h2>All Products ({totalProduct})</h2>
      </div>
      <div>
        <h2>Total : {total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</h2>
      </div>
    </div>
  )
}

export default Information
