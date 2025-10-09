import { prisma } from "@/lib/client";
import { FermentableType } from "@/types/Ingredient";
import { cache } from "react";

export const getFermentables = async (args: any = {}) => {
  const fermentables = await prisma.fermentable.findMany(args);
  return fermentables as FermentableType[];
};

export const getFermentable = async (slug: string) => {
  const fermentable = await prisma.fermentable.findFirst({ where: { slug } });
  return fermentable as FermentableType;
};
