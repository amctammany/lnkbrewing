import { getExtendedRecipe, getRecipe } from "@/app/recipes/queries";
import { Section } from "@/components/Section/Section";
import React, { FC } from "react";
//import { YeastIngredientModal } from "./YeastIngredientModal";
import dynamic from "next/dynamic";
const YeastIngredientModal = dynamic(() => import("./YeastIngredientModal"), {
  ssr: true,
});
//import { RecipeVitals } from "../..";
import { List } from "@/components/List/List";
import { YeastIngredientListItem } from "./YeastIngredientListItem";
import { UserMassPreference } from "@prisma/client";
import { Icon } from "@/components/Icon";
import { ExtendedYeastIngredient } from "@/app/recipes/types";
//import YeastIngredientModalContainer from "./YeastIngredientModalContainer";
import { getYeasts } from "@/app/ingredients/yeasts/queries";
import {
  addYeastIngredientToRecipe,
  updateYeastIngredient,
} from "@/app/recipes/actions";
import { YeastIngredientSectionActions } from "./YeastIngredientSectionActions";

interface YeastIngredientSectionProps {
  recipeId: number;
  massUnit: UserMassPreference;
  yeastId?: string | null;
}

export const YeastIngredientSection: FC<YeastIngredientSectionProps> = async ({
  recipeId,
  massUnit,
  yeastId,
}) => {
  //const open = !!yeastId;
  const recipe = await getExtendedRecipe(recipeId);
  const yeasts = await getYeasts();
  const yeastIngredient =
    yeastId === "new"
      ? ({ recipeId } as ExtendedYeastIngredient)
      : recipe?.yeasts.find((h) => h.id === parseInt(yeastId!));
  console.log({ yeastIngredient, yeastId });
  const action = yeastIngredient?.id
    ? updateYeastIngredient
    : addYeastIngredientToRecipe;
  /**
    (await prisma.yeastIngredient.findFirst({
      where: {
        id: parseInt(yeastId || "") || 0,
      },import { ExtendedYeastIngredient, ExtendedRecipe } from "@/app/recipes/types";
import { Modal } from "@/components/Modal/Modal";
import React, { FC } from "react";
//import { YeastIngredientForm } from "./YeastIngredientForm";
import dynamic from "next/dynamic";
const YeastIngredientForm = dynamic(() => import("./YeastIngredientForm"), {
  ssr: false,
});

import {
  addYeastIngredientToRecipe,
  updateYeastIngredient,
} from "@/app/recipes/actions";
//import { getYeastOptions, getYeasts } from "@/app/ingredients/yeasts/queries";
import { YeastIngredient, UserMassPreference } from "@prisma/client";

interface YeastIngredientProfileModalProps {
  recipe?: ExtendedRecipe | null;
  yeast?: ExtendedYeastIngredient | null;
  yeastId?: string;
  massUnit: UserMassPreference;
  open: boolean;
}

export const YeastIngredientModal: FC<YeastIngredientProfileModalProps> = async ({
  recipe,
  yeast,
  yeastId,
  open,
  massUnit,
}) => {
  const action = yeast?.id ? updateYeastIngredient : addYeastIngredientToRecipe;
  return (
    <Modal
      //title="Edit Yeast"
      hidden={!open}
    >
      <div>
        <YeastIngredientForm
          massUnit={massUnit}
          yeastId={yeastId}
          yeast={yeast}
          recipe={recipe}
          action={action}
          yeasts={yeasts}
        />
      </div>
    </Modal>
  );
};
export default YeastIngredientModal;
      include: {
        yeast: true,
      },
    }));
     */

  return (
    <>
      <Section header="Yeasts" actions={<YeastIngredientSectionActions />}>
        <List>
          {(recipe?.yeasts || []).map((yeast) => (
            <YeastIngredientListItem key={yeast.id} yeast={yeast} />
          ))}
        </List>
      </Section>
      <YeastIngredientModal
        //yeast={yeastIngredient}
        action={action}
        yeasts={yeasts}
        //yeastId={yeastId!}
        //recipe={recipe}
        massUnit={massUnit}
        //open={open}
      />
    </>
  );
};
