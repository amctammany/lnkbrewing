import { auth } from "@/auth";
import { unauthorized } from "next/navigation";
import React from "react";
import SettingsForm from "@/app/admin/_components/Settings/SettingsForm";
import { updateUserSettings } from "@/app/admin/actions";
import { prisma } from "@/lib/client";

export default async function SettingsPage() {
  const session = await auth();
  if (!session) {
    return unauthorized();
  }
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });
  if (!user) {
    throw new Error("User not found");
  }
  return (
    <div>
      <SettingsForm user={user} action={updateUserSettings} />
    </div>
  );
}
