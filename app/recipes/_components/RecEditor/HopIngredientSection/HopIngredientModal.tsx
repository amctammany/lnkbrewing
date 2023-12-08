"use client";
import { ExtendedHopIngredient, ExtendedRecipe } from "@/app/recipes/types";
import { Modal } from "@/components/Modal/Modal";
import React, { FC } from "react";
//import { HopIngredientForm } from "./HopIngredientForm";
import dynamic from "next/dynamic";
const HopIngredientForm = dynamic(() => import("./HopIngredientForm"), {
  ssr: false,
});

import {
  addHopIngredientToRecipe,
  updateHopIngredient,
} from "@/app/recipes/actions";
//import { getHopOptions, getHops } from "@/app/ingredients/hops/queries";
import { Hop, HopIngredient, UserMassPreference } from "@prisma/client";
import { Button } from "@/components/Button";
import { useRecipe } from "../useRecipe";

interface HopIngredientProfileModalProps {
  recipe?: ExtendedRecipe | null;
  hop?: ExtendedHopIngredient | null;
  hops: Hop[];
  hopId?: string;
  massUnit: UserMassPreference;
  action: any;
  //open: boolean;
  //close: () => void;
}

export const HopIngredientModal: FC<HopIngredientProfileModalProps> = ({
  //recipe,
  action,
  //hop,
  massUnit,
  hops,
}) => {
  const { recipe, hopId, openHop, closeHop } = useRecipe();

  const hop =
    hopId === "new"
      ? ({ recipeId: recipe?.id } as ExtendedHopIngredient)
      : recipe?.hops.find((h) => h.id === hopId);
  console.log({ action, hop, hopId });
  //const action = hop?.id ? updateHopIngredient : addHopIngredientToRecipe;
  return (
    <Modal
      //title="Edit Hop"
      close={closeHop}
      hidden={hopId === undefined}
    >
      <div>
        {hop && (
          <HopIngredientForm
            massUnit={massUnit}
            //hopId={hopId}
            //hop={hop}
            //recipe={recipe}
            action={action}
            hops={hops}
          />
        )}
      </div>
    </Modal>
  );
};
export default HopIngredientModal;
