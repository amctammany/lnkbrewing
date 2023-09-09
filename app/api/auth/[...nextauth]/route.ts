import { prisma } from "@/lib/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  secret: "secret",
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: { strategy: "jwt" },
  //callbacks: {
  //async session({ session, token, user }) {
  //console.log({ token, user });
  //session.user = token.user;
  //return session;
  //},
  //async jwt({ token, user, account, profile }) {
  //console.log({ token, user, profile, account });
  //const currentUser = await prisma.user.findFirst({
  //where: {
  //email: token.email,
  //},
  //});
  //token.user = currentUser;
  //console.log(token, currentUser);
  //return token;
  //},
  //},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
