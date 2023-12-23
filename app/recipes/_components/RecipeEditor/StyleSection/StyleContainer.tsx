import { getExtendedRecipe } from "@/app/recipes/queries";
import React, { FC } from "react";
import dynamic from "next/dynamic";
const StyleModal = dynamic(() => import("./StyleModal"), {
  ssr: true,
});
import { UserMassPreference } from "@prisma/client";
import { getStyles } from "@/app/styles/queries";
import { StyleSection } from "./StyleSection";

interface StyleContainerProps {
  recipeId: number;
  massUnit?: UserMassPreference;
}

export const StyleContainer: FC<StyleContainerProps> = async ({
  recipeId,
  massUnit,
}) => {
  const recipe = await getExtendedRecipe({ id: recipeId });
  const styles = await getStyles();
  return (
    <div className="md:col-span-1">
      <StyleSection recipe={recipe} />
      <StyleModal recipe={recipe} massUnit={massUnit} styles={styles} />
    </div>
  );
};
