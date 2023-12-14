import {
  FermentableIngredient,
  Fermentable,
  HopIngredient,
  Hop,
  Recipe,
  Style,
  EquipmentProfile,
  Yeast,
  YeastIngredient,
  MashProfile,
  WaterProfile,
  RecipeOtherIngredient,
  OtherIngredient,
  MashStep,
} from "@prisma/client";
import { User } from "next-auth";

export type ExtendedYeastIngredient = YeastIngredient & {
  yeast: Pick<
    Yeast,
    "id" | "name" | "form" | "type" | "attenuation" | "flocculation"
  >;
};
export type ExtendedFermentableIngredient = FermentableIngredient & {
  fermentable: Pick<Fermentable, "id" | "name" | "potential" | "color">;
};
export type ExtendedHopIngredient = HopIngredient & {
  hop: Pick<Hop, "id" | "name" | "alpha">;
};
export type ExtendedMashProfile = MashProfile & {
  steps: MashStep[];
};
export type ExtendedOtherIngredient = RecipeOtherIngredient & {
  otherIngredient: Pick<OtherIngredient, "id" | "name" | "type" | "slug">;
};
export type ExtendedRecipe = Recipe & {
  author: Pick<User, "name" | "email" | "id"> | null;
  style: Style | null;
  water: WaterProfile | null;
  mash: ExtendedMashProfile | null;
  equipment: EquipmentProfile | null;
  hops: ExtendedHopIngredient[];
  fermentables: ExtendedFermentableIngredient[];
  yeasts: ExtendedYeastIngredient[];
  otherIngredients: ExtendedOtherIngredient[];
};
