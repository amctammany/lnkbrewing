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
    async session({ session, token, user }) {
      session.preferences = ((token.user || {}) as any).UserPreferences as any;
      session.user = token.user as any;
      return session;
    },
    async jwt({ token, user, account, profile }) {
      const currentUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
        include: { UserPreferences: true },
      });
      token.user = currentUser;
      return token;
    },
  },
};
export const {
  handlers: { GET, POST },
  auth,
} = NextAuth(AuthOptions);
/**
import { prisma } from "@/lib/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
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
  //async session({ session, user, token }) {
  ////session.user.preferences = user;
  //return session;
  //},
  //},
  callbacks: {
    async session({ session, token, user }) {
      session.preferences = (token.user as any).UserPreferences as any;
      session.user = token.user as any;
      return session;
    },
    async jwt({ token, user, account, profile }) {
      const currentUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
        include: { UserPreferences: true },
      });
      token.user = currentUser;
      return token;
    },
  },
};*/
