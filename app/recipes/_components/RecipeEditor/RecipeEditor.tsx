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
import MashSection from "./MashSection";
import WaterSection from "./WaterSection";
import { OtherIngredientSection } from "./OtherIngredientSection/OtherIngredientSection";
import { UserMassPreference, UserPreferences } from "@prisma/client";

interface RecipeEditorProps {
  recipeId: number;
  preferences?: UserPreferences;
  searchParams?: Record<string, string>;
  src?: ExtendedRecipe | null;
}
export const RecipeEditor: FC<RecipeEditorProps> = (props) => {
  const { src, searchParams, preferences, recipeId } = props;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-4 md:gap-4">
        <div className="md:col-span-2">
          <GeneralSection open={!!searchParams?.general} recipeId={recipeId} />
        </div>
        <EquipmentSection
          open={!!searchParams?.equipment}
          recipeId={recipeId}
        />
        <StyleSection open={!!searchParams?.style} recipeId={recipeId} />
        <div className="md:col-span-2">
          <HopIngredientSection
            massUnit={preferences?.hopMassUnit ?? UserMassPreference.Oz}
            hopId={searchParams?.hopId}
            recipeId={recipeId}
          />
        </div>
        <div className="md:col-span-2">
          <FermentableIngredientSection
            fermentableId={searchParams?.fermentableId}
            recipeId={recipeId}
          />
        </div>
        <div className="md:col-span-2">
          <YeastIngredientSection
            yeastId={searchParams?.yeastId}
            recipeId={recipeId}
          />
        </div>
        <div className="md:col-span-2">
          <OtherIngredientSection
            otherId={searchParams?.otherId}
            recipeId={recipeId}
          />
        </div>
        <MashSection open={!!searchParams?.mash} recipeId={recipeId} />
        <WaterSection open={!!searchParams?.water} recipeId={recipeId} />
      </div>
    </div>
  );
};
