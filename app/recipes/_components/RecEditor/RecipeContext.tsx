"use client";
import { createContext, useState } from "react";
import { ExtendedRecipe } from "../../types";
import { HopIngredient } from "@prisma/client";

export const RecipeContext = createContext<{
  hopId?: number | "new";
  recipe?: ExtendedRecipe;
  openHop: (data: number | "new") => void;
  closeHop: () => void;
  //openRecipe?: (data: Omit<RecipeContent, "open">) => void;
}>({ openHop: () => null, closeHop: () => null });

type RecipeContent = {
  open: boolean;
  title?: string;
  message?: string;
  action?: any;
};

export const RecipeProvider: React.FC<{
  recipe?: ExtendedRecipe;
  children: React.ReactNode;
}> = ({ recipe: _recipe, children }) => {
  const [hopId, setHopId] = useState<number | "new">();
  //const [message, setMessage] = useState<string>();
  //const [modal, setModal] = useState<string>();
  const [recipe, setRecipe] = useState<ExtendedRecipe>(_recipe!);
  const openHop = (data: number | "new") => {
    setHopId(data);
  };
  const closeHop = () => {
    setHopId(undefined);
  };
  return (
    <RecipeContext.Provider value={{ recipe, openHop, closeHop, hopId }}>
      {children}
    </RecipeContext.Provider>
  );
};
