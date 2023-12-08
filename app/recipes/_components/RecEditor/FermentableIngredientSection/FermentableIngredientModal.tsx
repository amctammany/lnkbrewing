"use client";
import { ExtendedFermentableIngredient } from "@/app/recipes/types";
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

import { Fermentable, UserMassPreference } from "@prisma/client";
import { useRecipe } from "../useRecipe";

interface FermentableIngredientProfileModalProps {
  fermentables: Fermentable[];
  massUnit: UserMassPreference;
}

export const FermentableIngredientModal: FC<
  FermentableIngredientProfileModalProps
> = ({ massUnit, fermentables }) => {
  const { recipe, modalId, modalType, closeModal } = useRecipe();

  const fermentable =
    modalId === "new"
      ? ({ recipeId: recipe?.id } as ExtendedFermentableIngredient)
      : recipe?.fermentables.find((h) => h.id === modalId);
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
              massUnit={massUnit}
              fermentables={fermentables}
            />
          )}
        </div>
      </Modal>
    )
  );
};
export default FermentableIngredientModal;
