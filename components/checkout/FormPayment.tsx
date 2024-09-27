"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { PaymentSchema } from "@/schema/order.schema"
import { sleep } from "../create-post/FormProducts"
import { updateProductOrder } from "@/actions/order.actions"
import React from "react"
import Loader from "../ui/Loader"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "../ui/use-toast"

interface Props{
  id:string;
  methode:'stripe'|'cod'
}


function FormPayment({ id, methode }:Props) {
  const [loading, setLoading]=React.useState(false)

  const { toast }=useToast()

  const router=useRouter();

  const form = useForm<z.infer<typeof PaymentSchema>>({
    resolver: zodResolver(PaymentSchema),
    defaultValues:{
      methode:methode || 'cod'
    }
  })

  async function onSubmit(data: z.infer<typeof PaymentSchema>) {
    setLoading(true)
    await sleep()
    const message=await updateProductOrder(id,data)

    if(message){
      setLoading(false)
      router.push(`/checkout/${id}/order`)  
      return;
    }
    toast({
      title:"Error",
      description:"Please input valid data",
      variant:'destructive'
    })
    setLoading(false)
  }

  return (
    <div className="flex justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm space-y-6">
          <FormField
            control={form.control}
            name="methode"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Select Payment Method</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3">
                      <FormControl>
                        <RadioGroupItem value="cod" />
                      </FormControl>
                      <FormLabel className="font-normal">Cash on Delivery</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3">
                      <FormControl>
                        <RadioGroupItem value="stripe" />
                      </FormControl>
                      <FormLabel className="font-normal">Credit Card (Stripe)</FormLabel>
                    </FormItem>
                  </RadioGroup>
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
          <Link href={`/checkout/${id}/address`} className="mt-4">
              <Button variant={'outline'} className="w-full">
                Back
              </Button>
          </Link>
        </form>
      </Form>
    </div>
  )
}

export default FormPayment
