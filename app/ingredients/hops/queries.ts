"use server";

import { prisma } from "@/lib/client";
import { Prisma } from "@prisma/client";
import { cache } from "react";

export const getHop = cache(async (slug: string) => {
  const hop = await prisma.hop.findFirst({
    where: {
      slug,
    },
    include: {
      HopSensoryPanel: true,
    },
  });
  return hop;
});
export const getHopSupplier = cache(async (slug: string) => {
  const hop = await prisma.hopSupplier.findFirst({
    where: {
      slug,
    },
  });
  return hop;
});

export const getHopSuppliers = cache(
  async (args?: Prisma.HopSupplierFindManyArgs) => {
    const hops = await prisma.hopSupplier.findMany(args);
    return hops;
  }
);
export const getHops = cache(async (args?: Prisma.HopFindManyArgs) => {
  const hops = await prisma.hop.findMany(args);
  return hops;
});

export const getHopOptions = async () => {
  const hops = await getHops();
  const options = hops.reduce((acc, hop) => {
    acc[hop.id] = hop.name;
    return acc;
  }, {} as Record<string, string>);
  return options;
};
