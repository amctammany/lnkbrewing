import { RoutedModal } from "@/components";
import { HopIngredient, TimeUnit } from "@prisma/client";
import {
  addHopIngredientToRecipe,
  updateHopIngredient,
} from "@/app/recipes/actions";
import { prisma } from "@/lib/client";
import { HopIngredientForm } from "./HopIngredientForm";
export type HopIngredientModalProps = {
  recipeId?: number;
  hopId?: string;
  hop?: HopIngredient;
  action?: (data: FormData) => void;
};
export const HopIngredientModal = async ({
  recipeId,
  hopId,
}: //hop,
//action,
HopIngredientModalProps) => {
  const hidden = hopId === undefined || hopId === "";
  const hop =
    hopId && hopId !== "new"
      ? await prisma.hopIngredient.findFirst({
          where: {
            AND: {
              id: { equals: parseInt(hopId) },
              recipeId: { equals: recipeId },
            },
          },
        })
      : ({ recipeId } as HopIngredient);
  const action = hop?.id ? updateHopIngredient : addHopIngredientToRecipe;
  return hidden ? null : (
    <RoutedModal hidden={hidden} returnUrl={`/recipes/${recipeId}/edit`}>
      HopIngredientModal
      <HopIngredientForm src={hop} action={action} />
    </RoutedModal>
  );
};
