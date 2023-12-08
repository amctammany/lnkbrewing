import { getExtendedRecipe, getRecipe } from "@/app/recipes/queries";
import { Section } from "@/components/Section/Section";
import React, { FC } from "react";
//import { GeneralModal } from "./GeneralModal";
import dynamic from "next/dynamic";
const GeneralModal = dynamic(() => import("./GeneralModal"), {
  ssr: true,
});
//import { RecipeVitals } from "../..";
import { List } from "@/components/List/List";
import { UserMassPreference } from "@prisma/client";
import { ExtendedRecipe } from "@/app/recipes/types";
//import GeneralModalContainer from "./GeneralModalContainer";
import { updateRecipe } from "@/app/recipes/actions";
import { GeneralSectionActions } from "./GeneralSectionActions";
import { Prop } from "@/components/Prop";

interface GeneralSectionProps {
  recipeId: number;
  massUnit: UserMassPreference;
  otherId?: string | null;
}

export const GeneralSection: FC<GeneralSectionProps> = async ({
  recipeId,
  massUnit,
  otherId,
}) => {
  //const open = !!otherId;
  const recipe = await getExtendedRecipe(recipeId);
  return (
    <>
      <Section header="Others" actions={<GeneralSectionActions />}>
        <Prop label="Name" value={recipe?.name} />
        <Prop label="Author" value={recipe?.author?.name} />
        <Prop label="Description" value={recipe?.description} />
      </Section>
      <GeneralModal
        //other={general}
        //otherId={otherId!}
        //recipe={recipe}
        massUnit={massUnit}
        //open={open}
      />
    </>
  );
};
