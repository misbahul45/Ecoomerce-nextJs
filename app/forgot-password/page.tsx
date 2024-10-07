import FormEmail from '@/components/forgot-password/FormEmail'
import React from 'react'

const page = () => {
  return (
    <section className='w-full h-[calc(100vh-4rem)] flex flex-col justify-center items-center max-w-xl mx-auto rounded-xl'>
        <div className='lg:px-6 lg:py-2.5 px-3 py-1.5 rounded bg-gradient-to-r from-blue-700 via-violet-600 to-blue-500 text-slate-100 font-bold shadow-xl shadow-black/20'>
          Misbahul&#39;s Shop - Forgot Password Misbahul&#39;s Shop
        </div>
        <h1 className='text-lg text-slate-500 font-semibold mt-6'>Forgot Your Password Account?</h1>
        <FormEmail />
    </section>
  )
}

export default page
