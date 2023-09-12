"use client";
import {
  Button,
  Form,
  NumberField,
  Section,
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
import Link from "next/link";

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
  const HopActionBar = () => (
    <Button className="flex-shrink" onClick={addHopIngredient}>
      Add
    </Button>
  );

  return (
    <Section header="Hops" actions={<HopActionBar />}>
      <ul>
        {hopIngredients.map((hop, index) => (
          <li key={index}>
            <HopIngredient hops={hops} hop={hop} index={index}>
              <Link href={`/recipes/${src?.id}/edit/hops/${hop.id}`}>Edit</Link>
              <Button onClick={removeHopIngredient(index)}>Remove</Button>
            </HopIngredient>
          </li>
        ))}
      </ul>
    </Section>
  );
};
