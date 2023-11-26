import { prisma } from "@/lib/client";
import { cache } from "react";

export const getExtendedRecipe = cache(async (id: number) =>
  prisma.recipe.findFirst({
    include: {
      author: true,
      hops: { include: { hop: true } },
      yeasts: { include: { yeast: true } },
      equipment: true,
      water: true,
      mash: { include: { steps: true } },
      otherIngredients: { include: { otherIngredient: true } },
      fermentables: { include: { fermentable: true } },
      style: true,
    },
    where: {
      id,
    },
  })
);

export const getRecipe = cache(async (id: number) =>
  prisma.recipe.findFirst({
    where: {
      id,
    },
  })
);
export const getRecipes = cache(async () =>
  prisma.recipe.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      authorEmail: true,
    },
  })
);
