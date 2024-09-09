import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials"
import { prisma } from "./prisma";
import { comparePassword } from "@/actions/users.action";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string
          }
        });

        if (!user) {
          throw new Error('User not found');
        }

        const isMatch = await comparePassword(credentials.password as string, user.password as string);

        if (!isMatch) {
          throw new Error('Incorrect password');
        }

        return user;
      }
    })
  ],
  pages:{
    signIn:"/sign-in"
  }
});
