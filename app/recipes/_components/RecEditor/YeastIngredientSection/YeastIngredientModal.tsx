"use client";
import { ExtendedYeastIngredient, ExtendedRecipe } from "@/app/recipes/types";
import { Modal } from "@/components/Modal/Modal";
import React, { FC } from "react";
//import { YeastIngredientForm } from "./YeastIngredientForm";
import dynamic from "next/dynamic";
const YeastIngredientForm = dynamic(() => import("./YeastIngredientForm"), {
  ssr: false,
});

import {
  addYeastIngredientToRecipe,
  updateYeastIngredient,
} from "@/app/recipes/actions";
//import { getYeastOptions, getYeasts } from "@/app/ingredients/yeasts/queries";
import { Yeast, YeastIngredient, UserMassPreference } from "@prisma/client";
import { Button } from "@/components/Button";
import { useRecipe } from "../useRecipe";

interface YeastIngredientProfileModalProps {
  recipe?: ExtendedRecipe | null;
  yeasts: Yeast[];
  massUnit: UserMassPreference;
}

export const YeastIngredientModal: FC<YeastIngredientProfileModalProps> = ({
  massUnit,
  yeasts,
}) => {
  const { recipe, modalId, modalType, openModal, closeModal } = useRecipe();

  return (
    modalType === "yeasts" && (
      <Modal
        title="Edit Yeast"
        close={closeModal}
        hidden={modalType !== "yeasts" || modalId === undefined}
      >
        <div>
          {modalId !== undefined && (
            <YeastIngredientForm massUnit={massUnit} yeasts={yeasts} />
          )}
        </div>
      </Modal>
    )
  );
};
export default YeastIngredientModal;
