'use server'

import prisma from "@/lib/prisma"



export const createNewCategory=async(newCategory:string)=>{
    try {
        const category=await prisma.category.create({
            data:{
                category:newCategory
            }
        })
        if(category){
            return true
        }
    } catch (error) {
        return false
    }
}


export const deleteCategory=async(id:string)=>{
    try {
        const category=await prisma.category.delete({
            where:{
                id
            }
        })
        if(category){
            return true
        }
    } catch (error) {
        return false
    }
}