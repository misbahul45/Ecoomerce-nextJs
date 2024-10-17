'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const createComment=async(newComment:any)=>{
    try{
        const isComment=await prisma.comment.findUnique({
            where:{
             productId_authorId:{
                productId:newComment.productId,
                authorId:newComment.authorId
             }   
            }
        })
        if(isComment){
            return false
        }
        await prisma.comment.create({
            data:{
                productId:newComment.productId,
                authorId:newComment.authorId,
                content:newComment.content,
                rating:{
                    create:{
                        rating:newComment.rating
                    }
                }
            },  
        })
        revalidatePath('/products')
        
        return true;
    }catch(error){
        console.log(error)
        return false;
    }
}

export const deleteComment=async(commentId:string)=>{
    try{
        await prisma.comment.delete({
            where:{
                id:commentId
            }
        })
        revalidatePath('/products')
        return true
    }catch(error){
        console.log(error)
        return false
    }
}