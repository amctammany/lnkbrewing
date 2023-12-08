"use client";
import {
  ExtendedFermentableIngredient,
  ExtendedRecipe,
} from "@/app/recipes/types";
import { Modal } from "@/components/Modal/Modal";
import React, { FC } from "react";
//import { FermentableIngredientForm } from "./FermentableIngredientForm";
import dynamic from "next/dynamic";
const FermentableIngredientForm = dynamic(
  () => import("./FermentableIngredientForm"),
  {
    ssr: false,
  }
);

import {
  addFermentableIngredientToRecipe,
  updateFermentableIngredient,
} from "@/app/recipes/actions";
//import { getFermentableOptions, getFermentables } from "@/app/ingredients/fermentables/queries";
import {
  Fermentable,
  FermentableIngredient,
  UserMassPreference,
} from "@prisma/client";
import { Button } from "@/components/Button";
import { useRecipe } from "../useRecipe";

interface FermentableIngredientProfileModalProps {
  recipe?: ExtendedRecipe | null;
  fermentable?: ExtendedFermentableIngredient | null;
  fermentables: Fermentable[];
  fermentableId?: string;
  massUnit: UserMassPreference;
  action: any;
  //open: boolean;
  //close: () => void;
}

export const FermentableIngredientModal: FC<
  FermentableIngredientProfileModalProps
> = ({
  //recipe,
  action,
  //fermentable,
  massUnit,
  fermentables,
}) => {
  const { recipe, fermentableId, openFermentable, closeFermentable } =
    useRecipe();

  const fermentable =
    fermentableId === "new"
      ? ({ recipeId: recipe?.id } as ExtendedFermentableIngredient)
      : recipe?.fermentables.find((h) => h.id === fermentableId);
  console.log({ action, fermentable, fermentableId });
  //const action = fermentable?.id ? updateFermentableIngredient : addFermentableIngredientToRecipe;
  return (
    <Modal
      //title="Edit Fermentable"
      close={closeFermentable}
      hidden={fermentableId === undefined}
    >
      <div>
        {fermentable && (
          <FermentableIngredientForm
            massUnit={massUnit}
            //fermentableId={fermentableId}
            //fermentable={fermentable}
            //recipe={recipe}
            action={action}
            fermentables={fermentables}
          />
        )}
      </div>
    </Modal>
  );
};
export default FermentableIngredientModal;
