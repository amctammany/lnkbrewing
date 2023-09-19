import { Section } from "@/components";
import React, { FC } from "react";
import { ExtendedRecipe } from "../../types";

interface RecipeVitalsProps {
  src?: ExtendedRecipe | null;
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
export interface RecipeVitals {
  abv: number;
  og: number;
  fg: number;
  srm: number;
  ibu: number;
}
function calculateVitals(src: ExtendedRecipe) {
  const og =
    src.fermentables.reduce((acc, fermentable) => {
      acc +=
        fermentable.amount *
        (((fermentable.fermentable.potential || 0) - 1) * 1000);
      return acc;
    }, 0) *
    ((src.equipment?.brewEfficiency || 1) / (src.batchVolume || 1));

  return {
    og,
  };
}

export const RecipeVitals: FC<RecipeVitalsProps> = ({ src }) => {
  const { og } = src ? calculateVitals(src) : ({} as RecipeVitals);
  return (
    <Section header="Vitals">
      <Prop label="OG">{og}</Prop>
      <Prop label="FG">1.004</Prop>
    </Section>
  );
};
