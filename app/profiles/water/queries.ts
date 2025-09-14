"use server";
import { prisma } from "@/lib/client";

export const getWaterProfiles = async (args?: any) => {
  console.log(prisma.waterProfile);
  const profiles = await prisma.waterProfile.findMany();
  return profiles;
};
