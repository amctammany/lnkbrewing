import { RoutedModal } from "@/components/Modal/RoutedModal";
import { HopIngredient, TimeUnit } from "@prisma/client";
import {
  addHopIngredientToRecipe,
  removeHopIngredient,
  updateHopIngredient,
} from "@/app/recipes/actions";
import { prisma } from "@/lib/client";
import { HopIngredientForm } from "./HopIngredientForm";
import { TrashIcon } from "@heroicons/react/24/solid";
import { ExtendedHopIngredient } from "../../types";
export type HopIngredientModalProps = {
  recipeId?: number;
  hopId?: string;
  hop?: ExtendedHopIngredient;
  action?: (data: FormData) => void;
};
type RemoveHopButtonProps = {
  id?: number;
};

const RemoveHopButton = ({ id }: RemoveHopButtonProps) => {
  return (
    <form action={removeHopIngredient}>
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="border-red-300 border rounded-md p-2">
        <TrashIcon className="h-6 w-6 text-red-500 " />
      </button>
    </form>
  );
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
          include: { hop: { select: { alpha: true, id: true, name: true } } },
          where: {
            AND: {
              id: { equals: parseInt(hopId) },
              recipeId: { equals: recipeId },
            },
          },
        })
      : ({ recipeId } as ExtendedHopIngredient);
  const action = hop?.id ? updateHopIngredient : addHopIngredientToRecipe;
  return hidden ? null : (
    <RoutedModal hidden={hidden} returnUrl={`/recipes/${recipeId}/edit`}>
      <HopIngredientForm src={hop} action={action} />
      <RemoveHopButton id={hop?.id} />
    </RoutedModal>
  );
};
