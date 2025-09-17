import { OptionalNullable } from "@/lib/utils";
import { Fermentable, Hop, Yeast } from "@prisma/client";

export type HopType = OptionalNullable<Hop> & { id?: string | null };
export type YeastType = OptionalNullable<Yeast> & { id?: string | null };
export type FermentableType = OptionalNullable<Fermentable> & {
  id?: string | null;
};
