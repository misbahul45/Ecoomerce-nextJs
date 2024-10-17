'use server'
import prisma from "@/lib/prisma"

export const createNewPoster=async(newPoster: { image:string } [])=>{
    try {
        await prisma.poster.createMany({
            data: newPoster,
        })
        return true
    } catch (error) {
        return false        
    }
}


export const deletePoster=async(id:string)=>{
    try {
        await prisma.poster.delete({
            where:{
                id
            }
        })
        return true
    } catch (error) {
        return false
    }
}