import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import Resend from "next-auth/providers/resend";

// @ts-ignore
export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Resend
    ],
    debug: process.env.NODE_ENV === "development",
    secret: process.env.SECRET,
});
