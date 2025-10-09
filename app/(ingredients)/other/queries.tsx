import { prisma } from "@/lib/client";
import { OtherType } from "@/types/Ingredient";
import { cache } from "react";

export const getOtherIngredient = async (slug: string) => {
  const other = await prisma.otherIngredient.findFirst({ where: { slug } });
  return other as OtherType;
};

export const getOtherIngredients = async (args: any = {}) => {
  const others = await prisma.otherIngredient.findMany(args);
  return others as OtherType[];
};
