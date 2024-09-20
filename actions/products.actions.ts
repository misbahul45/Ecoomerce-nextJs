'use server'

import prisma from "@/lib/prisma"
import { CreateProductSchema } from "@/schema/product.schema"
import { z } from "zod"

type CreateProduct=z.infer<typeof CreateProductSchema>

const createSlug=(title:string)=>{
    return title
    .toLowerCase()
    .replace(/ /g,'-')
    .replace(/[^\w-]+/g,'')
    .substring(0,50)
}

export const createNewProducts=async(product:CreateProduct)=>{
    const validation=CreateProductSchema.safeParse(product)
    const slug=createSlug(product.name)

    try {
        
        if(!validation.success){
            return { succes:false, message:validation.error.errors[0].message }
        }

        await prisma.product.create({
            data:{
                ...product,
                slug
            }
        })
        return { success: true, message: 'Product created successfully' };
    } catch (error) {
        return { succes:false, message:'Something went wrong' }
    }

}