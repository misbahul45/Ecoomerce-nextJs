
import { CHECKOUT_NAV } from '@/constans'
import React from 'react'
import { IoIosArrowForward } from "react-icons/io";

const CheckoutNav = ({ pathName }: { pathName: string }) => {
   
  return (
    <div className='w-full mx-auto flex justify-center lg:gap-4 md:gap-3 gap-2 items-center'>
      {CHECKOUT_NAV.map((item, index) => (
        <div key={index}  className='flex lg:gap-4 md:gap-3 gap-2 items-center'>
          <div className={`capitalize lg:px-4 lg:py-2 md:px-3 md:py-1.5 px-2 py-0.5 rounded ${pathName===item ? "bg-slate-600":"bg-slate-400"} text-slate-100`}>
            {item}
          </div>
          {index !== CHECKOUT_NAV.length-1 && (
            <div className='flex items-center'>
              <div className={`lg:w-16 md:w-12 w-8 h-1 rounded-full ${pathName===item ? "bg-slate-600 animate-pulse":"bg-slate-300"}`}></div>
              <IoIosArrowForward size={25} className={pathName===item ? "text-slate-600 animate-pulse":"text-slate-300"} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default CheckoutNav
