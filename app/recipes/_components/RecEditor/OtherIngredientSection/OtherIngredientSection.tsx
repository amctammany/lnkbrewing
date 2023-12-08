import { getExtendedRecipe } from "@/app/recipes/queries";
import { Section } from "@/components/Section/Section";
import React, { FC } from "react";
import dynamic from "next/dynamic";
const OtherIngredientModal = dynamic(() => import("./OtherIngredientModal"), {
  ssr: true,
});
import { List } from "@/components/List/List";
import { OtherIngredientListItem } from "./OtherIngredientListItem";
import { UserMassPreference } from "@prisma/client";
import { OtherIngredientSectionActions } from "./OtherIngredientSectionActions";
import { getOtherIngredients } from "@/app/ingredients/other/queries";

interface OtherIngredientSectionProps {
  recipeId: number;
  massUnit: UserMassPreference;
}

export const OtherIngredientSection: FC<OtherIngredientSectionProps> = async ({
  recipeId,
  massUnit,
}) => {
  const recipe = await getExtendedRecipe(recipeId);
  const others = await getOtherIngredients();
  return (
    <>
      <Section
        className="md:col-span-2"
        header="Others"
        actions={<OtherIngredientSectionActions />}
      >
        <List>
          {(recipe?.otherIngredients || []).map((other) => (
            <OtherIngredientListItem key={other.id} other={other} />
          ))}
        </List>
      </Section>
      <OtherIngredientModal others={others} massUnit={massUnit} />
    </>
  );
};
