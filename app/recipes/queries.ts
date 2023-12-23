import { Prisma, Recipe } from "@prisma/client";
import { prisma } from "@/lib/client";
import { cache } from "react";

export const getExtendedRecipe = cache(async (where: Prisma.RecipeWhereInput) =>
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
    where,
  })
);

export const getRecipe = cache(async (id: number) =>
  prisma.recipe.findFirst({
    where: {
      id,
    },
    include: { author: true },
  })
);
export const getRecipes = cache(
  async (where?: Prisma.RecipeWhereInput) =>
    prisma.recipe.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        styleIdentifer: true,
        authorEmail: true,
        author: true,
      },
      where,
    }) as unknown as Recipe[]
);
