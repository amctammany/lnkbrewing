import { getExtendedRecipe, getRecipe } from "@/app/recipes/queries";
import { Section } from "@/components/Section/Section";
import React, { FC } from "react";
import dynamic from "next/dynamic";
const HopIngredientModal = dynamic(() => import("./HopIngredientModal"), {
  ssr: true,
});
import { List } from "@/components/List/List";
import { HopIngredientListItem } from "./HopIngredientListItem";
import { UserMassPreference } from "@prisma/client";
import { getHops } from "@/app/ingredients/hops/queries";
import { HopIngredientSectionActions } from "./HopIngredientSectionActions";

interface HopIngredientSectionProps {
  recipeId: number;
  massUnit?: UserMassPreference;
}

export const HopIngredientSection: FC<HopIngredientSectionProps> = async ({
  recipeId,
  massUnit,
}) => {
  const recipe = await getExtendedRecipe(recipeId);
  const hops = await getHops();
  return (
    <>
      <Section
        className="md:col-span-2"
        header="Hops"
        actions={<HopIngredientSectionActions />}
      >
        <List>
          {(recipe?.hops || []).map((hop) => (
            <HopIngredientListItem key={hop.id} hop={hop} />
          ))}
        </List>
      </Section>
      <HopIngredientModal recipe={recipe} hops={hops} massUnit={massUnit} />
    </>
  );
};
