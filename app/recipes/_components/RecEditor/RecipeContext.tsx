"use client";
import { createContext, useState } from "react";
import { ExtendedRecipe } from "../../types";
import { HopIngredient } from "@prisma/client";

export const RecipeContext = createContext<{
  recipe?: ExtendedRecipe;
  hopId?: number | "new";
  openHop: (data: number | "new") => void;
  closeHop: () => void;
  yeastId?: number | "new";
  openYeast: (data: number | "new") => void;
  closeYeast: () => void;
  otherId?: number | "new";
  openOther: (data: number | "new") => void;
  closeOther: () => void;
  fermentableId?: number | "new";
  openFermentable: (data: number | "new") => void;
  closeFermentable: () => void;
  //openRecipe?: (data: Omit<RecipeContent, "open">) => void;
}>({
  openYeast: () => null,
  closeYeast: () => null,
  openOther: () => null,
  closeOther: () => null,
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
  const [yeastId, setYeastId] = useState<number | "new">();
  const [otherId, setOtherId] = useState<number | "new">();
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
  const openYeast = (data: number | "new") => {
    setYeastId(data);
  };
  const closeYeast = () => {
    setYeastId(undefined);
  };
  const openOther = (data: number | "new") => {
    setOtherId(data);
  };
  const closeOther = () => {
    setOtherId(undefined);
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
        yeastId,
        openYeast,
        closeYeast,
        otherId,
        openOther,
        closeOther,
        openFermentable,
        closeFermentable,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
