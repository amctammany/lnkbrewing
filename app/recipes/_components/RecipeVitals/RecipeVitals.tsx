import { Section } from "@/components/Section/Section";
import { Range } from "@/components/Range";
import React, { FC } from "react";
import { ExtendedRecipe } from "../../types";
import { RecipeVitalType } from "../../actions";

interface RecipeVitalsProps {
  src?: ExtendedRecipe | null;
}
//export interface RecipeVitalType {
//abv: number;
//og: number;
//fg: number;
//srm: number;
//ibu: number;
//}
//export function calculateVitals(src: ExtendedRecipe) {
//console.log(src.fermentables);
//const og =
//(src.fermentables.reduce((acc, fermentable) => {
//acc +=
//fermentable.amount *
//(((fermentable.fermentable.potential || 1) - 1) * 1000);
//return acc;
//}, 0) *
//((src.equipment?.brewEfficiency || 1) / (src.batchVolume || 1))) /
//1000 +
//1;
//const fg = 1 + ((og - 1) * 1000 * (1 - 0.8)) / 1000;

//const srm =
//1.49 *
//src.fermentables.reduce((acc, fermentable) => {
//acc +=
//((fermentable.fermentable.color || 1) * fermentable.amount) /
//(src.batchVolume || 1);
//return acc;
//}, 0) **
//0.6859;
//const gravity = ((src.batchVolume || 1) / (src.boilVolume || 1)) * (og - 1);
//const bigness = 1.65 * 0.000125 ** gravity;
//const boilfactor = (1 - Math.exp(-0.04 * (src.boilTime || 60))) / 4.15;
//const utilization = bigness * boilfactor * 1.1;

//const ibu = src.hops.reduce((acc, hop) => {
//acc +=
//((hop.hop.alpha || 1) * hop.amount * utilization * 74.9) /
//(src.batchVolume || 1);
//return acc;
//}, 0);
//const abv = (100 * ((og - fg) * 1.05)) / fg / 0.79;
//return {
//og,
//srm,
//fg,
//ibu,
//abv,
//} as RecipeVitalType;
//}
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
  const {
    fgLow,
    fgHigh,
    ogLow,
    ogHigh,
    abvLow,
    abvHigh,
    ibuLow,
    ibuHigh,
    srmLow,
    srmHigh,
  } = src?.style! ?? {};
  const { og, srm, fg, ibu, abv } =
    src || ({ og: 0, fg: 0, srm: 0, ibu: 0, abv: 0 } as RecipeVitalType);
  return (
    <Section header="Vitals">
      <Range
        label="OG"
        min={1.0}
        max={1.2}
        range={[ogLow, ogHigh]}
        value={og}
      />
      <Range
        label="FG"
        min={1.0}
        max={1.02}
        range={[fgLow, fgHigh]}
        value={fg}
      />
      <Range
        label="IBU"
        min={0}
        max={200}
        range={[ibuLow, ibuHigh]}
        value={ibu}
      />
      <Range
        label="SRM"
        min={0}
        max={80}
        range={[srmLow, srmHigh]}
        value={srm}
      />
      <Range
        label="ABV"
        min={0}
        max={15}
        range={[abvLow, abvHigh]}
        value={abv}
      />
    </Section>
  );
};
