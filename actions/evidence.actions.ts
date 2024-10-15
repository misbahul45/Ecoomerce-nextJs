'use server'
import prisma from "@/lib/prisma"

export const createOrderEvidence = async (orderId: string, img: string) => {
    try {
        const order = await prisma.evidance.create({
            data: {
                orderId,
                img
            },
        })
        return order
    } catch (error) {
        console.log("error",error)
        return false
    }
}

export const deleteOrderEvidence = async (id: string) => {
    try {
        await prisma.evidance.delete({
            where: {
                id,
            },
        })
        return true
    } catch (error) {
        return false
    }
}


export const approveOrderEvidence = async (order:any,orderId:string) => {
    await prisma.evidance.delete({
        where:{
          id:order?.evidance?.id
        }
      })
  
      await prisma.order.update({
        where:{
          id:orderId
        },
        data:{
          status:'paid'
        }
      })
}