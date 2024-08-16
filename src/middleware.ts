import { auth } from "@/auth"
import { NextResponse } from 'next/server'

export default auth((req) => {
    const { pathname } = req.nextUrl;

    if (req.auth && ["/login", "/authentication"].includes(pathname)) {
        return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    }
    return NextResponse.next();
});
