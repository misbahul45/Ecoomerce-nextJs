'use server'
import * as bcrypt from 'bcrypt'
import { prisma } from "@/lib/prisma"
import { signIn } from '@/lib/auth'
import { AuthError } from 'next-auth'

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

export const comparePassword=async(password:string,userPassword:string)=>{
    return await bcrypt.compare(password,userPassword)
}
export const signInUser=async(data : Partial<User>)=>{
    try {
        await signIn('credentials', {
            ...data,
            redirectTo:`/`,
        })
        return 'Successfully signed in!'
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" }
                default:
                    return { error: "Something went wrong!" }
            }
        }
        console.log(error)
        throw error
    }   
}