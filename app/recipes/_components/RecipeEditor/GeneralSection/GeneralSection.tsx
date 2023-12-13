import { getExtendedRecipe, getRecipe } from "@/app/recipes/queries";
import { Section } from "@/components/Section/Section";
import React, { FC } from "react";
import dynamic from "next/dynamic";
const GeneralModal = dynamic(() => import("./GeneralModal"), {
  ssr: true,
});
import { UserMassPreference } from "@prisma/client";
import { GeneralSectionActions } from "./GeneralSectionActions";
import { Prop } from "@/components/Prop";

interface GeneralSectionProps {
  recipeId: number;
  massUnit: UserMassPreference;
}

export const GeneralSection: FC<GeneralSectionProps> = async ({
  recipeId,
  massUnit,
}) => {
  const recipe = await getExtendedRecipe(recipeId);
  return (
    <div className="md:col-span-2">
      <Section header="General" actions={<GeneralSectionActions />}>
        <Prop label="Name" value={recipe?.name} />
        <Prop label="Author" value={recipe?.author?.name} />
        <Prop label="Description" value={recipe?.description} />
      </Section>
      <GeneralModal recipe={recipe} massUnit={massUnit} />
    </div>
  );
};
