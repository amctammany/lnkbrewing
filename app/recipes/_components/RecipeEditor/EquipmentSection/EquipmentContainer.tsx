import { getExtendedRecipe } from "@/app/recipes/queries";
import React, { FC } from "react";
import dynamic from "next/dynamic";
const EquipmentModal = dynamic(() => import("./EquipmentModal"), {
  ssr: true,
});
import { UserMassPreference } from "@prisma/client";
import { EquipmentSection } from "./EquipmentSection";
import { getEquipmentProfiles } from "@/app/profiles/queries";

interface EquipmentContainerProps {
  recipeId: number;
  massUnit?: UserMassPreference;
}

export const EquipmentContainer: FC<EquipmentContainerProps> = async ({
  recipeId,
  massUnit,
}) => {
  const recipe = await getExtendedRecipe(recipeId);
  const profiles = await getEquipmentProfiles();

  return (
    <div className="md:col-span-1">
      <EquipmentSection recipe={recipe} />
      <EquipmentModal recipe={recipe} massUnit={massUnit} profiles={profiles} />
    </div>
  );
};
