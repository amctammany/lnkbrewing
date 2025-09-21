import { auth } from "@/auth";
import { prisma } from "@/lib/client";
import { UnitNames, UnitTypes } from "@/lib/Converter/UnitDict";

export async function getPreferences() {
  const session = await auth();
  if (!session?.user?.id) {
    return {} as Record<UnitTypes, UnitNames>;
  }
  return getUserPreferences(session.user.id)!;
}
export async function getUserPreferences(userId: string) {
  const user = await prisma.userPreferences.findFirst({ where: { userId } });
  return user;
}
