import { ExtendedHopIngredient, ExtendedRecipe } from "@/app/recipes/types";
import { RoutedModal } from "@/components/Modal/RoutedModal";
import React, { FC } from "react";
import { HopIngredientForm } from "./HopIngredientForm";
import {
  addHopIngredientToRecipe,
  updateHopIngredient,
} from "@/app/recipes/actions";
import { getHopOptions, getHops } from "@/app/ingredients/hops/queries";
import { prisma } from "@/lib/client";
import { HopIngredient } from "@prisma/client";

interface HopIngredientProfileModalProps {
  recipe?: ExtendedRecipe | null;
  hop?: ExtendedHopIngredient | null;
  hopId?: string;
  open: boolean;
}

export const HopIngredientModal: FC<HopIngredientProfileModalProps> = async ({
  recipe,
  hop,
  hopId,
  open,
}) => {
  const hops = await getHops();

  const action = hopId ? updateHopIngredient : addHopIngredientToRecipe;
  return (
    <RoutedModal hidden={!open} returnUrl={`/recipes/${recipe?.id}/edit`}>
      <div>
        <HopIngredientForm
          hopId={hopId}
          hop={hop}
          recipe={recipe}
          action={action}
          hops={hops}
        />
      </div>
    </RoutedModal>
  );
};
export default HopIngredientModal;
