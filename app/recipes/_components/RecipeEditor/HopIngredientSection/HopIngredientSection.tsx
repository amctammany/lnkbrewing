import { getExtendedRecipe, getRecipe } from "@/app/recipes/queries";
import { ButtonLink } from "@/components/Button/Button";
import { Section } from "@/components/Section/Section";
import React, { FC } from "react";
//import { HopIngredientModal } from "./HopIngredientModal";
import dynamic from "next/dynamic";
const HopIngredientModal = dynamic(() => import("./HopIngredientModal"), {
  ssr: false,
});
import { RecipeVitals } from "../..";
import { List } from "@/components/List/List";
import { HopIngredientListItem } from "./HopIngredientListItem";
import { prisma } from "@/lib/client";
import { PlusIcon } from "@heroicons/react/24/solid";

interface HopIngredientSectionProps {
  recipeId: number;
  hopId?: string | null;
}

const HopIngredientSectionActions = () => {
  return (
    <div>
      <ButtonLink href="?hopId=new">
        <PlusIcon className="h-6 w-6 " />
      </ButtonLink>
    </div>
  );
};
export const HopIngredientSection: FC<HopIngredientSectionProps> = async ({
  recipeId,
  hopId,
}) => {
  const open = !!hopId;
  const recipe = await getExtendedRecipe(recipeId);
  const hopIngredient = await prisma.hopIngredient.findFirst({
    where: {
      id: parseInt(hopId || "") || 0,
    },
    include: {
      hop: true,
    },
  });

  return (
    <Section header="Hops" actions={<HopIngredientSectionActions />}>
      <List>
        {(recipe?.hops || []).map((hop) => (
          <HopIngredientListItem key={hop.id} hop={hop} />
        ))}
      </List>
      {open && (
        <HopIngredientModal
          hop={hopIngredient}
          hopId={hopId}
          recipe={recipe}
          open={open}
        />
      )}
    </Section>
  );
};
