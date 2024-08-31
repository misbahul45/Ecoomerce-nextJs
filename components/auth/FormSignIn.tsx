'use client'
import React from 'react'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LuEye, LuEyeOff } from 'react-icons/lu'
import AuthButton from './AuthButton'

const SignInSchema=z.object({
    email:z.string().email(),
    password:z.string().min(8),
})

const FormSignIn = () => {
    const [showPassword,setShowPassword]=React.useState(false)

    const form=useForm<z.infer<typeof SignInSchema>>({
        mode:'onChange',
        resolver:zodResolver(SignInSchema),
        defaultValues:{
            email:'',
            password:'',
        }
    })

    const onSubmit=(data:z.infer<typeof SignInSchema>)=>{
        console.log(data)
    }

  return (
    <>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="email" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <div className='relative'>
                            <Input placeholder="Password" type={showPassword?'text':'password'} {...field} />
                            <button onClick={()=>setShowPassword(!showPassword)} type='button' className='absolute right-2 top-1/2 -translate-y-1/2 z-10'>
                               {showPassword?<LuEye/>:<LuEyeOff/>}
                            </button>
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
                />
                <AuthButton type='sign-in' message='' />
            </form>
        </Form>
        <div className='flex items-center gap-2 w-full mt-6 mb-4'>
            <span className='h-0.5 w-full bg-slate-500 rounded-full'></span>
            <p>Or</p>
            <span className='h-0.5 w-full bg-slate-500 rounded-full'></span>
        </div>
        <div className='flex gap-2'>
            <button className='flex-1 text-center py-4 rounded-md shadow-lg shadow-slate-800/50 font-semibold hover:bg-slate-600 hover:text-slate-100 transition-all duration-100'>
                <span>Google</span>
            </button>
            <button className='flex-1 text-center py-4 rounded-md shadow-lg shadow-slate-800/50 font-semibold hover:bg-slate-900 hover:text-slate-100 transition-all duration-100'>
                <span>Github</span>
            </button>
        </div>
    </>
  )
}

export default FormSignIn
