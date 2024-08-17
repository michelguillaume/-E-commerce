import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import Resend from "next-auth/providers/resend";

import { sendVerificationRequest } from "@/lib/authSendRequest";

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Resend({
            from: "no-reply@guillaume-michel.com",
            normalizeIdentifier(identifier: string): string {
                // Get the first two elements only,
                // separated by `@` from user input.
                let [local, domain] = identifier.toLowerCase().trim().split("@")
                // The part before "@" can contain a ","
                // but we remove it on the domain part
                domain = domain.split(",")[0]
                return `${local}@${domain}`

                // You can also throw an error, which will redirect the user
                // to the sign-in page with error=EmailSignin in the URL
                // if (identifier.split("@").length > 2) {
                //   throw new Error("Only one email allowed")
                // }
            },
            sendVerificationRequest: sendVerificationRequest
        })
    ],
    debug: process.env.NODE_ENV === "development",
    secret: process.env.AUTH_SECRET,
});
