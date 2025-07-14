"use client";
import React from "react";
import { useSession } from "next-auth/react";
import SignOutButton from "./SignOutButton";
import SignInButton from "./SignInButton";

export default function AuthButton({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { data: session } = useSession();
  return session ? children || <SignOutButton /> : <SignInButton />;
}
