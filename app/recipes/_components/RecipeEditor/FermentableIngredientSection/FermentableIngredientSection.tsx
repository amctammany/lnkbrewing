import { getExtendedRecipe, getRecipe } from "@/app/recipes/queries";
import { ButtonLink } from "@/components/Button/Button";
import { Section } from "@/components/Section/Section";
import React, { FC } from "react";
//import { FermentableIngredientModal } from "./FermentableIngredientModal";
import dynamic from "next/dynamic";
const FermentableIngredientModal = dynamic(
  () => import("./FermentableIngredientModal"),
  {
    ssr: true,
  }
);
import { List } from "@/components/List/List";
import { FermentableIngredientListItem } from "./FermentableIngredientListItem";
import { prisma } from "@/lib/client";
import { ExtendedFermentableIngredient } from "@/app/recipes/types";
import { Icon } from "@/components/Icon";

interface FermentableIngredientSectionProps {
  recipeId: number;
  fermentableId?: string | null;
}

const FermentableIngredientSectionActions = () => {
  return (
    <div>
      <ButtonLink href="?fermentableId=new" scroll={false}>
        <Icon icon="add" />
      </ButtonLink>
    </div>
  );
};
export const FermentableIngredientSection: FC<
  FermentableIngredientSectionProps
> = async ({ recipeId, fermentableId }) => {
  const open = !!fermentableId;
  const recipe = await getExtendedRecipe(recipeId);
  const fid = parseInt(fermentableId || "");
  const fermentableIngredient =
    fermentableId === "new"
      ? ({ recipeId } as ExtendedFermentableIngredient)
      : recipe?.fermentables.find((f) => f.id === fid);
  //(await prisma.fermentableIngredient.findFirst({
  //where: {
  //id: parseInt(fermentableId || "") || 0,
  //},
  //include: {
  //fermentable: true,
  //},
  //})) || ({ recipeId } as ExtendedFermentableIngredient);

  return (
    <Section
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
      {open && (
        <FermentableIngredientModal
          fermentable={fermentableIngredient}
          fermentableId={fermentableId}
          recipe={recipe}
          open={open}
        />
      )}
    </Section>
  );
};
