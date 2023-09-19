import { Section } from "@/components";
import React, { FC } from "react";
import { ExtendedRecipe } from "../../types";
import { Recipe } from "@prisma/client";

interface RecipeVitalsProps {
  src?: Recipe | null;
}
export interface RecipeVitalType {
  abv: number;
  og: number;
  fg: number;
  srm: number;
  ibu: number;
}
export function calculateVitals(src: ExtendedRecipe) {
  console.log(src.fermentables);
  const og =
    (src.fermentables.reduce((acc, fermentable) => {
      acc +=
        fermentable.amount *
        (((fermentable.fermentable.potential || 1) - 1) * 1000);
      return acc;
    }, 0) *
      ((src.equipment?.brewEfficiency || 1) / (src.batchVolume || 1))) /
      1000 +
    1;
  const fg = 1 + ((og - 1) * 1000 * (1 - 0.8)) / 1000;

  const srm =
    1.49 *
    src.fermentables.reduce((acc, fermentable) => {
      acc +=
        ((fermentable.fermentable.color || 1) * fermentable.amount) /
        (src.batchVolume || 1);
      return acc;
    }, 0) **
      0.6859;
  const gravity = ((src.batchVolume || 1) / (src.boilVolume || 1)) * (og - 1);
  const bigness = 1.65 * 0.000125 ** gravity;
  const boilfactor = (1 - Math.exp(-0.04 * (src.boilTime || 60))) / 4.15;
  const utilization = bigness * boilfactor * 1.1;

  const ibu = src.hops.reduce((acc, hop) => {
    acc +=
      ((hop.hop.alpha || 1) * hop.amount * utilization * 74.9) /
      (src.batchVolume || 1);
    return acc;
  }, 0);
  const abv = (100 * ((og - fg) * 1.05)) / fg / 0.79;
  return {
    og,
    srm,
    fg,
    ibu,
    abv,
  } as RecipeVitalType;
}
type PropProps = {
  label?: string;
  children?: any;
};
const Prop = ({ label, children }: PropProps) => {
  return (
    <div className="flex flex-auto p-2 border-b-2">
      <b className="px-3">{label}</b>
      <div className="flex-grow">{children}</div>
    </div>
  );
};
export const RecipeVitals: FC<RecipeVitalsProps> = ({ src }) => {
  const { og, srm, fg, ibu, abv } = src || ({} as RecipeVitalType);
  return (
    <Section header="Vitals">
      <Prop label="OG">{og.toFixed(3)}</Prop>
      <Prop label="FG">{fg.toFixed(3)}</Prop>
      <Prop label="IBU">{ibu.toFixed(1)}</Prop>
      <Prop label="SRM">{srm.toFixed(1)}</Prop>
      <Prop label="ABV">{abv.toFixed(2)}</Prop>
    </Section>
  );
};
