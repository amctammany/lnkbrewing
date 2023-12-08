"use client";
import { ExtendedOtherIngredient, ExtendedRecipe } from "@/app/recipes/types";
import { Modal } from "@/components/Modal/Modal";
import React, { FC } from "react";
import dynamic from "next/dynamic";
const OtherIngredientForm = dynamic(() => import("./OtherIngredientForm"), {
  ssr: false,
});

import { OtherIngredient, UserMassPreference } from "@prisma/client";
import { useRecipe } from "../useRecipe";

interface OtherIngredientProfileModalProps {
  recipe?: ExtendedRecipe | null;
  massUnit: UserMassPreference;
  others: OtherIngredient[];
}

export const OtherIngredientModal: FC<OtherIngredientProfileModalProps> = ({
  massUnit,
  others,
}) => {
  const { recipe, modalId, modalType, openModal, closeModal } = useRecipe();

  const other =
    modalId === "new"
      ? ({ recipeId: recipe?.id } as ExtendedOtherIngredient)
      : recipe?.otherIngredients.find((h) => h.id === modalId);
  return (
    modalType === "others" && (
      <Modal
        title="Edit Other"
        close={closeModal}
        hidden={modalType !== "others" || modalId === undefined}
      >
        <div>
          {other && <OtherIngredientForm massUnit={massUnit} others={others} />}
        </div>
      </Modal>
    )
  );
};
export default OtherIngredientModal;
