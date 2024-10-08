'use client'
import React from 'react'
import { Context } from './Provider'
import { signOut } from 'next-auth/react'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarImage } from '../ui/avatar'
import Link from 'next/link'
import { Button } from '../ui/button'
import { GrLogout } from 'react-icons/gr'
import { LuUser, LuUserCog } from 'react-icons/lu'
import { MdDashboard, MdArrowForwardIos } from "react-icons/md";
import { FaPenAlt } from 'react-icons/fa'
import { CheckCheck, Home, ShoppingBasket } from 'lucide-react'
import { TbListDetails } from "react-icons/tb";

interface Props {
    user: User | null
    categories: Category[]
}

const Sidebar = ({ user, categories }: Props) => {
    const { showSidebar } = React.useContext(Context)
    const [showAdminSetting, setShowAdminSetting] = React.useState(false)
    const [showCategory, setShowCategory] = React.useState(false)

    const logout = () => {
        signOut({ callbackUrl: '/sign-in' })
    }

    React.useEffect(() => {
        document.body.style.overflow = showSidebar ? 'hidden' : 'auto';
    }, [showSidebar])

    return (
        <aside className={`space-y-4 fixed px-4 py-2 top-16 left-0 md:hidden block h-[calc(100vh-4rem)] bg-slate-100/20 backdrop-blur-md ${showSidebar ? "sm:w-1/2 w-[70%] opacity-100 z-50" : "w-0 opacity-0 -z-0"} overflow-hidden transition-all duration-200`}>
            {user && (
                <div className='flex gap-4 items-center justify-center py-1.5 rounded-md bg-slate-100 shadow-xl shadow-slate-800/20'>
                    <Avatar className='size-10 rounded-full shadow shadow-slate-700/20'>
                        <AvatarImage src={user?.image || ''} alt="avatar" className='rounded-full object-cover' />
                    </Avatar>
                    <p className='font-bold text-slate-800'>{user?.name}</p>
                </div>
            )}

            <div className='absolute w-full bottom-0 left-0 px-4 pb-4 flex gap-2 justify-center'>
                {user ?
                    <Button onClick={logout} className='bg-red-500 text-white w-full font-semibold flex gap-2 items-center hover:bg-red-600 cursor-pointer rounded group transition-all duration-100'>
                        <GrLogout size={20} className='group-hover:translate-x-2 transition-all duration-100' />
                        <p className='group-hover:translate-x-2 transition-all duration-100'>Logout</p>
                    </Button>
                    :
                    <>
                        <Link href={'/sign-in'} className='w-full'>
                            <Button className='w-full font-semibold'>
                                Login
                            </Button>
                        </Link>
                        <Link href={'/sign-up'} className='w-full'>
                            <Button className='w-full font-semibold' variant='secondary'>
                                Register
                            </Button>
                        </Link>
                    </>
                }
            </div>

            {user?.role === "admin" && (
                <div className='w-full'>
                    <button onClick={() => setShowAdminSetting(!showAdminSetting)} className='w-full py-2 flex gap-2 items-center pl-2 bg-slate-100/60 rounded'>
                        <LuUserCog size={20} />
                        <p className='flex gap-0.5 items-center'>
                            <span>Settings</span>
                            <MdArrowForwardIos
                                size={10}
                                className={`transition-transform duration-300 ${showAdminSetting ? 'rotate-90' : 'rotate-0'}`}
                            />
                        </p>
                    </button>
                    <div className={`w-full transition-all duration-300 ease-in-out ${showAdminSetting ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden bg-white/20 mt-2 rounded-md`}>
                        <Link href={'/profile/show'} className='p-2.5 flex gap-2 items-center hover:bg-slate-200 cursor-pointer rounded'>
                            <LuUser size={20} />
                            <p>Profile</p>
                        </Link>
                        {user?.role === 'admin' && (
                            <>
                                <Link href={'/dashboard'} className='p-2.5 flex gap-2 items-center hover:bg-slate-200 cursor-pointer rounded'>
                                    <MdDashboard size={20} />
                                    <p>Dashboard</p>
                                </Link>
                                <Link href={'/create-post/products'} className='p-2.5 flex gap-2 items-center hover:bg-slate-200 cursor-pointer rounded'>
                                    <FaPenAlt size={20} />
                                    <p>Create Post</p>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}

            {user?.role === "user" && (
                <div className='w-full'>
                    <Link href={'/profile/show'} className='w-full py-2 flex gap-2 items-center pl-2 bg-slate-100/60 rounded'>
                        <LuUser size={20} />
                        <p>Profile</p>
                    </Link>
                </div>
            )}
           <div className='space-y-2'>
                <Link href={'/'} className='w-full py-2 flex gap-2 items-center pl-2 bg-slate-100/60 rounded'>
                    <Home size={20} />
                    <p>Home</p>
                </Link>
                <Link href={'/store'} className='w-full py-2 flex gap-2 items-center pl-2 bg-slate-100/60 rounded'>
                    <ShoppingBasket size={20} />
                    <p>Store</p>
                </Link>
                <div className='w-full'>
                    <button onClick={() => setShowCategory(prev => !prev)} className='w-full py-2 flex gap-2 items-center pl-2 bg-slate-100/60 rounded'>
                        <TbListDetails size={20} />
                        <p className='flex gap-0.5 items-center'>
                            <span>Category</span>
                            <MdArrowForwardIos
                                size={10}
                                className={`transition-transform duration-300 ${showCategory ? 'rotate-90' : 'rotate-0'}`}
                            />
                        </p>
                    </button>
                    <div className={`w-full transition-all duration-300 ease-in-out ${showCategory? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden bg-white/20 mt-2 rounded-md`}>
                        {categories?.map((category, index)=>(
                            <Link key={index} href={'/store/'+category.category.replace(' ', '-')} className='p-2.5 flex gap-2 items-center hover:bg-slate-200 cursor-pointer rounded'>
                                <CheckCheck size={20} />
                                <p>{category.category}</p>
                            </Link>
                        ))}
                    </div>
                </div>
           </div>
        </aside>
    )
}

export default Sidebar
