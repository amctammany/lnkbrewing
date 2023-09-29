import { getExtendedRecipe, getRecipe } from "@/app/recipes/queries";
import { ButtonLink } from "@/components/Button/Button";
import { Section } from "@/components/Section/Section";
import React, { FC } from "react";
//import { GeneralModal } from "./GeneralModal";
import dynamic from "next/dynamic";
const GeneralModal = dynamic(() => import("./GeneralModal"), { ssr: false });
import { RecipeVitals } from "../..";

interface GeneralSectionProps {
  recipeId: number;
  open: boolean;
}

const GeneralSectionActions = () => {
  return (
    <div>
      <ButtonLink href="?general=1">Edit</ButtonLink>
    </div>
  );
};
export const GeneralSection: FC<GeneralSectionProps> = async ({
  recipeId,
  open,
}) => {
  const recipe = await getExtendedRecipe(recipeId);

  return (
    <Section header="General" actions={<GeneralSectionActions />}>
      <div className="flex flex-col ">
        <div>
          <b>Name:</b>
          <span>{recipe?.name}</span>
        </div>
        <div>
          <b>Description:</b>
          <span>{recipe?.description}</span>
        </div>
      </div>
      {open && <GeneralModal recipe={recipe} open={open} />}
    </Section>
  );
};
