import { ExtendedRecipe } from "@/app/recipes/types";
import { RoutedModal } from "@/components/Modal/RoutedModal";
import React, { FC } from "react";
import { StyleForm } from "./StyleForm";
import { updateRecipeStyle } from "@/app/recipes/actions";
import { getStyleOptions } from "@/app/styles/queries";

interface StyleProfileModalProps {
  recipe?: ExtendedRecipe | null;
  open: boolean;
}

export const StyleModal: FC<StyleProfileModalProps> = async ({
  recipe,
  open,
}) => {
  const styles = await getStyleOptions();
  return (
    <RoutedModal hidden={!open} returnUrl={`/recipes/${recipe?.id}/edit`}>
      <div>
        <StyleForm recipe={recipe} action={updateRecipeStyle} styles={styles} />
      </div>
    </RoutedModal>
  );
};
