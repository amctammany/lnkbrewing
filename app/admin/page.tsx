import { auth } from "@/auth";
import { unauthorized } from "next/navigation";
import React from "react";

export default async function AdminPage() {
  const session = await auth();
  if (!session) {
    return unauthorized();
  }
  const { user } = session;
  return <div>{user.name}</div>;
}
