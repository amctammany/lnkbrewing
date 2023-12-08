import { getExtendedRecipe, getRecipe } from "@/app/recipes/queries";
import { Section } from "@/components/Section/Section";
import React, { FC } from "react";
//import { OtherIngredientModal } from "./OtherIngredientModal";
import dynamic from "next/dynamic";
const OtherIngredientModal = dynamic(() => import("./OtherIngredientModal"), {
  ssr: true,
});
//import { RecipeVitals } from "../..";
import { List } from "@/components/List/List";
import { OtherIngredientListItem } from "./OtherIngredientListItem";
import { UserMassPreference } from "@prisma/client";
import { ExtendedOtherIngredient } from "@/app/recipes/types";
//import OtherIngredientModalContainer from "./OtherIngredientModalContainer";
import {
  addRecipeOtherIngredientToRecipe,
  updateRecipeOtherIngredient,
} from "@/app/recipes/actions";
import { OtherIngredientSectionActions } from "./OtherIngredientSectionActions";
import { getOtherIngredients } from "@/app/ingredients/other/queries";

interface OtherIngredientSectionProps {
  recipeId: number;
  massUnit: UserMassPreference;
  otherId?: string | null;
}

export const OtherIngredientSection: FC<OtherIngredientSectionProps> = async ({
  recipeId,
  massUnit,
  otherId,
}) => {
  //const open = !!otherId;
  const recipe = await getExtendedRecipe(recipeId);
  const others = await getOtherIngredients();
  const otherIngredient =
    otherId === "new"
      ? ({ recipeId } as ExtendedOtherIngredient)
      : recipe?.otherIngredients.find((h) => h.id === parseInt(otherId!));
  console.log({ otherIngredient, otherId });
  const action = otherIngredient?.id
    ? updateRecipeOtherIngredient
    : addRecipeOtherIngredientToRecipe;
  return (
    <>
      <Section header="Others" actions={<OtherIngredientSectionActions />}>
        <List>
          {(recipe?.otherIngredients || []).map((other) => (
            <OtherIngredientListItem key={other.id} other={other} />
          ))}
        </List>
      </Section>
      <OtherIngredientModal
        //other={otherIngredient}
        action={action}
        others={others}
        //otherId={otherId!}
        //recipe={recipe}
        massUnit={massUnit}
        //open={open}
      />
    </>
  );
};
