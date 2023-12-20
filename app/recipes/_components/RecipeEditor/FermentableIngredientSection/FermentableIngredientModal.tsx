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
  () => import("./FermentableIngredientForm")
);

import { Fermentable, UserMassPreference } from "@prisma/client";
import { useRecipe } from "../useRecipe";

interface FermentableIngredientProfileModalProps {
  recipe?: ExtendedRecipe | null;
  fermentables: Fermentable[];
  massUnit?: UserMassPreference;
}

export const FermentableIngredientModal: FC<
  FermentableIngredientProfileModalProps
> = ({ recipe, massUnit, fermentables }) => {
  const { modalId, modalType, closeModal } = useRecipe();

  const fermentable =
    modalId === "new"
      ? ({ recipeId: recipe?.id } as ExtendedFermentableIngredient)
      : recipe?.fermentables?.find((h) => h.id === modalId);
  console.log(fermentable);
  return (
    modalType === "fermentables" && (
      <Modal
        title="Edit Fermentable"
        close={closeModal}
        hidden={modalType !== "fermentables" || modalId === undefined}
      >
        <div>
          {fermentable && (
            <FermentableIngredientForm
              recipe={recipe}
              massUnit={massUnit}
              fermentable={fermentable}
              fermentables={fermentables}
            />
          )}
        </div>
      </Modal>
    )
  );
};
export default FermentableIngredientModal;
