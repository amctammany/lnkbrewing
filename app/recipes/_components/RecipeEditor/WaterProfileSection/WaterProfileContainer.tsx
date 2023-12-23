import { getExtendedRecipe } from "@/app/recipes/queries";
import React, { FC } from "react";
import dynamic from "next/dynamic";
const WaterProfileModal = dynamic(() => import("./WaterProfileModal"), {
  ssr: true,
});
import { UserMassPreference } from "@prisma/client";
import { getWaterProfiles } from "@/app/profiles/queries";
import { WaterProfileSection } from "./WaterProfileSection";

interface WaterProfileContainerProps {
  recipeId: number;
  massUnit?: UserMassPreference;
}

export const WaterProfileContainer: FC<WaterProfileContainerProps> = async ({
  recipeId,
  massUnit,
}) => {
  const recipe = await getExtendedRecipe({ id: recipeId });
  const profiles = await getWaterProfiles();
  return (
    <div className="md:col-span-2">
      <WaterProfileSection recipe={recipe} />
      <WaterProfileModal
        recipe={recipe}
        massUnit={massUnit}
        profiles={profiles}
      />
    </div>
  );
};
