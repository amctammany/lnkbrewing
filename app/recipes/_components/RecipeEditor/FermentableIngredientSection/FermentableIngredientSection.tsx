import React, { FC } from "react";
import { Section } from "@/components/Section/Section";
import { List } from "@/components/List/List";
import { FermentableIngredientListItem } from "./FermentableIngredientListItem";
import { FermentableIngredientSectionActions } from "./FermentableIngredientSectionActions";
import { ExtendedRecipe } from "@/app/recipes/types";

interface FermentableIngredientSectionProps {
  recipe?: ExtendedRecipe | null;
}

export const FermentableIngredientSection: FC<
  FermentableIngredientSectionProps
> = ({ recipe }) => {
  return (
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
  );
};
