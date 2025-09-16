"use cache";
import { prisma } from "@/lib/client";

export const getWaterProfiles = async (args: any = {}) => {
  const profiles = await prisma.waterProfile.findMany(args);
  console.log(profiles);
  return profiles;
};

export const getWaterProfile = async (slug: string) => {
  const profile = await prisma.waterProfile.findFirst({ where: { slug } });
  console.log(profile);
  return profile;
};
