import React, { FC } from "react";
import { RecipeVitals } from "../../RecipeVitals";
import { ExtendedRecipe } from "@/app/recipes/types";
import { StyleSectionActions } from "./StyleSectionActions";
import { Section } from "@/components/Section";

export type StyleSectionProps = {
  recipe?: ExtendedRecipe | null;
};

export const StyleSection = ({ recipe }: StyleSectionProps) => (
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
);
