import {
  FermentableIngredient,
  Fermentable,
  HopIngredient,
  Hop,
  Recipe,
  Style,
  EquipmentProfile,
} from "@prisma/client";
import { User } from "next-auth";

export type ExtendedFermentableIngredient = FermentableIngredient & {
  fermentable: Pick<Fermentable, "id" | "name" | "potential" | "color">;
};
export type ExtendedHopIngredient = HopIngredient & {
  hop: Pick<Hop, "id" | "name" | "alpha">;
};
export type ExtendedRecipe = Recipe & {
  author: Pick<User, "name" | "email" | "id"> | null;
  style: Pick<Style, "id" | "identifier" | "name"> | null;
  equipment: EquipmentProfile | null;
  hops: ExtendedHopIngredient[];
  fermentables: ExtendedFermentableIngredient[];
};
