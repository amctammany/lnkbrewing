"use cache";
import { prisma } from "@/lib/client";

export const getWaterProfiles = async (args: any = {}) => {
  const profiles = await prisma.waterProfile.findMany(args);
  return profiles;
};

export const getWaterProfile = async (slug: string) => {
  const profile = await prisma.waterProfile.findFirst({ where: { slug } });
  return profile;
};
