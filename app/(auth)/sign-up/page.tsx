import FormSignUp from '@/components/auth/FormSignUp'
import Link  from 'next/link'
import React from 'react'

const page = () => {
  return (
    <section className='w-full max-w-md mx-auto min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center rounded-xl'>
      <h1 className='md:text-3xl sm:text-2xl text-xl font-bold text-center mb-4'>Sign Up To Misbahul&#39;s Shop</h1>
      <p className='mb-3 text-slate-500'>Already have an account? <Link href={'/sign-in'} className='text-blue-500'>Sign in here</Link></p>
      <FormSignUp />
    </section>
  )
}

export default page
