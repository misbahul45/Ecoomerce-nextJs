import { z } from "zod";

export const UpdateProfileSchema=z.object({
    name:z.string().min(3,{ message:'Username cannot empty' }),
    email:z.string().email({ message:'invalid email' })
})