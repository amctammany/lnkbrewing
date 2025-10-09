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
  betaRange: [number, number, number];
  cohumoloneRange: [number, number, number];
  totalOilRange: [number, number, number];
  farneseneRange: [number, number, number];
  bPineneRange: [number, number, number];
  linaloolRange: [number, number, number];
  geraniolRange: [number, number, number];
  caryophylleneRange: [number, number, number];
  myrceneRange: [number, number, number];
  humuleneRange: [number, number, number];
  id?: string;
  userId?: string;
}
type HopAmountFieldNames =
  | "alpha"
  | "beta"
  | "humulene"
  | "myrcene"
  | "caryophyllene"
  | "farnesene"
  | "linalool"
  | "geraniol"
  | "bPinene"
  | "cohumulone"
  | "totalOil";
export type AdjustedHopType = AmountFields<HopType, HopAmountFieldNames>;
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
  | "maxUsage"
  | "moisture"
  | "friability"
  | "protein";
export type AdjustedFermentableType = AmountFields<
  FermentableType,
  FermentableAmountFieldNames
>;
