import React, { FC } from "react";
import { FermentableIngredientForm } from "./FermentableIngredientForm";
import {
  addFermentableIngredientToRecipe,
  updateFermentableIngredient,
} from "@/app/recipes/actions";
import { getFermentableOptions } from "@/app/ingredients/fermentables/queries";
import {
  ExtendedFermentableIngredient,
  ExtendedRecipe,
} from "@/app/recipes/types";
import { RoutedModal } from "@/components/Modal/RoutedModal";

interface FermentableIngredientProfileModalProps {
  recipe?: ExtendedRecipe | null;
  fermentable?: ExtendedFermentableIngredient | null;
  fermentableId?: string;
  open: boolean;
}

export const FermentableIngredientModal: FC<
  FermentableIngredientProfileModalProps
> = async ({ recipe, fermentable, fermentableId, open }) => {
  const fermentables = await getFermentableOptions();

  const action = fermentable?.id
    ? updateFermentableIngredient
    : addFermentableIngredientToRecipe;
  return (
    <RoutedModal hidden={!open} returnUrl={`/recipes/${recipe?.id}/edit`}>
      <div>
        <FermentableIngredientForm
          fermentable={fermentable}
          action={action}
          fermentableOptions={fermentables}
        />
      </div>
    </RoutedModal>
  );
};
export default FermentableIngredientModal;
