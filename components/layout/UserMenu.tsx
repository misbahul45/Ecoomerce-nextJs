'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'
import { FaRegUser } from "react-icons/fa";
import { Context } from './Provider';
import { GrLogout } from "react-icons/gr";
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { MdDashboard } from "react-icons/md";
import { FaPenAlt } from "react-icons/fa";

interface Props { 
    user:User | undefined,
    role:'admin'|'user'
}

const UserMenu = ({ user, role }:Props) => {
    const { showUserMenu, toggleUserMenu }=React.useContext(Context)
    const router=useRouter()

    const toRouter=(route:string)=>{
        router.push(route)
        toggleUserMenu()
    }

    const logout=()=>{
        signOut({callbackUrl:'/sign-in'})
    }

  if(!user) return null
  return (
    <ul className={`fixed lg:right-8 md:right-4 right-2 top-16 z-50 bg-gray-100 rounded-xl shadow-xl shadow-slate-600/20 border-[1px] border-slate-300 ${showUserMenu?'translate-x-0 opacity-100':'translate-x-[120%] opacity-5'} transition-all duration-100`}>
        <li className='flex gap-2 items-center p-3'>
            <Avatar>
                <AvatarImage src={user?.image || ''} alt="avatar" className='size-8 rounded-full' />
                <AvatarFallback><div className="size-8 bg-slate-400 animate-pulse rounded-full"></div></AvatarFallback>
            </Avatar>
            <p>{user?.name}</p>
        </li>
        <li onClick={()=>toRouter('/profile/show')} className='p-2.5 flex gap-2 items-center hover:bg-slate-200 cursor-pointer rounded'>
           <FaRegUser size={20} />
           <p>Profile</p>
        </li>
        {role==='admin'&&(
            <>
                <li onClick={()=>toRouter('/dashboard')} className='p-2.5 flex gap-2 items-center hover:bg-slate-200 cursor-pointer rounded'>
                    <MdDashboard size={20} />
                    <p>Dashborad</p>
                </li>
                <li onClick={()=>toRouter('/create-post/products')} className='p-2.5 flex gap-2 items-center hover:bg-slate-200 cursor-pointer rounded'>
                    <FaPenAlt size={20} />
                    <p>Create Post</p>
                </li>
            </>
        )}
        <li onClick={logout} className='p-2.5 flex gap-2 items-center hover:bg-slate-200 cursor-pointer rounded group'>
            <GrLogout size={20} className='group-hover:translate-x-2 transition-all duration-100' />
            <p className='group-hover:translate-x-2 transition-all duration-100'>Logout</p>
        </li>
    </ul>
  )
}

export default UserMenu
