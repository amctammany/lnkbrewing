import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/client";
import { updateUserPreferences } from "../actions";
import { ButtonLink } from "@/components/Button/Button";
import { AdminPreferencesForm } from "./AdminPreferencesForm";
import { UserPreferences } from "@prisma/client";

export default async function AdminSettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/");
  const user = await prisma.user.findFirst({
    where: { email: session.user?.email },
    include: {
      UserPreferences: true,
    },
  });
  console.log(user);
  return (
    <div className="p-3 max-w-2xl">
      <AdminPreferencesForm
        src={user?.UserPreferences || ({ userId: user?.id } as UserPreferences)}
        action={updateUserPreferences}
      />
    </div>
  );
}
