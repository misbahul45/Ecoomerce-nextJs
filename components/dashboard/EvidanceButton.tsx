'use client'
import React from 'react'
import { Button } from '../ui/button'
import { approveOrderEvidence } from '@/actions/evidence.actions'
import { useRouter } from 'next/navigation'

interface Props{
   order:any
}

const EvidanceButton = ({order}:Props) => {
    const router=useRouter()
    const approveClick=async()=>{
        await approveOrderEvidence(order,order.id)
    }

    const rejectClick=async()=>{}
    if(!order?.evidance){
        router.push('/dashboard')
    }
  return (
    <div className="flex gap-4 justify-center items-center mt-4 gpa-4">
        <Button variant="default" onClick={approveClick}>Approve Evidance</Button>
        <Button variant="destructive" onClick={rejectClick}>Reject Evidance</Button>
    </div>
  )
}

export default EvidanceButton
