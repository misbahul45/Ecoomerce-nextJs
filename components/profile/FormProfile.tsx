'use client'
import { UpdateProfileSchema } from '@/schema/profile.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { UploadButton } from '@/utils/uploadthing'
import { useToast } from '../ui/use-toast'
import { updateUserProfile } from '@/actions/users.action'
import { sleep } from '../create-post/FormProducts'
import Loader from '../ui/Loader'
import { useRouter } from 'next/navigation'

const FormProfile = ({ user }:{ user:User | null }) => {
  const { toast }=useToast()
  const router=useRouter()

  const [userImage, setUserImage]=React.useState<string>(user?.image || '')
  const [loading, setLoading]=React.useState<boolean>(false)

  const form=useForm<z.infer<typeof UpdateProfileSchema>>({
    mode:'onChange',
    resolver:zodResolver(UpdateProfileSchema),
    defaultValues:{
      name:user?.name || '',
      email:user?.email || ''
    }
  })

  const onSubmit=async(value:z.infer<typeof UpdateProfileSchema>)=>{
    setLoading(true)
    const updateData={  
      ...value,
      image:userImage,
    }
    sleep()
    const { success, message }=await updateUserProfile(updateData, user?.id || '')
    toast({
      title:success?"Success":"Error",
      description:message,
      variant:success?"default":"destructive"
    })
    setLoading(false)
    if(success){
      router.push('/profile/show')
    }
  }


  const handleClientUploadComplete=(res:any)=>{
    const image=res.map((image: any) => image.appUrl);
    setUserImage(image[0])
  }

  const handleUploadError = (error: Error) => {
    toast({
      title: 'Error',
      description: 'Cannot upload image',
      variant: 'destructive',
    });
  };

  return (
    <div className='w-full max-w-xl block mx-auto'>
      <div className="size-32 my-4 block mx-auto">
        <Avatar className='shadow-xl shadow-slate-600/20 rounded-full w-full h-full'>
            <AvatarImage src={userImage} alt="avatar" className='w-full h-full rounded-full object-cover' />
            <AvatarFallback><div className="size-32 rounded-full border-t-4 border-slate-700 animate-spin"></div></AvatarFallback>
        </Avatar>
      </div>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={handleClientUploadComplete}
        onUploadError={handleUploadError}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username profile" {...field} />
              </FormControl>
              <FormDescription>Update your username profile</FormDescription>
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
                <Input placeholder="Email profile" {...field} />
              </FormControl>
              <FormDescription>Update your Email profile</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant={'default'} disabled={loading} type='submit' className='w-full flex items-center gap-2'>
          {loading?
            <>
              <span>Looading...</span>
              <Loader size='4' color='white' />
            </>
            :
            "Update Profile"
          }
        </Button>
        </form>
      </Form>
    </div>
  )
}

export default FormProfile
