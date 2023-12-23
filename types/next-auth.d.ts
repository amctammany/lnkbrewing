import { UserPreferences } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    preferences: UserPreferences;
    user: {
      /** The user's postal address. */
      address: string;
      username: string;
      preferences: UserPreferences;
    } & DefaultSession["user"];
  }
}
