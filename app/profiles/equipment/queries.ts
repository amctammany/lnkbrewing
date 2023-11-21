import { prisma } from "@/lib/client";
import { cache } from "react";

export const getEquipmentProfiles = cache(async () => {
  const profiles = await prisma.equipmentProfile.findMany();
  return profiles;
});

export const getEquipmentProfileOptions = async () => {
  const profiles = await getEquipmentProfiles();
  const options = profiles.reduce((acc, profile) => {
    acc[
      profile.id
    ] = `${profile.name}: ${profile.batchVolume} - ${profile.brewEfficiency}`;
    return acc;
  }, {} as Record<string, string>);
  return options;
};
