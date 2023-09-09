//import { withAuth } from "next-auth/middleware";
//import { NextResponse } from "next/server";
//import type { NextRequest } from "next/server";

//// This function can be marked `async` if using `await` inside
////export default function middleware(request: NextRequest) {
////console.log("middleware");
////return NextResponse.redirect(new URL("/home", request.url));
////}

//// middleware is applied to all routes, use conditionals to select

//export default withAuth(function middleware(req) {}, {
//callbacks: {
//authorized: ({ req, token }) => {
//console.log({ req, token });
//if (req.nextUrl.pathname.startsWith("/admin") && token === null) {
//return false;
//}
//return true;
//},
//},
//});
////export const config = {
////matcher: ["/admin", "/recipes/:path?"],
////};
//export { default } from "next-auth/middleware";

//export const config = { matcher: ["/admin/:path*"] };
