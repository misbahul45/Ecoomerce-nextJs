'use server'

import prisma from "@/lib/prisma"
import { CartOnProductSchema, CreateProductSchema } from "@/schema/product.schema"
import { revalidatePath } from "next/cache"
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


interface CartOnProduct{
    productId:string
    quantity:number
    size?:string
    color?:string,
    userId:string
}

export const addProductsTocart=async(cartOnProduct:CartOnProduct)=>{
    const validation=CartOnProductSchema.safeParse(cartOnProduct)
    if(!validation.success){
        return { succes:false, message:validation.error.errors[0].message }
    }

    try {
        const cart=await prisma.cart.findFirst({
            where:{
                userId:cartOnProduct.userId
            }
        })
        if(cart?.id){
            const { userId,...value } = cartOnProduct;
            await prisma.cartOnProduct.create({
                data:{
                    ...value,
                    cartId:cart?.id 
                }
            })
                return { success: true, message: 'Product added to cart successfully' };
        }
        return { succes:false, message:'Something went wrong' }

    } catch (error) {
        return { succes:false, message:'Product already in cart' }
    }
}

export const updateCartProduct=async(cartId:string,productId:string, quantity:number)=>{
    await prisma.cartOnProduct.update({
        where:{
            cartId_productId:{
                productId,
                cartId
            }
        },
        data:{
            quantity
        }
    })
    revalidatePath('/cart')
}
