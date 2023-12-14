import React, { FC } from "react";
import { Section } from "@/components/Section/Section";
import { GeneralSectionActions } from "./GeneralSectionActions";
import { Prop } from "@/components/Prop";
import { ExtendedRecipe } from "@/app/recipes/types";

interface GeneralSectionProps {
  recipe?: ExtendedRecipe | null;
}

export const GeneralSection: FC<GeneralSectionProps> = ({ recipe }) => {
  return (
    <Section header="General" actions={<GeneralSectionActions />}>
      <Prop label="Name" value={recipe?.name} />
      <Prop label="Author" value={recipe?.author?.name} />
      <Prop label="Description" value={recipe?.description} />
    </Section>
  );
};
