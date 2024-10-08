import Link from 'next/link'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa'

const notFound = () => {
  return (
    <section className='w-full h-[calc(100vh-4rem)] flex flex-col items-center justify-center'>
      <p className='text-xl font-semibold text-blue-800/60'>404</p>
      <h1 className='text-4xl font-bold'>Page Not Found</h1>
      <div className="flex gap-4 mt-8">
        <Link href={'/store'} className='px-6 py-2.5 bg-blue-600 text-slate-100 font-semibold rounded hover:bg-blue-700 '>Go To Home</Link>
        <Link href={'/profile/show'} className='flex gap-1 items-center px-6 py-2.5 font-semibold rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-all duration-100 group'>
            <span>Go To Profile</span>
            <FaArrowRight size={15} className='group-hover:translate-x-2 transition-all duration-100' />
        </Link>
      </div>
    </section>
  )
}

export default notFound
