'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Form,FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Button } from '../ui/button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import Link from 'next/link'
import { useToast } from '../ui/use-toast'
import { sendEmail } from '@/actions/email.actions'
import { useRouter } from 'next/navigation'
import Loader from '../ui/Loader'
import { sleep } from '../create-post/FormProducts'

const ForgotPasswordSchema=z.object({
    email:z.string().email({ message:'invalid email' }),
})


const FormEmail = () => {
    const { toast }=useToast()
    const router=useRouter()

    const form=useForm<z.infer<typeof ForgotPasswordSchema>>({
        mode:'onChange',
        resolver:zodResolver(ForgotPasswordSchema),
        defaultValues:{
            email:''
        }
    })

    const onSubmit=async({ email }:z.infer<typeof ForgotPasswordSchema>)=>{
       const value:any=await sendEmail(email)
       form.reset()
       await sleep()
       if(value?.success){
        toast({
            title:"Success",
            description:"We have send you an email to reset your password",
            variant:'default'
        })
        router.push(`/forgot-password/${value.idUser}/otp`)
       }else{
        toast({
            title:"Error",
            description:"User not found, please register first",
            variant:'destructive'
        })
        router.push('/sign-up')
       }
    }

  return (
    <div className='w-full shadow-xl shadow-black/20 px-8 py-6 rounded-lg'>
        <h2 className='text-xl font-semibold text-blue-500/80'>Reset password</h2>
        <p className='text-slate-500 text-sm mb-4 mt-1'>Enter the email address associated with your account and we&lsquo;ll send you a link to reset your password.</p>
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
                <Button disabled={form.formState.isSubmitting} type="submit" className='flex justify-center items-center'>{
                    form.formState.isSubmitting ?<>
                    <Loader size={'4'} color={'white'}/>
                    <span>Checking...</span>
                    </>
                    :
                    "Send email"
                    }</Button>
            </form>
            </Form>
            <Link href={'/sign-in'} className='text-blue-600 mt-4 text-center text-lg block hover:text-blue-900 transition-all duration-75'>Back to sign in</Link>
    </div>
  )
}

export default FormEmail
