'use server'
import * as bcrypt from 'bcrypt'
import { signIn } from '@/lib/auth'
import { AuthError } from 'next-auth'
import prisma from '@/lib/prisma'

export const createUsers=async(newUser:Partial<User>)=>{
    try {
        const isUserCreated=await prisma.user.findUnique({
            where:{
                email:newUser.email
            }
        })
        if(isUserCreated){
            return 'User already exists'
        }
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
        const user=await prisma.user.findUnique({
            where:{
                email:data.email
            }
        })

        if(!user){
            return { error: "Account not found" }
        }

        const isMatch=await comparePassword(data.password as string,user.password as string)

        if(!isMatch){
            return { error: "Invalid password, please try again" }
        }

        await signIn('credentials', {
            ...data,
            redirectTo:'/'
        })
        return 'Successfully signed in!'
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" }
                default:
                    return { error: "Sign In Error" }
            }
        }
        throw error
    }   
    
}