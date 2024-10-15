import { approveOrderEvidence } from '@/actions/evidence.actions'
import EvidanceButton from '@/components/dashboard/EvidanceButton'
import AdminMiddleware from '@/components/dashboard/middleware'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import Image from 'next/image'
import React from 'react'

interface Props{
  params:{
    orderId:string
  }
}

const page = async({params:{orderId}}:Props) => {
  const session =await auth()
  const user=session?.user? await prisma.user.findFirst({
    where:{
      email:session.user.email
    }
  }):null

  const order=await prisma.order.findUnique({
    where:{
      id:orderId
    },
    include:{
      user:true,
      evidance:true
    }
  })


  return (
    <div className='w-full'>
      <AdminMiddleware user={user as User | null} />
      <h1 className='text-slate-600 font-semibold text-center'>Check Order {order?.user.name}</h1>
      <h2 className='text-slate-600 font-semibold text-center'>Payment Evidance</h2>
      <Image src={order?.evidance?.img!} alt={`Evidance image`} width={500} height={500} className={`object-cover mx-auto w-full max-w-sm h-auto shadow-xl shadow-slate-800/20 rounded-xl`} loading="lazy" />
      <EvidanceButton order={order} />
    </div>
  )
}

export default page
