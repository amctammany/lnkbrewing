import { ExtendedRecipe } from "@/app/recipes/types";
import { RoutedModal } from "@/components/Modal/RoutedModal";
import React, { FC } from "react";
import { EquipmentProfileForm } from "./EquipmentProfileForm";
import {
  changeRecipeEquipmentProfile,
  updateRecipeEquipment,
} from "@/app/recipes/actions";
import { getEquipmentProfileOptions } from "@/app/profiles/queries";
import { EquipmentSelect } from "./EquipmentSelect";

interface EquipmentProfileModalProps {
  recipe?: ExtendedRecipe | null;
  open: boolean;
}

export const EquipmentProfileModal: FC<EquipmentProfileModalProps> = async ({
  recipe,
  open,
}) => {
  const equipmentProfiles = await getEquipmentProfileOptions();
  return (
    <RoutedModal hidden={!open} returnUrl={`/recipes/${recipe?.id}/edit`}>
      <div>
        <EquipmentSelect
          recipeId={recipe?.id}
          options={equipmentProfiles}
          action={changeRecipeEquipmentProfile}
        />
        <EquipmentProfileForm recipe={recipe} action={updateRecipeEquipment} />
      </div>
    </RoutedModal>
  );
};
