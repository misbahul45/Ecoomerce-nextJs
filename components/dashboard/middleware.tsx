'use client'
import { useRouter } from 'next/navigation'
import React from 'react'


const AdminMiddleware = ({user }:{ user:null | User }) => {
    const router=useRouter()
    if(!user){
        router.push('/sign-in')
    }

    if(user?.role!=='admin'){
        router.push('/')
    }
    return null
}

export default AdminMiddleware
