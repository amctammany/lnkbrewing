import React, { FC } from "react";
import { getExtendedRecipe } from "@/app/recipes/queries";
import dynamic from "next/dynamic";
const FermentableIngredientModal = dynamic(
  () => import("./FermentableIngredientModal"),
  {
    ssr: true,
  }
);
import { UserMassPreference } from "@prisma/client";
import { getFermentables } from "@/app/ingredients/fermentables/queries";
import { FermentableIngredientSection } from "./FermentableIngredientSection";

interface FermentableIngredientContainerProps {
  recipeId: number;
  massUnit?: UserMassPreference;
}

export const FermentableIngredientContainer: FC<
  FermentableIngredientContainerProps
> = async ({ recipeId, massUnit }) => {
  const recipe = await getExtendedRecipe(recipeId);
  const fermentables = await getFermentables();
  return (
    <>
      <FermentableIngredientSection recipe={recipe} />
      <FermentableIngredientModal
        recipe={recipe}
        fermentables={fermentables}
        massUnit={massUnit}
      />
    </>
  );
};
