import { z } from "zod";

export const AddressOrderSchema = z.object({
    address : z.string().min(3, { message: "address can't be empty" }),
    city : z.string().min(3, { message: "city can't be empty" }),  
    country : z.string().min(3, { message: "country can't be empty" }),
    postal : z.string().min(3, { message: "postal can't be empty" }),
})

export const PaymentSchema=z.object({
    methode:z.enum(["cod","stripe"],{
        required_error:"You need to select a methode payment."
    })
})