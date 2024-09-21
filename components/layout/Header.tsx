'use client'
import { MenuIcon, ShoppingBag } from 'lucide-react'
import { GrCart } from "react-icons/gr";
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation';
import { FiSearch, FiUser } from "react-icons/fi";
import { Button } from '../ui/button';
import SearchButton from './SearchButton';
import { Context } from './Provider';
import path from 'path';


interface Props{
  data:any
  categories:String[]
}

const Header = ({data, categories}:Props) => {
    const pathName=usePathname()
    const { toggleUserMenu }=React.useContext(Context)

  return (
    <header className='w-full sticky top-0 left-0 h-16 flex items-center justify-between backdrop-blur-md bg-white/30 lg:px-12 md:px-8 px-2 z-50'>
      <div className='flex-1 flex items-center relative gap-8'>
        <Link href={'/'} className='lg:px-6 lg:py-2.5 px-3 py-1.5 rounded bg-gradient-to-r from-blue-700 via-violet-600 to-blue-500 text-slate-100 font-bold shadow-xl shadow-black/20'>
          Misbahul&apos;s Shop
        </Link>
        <nav className='flex-1 md:block hidden'>
          <div className='flex items-center gap-4'>
            <div>
              <Link href={'/'} className={`font-semibold hover:text-black transition-all duration-100 ${(pathName==='/') ?'text-black' : 'text-slate-400'}`}>Home</Link>
            </div>
            <div>
              <Link href={'/store'} className={`font-semibold hover:text-black transition-all duration-100 ${(pathName==='/store') ?'text-black' : 'text-slate-400'}`}>Store</Link>
            </div>
            {categories?.map((category, index)=>(
              <div key={index}>
                <Link href={'/store/'+category.replace(' ', '-')} className={`font-semibold capitalize hover:text-blue-600 transition-all duration-100 ${pathName.includes(category.replace(' ', '-')) && pathName.includes('/store') ? "text-blue-600" : "text-blue-200"}`}>{category}</Link>
              </div>
            ))}
          </div>
        </nav>
      </div>
      {data?.user?(
        <>
  `        <div className='flex items-center md:gap-4 gap-1'>
              <SearchButton icon={<FiSearch size={25} />} />
              <Link href={'/cart'} className='rounded-full p-2 hover:bg-slate-100'>
                <GrCart size={25} />
              </Link>
              <Button onClick={toggleUserMenu} variant={'ghost'} className='md:block hidden rounded-full p-2 border-0'>
                <FiUser size={25} />
              </Button>
          </div>
          <button className='md:hidden block p-2 rounded-full bg-slate-300/50 shadow shadow-slate-400/5 hover:bg-slate-100 transition-all duration-100'>
                <MenuIcon />
          </button>
        </>
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
