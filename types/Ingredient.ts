import { OptionalNullable } from "@/lib/utils";
import { Fermentable, Hop, OtherIngredient, Yeast } from "@prisma/client";

export type OtherType = OtherIngredient & {
  id?: string | null;
  userId?: string | null;
};
export type HopType = Hop & {
  alphaRange: [number, number, number];
  id?: string | null;
};
export type YeastType = Yeast & { id?: string | null };
export type FermentableType = Fermentable & {
  id?: string | null;
};
