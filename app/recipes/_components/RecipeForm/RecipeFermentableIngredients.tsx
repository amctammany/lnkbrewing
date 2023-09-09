"use client";
import {
  Form,
  FermentableSelect,
  NumberField,
  Submit,
  TextArea,
  TextField,
} from "@/components";
import {
  Recipe,
  FermentableIngredient as FermentableIngredientType,
  Fermentable,
} from "@prisma/client";
import { useState } from "react";
import { FermentableIngredient } from "./FermentableIngredient";

type ExtendedRecipe = Recipe & { fermentables?: FermentableIngredientType[] };
export type RecipeFermentableIngredientsProps = {
  src: ExtendedRecipe | null;
  fermentables: any[];
};

export const RecipeFermentableIngredients = ({
  src,
  fermentables,
}: RecipeFermentableIngredientsProps) => {
  const [fermentableIngredients, setFermentableIngredients] = useState(
    src?.fermentables || []
  );
  const removeFermentableIngredient =
    (index: number) => (e: React.MouseEvent) => {
      setFermentableIngredients((o) => o.filter((_, i) => i !== index));
      e.preventDefault();
    };
  const addFermentableIngredient = (e: React.MouseEvent) => {
    setFermentableIngredients((old) => [
      ...old,
      { recipeId: src?.id } as FermentableIngredientType,
    ]);
    e.preventDefault();
  };
  return (
    <div className="flex-auto">
      <div className="flex">
        <label className="text-lg flex-grow">Fermentables</label>
        <button className="flex-shrink" onClick={addFermentableIngredient}>
          Add
        </button>
      </div>
      <ul>
        {fermentableIngredients.map((fermentable, index) => (
          <li key={index}>
            <FermentableIngredient
              fermentables={fermentables}
              fermentable={fermentable}
              index={index}
            >
              <button onClick={removeFermentableIngredient(index)}>
                Remove
              </button>
            </FermentableIngredient>
          </li>
        ))}
      </ul>
    </div>
  );
};
