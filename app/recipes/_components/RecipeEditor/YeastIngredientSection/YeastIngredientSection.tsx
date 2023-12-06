import { getExtendedRecipe, getRecipe } from "@/app/recipes/queries";
import { ButtonLink } from "@/components/Button/Button";
import { Section } from "@/components/Section/Section";
import React, { FC } from "react";
//import { YeastIngredientModal } from "./YeastIngredientModal";
import dynamic from "next/dynamic";
const YeastIngredientModal = dynamic(() => import("./YeastIngredientModal"), {
  ssr: false,
});
import { List } from "@/components/List/List";
import { YeastIngredientListItem } from "./YeastIngredientListItem";
import { prisma } from "@/lib/client";
import { AddIcon, Icon } from "@/components/Icon";
import { ExtendedYeastIngredient } from "@/app/recipes/types";

interface YeastIngredientSectionProps {
  recipeId: number;
  yeastId?: string | null;
}

const YeastIngredientSectionActions = () => {
  return (
    <div>
      <ButtonLink href="?yeastId=new" scroll={false}>
        <AddIcon />
      </ButtonLink>
    </div>
  );
};
export const YeastIngredientSection: FC<YeastIngredientSectionProps> = async ({
  recipeId,
  yeastId,
}) => {
  const open = !!yeastId;
  const recipe = await getExtendedRecipe(recipeId);
  const yid = parseInt(yeastId || "");
  const yeastIngredient =
    yeastId === "new"
      ? ({ recipeId } as ExtendedYeastIngredient)
      : recipe?.yeasts.find((y) => y.id === yid);

  return (
    <Section header="Yeasts" actions={<YeastIngredientSectionActions />}>
      <List>
        {(recipe?.yeasts || []).map((yeast) => (
          <YeastIngredientListItem key={yeast.id} yeast={yeast} />
        ))}
      </List>
      {open && (
        <YeastIngredientModal
          yeast={yeastIngredient}
          yeastId={yeastId}
          recipe={recipe}
          open={open}
        />
      )}
    </Section>
  );
};
