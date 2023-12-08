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
  action: any;
  //open: boolean;
  //close: () => void;
}

export const OtherIngredientModal: FC<OtherIngredientProfileModalProps> = ({
  //recipe,
  action,
  //other,
  massUnit,
  others,
}) => {
  const { recipe, otherId, openOther, closeOther } = useRecipe();

  const other =
    otherId === "new"
      ? ({ recipeId: recipe?.id } as ExtendedOtherIngredient)
      : recipe?.otherIngredients.find((h) => h.id === otherId);
  console.log({ action, other, otherId });
  //const action = other?.id ? updateOtherIngredient : addOtherIngredientToRecipe;
  return (
    <Modal
      //title="Edit Other"
      close={closeOther}
      menu={<Button onClick={closeOther}>Close</Button>}
      hidden={otherId === undefined}
    >
      <div>
        {other && (
          <OtherIngredientForm
            massUnit={massUnit}
            //otherId={otherId}
            //other={other}
            //recipe={recipe}
            action={action}
            others={others}
          />
        )}
      </div>
    </Modal>
  );
};
export default OtherIngredientModal;
