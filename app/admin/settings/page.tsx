import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/client";
import { AdminForm } from "./AdminForm";
import { updateUser } from "../actions";
import { ButtonLink } from "@/components/Button/Button";

export default async function AdminSettingsPage() {
  const session = await auth();
  if (!session) return redirect("/");
  const user = await prisma.user.findFirst({
    where: { email: session.user?.email },
    include: {
      recipes: { select: { name: true, id: true, styleIdentifer: true } },
    },
  });

  return <AdminForm user={user} action={updateUser} />;
}
