import { getExtendedRecipe, getRecipe } from "@/app/recipes/queries";
import React, { FC } from "react";
import dynamic from "next/dynamic";
const HopIngredientModal = dynamic(() => import("./HopIngredientModal"), {
  ssr: true,
});
import { UserMassPreference } from "@prisma/client";
import { getHops } from "@/app/ingredients/hops/queries";
import { HopIngredientSection } from "./HopIngredientSection";

interface HopIngredientContainerProps {
  recipeId: number;
  massUnit?: UserMassPreference;
}

export const HopIngredientContainer: FC<HopIngredientContainerProps> = async ({
  recipeId,
  massUnit,
}) => {
  const recipe = await getExtendedRecipe({ id: recipeId });
  const hops = await getHops();
  return (
    <div className="md:col-span-2">
      <HopIngredientSection recipe={recipe} />

      <HopIngredientModal recipe={recipe} hops={hops} massUnit={massUnit} />
    </div>
  );
};
