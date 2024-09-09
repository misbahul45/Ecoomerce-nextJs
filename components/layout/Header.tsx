'use client'
import { ShoppingBag } from 'lucide-react'
import { IoIosArrowForward } from "react-icons/io";
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation';

const categories=[
  {
    name:`Women's clothing`,
    subCategories:[
      {
        name:'T-Shirts',
        link:'/store/tshirts'
      },
      {
        name:'Hoodies',
        link:'/store/hoodies'
      }
    ]
  },
  {
    name:`Men's clothing`,
    subCategories:[
      {
        name:'T-Shirts',
        link:'/store/tshirts'
      },
      {
        name:'Hoodies',
        link:'/store/hoodies'
      }
    ]
  },
  {
    name:`Men's clothing`,
    subCategories:[
      {
        name:'T-Shirts',
        link:'/store/tshirts'
      },
      {
        name:'Hoodies',
        link:'/store/hoodies'
      }
    ]
  },
  {
    name:`Women's clothing`,
    subCategories:[
      {
        name:'T-Shirts',
        link:'/store/tshirts'
      },
      {
        name:'Hoodies',
        link:'/store/hoodies'
      }
    ]
  },
  {
    name:`Women's clothing`,
    subCategories:[
      {
        name:'T-Shirts',
        link:'/store/tshirts'
      },
      {
        name:'Hoodies',
        link:'/store/hoodies'
      }
    ]
  },
]

const Header = () => {
    const {data}=useSession()
    const pathName=usePathname()

    const [showCategory,setShowCategory]=React.useState(false)

    console.log(pathName)

  return (
    <header className='w-full sticky top-0 left-0 h-16 flex items-center justify-between backdrop-blur-md lg:px-12 md:px-8 px-4 z-50'>
      <div className='flex-1 flex items-center relative gap-8'>
        <Link href={'/'} className='px-6 py-2.5 rounded-md bg-gradient-to-r from-blue-700 via-violet-600 to-blue-500 text-slate-100 font-bold'>
          Misbahul's Shop
        </Link>
        <nav className='flex-1'>
          <ul className='flex items-center gap-6'>
            <li>
              <Link href={'/'} className={`font-semibold hover:text-black transition-all duration-100 ${(pathName==='/' && !showCategory) ?'text-black' : 'text-slate-400'}`}>Home</Link>
            </li>
            <li>
              <Link href={'/store'} className={`font-semibold hover:text-black transition-all duration-100 ${(pathName.includes('/store') && !showCategory) ?'text-black' : 'text-slate-400'}`}>Store</Link>
            </li>
            <li>
              <div onClick={()=>setShowCategory(!showCategory)} className='flex items-center font-semibold hover:text-black transition-all duration-100 cursor-pointer'>
                <span className={showCategory ? 'text-black' : 'text-slate-400'}>Categories</span>
                <IoIosArrowForward className={`${showCategory && 'rotate-90'} transition-all duration-100`} />
              </div>
              <div className={`${categories.length >= 4 ? 'grid grid-cols-4' : 'flex'} ${showCategory?'scale-100 translate-x-0 mt-4':'scale-0 translate-x-20'} absolute left-0 top-full gap-4 px-4 py-3 rounded-xl shadow-xl shadow-black/30 border-2 border-slate-400 bg-white transition-all duration-100`}>
                {categories.map((category, index) => (
                  <div key={index} className='space-y-2 flex flex-col text-slate-500'>
                    <h1 className='whitespace-nowrap font-semibold'>{category.name}</h1>
                    {category.subCategories.map((subCategory, index) => (
                      <Link key={index} href={subCategory.link} className='text-sm text-slate-400 hover:text-blue-900 transition-all duration-100'>{subCategory.name}</Link>
                    ))}
                  </div>
                ))}
              </div>
            </li>
          </ul>
        </nav>
      </div>
      {data?.user?(
        <>
          <Image src={data?.user.image || ''} alt={data?.user.name || ''} width={32} height={32} className='rounded-full cursor-pointer' />
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
