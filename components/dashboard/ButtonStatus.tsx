'use client'
import { updateProductOrder } from '@/actions/order.actions'
import React from 'react'
import { FaPenAlt } from 'react-icons/fa'

interface Props{
    id:string
}

const ButtonStatus = ({id}:Props) => {
    const updateOrderStatus=async()=>{
        await updateProductOrder(id, { status:'delivered' })
    }
  return (
    <button onClick={updateOrderStatus} className='p-1.5 rounded-full bg-slate-100 text-slate-600 active:bg-blue-600 hover:scale-105 transition-all duration-100'>
        <FaPenAlt size={15} />
    </button>
  )
}

export default ButtonStatus
