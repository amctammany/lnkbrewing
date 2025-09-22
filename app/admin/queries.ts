import { auth } from "@/auth";
import { prisma } from "@/lib/client";
import { UnitNames, UnitTypes } from "@/lib/Converter/UnitDict";
import { UserPreferences } from "@prisma/client";

export async function getPreferences() {
  const session = await auth();
  if (!session?.user?.id) {
    return {} as Partial<UserPreferences>;
  }
  return getUserPreferences(session.user.id)!;
}
export async function getUserPreferences(userId: string) {
  const user = await prisma.userPreferences.findFirst({ where: { userId } });
  return (user || {}) as Partial<UserPreferences>;
}
