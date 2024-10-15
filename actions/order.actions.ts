'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const createProductOrder = async (userId: string, productChechout: any) => {
    const order=await prisma.order.create({
        data:{
            userId,
            products: {
                create: productChechout.map((productChechout:any )=> ({
                    productId: productChechout.productId,
                    size: productChechout.size,
                    color: productChechout.color,
                    quantity: productChechout.quantity,
                  }))
            }
        }
    })

    return order   
}



export const updateProductOrder = async (orderId: string, value:any) => {
    console.log(value)
    try {
        await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                ...value
            }
        })
        revalidatePath('/checkout')
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}


export const deleteOrder=async(orderId:string)=>{
    try {
        await prisma.order.delete({
            where:{
                id:orderId
            }
        })
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}