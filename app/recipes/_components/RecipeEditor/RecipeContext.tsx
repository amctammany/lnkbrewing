"use client";
import { createContext, useState } from "react";
import { ExtendedRecipe } from "../../types";
import { HopIngredient } from "@prisma/client";
type ModalTypes =
  | "general"
  | "equipment"
  | "style"
  | "hops"
  | "fermentables"
  | "yeasts"
  | "others"
  | "mash"
  | "water";
export const RecipeContext = createContext<{
  modalType?: ModalTypes;
  modalId?: number | "new";
  openModal: (type: ModalTypes, id?: number | "new") => void;
  closeModal: () => void; //openRecipe?: (data: Omit<RecipeContent, "open">) => void;
}>({
  openModal: () => null,
  closeModal: () => null,
});
export const RecipeProvider: React.FC<{
  recipe?: ExtendedRecipe;
  children: React.ReactNode;
}> = ({ recipe: _recipe, children }) => {
  const [modalType, setModalType] = useState<ModalTypes>();
  const [modalId, setModalId] = useState<number | "new">();
  const openModal = (type: ModalTypes, id?: number | "new") => {
    setModalType(type);
    setModalId(id);
  };
  const closeModal = () => {
    setModalType(undefined);
    setModalId(undefined);
  };

  return (
    <RecipeContext.Provider
      value={{
        openModal,
        closeModal,
        modalType,
        modalId,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
