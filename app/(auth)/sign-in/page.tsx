import FormSignIn from '@/components/auth/FormSignIn'
import { LOGIN_IMG } from '@/constans'
import Link  from 'next/link'
import Image from 'next/image'
import React from 'react'


const page = () => {
  return (
    <section className='w-full min-h-[calc(100vh-4rem)] flex lg:flex-row flex-col justify-center items-center rounded-xl'>
      <div className='w-full max-w-sm lg:py-0 py-8 flex flex-col justify-center px-4'>
        <h1 className='md:text-3xl sm:text-2xl text-xl font-bold mb-2 text-center'>Login To Misbahul&lsquo;s Shop</h1>
        <p className='mb-3'>New to Misbahul&lsquo;s Shop? <Link href={'/sign-up'} className='text-blue-500'>Create an account</Link></p>
        <FormSignIn />
      </div>
      <div className={`w-full grid grid-cols-auto-fill px-2 rounded shadow-inner gap-4 `}>
        {LOGIN_IMG.map((item, index) => (
          <div key={index} className={`relative ${index%3===0 && "row-span-2"} ${ index>0 && index%5===0 && "row-span-3"} min-h-28 shadow-xl shadow-slate-700/50 animate-1-pulse`}>
            <Image src={item} alt={item} fill className={`object-cover rounded`} sizes='100%' />
          </div>
        ))}
      </div>
    </section>
  )
}

export default page
