import { Section } from "@/components";
import React, { FC } from "react";
import { ExtendedRecipe } from "../../types";
import { RecipeVitalType, calculateVitals } from "../../actions";

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
export const RecipeVitals: FC<RecipeVitalsProps> = ({ src }) => {
  const { og, srm, fg, ibu, abv } = src
    ? calculateVitals(src)
    : ({} as RecipeVitalType);
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
