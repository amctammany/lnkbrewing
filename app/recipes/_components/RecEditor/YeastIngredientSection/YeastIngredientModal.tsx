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
  yeast?: ExtendedYeastIngredient | null;
  yeasts: Yeast[];
  yeastId?: string;
  massUnit: UserMassPreference;
  action: any;
  //open: boolean;
  //close: () => void;
}

export const YeastIngredientModal: FC<YeastIngredientProfileModalProps> = ({
  //recipe,
  action,
  //yeast,
  massUnit,
  yeasts,
}) => {
  const { recipe, yeastId, openYeast, closeYeast } = useRecipe();

  const yeast =
    yeastId === "new"
      ? ({ recipeId: recipe?.id } as ExtendedYeastIngredient)
      : recipe?.yeasts.find((h) => h.id === yeastId);
  console.log({ action, yeast, yeastId });
  //const action = yeast?.id ? updateYeastIngredient : addYeastIngredientToRecipe;
  return (
    <Modal
      //title="Edit Yeast"
      close={closeYeast}
      menu={<Button onClick={closeYeast}>Close</Button>}
      hidden={yeastId === undefined}
    >
      <div>
        {yeastId !== undefined && (
          <YeastIngredientForm
            massUnit={massUnit}
            //yeastId={yeastId}
            //yeast={yeast}
            //recipe={recipe}
            action={action}
            yeasts={yeasts}
          />
        )}
      </div>
    </Modal>
  );
};
export default YeastIngredientModal;
