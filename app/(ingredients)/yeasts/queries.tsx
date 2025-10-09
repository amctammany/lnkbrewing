import { prisma } from "@/lib/client";
import { YeastType } from "@/types/Ingredient";
import { cache } from "react";

export const getYeast = cache(async (slug: string) => {
  const yeast = await prisma.yeast.findFirst({ where: { slug } });
  return yeast as YeastType;
});

export const getYeasts = cache(async (args: any = {}) => {
  const yeasts = await prisma.yeast.findMany(args);
  return yeasts as YeastType[];
});
