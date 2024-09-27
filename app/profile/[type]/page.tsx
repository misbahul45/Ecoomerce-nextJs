import ShowProfile from '@/components/profile/ShowProfile'
import { Edit, Home } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface Props{
    params:{
        type:'show' | 'edit'
    }
}

const page = ({ params:{ type } }:Props) => {
  return (
    <section className='w-full h-[calc(100vh-4rem)] rounded-xl'>
      <Link className='absolute top-5 right-4 p-2 bg-blue-500 text-slate-100 rounded-full hover:scale-105 hover:bg-blue-700 transition-all duration-100' href={type==='edit'?'/profile/show':'/profile/edit'}>
        {type==="edit"?
          <Home />
          :
          <Edit />
        }
      </Link>
      {type==='show'?<ShowProfile />:null}
    </section>
  )
}

export default page
