import { auth } from '@/lib/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'

const ShowProfile = async() => {
    const session=await auth()
    const user=session?.user
  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
        <h1 className='text-3xl font-bold text-blue-500'>Profile Informations</h1>
        <Avatar className='mt-6 shadow-xl shadow-slate-600/20 rounded-full'>
            <AvatarImage src={user?.image || ''} alt="avatar" className='size-32 rounded-full' />
            <AvatarFallback><div className="size-32 rounded-full border-t-4 border-slate-700 animate-spin"></div></AvatarFallback>
        </Avatar>
        <div className="flex gap-4 my-4">
            <p><span className="font-bold">Name :</span> {user?.name}</p>
            <p><span className="font-bold">Email :</span> {user?.email}</p>
        </div>
        <h2 className='text-3xl font-bold text-blue-800'>My Order</h2>
    </div>
  )
}

export default ShowProfile
