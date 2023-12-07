import { getExtendedRecipe, getRecipe } from "@/app/recipes/queries";
import { Section } from "@/components/Section/Section";
import React, { FC } from "react";
//import { HopIngredientModal } from "./HopIngredientModal";
import dynamic from "next/dynamic";
const HopIngredientModal = dynamic(() => import("./HopIngredientModal"), {
  ssr: true,
});
//import { RecipeVitals } from "../..";
import { List } from "@/components/List/List";
import { HopIngredientListItem } from "./HopIngredientListItem";
import { UserMassPreference } from "@prisma/client";
import { Icon } from "@/components/Icon";
import { ExtendedHopIngredient } from "@/app/recipes/types";
//import HopIngredientModalContainer from "./HopIngredientModalContainer";
import { getHops } from "@/app/ingredients/hops/queries";
import {
  addHopIngredientToRecipe,
  updateHopIngredient,
} from "@/app/recipes/actions";
import { HopIngredientSectionActions } from "./HopIngredientSectionActions";

interface HopIngredientSectionProps {
  recipeId: number;
  massUnit: UserMassPreference;
  hopId?: string | null;
}

export const HopIngredientSection: FC<HopIngredientSectionProps> = async ({
  recipeId,
  massUnit,
  hopId,
}) => {
  //const open = !!hopId;
  const recipe = await getExtendedRecipe(recipeId);
  const hops = await getHops();
  const hopIngredient =
    hopId === "new"
      ? ({ recipeId } as ExtendedHopIngredient)
      : recipe?.hops.find((h) => h.id === parseInt(hopId!));
  const action = hopIngredient?.id
    ? updateHopIngredient
    : addHopIngredientToRecipe;
  /**
    (await prisma.hopIngredient.findFirst({
      where: {
        id: parseInt(hopId || "") || 0,
      },import { ExtendedHopIngredient, ExtendedRecipe } from "@/app/recipes/types";
import { Modal } from "@/components/Modal/Modal";
import React, { FC } from "react";
//import { HopIngredientForm } from "./HopIngredientForm";
import dynamic from "next/dynamic";
const HopIngredientForm = dynamic(() => import("./HopIngredientForm"), {
  ssr: false,
});

import {
  addHopIngredientToRecipe,
  updateHopIngredient,
} from "@/app/recipes/actions";
//import { getHopOptions, getHops } from "@/app/ingredients/hops/queries";
import { HopIngredient, UserMassPreference } from "@prisma/client";

interface HopIngredientProfileModalProps {
  recipe?: ExtendedRecipe | null;
  hop?: ExtendedHopIngredient | null;
  hopId?: string;
  massUnit: UserMassPreference;
  open: boolean;
}

export const HopIngredientModal: FC<HopIngredientProfileModalProps> = async ({
  recipe,
  hop,
  hopId,
  open,
  massUnit,
}) => {
  const action = hop?.id ? updateHopIngredient : addHopIngredientToRecipe;
  return (
    <Modal
      //title="Edit Hop"
      hidden={!open}
    >
      <div>
        <HopIngredientForm
          massUnit={massUnit}
          hopId={hopId}
          hop={hop}
          recipe={recipe}
          action={action}
          hops={hops}
        />
      </div>
    </Modal>
  );
};
export default HopIngredientModal;
      include: {
        hop: true,
      },
    }));
     */

  return (
    <>
      <Section header="Hops" actions={<HopIngredientSectionActions />}>
        <List>
          {(recipe?.hops || []).map((hop) => (
            <HopIngredientListItem key={hop.id} hop={hop} />
          ))}
        </List>
      </Section>
      <HopIngredientModal
        //hop={hopIngredient}
        action={action}
        hops={hops}
        hopId={hopId!}
        recipe={recipe}
        massUnit={massUnit}
        //open={open}
      />
    </>
  );
};
