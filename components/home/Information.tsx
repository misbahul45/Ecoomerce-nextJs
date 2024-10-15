import prisma from '@/lib/prisma'
import Image from 'next/image'
import React from 'react'

const Information = async() => {
    const poster=await prisma.poster.findMany()
  return (
    <div className='grid grid-cols-auto-fill gap-4 max-w-4xl mx-auto my-4'>
      {poster.map((poster, index)=>(
        <Image key={poster.id} src={poster.image} alt={`Poster image ${poster.id}`} width={500} height={500} className={`object-cover w-full h-44 shadow-xl shadow-slate-800/20 rounded-xl ${index===0 || index===3 ? 'col-span-2' : 'col-span-1 row-span-1'}`} loading="lazy" />
      ))}
    </div>
  )
}

export default Information
