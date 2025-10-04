import { auth } from "@/auth";
import { UserPreferencesType } from "@/contexts/UserPreferencesContext";
import { prisma } from "@/lib/client";

export async function getPreferences() {
  const session = await auth();
  if (!session?.user?.id) {
    return {} as Partial<UserPreferencesType>;
  }
  return getUserPreferences(session.user.id)!;
}
export async function getUserPreferences(userId: string) {
  const user = await prisma.userPreferences.findFirst({ where: { userId } });
  return (user || {}) as Partial<UserPreferencesType>;
}
