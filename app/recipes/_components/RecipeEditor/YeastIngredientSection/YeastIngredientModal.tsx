import { ExtendedYeastIngredient, ExtendedRecipe } from "@/app/recipes/types";
import { RoutedModal } from "@/components/Modal/RoutedModal";
import React, { FC } from "react";
import { YeastIngredientForm } from "./YeastIngredientForm";
import {
  addYeastIngredientToRecipe,
  updateYeastIngredient,
} from "@/app/recipes/actions";
import { getYeastOptions, getYeasts } from "@/app/ingredients/yeasts/queries";
import { prisma } from "@/lib/client";
import { YeastIngredient } from "@prisma/client";

interface YeastIngredientProfileModalProps {
  recipe?: ExtendedRecipe | null;
  yeast?: ExtendedYeastIngredient | null;
  yeastId?: string;
  open: boolean;
}

export const YeastIngredientModal: FC<
  YeastIngredientProfileModalProps
> = async ({ recipe, yeast, yeastId, open }) => {
  const yeasts = await getYeasts();

  const action =
    yeastId !== "new" ? updateYeastIngredient : addYeastIngredientToRecipe;
  return (
    <RoutedModal hidden={!open} returnUrl={`/recipes/${recipe?.id}/edit`}>
      <div>
        <YeastIngredientForm
          yeastId={yeastId}
          yeast={yeast}
          recipe={recipe}
          action={action}
          yeasts={yeasts}
        />
      </div>
    </RoutedModal>
  );
};
export default YeastIngredientModal;
