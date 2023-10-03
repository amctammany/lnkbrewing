import React, { FC } from "react";
import { ExtendedRecipe } from "../../types";
//import { Section } from "@/components/Section/Section";
//import { TextField } from "@/components/Form/TextField";
import { EquipmentSection } from "./EquipmentSection/EquipmentSection";
import { StyleSection } from "./StyleSection/StyleSection";
import { HopIngredientSection } from "./HopIngredientSection/HopIngredientSection";
import { FermentableIngredientSection } from "./FermentableIngredientSection/FermentableIngredientSection";
import { GeneralSection } from "./GeneralSection/GeneralSection";
import { YeastIngredientSection } from "./YeastIngredientSection/YeastIngredientSection";

interface RecipeEditorProps {
  recipeId: number;
  searchParams?: Record<string, string>;
  src?: ExtendedRecipe | null;
}
export const RecipeEditor: FC<RecipeEditorProps> = (props) => {
  const { src, searchParams, recipeId } = props;

  return (
    <div className="w-full">
      <div className="flex flex-row md:grid md:grid-cols-4 gap-4">
        <div className="col-span-2">
          <GeneralSection open={!!searchParams?.general} recipeId={recipeId} />
        </div>
        <EquipmentSection
          open={!!searchParams?.equipment}
          recipeId={recipeId}
        />
        <StyleSection open={!!searchParams?.style} recipeId={recipeId} />
        <div className="col-span-2">
          <HopIngredientSection
            hopId={searchParams?.hopId}
            recipeId={recipeId}
          />
        </div>
        <div className="col-span-2">
          <FermentableIngredientSection
            fermentableId={searchParams?.fermentableId}
            recipeId={recipeId}
          />
        </div>
        <div className="col-span-2">
          <YeastIngredientSection
            yeastId={searchParams?.yeastId}
            recipeId={recipeId}
          />
        </div>
      </div>
    </div>
  );
};
