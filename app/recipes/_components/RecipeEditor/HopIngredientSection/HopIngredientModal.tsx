import { ExtendedHopIngredient, ExtendedRecipe } from "@/app/recipes/types";
import { RoutedModal } from "@/components/Modal/RoutedModal";
import React, { FC } from "react";
//import { HopIngredientForm } from "./HopIngredientForm";
const HopIngredientForm = dynamic(() => import("./HopIngredientForm"), {
  ssr: false,
});

import {
  addHopIngredientToRecipe,
  updateHopIngredient,
} from "@/app/recipes/actions";
import { getHopOptions, getHops } from "@/app/ingredients/hops/queries";
import { HopIngredient, UserMassPreference } from "@prisma/client";
import dynamic from "next/dynamic";

interface HopIngredientProfileModalProps {
  recipe?: ExtendedRecipe | null;
  hop?: ExtendedHopIngredient | null;
  hopId?: string;
  massUnit: UserMassPreference;
  open: boolean;
}

export const HopIngredientModal: FC<HopIngredientProfileModalProps> = async ({
  recipe,
  hop,
  hopId,
  open,
  massUnit,
}) => {
  const hops = await getHops();

  const action = hop?.id ? updateHopIngredient : addHopIngredientToRecipe;
  return (
    <RoutedModal
      title="Edit Hop"
      hidden={!open}
      returnUrl={`/recipes/${recipe?.id}/edit`}
    >
      <div>
        <HopIngredientForm
          massUnit={massUnit}
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
