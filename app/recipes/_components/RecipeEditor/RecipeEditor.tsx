import React, { FC } from "react";
import { ExtendedRecipe } from "../../types";
import { Section } from "@/components/Section/Section";
import { TextField } from "@/components/Form/TextField";
import { EquipmentSection } from "./EquipmentSection/EquipmentSection";
import { StyleSection } from "./StyleSection/StyleSection";

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
        <Section header="General">
          <TextField name="name" defaultValue={src?.name} disabled />
        </Section>
        <EquipmentSection
          open={!!searchParams?.equipment}
          recipeId={recipeId}
        />
        <StyleSection open={!!searchParams?.style} recipeId={recipeId} />
      </div>
    </div>
  );
};
