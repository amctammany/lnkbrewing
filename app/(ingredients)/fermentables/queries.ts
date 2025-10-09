import { prisma } from "@/lib/client";
import { FermentableType } from "@/types/Ingredient";
import { cache } from "react";

export const getFermentables = cache(async (args: any = {}) => {
  const fermentables = await prisma.fermentable.findMany(args);
  return fermentables as FermentableType[];
});

export const getFermentable = cache(async (slug: string) => {
  const fermentable = await prisma.fermentable.findFirst({ where: { slug } });
  return fermentable as FermentableType;
});
