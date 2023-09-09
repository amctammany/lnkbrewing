"use client";
import {
  Form,
  HopSelect,
  NumberField,
  Submit,
  TextArea,
  TextField,
} from "@/components";
import {
  Recipe,
  HopIngredient as HopIngredientType,
  Hop,
} from "@prisma/client";
import { useState } from "react";
import { HopIngredient } from "./HopIngredient";

type ExtendedRecipe = Recipe & { hops?: HopIngredientType[] };
export type RecipeHopIngredientsProps = {
  src: ExtendedRecipe | null;
  hops: any[];
};

export const RecipeHopIngredients = ({
  src,
  hops,
}: RecipeHopIngredientsProps) => {
  const [hopIngredients, setHopIngredients] = useState(src?.hops || []);
  const removeHopIngredient = (index: number) => (e: React.MouseEvent) => {
    setHopIngredients((o) => o.filter((_, i) => i !== index));
    e.preventDefault();
  };
  const addHopIngredient = (e: React.MouseEvent) => {
    setHopIngredients((old) => [
      ...old,
      { recipeId: src?.id } as HopIngredientType,
    ]);
    e.preventDefault();
  };
  return (
    <div className="flex-auto">
      <div className="flex">
        <h3 className="text-lg flex-grow">Hops</h3>
        <button className="flex-shrink" onClick={addHopIngredient}>
          Add
        </button>
      </div>
      <ul>
        {hopIngredients.map((hop, index) => (
          <li key={index}>
            <HopIngredient hops={hops} hop={hop} index={index}>
              <button onClick={removeHopIngredient(index)}>Remove</button>
            </HopIngredient>
          </li>
        ))}
      </ul>
    </div>
  );
};
