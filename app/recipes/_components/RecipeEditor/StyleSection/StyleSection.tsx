import { getExtendedRecipe, getRecipe } from "@/app/recipes/queries";
import { ButtonLink } from "@/components/Button/Button";
import { Section } from "@/components/Section/Section";
import React, { FC } from "react";
import { StyleModal } from "./StyleModal";
import { RecipeVitals } from "../..";

interface StyleSectionProps {
  recipeId: number;
  open: boolean;
}

const StyleSectionActions = () => {
  return (
    <div>
      <ButtonLink href="?style=1">Edit</ButtonLink>
    </div>
  );
};
export const StyleSection: FC<StyleSectionProps> = async ({
  recipeId,
  open,
}) => {
  const recipe = await getExtendedRecipe(recipeId);

  return (
    <Section header="Style" actions={<StyleSectionActions />}>
      <div className="flex flex-col ">
        <div className="flex">
          <h4 className="flex-grow text-md font-bold">Style</h4>
          <span className="pr-1 underline">{recipe?.style?.identifier}</span>
          <span className="">{recipe?.style?.name}</span>
        </div>

        <RecipeVitals src={recipe} />
      </div>
      {open && <StyleModal recipe={recipe} open={open} />}
    </Section>
  );
};
