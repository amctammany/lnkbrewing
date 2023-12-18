import { Section } from "@/components/Section/Section";
import React, { FC } from "react";
import { List } from "@/components/List/List";
import { HopIngredientListItem } from "./HopIngredientListItem";
import { HopIngredientSectionActions } from "./HopIngredientSectionActions";
import { ExtendedRecipe } from "@/app/recipes/types";
import { HopIcon } from "@/components/Icon/HopIcon";

interface HopIngredientSectionProps {
  recipe?: ExtendedRecipe | null;
}

export const HopIngredientSection: FC<HopIngredientSectionProps> = ({
  recipe,
}) => {
  return (
    <Section
      className="md:col-span-2"
      header="Hops"
      icon={<HopIcon />}
      actions={<HopIngredientSectionActions />}
    >
      <List>
        {(recipe?.hops || []).map((hop) => (
          <HopIngredientListItem key={hop.id} hop={hop} />
        ))}
      </List>
    </Section>
  );
};
