import { OptionalNullable } from "@/lib/utils";
import { Fermentable, Hop, OtherIngredient, Yeast } from "@prisma/client";
import { AmountFields } from "./Profile";

export interface OtherType
  extends Omit<OptionalNullable<OtherIngredient>, "id" | "userId"> {
  id?: string;
  userId?: string | null;
}
export interface HopType extends Omit<OptionalNullable<Hop>, "id" | "userId"> {
  alphaRange: [number, number, number];
  id?: string;
  userId?: string;
}
export interface YeastType
  extends Omit<OptionalNullable<Yeast>, "id" | "userId"> {
  userId?: string;
  id?: string;
}
export interface FermentableType
  extends Omit<OptionalNullable<Fermentable>, "id" | "userId"> {
  id?: string;
  userId?: string;
}

type FermentableAmountFieldNames =
  | "color"
  | "moisture"
  | "potential"
  | "friability"
  | "protein";
export type AdjustedFermentable = AmountFields<
  FermentableType,
  FermentableAmountFieldNames
>;
