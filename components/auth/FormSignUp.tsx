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
import { createUsers } from '@/actions/users.action'
import AuthButton from './AuthButton'

const SignInSchema=z.object({
    name:z.string().min(3),
    email:z.string().email(),
    password:z.string().min(8),
})

const FormSignUp = () => {
    const [showPassword,setShowPassword]=React.useState(false)
    const [successMessage,setSuccessMessage]=React.useState('')
    const form=useForm<z.infer<typeof SignInSchema>>({
        mode:'onChange',
        resolver:zodResolver(SignInSchema),
        defaultValues:{
            name:'',
            email:'',
            password:'',
        }
    })

    const onSubmit=async(data:z.infer<typeof SignInSchema>)=>{
        const message=await createUsers(data)
        setSuccessMessage(message)
    }
  return (
    <>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                        <Input placeholder="name" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
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
                <AuthButton type='Create an account' message={successMessage} />
            </form>
        </Form>
    </>
  )
}

export default FormSignUp
