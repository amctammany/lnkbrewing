import { getExtendedRecipe } from "@/app/recipes/queries";
import { Section } from "@/components/Section/Section";
import React, { FC } from "react";
import dynamic from "next/dynamic";
const FermentableIngredientModal = dynamic(
  () => import("./FermentableIngredientModal"),
  {
    ssr: true,
  }
);
import { List } from "@/components/List/List";
import { FermentableIngredientListItem } from "./FermentableIngredientListItem";
import { UserMassPreference } from "@prisma/client";
import { getFermentables } from "@/app/ingredients/fermentables/queries";
import { FermentableIngredientSectionActions } from "./FermentableIngredientSectionActions";

interface FermentableIngredientSectionProps {
  recipeId: number;
  massUnit: UserMassPreference;
}

export const FermentableIngredientSection: FC<
  FermentableIngredientSectionProps
> = async ({ recipeId, massUnit }) => {
  const recipe = await getExtendedRecipe(recipeId);
  const fermentables = await getFermentables();
  return (
    <>
      <Section
        className="md:col-span-2"
        header="Fermentables"
        actions={<FermentableIngredientSectionActions />}
      >
        <List>
          {(recipe?.fermentables || []).map((fermentable) => (
            <FermentableIngredientListItem
              key={fermentable.id}
              fermentable={fermentable}
            />
          ))}
        </List>
      </Section>
      <FermentableIngredientModal
        recipe={recipe}
        fermentables={fermentables}
        massUnit={massUnit}
      />
    </>
  );
};
