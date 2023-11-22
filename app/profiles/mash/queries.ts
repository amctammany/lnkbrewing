import { prisma } from "@/lib/client";
import { cache } from "react";

export const getMashProfile = cache(async (slug: string) => {
  const profile = await prisma.mashProfile.findFirst({
    where: { slug: { equals: slug } },
    include: {
      steps: true,
    },
  });
  return profile;
});

export const getMashProfiles = cache(async () => {
  const profiles = await prisma.mashProfile.findMany({
    include: {
      steps: true,
    },
  });
  return profiles;
});

export const getMashProfileOptions = async () => {
  const profiles = await getMashProfiles();
  const options = profiles.reduce((acc, profile) => {
    acc[profile.id] = `${profile.name}`;
    return acc;
  }, {} as Record<string, string>);
  return options;
};
