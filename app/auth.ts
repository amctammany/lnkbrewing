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
      account(account) {
        // https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/refreshing-user-access-tokens#refreshing-a-user-access-token-with-a-refresh-token
        const refresh_token_expires_at =
          Math.floor(Date.now() / 1000) +
          Number(account.refresh_token_expires_in);
        return {
          access_token: account.access_token,
          expires_at: account.expires_at,
          refresh_token: account.refresh_token,
          refresh_token_expires_at,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
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
