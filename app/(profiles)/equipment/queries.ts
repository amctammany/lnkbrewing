import { prisma } from "@/lib/client";
import { EquipmentProfileType } from "@/types/Profile";

export async function getEquipmentProfiles() {
  const profiles = await prisma.equipmentProfile.findMany();
  return profiles;
}

export async function getEquipmentProfile(slug: string) {
  const profile = await prisma.equipmentProfile.findFirst({
    where: { slug },
    include: {
      owner: { select: { name: true, id: true } },
      origin: { select: { name: true, id: true } },
    },
  });
  return profile as EquipmentProfileType;
}
