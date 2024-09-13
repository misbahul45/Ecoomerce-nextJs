import ShowProfile from '@/components/profile/ShowProfile'
import React from 'react'

interface Props{
    params:{
        type:'show' | 'edit'
    }
}

const page = ({ params:{ type } }:Props) => {
  return (
    <section className='w-full h-[calc(100vh-4rem)]'>
      {type==='show'?<ShowProfile />:null}
    </section>
  )
}

export default page
