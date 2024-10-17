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

export const getProducts = async (productName?: string) => {
    try {
      const products = await prisma.product.findMany({
        orderBy: {
          createdAt: 'desc'
        },
        take: 10,
        where: {
          name: {
            contains: productName || '',
            mode: 'insensitive'
          }
        }
      })
      return products
    } catch (error) {
      return []
    }
  }

export const updateProducts=async(id:string)=>{
    try {
      const product=await prisma.product.findUnique({
        where:{
            id
        }
      })
      if(product?.type==="SELL"){
        return false
      }
        await prisma.product.update({
            where:{
                id
            },
            data:{
               type:"SELL"
            }
        })
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export const deleteProducts=async(id:string)=>{
    try {
        await prisma.product.delete({
            where:{
                id
            }
        })
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}


export const getAllProduct=async(page:number)=>{

    try{
        const products=await prisma.product.findMany({
          take:8,
          skip:(page-1)*8,
          where:{
            type:"SELL"
          },
          orderBy:{
            createdAt:"desc"
          }
        })  
        return products
    }catch(error){
        console.log(error)
        return []
    }
}