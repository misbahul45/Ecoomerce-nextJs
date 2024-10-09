'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Loader from '../ui/Loader'
import { sleep } from '../create-post/FormProducts'
import { updatePassword } from '@/actions/email.actions'
import { useToast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'

interface Props{
    idUser:string
}

const FormSchema = z.object({
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters' })
  }).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })

const FormPassword = ({ idUser }:Props) => {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(FormSchema), 
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  })
  const onSubmit = async(data: z.infer<typeof FormSchema>) => {
      await sleep()
      const message=await updatePassword(data.password,idUser)
      form.reset()
      if(message){
          toast({
              title:"Success",
              description:"Update password success",
              variant:'default'
          })
          router.push('/sign-in')
      }else{
          toast({
              title:"Error",
              description:"Update password failed",
              variant:'destructive'
          })
      }
  }
  return (
    <div className='w-full max-w-xl mx-auto mt-4 p-4 rounded shadow-xl shadow-slate-600/20'>
        <h2 className='text-xl font-semibold text-blue-500/80 text-center'>Update Your Password Account</h2>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="Update new password" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="Confirm new password" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" disabled={form.formState.isSubmitting} className='w-full'>
                    {form.formState.isSubmitting ?
                    <>
                        <Loader size='4' color='white'  />
                        <span>Updating...</span>
                    </>
                    : 'Update to new password'}
                </Button>
            </form>
        </Form>
    </div>
  )
}

export default FormPassword
