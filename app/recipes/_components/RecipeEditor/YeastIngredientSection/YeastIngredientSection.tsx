import { getExtendedRecipe, getRecipe } from "@/app/recipes/queries";
import { Section } from "@/components/Section/Section";
import React, { FC } from "react";
//import { YeastIngredientModal } from "./YeastIngredientModal";
import dynamic from "next/dynamic";
const YeastIngredientModal = dynamic(() => import("./YeastIngredientModal"), {
  ssr: true,
});
//import { RecipeVitals } from "../..";
import { List } from "@/components/List/List";
import { YeastIngredientListItem } from "./YeastIngredientListItem";
import { UserMassPreference } from "@prisma/client";
import { ExtendedYeastIngredient } from "@/app/recipes/types";
//import YeastIngredientModalContainer from "./YeastIngredientModalContainer";
import { getYeasts } from "@/app/ingredients/yeasts/queries";
import { YeastIngredientSectionActions } from "./YeastIngredientSectionActions";

interface YeastIngredientSectionProps {
  recipeId: number;
  massUnit?: UserMassPreference;
}

export const YeastIngredientSection: FC<YeastIngredientSectionProps> = async ({
  recipeId,
  massUnit,
}) => {
  //const open = !!yeastId;
  const recipe = await getExtendedRecipe(recipeId);
  const yeasts = await getYeasts();
  return (
    <>
      <Section
        className="md:col-span-2"
        header="Yeasts"
        actions={<YeastIngredientSectionActions />}
      >
        <List>
          {(recipe?.yeasts || []).map((yeast) => (
            <YeastIngredientListItem key={yeast.id} yeast={yeast} />
          ))}
        </List>
      </Section>
      <YeastIngredientModal
        recipe={recipe}
        yeasts={yeasts}
        massUnit={massUnit}
      />
    </>
  );
};
