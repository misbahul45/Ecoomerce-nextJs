'use client'
import { AddressOrderSchema } from '@/schema/order.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Textarea } from "@/components/ui/textarea"
import { ImLocation2 } from "react-icons/im"; // Standardizing to ImLocation2
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { updateProductOrder } from '@/actions/order.actions'
import { useToast } from '../ui/use-toast'
import { sleep } from '../create-post/FormProducts'
import Loader from '../ui/Loader'

interface Props {
    id:string
}

const FormAddress = ({ id }:Props) => {
    const router=useRouter()
    const { toast }=useToast()
    const [loading,setLoading]=React.useState(false)

    const form = useForm<z.infer<typeof AddressOrderSchema>>({
        mode: 'onChange',
        resolver: zodResolver(AddressOrderSchema),
        defaultValues: {
            address: '',
            city: '',
            country: '',
            postal: ''
        }
    })

    const onSubmit=async(data:z.infer<typeof AddressOrderSchema>)=>{
        setLoading(true)
        const success=await updateProductOrder(id, data)
        await sleep()
        if(success){
            setLoading(false)
            router.push(`/checkout/${id}/payment`)    
            return;        
        }
        setLoading(false)
        toast({
            title: 'Error',
            description: 'Please Input Valid Data',
            variant: 'destructive',
        })
    }

    return (
        <div className='w-full max-w-xl mx-auto mt-5'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input placeholder="Your Country" {...field} className='pl-6' />
                                        <ImLocation2 className="absolute top-2.5 left-1 text-slate-500" />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input placeholder="Your City" {...field} className='pl-6' />
                                        <ImLocation2 className="absolute top-2.5 left-1 text-slate-500" />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="postal" 
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Postal Code</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input placeholder="Your Postal Code" {...field} className='pl-6' />
                                        <ImLocation2 className="absolute top-2.5 left-1 text-slate-500" />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Textarea placeholder="Your Location" {...field} className='pl-6' />
                                        <ImLocation2 className="absolute top-2.5 left-1 text-slate-500" /> {/* Using the same icon */}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full flex justify-center gap-3">
                        {loading?
                        <>
                            <span>Loading...</span>
                            <Loader size='4' color='white' />
                        </>:'Continue'}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default FormAddress
