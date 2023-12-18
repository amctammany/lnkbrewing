import React, { FC } from "react";
import { Section } from "@/components/Section/Section";
import { List } from "@/components/List/List";
import { FermentableIngredientListItem } from "./FermentableIngredientListItem";
import { FermentableIngredientSectionActions } from "./FermentableIngredientSectionActions";
import { ExtendedRecipe } from "@/app/recipes/types";
import { GrainIcon } from "@/components/Icon/GrainIcon";

interface FermentableIngredientSectionProps {
  recipe?: ExtendedRecipe | null;
}

export const FermentableIngredientSection: FC<
  FermentableIngredientSectionProps
> = ({ recipe }) => {
  return (
    <Section
      className="md:col-span-2"
      icon={<GrainIcon />}
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
