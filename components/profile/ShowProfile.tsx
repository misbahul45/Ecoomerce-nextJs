import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TABLE_ORDER } from '@/constans'
import { Edit, EyeIcon } from 'lucide-react'
import Link from 'next/link'

export const totalPrice=(products:any)=>{
  return products.reduce((total:any, product:any) => total + product.quantity * product.product.price, 0)
}

const ShowProfile = async() => {
    const session=await auth()
    const user=session?.user
    const orders=await prisma.order.findMany({
        where: {
            userId: user?.id
        },
        include: {
            products: {
                include: {
                    product: true
                }
            }
        }
    })

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
        <h1 className='text-3xl font-bold text-blue-500'>Profile Informations</h1>
        <Avatar className='mt-6 shadow-xl shadow-slate-600/20 rounded-full'>
            <AvatarImage src={user?.image || ''} alt="avatar" className='size-32 rounded-full' />
            <AvatarFallback><div className="size-32 rounded-full border-t-4 border-slate-700 animate-spin"></div></AvatarFallback>
        </Avatar>
        <div className="flex gap-4 my-4">
            <p><span className="font-bold">Name :</span> {user?.name}</p>
            <p><span className="font-bold">Email :</span> {user?.email}</p>
        </div>
        <div className="w-full">
          <Table>
            <TableCaption>My Orders</TableCaption>
            <TableHeader>
              <TableRow>
                {TABLE_ORDER.map((item, index) => (
                  <TableHead key={index}>{item}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index+1}</TableCell>
                  <TableCell>{item.country}</TableCell>
                  <TableCell>{item.city}</TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell>{item.postal}</TableCell>
                  <TableCell>{totalPrice(item.products).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.status==="pending"?
                    <Link href={`/checkout/${item.id}/address`} className='cursor-pointer p-2 rounded-full hover:bg-slate-100'>
                      <Edit />
                    </Link>
                  :
                  <Link href={`/checkout/${item.id}/order`} className='curson-pointer p-2 rounded-ful hover:bg-slate-100'>
                    <EyeIcon />
                  </Link>
                  }</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
    </div>
  )
}

export default ShowProfile
