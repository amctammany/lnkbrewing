import { getExtendedRecipe, getRecipe } from "@/app/recipes/queries";
import { ButtonLink } from "@/components/Button/Button";
import { Section } from "@/components/Section/Section";
import React, { FC } from "react";
//import { HopIngredientModal } from "./HopIngredientModal";
import dynamic from "next/dynamic";
const HopIngredientModal = dynamic(() => import("./HopIngredientModal"), {
  ssr: true,
});
//import { RecipeVitals } from "../..";
import { List } from "@/components/List/List";
import { HopIngredientListItem } from "./HopIngredientListItem";
import { UserMassPreference } from "@prisma/client";
import { AddIcon, Icon } from "@/components/Icon";
import { ExtendedHopIngredient } from "@/app/recipes/types";

interface HopIngredientSectionProps {
  recipeId: number;
  massUnit: UserMassPreference;
  hopId?: string | null;
}

const HopIngredientSectionActions = () => {
  return (
    <div>
      <ButtonLink href="?hopId=new" scroll={false}>
        <AddIcon />
      </ButtonLink>
    </div>
  );
};
export const HopIngredientSection: FC<HopIngredientSectionProps> = async ({
  recipeId,
  massUnit,
  hopId,
}) => {
  const open = !!hopId;
  const recipe = await getExtendedRecipe(recipeId);
  const hopIngredient =
    hopId === "new"
      ? ({ recipeId } as ExtendedHopIngredient)
      : recipe?.hops.find((h) => h.id === parseInt(hopId!));
  /**
    (await prisma.hopIngredient.findFirst({
      where: {
        id: parseInt(hopId || "") || 0,
      },
      include: {
        hop: true,
      },
    }));
     */

  return (
    <>
      <Section header="Hops" actions={<HopIngredientSectionActions />}>
        <List>
          {(recipe?.hops || []).map((hop) => (
            <HopIngredientListItem key={hop.id} hop={hop} />
          ))}
        </List>
      </Section>
      {hopIngredient && (
        <HopIngredientModal
          hop={hopIngredient}
          hopId={hopId!}
          recipe={recipe}
          massUnit={massUnit}
          open={open}
        />
      )}
    </>
  );
};
