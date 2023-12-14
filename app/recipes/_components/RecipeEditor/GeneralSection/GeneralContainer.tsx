import { getExtendedRecipe } from "@/app/recipes/queries";
import React, { FC } from "react";
import dynamic from "next/dynamic";
const GeneralModal = dynamic(() => import("./GeneralModal"), {
  ssr: true,
});
import { UserMassPreference } from "@prisma/client";
import { GeneralSection } from "./GeneralSection";

interface GeneralContainerProps {
  recipeId: number;
  massUnit?: UserMassPreference;
}

export const GeneralContainer: FC<GeneralContainerProps> = async ({
  recipeId,
  massUnit,
}) => {
  const recipe = await getExtendedRecipe(recipeId);
  return (
    <div className="md:col-span-2">
      <GeneralSection recipe={recipe} />
      <GeneralModal recipe={recipe} massUnit={massUnit} />
    </div>
  );
};
