import { getExtendedRecipe, getRecipe } from "@/app/recipes/queries";
import { Section } from "@/components/Section/Section";
import React, { FC } from "react";
import dynamic from "next/dynamic";
const StyleModal = dynamic(() => import("./StyleModal"), {
  ssr: true,
});
import { UserMassPreference } from "@prisma/client";
import { StyleSectionActions } from "./StyleSectionActions";
import { Prop } from "@/components/Prop";
import { RecipeVitals } from "../../RecipeVitals";
import { getStyles } from "@/app/styles/queries";

interface StyleSectionProps {
  recipeId: number;
  massUnit?: UserMassPreference;
}

export const StyleSection: FC<StyleSectionProps> = async ({
  recipeId,
  massUnit,
}) => {
  const recipe = await getExtendedRecipe(recipeId);
  const styles = await getStyles();
  return (
    <div className="md:col-span-1">
      <Section header="Style" actions={<StyleSectionActions />}>
        <div className="flex flex-col ">
          <div className="flex">
            <h4 className="flex-grow text-md font-bold">Style</h4>
            <span className="pr-1 underline">{recipe?.style?.identifier}</span>
            <span className="">{recipe?.style?.name}</span>
          </div>

          <RecipeVitals src={recipe} />
        </div>
      </Section>
      <StyleModal recipe={recipe} massUnit={massUnit} styles={styles} />
    </div>
  );
};
