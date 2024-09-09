import FormSignIn from '@/components/auth/FormSignIn'
import { LOGIN_IMG } from '@/contans'
import Link  from 'next/link'
import Image from 'next/image'
import React from 'react'


const page = () => {
  return (
    <section className='w-full min-h-[calc(100vh-4rem)] flex'>
      <div className='w-full max-w-sm h-[calc(100vh-4rem)] flex flex-col justify-center px-4'>
        <h1 className='text-3xl font-bold mb-2'>Login To Misbahul's Shop</h1>
        <p className='mb-3'>New to Misbahul's Shop? <Link href={'/sign-up'} className='text-blue-500'>Create an account</Link></p>
        <FormSignIn />
      </div>
      <div className={`flex-1 grid grid-cols-auto-fill px-2 rounded shadow-inner gap-4`}>
        {LOGIN_IMG.map((item, index) => (
          <div key={index} className={`relative ${index%3===0 && "row-span-2"} ${ index>0 && index%5===0 && "row-span-3"} min-h-28 shadow-xl shadow-slate-700/50`}>
            <Image src={item} alt={item} fill className={`object-cover rounded`} sizes='100%' />
          </div>
        ))}
      </div>
    </section>
  )
}

export default page
