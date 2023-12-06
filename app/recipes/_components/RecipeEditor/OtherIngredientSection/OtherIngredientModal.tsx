import { ExtendedOtherIngredient, ExtendedRecipe } from "@/app/recipes/types";
import { RoutedModal } from "@/components/Modal/RoutedModal";
import React, { FC } from "react";
import { OtherIngredientForm } from "./OtherIngredientForm";
import {
  addRecipeOtherIngredientToRecipe,
  updateRecipeOtherIngredient,
} from "@/app/recipes/actions";
import {
  getOtherIngredients,
  getOtherIngredientOptions,
} from "@/app/ingredients/other/queries";
//import { prisma } from "@/lib/client";
//import { OtherIngredient } from "@prisma/client";

interface OtherIngredientProfileModalProps {
  recipe?: ExtendedRecipe | null;
  other?: ExtendedOtherIngredient | null;
  otherId?: string;
  open: boolean;
}

export const OtherIngredientModal: FC<
  OtherIngredientProfileModalProps
> = async ({ recipe, other, otherId, open }) => {
  const others = await getOtherIngredients();

  const action = other?.id
    ? updateRecipeOtherIngredient
    : addRecipeOtherIngredientToRecipe;
  return (
    <RoutedModal
      title="Edit Other"
      hidden={!open}
      returnUrl={`/recipes/${recipe?.id}/edit`}
    >
      <div>
        <OtherIngredientForm
          otherId={otherId}
          other={other}
          recipe={recipe}
          action={action}
          others={others}
        />
      </div>
    </RoutedModal>
  );
};
export default OtherIngredientModal;
