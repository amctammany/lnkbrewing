import { ExtendedRecipe } from "@/app/recipes/types";
import { RoutedModal } from "@/components/Modal/RoutedModal";
import React, { FC } from "react";
import { GeneralForm } from "./GeneralForm";
import { updateRecipeGeneral } from "@/app/recipes/actions";

interface GeneralProfileModalProps {
  recipe?: ExtendedRecipe | null;
  open: boolean;
}

export const GeneralModal: FC<GeneralProfileModalProps> = async ({
  recipe,
  open,
}) => {
  return (
    <RoutedModal hidden={!open} returnUrl={`/recipes/${recipe?.id}/edit`}>
      <div>
        <GeneralForm recipe={recipe} action={updateRecipeGeneral} />
      </div>
    </RoutedModal>
  );
};
export default GeneralModal;
