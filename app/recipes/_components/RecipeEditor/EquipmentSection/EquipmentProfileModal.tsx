import { ExtendedRecipe } from "@/app/recipes/types";
import { RoutedModal } from "@/components/Modal/RoutedModal";
import React, { FC } from "react";
import { EquipmentProfileForm } from "./EquipmentProfileForm";
import { updateRecipe } from "@/app/recipes/actions";
import { getEquipmentProfiles } from "@/app/profiles/queries";

interface EquipmentProfileModalProps {
  recipe?: ExtendedRecipe | null;
  open: boolean;
}

export const EquipmentProfileModal: FC<EquipmentProfileModalProps> = async ({
  recipe,
  open,
}) => {
  const equipmentProfiles = await getEquipmentProfiles();
  return (
    <RoutedModal hidden={!open} returnUrl={`/recipes/${recipe?.id}/edit`}>
      <div>
        <EquipmentProfileForm
          profiles={equipmentProfiles}
          recipe={recipe}
          action={updateRecipe}
        />
      </div>
    </RoutedModal>
  );
};
export default EquipmentProfileModal;
