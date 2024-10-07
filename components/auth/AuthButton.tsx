'use client'
import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { useToast } from '../ui/use-toast'
import { ToastAction } from '@radix-ui/react-toast'
import { useRouter}  from 'next/navigation'
import Loader from '../ui/Loader'

interface Props{
    message:string
    type:'sign-in'|'Create an account'
    loading:boolean
}

const AuthButton = ({message, type, loading}:Props) => {
    const { toast }=useToast()
    const router=useRouter()
    useEffect(() => {
        if(message){
            toast({
                ...((message.includes('Failed') || message.includes('exists')) && { variant:'destructive' }),
                ...((message.includes('Failed')|| message.includes('exists')) && { action: <ToastAction altText="Try again">Try again</ToastAction> }),
                description:message
            })
            message.includes('Success') && router.push('/sign-in')
            message.includes('exists') && router.push('/sign-in')
        }
    },[message,toast])
  return (
    <Button type="submit" disabled={loading} className={`${type==='Create an account' && 'bg-blue-700 hover:bg-blue-800'} w-full font-semibold flex items-center justify-center`}>{
      loading ? <>
        <Loader size="4" color="white"/>
        <span className='ml-2'>Loading...</span>
      </> : message
    }</Button>
  )
}

export default AuthButton
