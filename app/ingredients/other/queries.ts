import { prisma } from "@/lib/client";
import { cache } from "react";

export const getOtherIngredients = cache(async () => {
  const others = await prisma.otherIngredient.findMany();
  return others;
});

export const getOtherIngredientOptions = async () => {
  const fermentables = await getOtherIngredients();
  const options = fermentables.reduce((acc, other) => {
    acc[other.id] = other.name;
    return acc;
  }, {} as Record<number, string>);
  return options;
};
