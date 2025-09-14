"use server";
import { prisma } from "@/lib/client";

export const getWaterProfiles = async (args: any = {}) => {
  const profiles = await prisma.waterProfile.findMany(args);
  console.log(profiles);
  return profiles;
};
