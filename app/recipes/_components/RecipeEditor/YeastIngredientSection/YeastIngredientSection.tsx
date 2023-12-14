import { Section } from "@/components/Section/Section";
import React, { FC } from "react";
//import { RecipeVitals } from "../..";
import { List } from "@/components/List/List";
import { YeastIngredientListItem } from "./YeastIngredientListItem";
import { ExtendedRecipe } from "@/app/recipes/types";
//import YeastIngredientModalContainer from "./YeastIngredientModalContainer";
import { YeastIngredientSectionActions } from "./YeastIngredientSectionActions";

interface YeastIngredientSectionProps {
  recipe?: ExtendedRecipe | null;
}

export const YeastIngredientSection: FC<YeastIngredientSectionProps> = async ({
  recipe,
}) => {
  return (
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
  );
};
