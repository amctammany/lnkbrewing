import { prisma } from "@/lib/client";
import { cache } from "react";

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
