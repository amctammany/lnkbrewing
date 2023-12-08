"use client";
import { createContext, useState } from "react";
import { ExtendedRecipe } from "../../types";
import { HopIngredient } from "@prisma/client";

export const RecipeContext = createContext<{
  recipe?: ExtendedRecipe;
  hopId?: number | "new";
  openHop: (data: number | "new") => void;
  closeHop: () => void;
  fermentableId?: number | "new";
  openFermentable: (data: number | "new") => void;
  closeFermentable: () => void;
  //openRecipe?: (data: Omit<RecipeContent, "open">) => void;
}>({
  openHop: () => null,
  closeHop: () => null,
  openFermentable: () => null,
  closeFermentable: () => null,
});

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
  const [fermentableId, setFermentableId] = useState<number | "new">();
  //const [message, setMessage] = useState<string>();
  //const [modal, setModal] = useState<string>();
  const [recipe, setRecipe] = useState<ExtendedRecipe>(_recipe!);
  const openFermentable = (data: number | "new") => {
    setFermentableId(data);
  };
  const closeFermentable = () => {
    setFermentableId(undefined);
  };

  const openHop = (data: number | "new") => {
    setHopId(data);
  };
  const closeHop = () => {
    setHopId(undefined);
  };
  return (
    <RecipeContext.Provider
      value={{
        recipe,
        openHop,
        closeHop,
        hopId,
        fermentableId,
        openFermentable,
        closeFermentable,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
