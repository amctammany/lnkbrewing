import { prisma } from "@/lib/client";
import { WaterProfileType } from "@/types/Profile";

export const getWaterProfiles = async (args: any = {}) => {
  const profiles = await prisma.waterProfile.findMany(args);
  return profiles;
};

export const getWaterProfile = async (slug: string) => {
  const profile = await prisma.waterProfile.findFirst({
    where: { slug },
    include: {
      origin: { select: { slug: true, name: true } },
      owner: { select: { name: true, id: true } },
    },
  });
  return profile as WaterProfileType;
};
