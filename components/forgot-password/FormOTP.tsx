'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Form,FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Button } from '../ui/button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { sendOTP } from '@/actions/email.actions'
import { useToast } from '../ui/use-toast'
import { sleep } from '../create-post/FormProducts'
import Loader from '../ui/Loader'

const ForgotPasswordSchema=z.object({
    otp:z.string().trim().min(12,{ message:'invalid otp' }),
})

interface Props{
    idUser:string
}

const FormOTP= ({ idUser }:Props) => {
    const router=useRouter()

    const {toast}=useToast()

    const form=useForm<z.infer<typeof ForgotPasswordSchema>>({
        mode:'onChange',
        resolver:zodResolver(ForgotPasswordSchema),
        defaultValues:{
            otp:''
        }
    })

    const onSubmit=async({ otp }:z.infer<typeof ForgotPasswordSchema>)=>{
       const message=await sendOTP(idUser,otp) 
       await sleep()
       form.reset()
       if(message){
        router.push(`/forgot-password/${idUser}/update`)
        return;
       }
       toast({
        title:"Error",
        description:"Invalid otp please try again",
        variant:'destructive'
       })
    }

  return (
    <div className='w-full max-w-xl mx-auto  mt-8 shadow-xl shadow-black/20 px-8 py-6 rounded-lg'>
        <h2 className='text-xl font-semibold text-blue-500/80'>OTP Validations reset password</h2>
        <p className='text-slate-500 text-sm mb-4 mt-1'>Input your OTP validations to reset your password</p>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>OTP Validations</FormLabel>
                    <FormControl>
                      <Input placeholder="OTP input" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button disabled={form.formState.isSubmitting} type="submit" className='flex gap-2 items-center'>
                    {form.formState.isSubmitting ? <>
                        <Loader size="4" color="white" />
                        <span>Submitting...</span>
                    </>: 'Submit'}
                </Button>
            </form>
            </Form>
            <Link href={'/sign-in'} className='text-blue-600 mt-4 text-center text-lg block hover:text-blue-900 transition-all duration-75'>Back to sign in</Link>
    </div>
  )
}

export default FormOTP

