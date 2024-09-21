'use client'
import React from 'react'
import Parse from 'html-react-parser'
import { IoIosArrowDown } from "react-icons/io";

interface Props {
    description:string
}

const ProductDescription = ({ description }:Props) => {
    const [showDescription, setShowDescription] = React.useState(false)
  return (
    <div className={`relative ${showDescription?'h-auto':'h-28'} overflow-hidden shadow-inner shadow-slate-100`}>
        {Parse(description as string)}
        {!showDescription &&(
            <button onClick={() => setShowDescription(true)} className='absolute bottom-0 left-0 w-full bg-slate-50/95 backdrop-blur-md text-slate-800 py-5 flex justify-center items-center shadow-xl shadow-slate-400/20 group'>
                <p className='font-semibold text-xl text-slate-500 group-hover:text-black transition-all duration-75'>Show Less</p>
                <IoIosArrowDown size={20} />
            </button>
        )}
    </div>
  )
}

export default ProductDescription
