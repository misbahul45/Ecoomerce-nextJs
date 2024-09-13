'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Form,FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Button } from '../ui/button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import Link from 'next/link'

const ForgotPasswordSchema=z.object({
    email:z.string().email({ message:'invalid email' }),
})

const FormEmail = () => {
    const form=useForm<z.infer<typeof ForgotPasswordSchema>>({
        mode:'onChange',
        resolver:zodResolver(ForgotPasswordSchema),
        defaultValues:{
            email:''
        }
    })

    const onSubmit=(values:z.infer<typeof ForgotPasswordSchema>)=>{
        console.log(values)
    }

  return (
    <div className='w-full shadow-xl shadow-black/20 px-8 py-6 rounded-lg'>
        <h2 className='text-xl font-semibold text-blue-500/80'>Reset password</h2>
        <p className='text-slate-500 text-sm mb-4 mt-1'>Enter the email address associated with your account and we'll send you a link to reset your password.</p>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="User email" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit">Submit</Button>
            </form>
            </Form>
            <Link href={'/sign-in'} className='text-blue-500/80 mt-4 text-center text-lg block'>Back to sign in</Link>
    </div>
  )
}

export default FormEmail
