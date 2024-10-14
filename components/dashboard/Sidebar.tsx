'use client'
import React from 'react'
import { Button } from '../ui/button'
import { HiHome, HiMenuAlt3, HiUsers } from "react-icons/hi";
import { DASHBOARD_MENU } from '@/constans';
import Link from 'next/link';
import { FaClipboardCheck, FaMoneyBillAlt, FaRegWindowRestore } from 'react-icons/fa';
import { MdOutlineClose } from 'react-icons/md';

const ICON={
    'home':<HiHome size={20} />,
    'users':<HiUsers size={20} />,
    'products':<FaRegWindowRestore size={20} />,
    'invoices':<FaMoneyBillAlt size={20} />,
    'other parts':<FaClipboardCheck size={20} />
}

const Sidebar = () => {
    const  [showSidebar, setShowSidebar]=React.useState(false)
  return (
    <aside>
       <Button onClick={()=>setShowSidebar(!showSidebar)} variant={'outline'} className='absolute top-4 left-4 z-40 shadow-xl shadow-slate-500/10'>
            {showSidebar?<MdOutlineClose size={20} />:<HiMenuAlt3 size={20} />}
       </Button>
       <ul className={`absolute z-40 top-16 ${showSidebar?"left-4 scale-100":"-left-64 scale-75"} bg-slate-100 rounded-md shadow-xl shadow-blue-500/20 transition-all duration-100`}>
           {DASHBOARD_MENU.map((menu, index)=>(
               <li key={index} className={`list-none py-1.5 hover:bg-slate-300/80 transition-all duration-300 ${index===0 ? 'rounded-t-md':index===DASHBOARD_MENU.length-1 ? 'rounded-b-md': ''}`}>
                    <Link href={menu.link} className='pl-6 pr-16 flex gap-2 items-center font-semibold text-slate-700'>
                        {ICON[menu.name as keyof typeof ICON]}
                        <p className='capitalize text-slate-700'>{menu.name}</p>
                    </Link>
               </li>
           ))} 
        </ul>
    </aside>
  )
}

export default Sidebar
