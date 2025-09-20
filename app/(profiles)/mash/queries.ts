import { prisma } from "@/lib/client";
import { MashProfileType } from "@/types/Profile";

export const getMashProfiles = async (args: any = {}) => {
  const profiles = await prisma.mashProfile.findMany(args);
  return profiles;
};

export const getMashProfile = async (slug: string) => {
  const profile = await prisma.mashProfile.findFirst({
    where: { slug },
    include: {
      origin: { select: { slug: true, name: true } },
      owner: { select: { name: true, id: true } },
      steps: {
        select: {
          name: true,
          mashProfileId: true,
          id: true,
          temperature: true,
          index: true,
          time: true,
          rampTime: true,
          type: true,
        },
      },
    },
  });
  return profile as MashProfileType;
};
