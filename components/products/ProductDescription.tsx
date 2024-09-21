'use client'
import React from 'react'
import Parse from 'html-react-parser'
import { IoIosArrowDown } from "react-icons/io";

interface Props {
    description: string
}

const ProductDescription = ({ description }: Props) => {
    const [showDescription, setShowDescription] = React.useState(false)
    return (
        <div className="relative overflow-hidden shadow-inner shadow-slate-100">
            <div className={`transition-all duration-200 ${showDescription ? 'max-h-[200vh]' : 'max-h-28'} ease-in-out`}>
                {Parse(description as string)}
            </div>
            <button
                onClick={() => setShowDescription(prev => !prev)}
                className={`${showDescription ? '' : 'absolute bottom-0 left-0'} w-full bg-slate-50/95 backdrop-blur-md text-slate-800 py-5 flex justify-center items-center shadow-xl shadow-slate-400/20 group`}>
                <p className='font-semibold text-slate-500 group-hover:text-black transition-all duration-75'>{showDescription ? 'Read Less' : 'Read More'}</p>
                <IoIosArrowDown size={20} className={`ml-2 transition-transform duration-300 ${showDescription ? 'rotate-180' : ''}`} />
            </button>
        </div>
    )
}

export default ProductDescription;
