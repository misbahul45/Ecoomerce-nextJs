'use client'
import React from 'react'
import { Input } from '../ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Button } from '../ui/button'
import { createNewCategory } from '@/actions/category.actions'
import { useRouter } from 'next/navigation'
import { useToast } from '../ui/use-toast'
import { sleep } from './FormProducts'
import Loader from '../ui/Loader'

const CategorySchema=z.object({
    category:z.string().min(3,{ message:'Category at least 3 character' })
})

type TypeCategory = z.infer<typeof CategorySchema> 

const FormCategory = () => {
    const router=useRouter()
    const { toast }=useToast()

    const form=useForm<TypeCategory>({
        mode:'onChange',
        resolver:zodResolver(CategorySchema),
        defaultValues:{
            category:''
        }
    })

    const onSubmit = async (values: TypeCategory) => {
        await sleep()
        const data = await createNewCategory(values.category);
        if (data !== undefined) {
            toast({
                description:data ? 'Category created successfully' : 'Category already exists',
                variant:data ?'default':'destructive'
            })
            form.reset()
            router.refresh()
        }
      }
    
  return (
    <>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full px-4 py-2 rounded-xl shadow-xl shadow-slate-500/20 space-y-2'>
                <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className='font-semibold'>Category</FormLabel>
                    <FormControl>
                        <Input placeholder="New category products" {...field} className='capitalize' />
                    </FormControl>
                    <FormDescription>
                        This is the category for your product.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" disabled className='w-full flex justify-center items-center'>
                    {form.formState.isSubmitting ? 
                    <>
                        <Loader size="4" color='white' />
                        <span className='ml-2'>Submitting...</span>
                    </>
                    : 'Submit'}
                </Button>
            </form>
        </Form>
    </>
  )
}

export default FormCategory
