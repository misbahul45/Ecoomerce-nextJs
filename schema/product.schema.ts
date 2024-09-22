import { z } from "zod";

export const CreateProductSchema=z.object({
    name:z.string().min(3,{message:'name must be at least 3 characters'}),
    description:z.string().min(3,{message:'description must be at least 3 characters'}),
    price:z.number({message:'price must be a number'}).min(1,{ message: 'price must be at least 1' }),
    images:z.array(z.string()).min(1),
    stock:z.number({message:'stock must be a number'}).min(1, { message: 'stock must be at least 1' }),
    brand:z.string().optional(),
    material:z.string().optional(),
    style:z.string().optional(),
    size:z.array(z.string()).optional(),
    model:z.string().optional(),
    colors:z.array(z.string()).optional(),
    location:z.string().min(3,{message:'location must be at least 3 characters'}),
    categoryId:z.string().min(3,{message:'category must be at least 3 characters'}),
    type:z.string().min(3).refine((value)=>value==='FEATURE' || value==='SELL','type must be products')
})

export const CartOnProductSchema=z.object({
    productId:z.string(),
    quantity:z.number(),
    size:z.string().optional(),
    color:z.string().optional(),
    userId:z.string()
})