"use client";
import { useForm, FormProvider } from "react-hook-form";
import { ExtendedRecipe } from "../../types";
import { HopIngredientSection } from "./HopIngredientSection";
import { Hop } from "@prisma/client";
import { RecipeProvider } from "./RecipeContext";

export type RecEditorProps = {
  //hops: Hop[];
  recipeId: number;
  recipe?: ExtendedRecipe | null;
  children?: React.ReactNode;
};

export const RecEditor = ({
  //hops,
  recipe,
  //recipeId,
  children,
}: RecEditorProps) => {
  const methods = useForm({ defaultValues: recipe! });

  return (
    <RecipeProvider recipe={recipe!}>
      <FormProvider {...methods}>
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
            {children}
          </div>
        </div>
      </FormProvider>
    </RecipeProvider>
  );
};
