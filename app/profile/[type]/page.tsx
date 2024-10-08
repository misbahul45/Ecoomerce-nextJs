import FormProfile from '@/components/profile/FormProfile'
import ShowProfile from '@/components/profile/ShowProfile'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { Edit, Home } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface Props{
    params:{
        type:'show' | 'edit'
    }
}

const page = async({ params:{ type } }:Props) => {
  const session=await auth()
  const user=session?.user? await prisma.user.findFirst({
    where:{
      email:session.user.email
    }
  }) as User : null
  return (
    <section className='w-full min-h-[calc(100vh-4rem)] rounded-xl'>
      <Link className='absolute top-5 right-4 p-2 bg-blue-500 text-slate-100 rounded-full hover:scale-105 hover:bg-blue-700 transition-all duration-100 z-40' href={type==='edit'?'/profile/show':'/profile/edit'}>
        {type==="edit"?
          <Home />
          :
          <Edit />
        }
      </Link>
      {type==='show'?<ShowProfile user={user} />:<FormProfile user={user} />}
    </section>
  )
}

export default page
