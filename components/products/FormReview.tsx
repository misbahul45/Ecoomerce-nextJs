'use client'
import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { REVIEW_STAR } from '@/constans'
import { Button } from '../ui/button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createComment } from '@/actions/comments.actions'
import { sleep } from '../create-post/FormProducts'
import Loader from '../ui/Loader'
import { useToast } from '../ui/use-toast'
import Reviews from './Reviews'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const FORM_SCHEMA = z.object({
  content: z.string().min(3, { message: "review cannot empty" }),
  rating: z.number().min(0)
})

interface Props{
  productId:string | null
  authorId:string | null
  comments:Comment[]
}

const FormReview = ({ productId, authorId, comments }:Props) => {
  const { data }=useSession()
  const router=useRouter()
  const [loading,  setLoading]=React.useState(false)
  const { toast }=useToast()

  const form=useForm({
    resolver:zodResolver(FORM_SCHEMA),
    defaultValues:{
      content:'',
      rating:0
    }
  })
  
  const onSubmit=async(value:z.infer<typeof FORM_SCHEMA>)=>{
    if(!data?.user?.email){
      router.push('/sign-in')
      return;
    }
    setLoading(true)
    await sleep()
    const dataReturn=await createComment({
      ...value,
      productId,
      authorId
    })
    if(!dataReturn){
      toast({
        title:"Error",
        description:"User already reviewed",
        variant:'destructive'
      })
      return;
    }
    form.reset()
    setLoading(false)
  }

  return (
    <div className='lg:mt-8 mt-6'>
      <h1 className='text-slate-600 font-semibold text-center'>Write Your Reviews</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Select onValueChange={(value)=>form.setValue('rating',Number(value))}> 
              <SelectTrigger className={`w-full mb-4 mt-2`}>
                  <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent className='backdrop-blur-md'>
                {REVIEW_STAR.map((review)=>(
                  <SelectItem key={review} value={`${review}`}>
                    {Array.from({ length: review }).map((_, index) => (
                      <span key={index}>⭐</span>
                    ))}
                  </SelectItem>
                ))}
              </SelectContent>
          </Select>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Write your review" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' disabled={loading} className='w-full mt-4 flex justify-center'>
            {loading?
              <Loader size='4' color='white' />
              :
              "Submit"
            }
          </Button>
        </form>
      </Form>
      <br />
      <Reviews comments={comments} />
    </div>
  )
}

export default FormReview
