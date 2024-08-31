import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Header = () => {
    const isLogin = false
  return (
    <header className='w-full sticky top-0 left-0 h-16 flex items-center justify-between backdrop-blur-md lg:px-12 md:px-8 px-4 z-50'>
      <Link href={'/'} className='px-6 py-2.5 rounded-md bg-gradient-to-r from-blue-700 via-violet-600 to-blue-500 text-slate-100 font-bold'>
        Misbahul's Shop
      </Link>
      <nav>
        
      </nav>
      {isLogin?(
        <></>
      )
      :
      <Link href={'/sign-in'} className='px-5 py-2.5 bg-violet-900 text-slate-100 flex items-center gap-2 rounded-full text-sm shadow-xl shadow-slate-800/20 hover:scale-105 transition-all duration-100'>
        <ShoppingBag size={16} />
        <p className='font-bold'>Buy Now</p>
      </Link>
      }
    </header>
  )
}

export default Header
