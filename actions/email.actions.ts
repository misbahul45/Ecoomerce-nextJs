'use server'
import ResetPassword from '@/components/emails/ResetPassword';
import prisma from '@/lib/prisma';
import { Resend } from 'resend';
import * as bcrypt from 'bcrypt'

const resend = new Resend(process.env.RESEND_API_KEY as string);

export const sendEmail = async (email: string) => {
  const randomKode = Math.random().toString(36).substring(2, 15) 
                     + Math.random().toString(36).substring(2, 15);
    try {              
        const user = await prisma.user.findUnique({
            where: {
              email: email,
            },
        });

        if (!user) {
            return { success:false, idUser:null }
        }

        await prisma.resetPasswordToken.create({
            data: {
            userId: user.id,
            token: randomKode,
            expiresAt: new Date(Date.now() + 3600000),
            },
        });

        const browser = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Reset Password',
            react: ResetPassword({ token: randomKode }),
        });
        console.log(browser)
        return { success:true, idUser:user.id }
    } catch (error) {
        return false
    }
};

export const sendOTP=async(idUser:string,otp:string)=>{
    try {
        const isOTP=await prisma.resetPasswordToken.findFirst({
                where: {
                    token: otp,
                }
        })
        if(!isOTP){
            return false
        }

        await prisma.resetPasswordToken.delete({
            where:{
                userId:idUser
            }
        })
    
        return true
    } catch (error) {
        return false
    }
}

export const updatePassword=async(password:string,idUser:string)=>{
  try {
    const isOTP=await prisma.resetPasswordToken.findFirst({
        where: {
            userId:idUser
        }
    })

    if(isOTP){
        return false
    }

   const hashedPassword = await bcrypt.hash(password, 10);
   await prisma.user.update({
    where:{
      id:idUser
    },
    data:{
      password:hashedPassword
    }
   })
   return true
  } catch (error) {
    
  }
}