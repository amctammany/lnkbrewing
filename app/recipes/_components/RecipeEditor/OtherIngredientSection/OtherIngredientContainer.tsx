import { getExtendedRecipe } from "@/app/recipes/queries";
import React, { FC } from "react";
import dynamic from "next/dynamic";
const OtherIngredientModal = dynamic(() => import("./OtherIngredientModal"), {
  ssr: true,
});
import { UserMassPreference } from "@prisma/client";
import { getOtherIngredients } from "@/app/ingredients/other/queries";
import { OtherIngredientSection } from "./OtherIngredientSection";

interface OtherIngredientContainerProps {
  recipeId: number;
  massUnit?: UserMassPreference;
}

export const OtherIngredientContainer: FC<
  OtherIngredientContainerProps
> = async ({ recipeId, massUnit }) => {
  const recipe = await getExtendedRecipe(recipeId);
  const others = await getOtherIngredients();
  return (
    <div className="md:col-span-2">
      <OtherIngredientSection recipe={recipe} />
      <OtherIngredientModal
        recipe={recipe}
        others={others}
        massUnit={massUnit}
      />
    </div>
  );
};
