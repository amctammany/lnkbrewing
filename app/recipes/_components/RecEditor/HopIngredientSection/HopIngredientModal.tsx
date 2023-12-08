"use client";
import { ExtendedHopIngredient, ExtendedRecipe } from "@/app/recipes/types";
import { Modal } from "@/components/Modal/Modal";
import React, { FC } from "react";
//import { HopIngredientForm } from "./HopIngredientForm";
import dynamic from "next/dynamic";
const HopIngredientForm = dynamic(() => import("./HopIngredientForm"), {
  ssr: false,
});
//import { getHopOptions, getHops } from "@/app/ingredients/hops/queries";
import { Hop, UserMassPreference } from "@prisma/client";
import { useRecipe } from "../useRecipe";

interface HopIngredientProfileModalProps {
  recipe?: ExtendedRecipe | null;
  hops: Hop[];
  massUnit: UserMassPreference;
}

export const HopIngredientModal: FC<HopIngredientProfileModalProps> = ({
  massUnit,
  hops,
}) => {
  const { recipe, modalId, modalType, openModal, closeModal } = useRecipe();

  const hop =
    modalId === "new"
      ? ({ recipeId: recipe?.id } as ExtendedHopIngredient)
      : recipe?.hops.find((h) => h.id === modalId);
  return (
    modalType === "hops" && (
      <Modal
        title="Edit Hop"
        close={closeModal}
        hidden={modalType !== "hops" || modalId === undefined}
      >
        <div>
          {hop && (
            <HopIngredientForm
              massUnit={massUnit}
              //hopId={hopId}
              //hop={hop}
              //recipe={recipe}
              //action={action}
              hops={hops}
            />
          )}
        </div>
      </Modal>
    )
  );
};
export default HopIngredientModal;
