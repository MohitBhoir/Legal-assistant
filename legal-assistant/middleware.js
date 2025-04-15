// middleware.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
    // const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    // console.log('\n\n\nInside middleware...\n\n\n')
    // if (token && !token.role && req.nextUrl.pathname !== '/select-role') {
    //     return NextResponse.redirect(new URL('/select-role', req.url));
    // }
    //
    // return NextResponse.next();
}

export const config = {
    // matcher: ['/templates'],
};
