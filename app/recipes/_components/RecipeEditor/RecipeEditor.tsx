"use client";
//import { useForm, FormProvider } from "react-hook-form";
import { ExtendedRecipe } from "../../types";
import { RecipeProvider } from "./RecipeContext";

export type RecipeEditorProps = {
  //hops: Hop[];
  recipeId: number;
  recipe?: ExtendedRecipe | null;
  children?: React.ReactNode;
};

export const RecipeEditor = ({
  //hops,
  recipe,
  //recipeId,
  children,
}: RecipeEditorProps) => {
  //const methods = useForm({ defaultValues: recipe! });

  return (
    <RecipeProvider>
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
          {children}
        </div>
      </div>
    </RecipeProvider>
  );
  //<FormProvider {...methods}>
  //</FormProvider>
};
