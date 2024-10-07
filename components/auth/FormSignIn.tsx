'use client'
import React, { useEffect } from 'react'
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
import { signInUser } from '@/actions/users.action'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { SignInSchema } from '@/schema/auth.schema'
import { sleep } from '../create-post/FormProducts'

const FormSignIn = () => {
    const [showPassword,setShowPassword]=React.useState(false)
    const [error,setError]=React.useState('')

    const router=useRouter()



    const form=useForm<z.infer<typeof SignInSchema>>({
        mode:'onChange',
        resolver:zodResolver(SignInSchema),
        defaultValues:{
            email:'',
            password:'',
        }
    })

    const onSubmit=async(data:z.infer<typeof SignInSchema>)=>{
       await sleep()
       const value:any=await signInUser(data)
       if(value?.error){
        setError(value?.error)
       }
       router.refresh()
    }

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError('')
            }, 3000)
        }
    },[error])
  return (
    <>
        {error && (
            <p className='py-2 px-4 rounded bg-red-100 text-red-400'>
                {error}
            </p>
        )}
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
                    <FormLabel className='flex justify-between items-center'>
                        <span>Password</span>
                        <Link href={'/forgot-password'} className='text-blue-400 text-sm'>Forgot your password?</Link>
                    </FormLabel>
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
                <AuthButton type='sign-in' message={`Sign in`} loading={form.formState.isSubmitting} />
            </form>
        </Form>
    </>
  )
}

export default FormSignIn
