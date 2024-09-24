'use server'

import prisma from "@/lib/prisma"

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