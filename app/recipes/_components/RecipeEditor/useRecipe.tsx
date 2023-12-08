"use client";
import { useContext } from "react";
import { RecipeContext } from "./RecipeContext";

export const useRecipe = () => {
  const recipeContext = useContext(RecipeContext);
  if (recipeContext === undefined)
    throw new Error("Must be used within Provider");
  return recipeContext;
};
