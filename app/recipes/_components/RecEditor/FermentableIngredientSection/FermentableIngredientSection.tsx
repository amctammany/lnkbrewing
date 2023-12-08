import { getExtendedRecipe, getRecipe } from "@/app/recipes/queries";
import { Section } from "@/components/Section/Section";
import React, { FC } from "react";
//import { FermentableIngredientModal } from "./FermentableIngredientModal";
import dynamic from "next/dynamic";
const FermentableIngredientModal = dynamic(
  () => import("./FermentableIngredientModal"),
  {
    ssr: true,
  }
);
//import { RecipeVitals } from "../..";
import { List } from "@/components/List/List";
import { FermentableIngredientListItem } from "./FermentableIngredientListItem";
import { UserMassPreference } from "@prisma/client";
import { Icon } from "@/components/Icon";
import { ExtendedFermentableIngredient } from "@/app/recipes/types";
//import FermentableIngredientModalContainer from "./FermentableIngredientModalContainer";
import { getFermentables } from "@/app/ingredients/fermentables/queries";
import {
  addFermentableIngredientToRecipe,
  updateFermentableIngredient,
} from "@/app/recipes/actions";
import { FermentableIngredientSectionActions } from "./FermentableIngredientSectionActions";

interface FermentableIngredientSectionProps {
  recipeId: number;
  massUnit: UserMassPreference;
  fermentableId?: string | null;
}

export const FermentableIngredientSection: FC<
  FermentableIngredientSectionProps
> = async ({ recipeId, massUnit, fermentableId }) => {
  //const open = !!fermentableId;
  const recipe = await getExtendedRecipe(recipeId);
  const fermentables = await getFermentables();
  const fermentableIngredient =
    fermentableId === "new"
      ? ({ recipeId } as ExtendedFermentableIngredient)
      : recipe?.fermentables.find((h) => h.id === parseInt(fermentableId!));
  console.log({ fermentableIngredient, fermentableId });
  const action = fermentableIngredient?.id
    ? updateFermentableIngredient
    : addFermentableIngredientToRecipe;
  /**
    (await prisma.fermentableIngredient.findFirst({
      where: {
        id: parseInt(fermentableId || "") || 0,
      },import { ExtendedFermentableIngredient, ExtendedRecipe } from "@/app/recipes/types";
import { Modal } from "@/components/Modal/Modal";
import React, { FC } from "react";
//import { FermentableIngredientForm } from "./FermentableIngredientForm";
import dynamic from "next/dynamic";
const FermentableIngredientForm = dynamic(() => import("./FermentableIngredientForm"), {
  ssr: false,
});

import {
  addFermentableIngredientToRecipe,
  updateFermentableIngredient,
} from "@/app/recipes/actions";
//import { getFermentableOptions, getFermentables } from "@/app/ingredients/fermentables/queries";
import { FermentableIngredient, UserMassPreference } from "@prisma/client";

interface FermentableIngredientProfileModalProps {
  recipe?: ExtendedRecipe | null;
  fermentable?: ExtendedFermentableIngredient | null;
  fermentableId?: string;
  massUnit: UserMassPreference;
  open: boolean;
}

export const FermentableIngredientModal: FC<FermentableIngredientProfileModalProps> = async ({
  recipe,
  fermentable,
  fermentableId,
  open,
  massUnit,
}) => {
  const action = fermentable?.id ? updateFermentableIngredient : addFermentableIngredientToRecipe;
  return (
    <Modal
      //title="Edit Fermentable"
      hidden={!open}
    >
      <div>
        <FermentableIngredientForm
          massUnit={massUnit}
          fermentableId={fermentableId}
          fermentable={fermentable}
          recipe={recipe}
          action={action}
          fermentables={fermentables}
        />
      </div>
    </Modal>
  );
};
export default FermentableIngredientModal;
      include: {
        fermentable: true,
      },
    }));
     */

  return (
    <>
      <Section
        header="Fermentables"
        actions={<FermentableIngredientSectionActions />}
      >
        <List>
          {(recipe?.fermentables || []).map((fermentable) => (
            <FermentableIngredientListItem
              key={fermentable.id}
              fermentable={fermentable}
            />
          ))}
        </List>
      </Section>
      <FermentableIngredientModal
        //fermentable={fermentableIngredient}
        action={action}
        fermentables={fermentables}
        //fermentableId={fermentableId!}
        //recipe={recipe}
        massUnit={massUnit}
        //open={open}
      />
    </>
  );
};
