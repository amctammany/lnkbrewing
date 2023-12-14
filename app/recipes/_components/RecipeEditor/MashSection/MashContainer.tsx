import { getExtendedRecipe, getRecipe } from "@/app/recipes/queries";
import React, { FC } from "react";
import dynamic from "next/dynamic";
const MashModal = dynamic(() => import("./MashModal"), {
  ssr: true,
});
import { UserMassPreference } from "@prisma/client";
import { getMashProfiles } from "@/app/profiles/queries";
import { MashSection } from "./MashSection";

interface MashContainerProps {
  recipeId: number;
  massUnit?: UserMassPreference;
}

export const MashContainer: FC<MashContainerProps> = async ({
  recipeId,
  massUnit,
}) => {
  const recipe = await getExtendedRecipe(recipeId);
  const profiles = await getMashProfiles();

  return (
    <div className="md:col-span-2">
      <MashSection recipe={recipe} />
      <MashModal recipe={recipe} massUnit={massUnit} profiles={profiles} />
    </div>
  );
};
