import { prisma } from "@/lib/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextResponse } from "next/server";
export const AuthOptions: NextAuthConfig = {
  secret: "secret",
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async authorized({ request, auth }) {
      const url = request.nextUrl;
      console.log(auth);

      if (request.method === "POST") {
        const { authToken } = (await request.json()) ?? {};
        console.log(authToken);
        // If the request has a valid auth token, it is authorized
        //const valid = await validateAuthToken(authToken);
        if (0 === 0) return true;
        return NextResponse.json("Invalid auth token", { status: 401 });
      }

      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth?.user;
    },
  },
};
export const {
  handlers: { GET, POST },
  auth,
} = NextAuth(AuthOptions);
