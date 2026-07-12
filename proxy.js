import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function proxy(req) {
    const { pathname, search } = req.nextUrl;
    const token = req.nextauth.token;

    const authRoutes = [
      "/login",
      "/register",
      "/forgot-password",
      "/verify-otp",
    ];

    if (authRoutes.includes(pathname) && !token) {
      return NextResponse.next();
    }

    if (authRoutes.includes(pathname) && token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (!token) {
      const loginUrl = new URL("/login", req.url);

      loginUrl.searchParams.set("callbackUrl", pathname + search);

      return NextResponse.redirect(loginUrl);
    }

 if (pathname.startsWith("/dashboard/admin")) {
   if (token.role !== "admin") {
     return NextResponse.redirect(new URL("/403", req.url));
   }
 }

 if (pathname.startsWith("/dashboard/user")) {
   if (token.role !== "user") {
     return NextResponse.redirect(
       new URL(`/dashboard/${token.email}`, req.url),
     );
   }
 }
 if (pathname.startsWith("/dashboard") && !token) {
   return NextResponse.redirect(new URL("/login", req.url));
 }
      console.log(token);

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  },
);

export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*"],
};
