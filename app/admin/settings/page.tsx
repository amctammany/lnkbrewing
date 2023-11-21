import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/client";
import { AdminForm } from "./AdminForm";
import { updateUser } from "../actions";
import { ButtonLink } from "@/components/Button/Button";

export default async function AdminSettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/");
  const user = await prisma.user.findFirst({
    where: { email: session.user?.email },
    include: {
      recipes: { select: { name: true, id: true, styleIdentifer: true } },
    },
  });

  return (
    <div className="p-3 max-w-2xl">
      <AdminForm user={user} action={updateUser} />
    </div>
  );
}
