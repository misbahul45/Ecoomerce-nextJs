'use server'
import * as bcrypt from 'bcrypt'
import { prisma } from "@/lib/prisma"

export const createUsers=async(newUser:Partial<User>)=>{
    try {
        const salt=await bcrypt.genSalt(10)
        if(newUser?.password){
            newUser.password=await bcrypt.hash(newUser.password,salt)
        }
        await prisma.user.create({
            data:newUser
        })
        return 'Successfully created User'
    } catch (error) {
        console.log(error)
        return 'Failed to create User'
    }
}