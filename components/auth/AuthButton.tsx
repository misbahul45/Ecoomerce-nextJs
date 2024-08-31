'use client'
import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { useToast } from '../ui/use-toast'
import { ToastAction } from '@radix-ui/react-toast'
import { useRouter}  from 'next/navigation'

interface Props{
    message:string
    type:'sign-in'|'Create an account'
}

const AuthButton = ({message, type}:Props) => {
    const { toast }=useToast()
    const router=useRouter()
    useEffect(() => {
        if(message){
            toast({
                ...(message.includes('Failed') && { variant:'destructive' }),
                ...(message.includes('Failed') && { action: <ToastAction altText="Try again">Try again</ToastAction> }),
                description:message
            })
            message.includes('Success') && router.push('/sign-in')
        }
    },[message,toast])
  return (
    <Button type="submit" className={`${type==='Create an account' && 'bg-blue-700 hover:bg-blue-800'} w-full font-semibold`}>{type}</Button>
  )
}

export default AuthButton
