import { Section } from "@/components/Section/Section";
import React, { FC } from "react";
import { List } from "@/components/List/List";
import { HopIngredientListItem } from "./HopIngredientListItem";
import { HopIngredientSectionActions } from "./HopIngredientSectionActions";
import { ExtendedRecipe } from "@/app/recipes/types";
import { HopIcon } from "@/components/Icon/HopIcon";
import { HopIngredientUsage } from "@prisma/client";

interface HopIngredientSectionProps {
  recipe?: ExtendedRecipe | null;
}

const usageRank: HopIngredientUsage[] = ["Mash", "Boil", "Whirlpool", "DryHop"];
export const HopIngredientSection: FC<HopIngredientSectionProps> = ({
  recipe,
}) => {
  const sorted = (recipe?.hops || []).sort(
    (a, b) =>
      usageRank.findIndex((s) => s === a.usage) -
        usageRank.findIndex((s) => s === b.usage) || b.duration - a.duration
  );
  return (
    <Section
      className="md:col-span-2"
      header="Hops"
      icon={<HopIcon />}
      actions={<HopIngredientSectionActions />}
    >
      <List>
        {sorted.map((hop) => (
          <HopIngredientListItem key={hop.id} hop={hop} />
        ))}
      </List>
    </Section>
  );
};
