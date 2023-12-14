import { getExtendedRecipe, getRecipe } from "@/app/recipes/queries";
import React, { FC } from "react";
import dynamic from "next/dynamic";
const YeastIngredientModal = dynamic(() => import("./YeastIngredientModal"), {
  ssr: true,
});
import { YeastIngredientSection } from "./YeastIngredientSection";
import { UserMassPreference } from "@prisma/client";
import { getYeasts } from "@/app/ingredients/yeasts/queries";

interface YeastIngredientContainerProps {
  recipeId: number;
  massUnit?: UserMassPreference;
}

export const YeastIngredientContainer: FC<
  YeastIngredientContainerProps
> = async ({ recipeId, massUnit }) => {
  const recipe = await getExtendedRecipe(recipeId);
  const yeasts = await getYeasts();
  return (
    <div className="md:col-span-2">
      <YeastIngredientSection recipe={recipe} />
      <YeastIngredientModal
        recipe={recipe}
        yeasts={yeasts}
        massUnit={massUnit}
      />
    </div>
  );
};
