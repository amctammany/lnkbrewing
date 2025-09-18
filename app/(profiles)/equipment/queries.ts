import { prisma } from "@/lib/client";

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
  return profile;
}
