import { prisma } from "@/lib/client";

export async function getEquipmentProfiles() {
  const fermentables = await prisma.equipmentProfile.findMany();
  return fermentables;
}

export async function getEquipmentProfile(slug: string) {
  const fermentable = await prisma.equipmentProfile.findFirst({
    where: { slug },
  });
  return fermentable;
}
