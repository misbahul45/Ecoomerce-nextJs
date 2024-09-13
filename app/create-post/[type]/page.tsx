import FormCategory from '@/components/dashboard/FormCategory'
import FormPoster from '@/components/dashboard/FormPoster'
import FormProducts from '@/components/dashboard/FormProducts'
import TypeMenu from '@/components/dashboard/TypeMenu'
import Editor from '@/components/editor/Editor'
import React from 'react'

interface Props{
  params:{
    type:string
  }
}

const page = ({ params: { type } }:Props) => {
  return (
    <section className='relative w-full'>
      <div className="flex flex-col items-center my-4">
        <h1 className='text-3xl font-bold text-center mb-4 capitalize'>Create {type}</h1>

        <TypeMenu routerType={type} />
      </div>
      {type === 'products'&& <FormProducts /> }
      {type === 'category' && <FormCategory />}
      {type === 'poster' && <FormPoster />}
    </section>
  )
}

export default page
