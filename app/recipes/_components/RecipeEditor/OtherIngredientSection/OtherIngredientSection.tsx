import React, { FC } from "react";
import { Section } from "@/components/Section/Section";
import { List } from "@/components/List/List";
import { OtherIngredientListItem } from "./OtherIngredientListItem";
import { OtherIngredientSectionActions } from "./OtherIngredientSectionActions";
import { ExtendedRecipe } from "@/app/recipes/types";

interface OtherIngredientSectionProps {
  recipe?: ExtendedRecipe | null;
}

export const OtherIngredientSection: FC<OtherIngredientSectionProps> = ({
  recipe,
}) => {
  return (
    <Section
      className="md:col-span-2"
      header="Others"
      actions={<OtherIngredientSectionActions />}
    >
      <List>
        {(recipe?.otherIngredients || []).map((other) => (
          <OtherIngredientListItem key={other.id} other={other} />
        ))}
      </List>
    </Section>
  );
};
