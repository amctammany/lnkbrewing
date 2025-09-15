import { SignInButton } from "@/components/Button/SignInButton";
import React from "react";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { redirect_url } = await searchParams;
  return (
    <div>
      <SignInButton redirectTo={redirect_url as string} />
    </div>
  );
}
