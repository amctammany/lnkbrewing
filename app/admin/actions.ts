"use server";
import { signOut, signIn } from "@/auth";
export const signout = async () => {
  await signOut();
};
export const signin = async () => {
  await signIn();
};
