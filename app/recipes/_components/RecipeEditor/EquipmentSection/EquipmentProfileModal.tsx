import { ExtendedRecipe } from "@/app/recipes/types";
import { RoutedModal } from "@/components/Modal/RoutedModal";
import React, { FC } from "react";
import { EquipmentProfileForm } from "./EquipmentProfileForm";
import { updateRecipeEquipment } from "@/app/recipes/actions";

interface EquipmentProfileModalProps {
  recipe?: ExtendedRecipe | null;
  open: boolean;
}

export const EquipmentProfileModal: FC<EquipmentProfileModalProps> = ({
  recipe,
  open,
}) => {
  return (
    <RoutedModal hidden={!open} returnUrl={`/recipes/${recipe?.id}/edit`}>
      Stuff
      <EquipmentProfileForm recipe={recipe} action={updateRecipeEquipment} />
    </RoutedModal>
  );
};
