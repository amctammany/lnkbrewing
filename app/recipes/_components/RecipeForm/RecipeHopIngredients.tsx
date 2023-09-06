"use client";
import { Form, NumberField, Submit, TextArea, TextField } from "@/components";
import { Recipe, HopIngredient } from "@prisma/client";
import { useState } from "react";

type ExtendedRecipe = Recipe & { hops?: HopIngredient[] };
export type RecipeHopIngredientsProps = {
  src: ExtendedRecipe | null;
};

export const RecipeHopIngredients = ({ src }: RecipeHopIngredientsProps) => {
  const [hopIngredients, setHopIngredients] = useState(src?.hops || []);
  const removeHopIngredient = (index: number) => (e: React.MouseEvent) => {
    setHopIngredients((o) => o.filter((_, i) => i !== index));
    e.preventDefault();
  };
  const addHopIngredient = (e: React.MouseEvent) => {
    setHopIngredients((old) => [
      ...old,
      { recipeId: src?.id } as HopIngredient,
    ]);
    e.preventDefault();
  };
  return (
    <div>
      <button onClick={addHopIngredient}>Add</button>
      <ul>
        {hopIngredients.map((hop, index) => (
          <li key={index}>
            <div className="grid grid-cols-4 gap-4">
              <input type="hidden" name={`hops[${index}].id`} value={hop?.id} />

              <input
                type="hidden"
                name={`hops[${index}].recipeId`}
                value={hop?.recipeId}
              />
              <NumberField
                name={`hops[${index}].amount`}
                label="Amount"
                defaultValue={hop?.amount}
              />
              <button onClick={removeHopIngredient(index)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
