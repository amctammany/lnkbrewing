import { RoutedModal } from "@/components";
import { FermentableIngredient } from "@prisma/client";
import {
  addFermentableIngredientToRecipe,
  updateFermentableIngredient,
} from "@/app/recipes/actions";
import { prisma } from "@/lib/client";
import { FermentableIngredientForm } from "./FermentableIngredientForm";
export type FermentableIngredientModalProps = {
  recipeId?: number;
  fermentableId?: string;
  fermentable?: FermentableIngredient;
  action?: (data: FormData) => void;
};
export const FermentableIngredientModal = async ({
  recipeId,
  fermentableId,
}: //fermentable,
//action,
FermentableIngredientModalProps) => {
  const hidden = fermentableId === undefined || fermentableId === "";
  const fermentable =
    fermentableId && fermentableId !== "new"
      ? await prisma.fermentableIngredient.findFirst({
          where: {
            AND: {
              id: { equals: parseInt(fermentableId) },
              recipeId: { equals: recipeId },
            },
          },
        })
      : ({ recipeId } as FermentableIngredient);
  const action = fermentable?.id
    ? updateFermentableIngredient
    : addFermentableIngredientToRecipe;
  return hidden ? null : (
    <RoutedModal hidden={hidden} returnUrl={`/recipes/${recipeId}/edit`}>
      FermentableIngredientModal
      <FermentableIngredientForm src={fermentable} action={action} />
    </RoutedModal>
  );
};
