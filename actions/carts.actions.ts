'use server'
import prisma from "@/lib/prisma";
import { CartOnProductSchema } from "@/schema/product.schema";
import { revalidatePath } from "next/cache";

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
        console.log(error)
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

export const deleteProductFromCart=async(cartId:string,productId:string)=>{
    try {
        await prisma.cartOnProduct.delete({
            where:{
                cartId_productId:{
                    productId,
                    cartId
                }
            }
        })
        revalidatePath('/cart')
    } catch (error) {
        console.log(error)
    }
}


