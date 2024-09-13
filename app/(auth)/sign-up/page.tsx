import FormSignUp from '@/components/auth/FormSignUp'
import Link  from 'next/link'
import React from 'react'

const page = () => {
  return (
    <section className='w-full max-w-md mx-auto min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center'>
      <h1 className='text-3xl font-bold text-center mb-4'>Sign Up To Misbahul's Shop</h1>
      <p className='mb-3 text-slate-500'>Already have an account? <Link href={'/sign-in'} className='text-blue-500'>Sign in here</Link></p>
      <FormSignUp />
    </section>
  )
}

export default page
