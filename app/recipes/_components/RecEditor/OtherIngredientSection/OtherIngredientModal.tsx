"use client";
import { ExtendedOtherIngredient, ExtendedRecipe } from "@/app/recipes/types";
import { Modal } from "@/components/Modal/Modal";
import React, { FC } from "react";
//import { OtherIngredientForm } from "./OtherIngredientForm";
import dynamic from "next/dynamic";
const OtherIngredientForm = dynamic(() => import("./OtherIngredientForm"), {
  ssr: false,
});

//import {
//addRecipeOtherIngredientToRecipe,
//updateRecipeOtherIngredient,
//} from "@/app/recipes/actions";
//import { getOtherOptions, getOthers } from "@/app/ingredients/others/queries";
import { OtherIngredient, UserMassPreference } from "@prisma/client";
import { Button } from "@/components/Button";
import { useRecipe } from "../useRecipe";

interface OtherIngredientProfileModalProps {
  recipe?: ExtendedRecipe | null;
  other?: ExtendedOtherIngredient | null;
  others: OtherIngredient[];
  otherId?: string;
  massUnit: UserMassPreference;
  //action: any;
  //open: boolean;
  //close: () => void;
}

export const OtherIngredientModal: FC<OtherIngredientProfileModalProps> = ({
  //recipe,
  //action,
  //other,
  massUnit,
  others,
}) => {
  const { recipe, modalId, modalType, openModal, closeModal } = useRecipe();

  const other =
    modalId === "new"
      ? ({ recipeId: recipe?.id } as ExtendedOtherIngredient)
      : recipe?.otherIngredients.find((h) => h.id === modalId);
  //const action = other?.id ? updateOtherIngredient : addOtherIngredientToRecipe;
  return (
    modalType === "others" && (
      <Modal
        //title="Edit Other"
        close={closeModal}
        hidden={modalType !== "others" || modalId === undefined}
      >
        <div>
          {other && (
            <OtherIngredientForm
              massUnit={massUnit}
              //otherId={otherId}
              //other={other}
              //recipe={recipe}
              //action={action}
              others={others}
            />
          )}
        </div>
      </Modal>
    )
  );
};
export default OtherIngredientModal;
