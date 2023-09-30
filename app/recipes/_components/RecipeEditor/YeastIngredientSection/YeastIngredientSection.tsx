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

interface YeastIngredientSectionProps {
  recipeId: number;
  yeastId?: string | null;
}

const YeastIngredientSectionActions = () => {
  return (
    <div>
      <ButtonLink href="?yeastId=new">add</ButtonLink>
    </div>
  );
};
export const YeastIngredientSection: FC<YeastIngredientSectionProps> = async ({
  recipeId,
  yeastId,
}) => {
  const open = !!yeastId;
  const recipe = await getExtendedRecipe(recipeId);
  const yeastIngredient = await prisma.yeastIngredient.findFirst({
    where: {
      id: parseInt(yeastId || "") || 0,
    },
    include: {
      yeast: true,
    },
  });

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
          recipe={recipe}
          open={open}
        />
      )}
    </Section>
  );
};
