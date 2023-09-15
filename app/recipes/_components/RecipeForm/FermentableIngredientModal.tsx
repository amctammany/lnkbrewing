import { Form, Modal, NumberField, Select, Submit } from "@/components";
import { FermentableIngredient, MassUnit, TimeUnit } from "@prisma/client";
import {
  addFermentableIngredientToRecipe,
  updateFermentableIngredient,
} from "@/app/recipes/actions";
import { prisma } from "@/lib/client";
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
  console.log(fermentable);
  const action = fermentable?.id
    ? updateFermentableIngredient
    : addFermentableIngredientToRecipe;
  const fermentables = (
    await prisma.fermentable.findMany({
      select: {
        name: true,
        power: true,
        potential: true,
        id: true,
      },
    })
  ).reduce((acc, fermentable) => {
    acc[fermentable.id] = fermentable.name;
    return acc;
  }, {} as any);
  return hidden ? null : (
    <Modal hidden={hidden} returnUrl={`/recipes/${recipeId}/edit`}>
      FermentableIngredientModal
      <Form action={action}>
        <input type="hidden" name="id" value={fermentable?.id} />
        <input type="hidden" name="recipeId" value={recipeId} />
        <div className="flex-1">
          <Select
            options={fermentables}
            name="fermentableId"
            label="Fermentable"
            defaultValue={fermentable?.fermentableId}
          />
        </div>
        <div className="flex-0 w-28">
          <NumberField
            name="amount"
            label="Amount"
            defaultValue={fermentable?.amount}
          />
        </div>
        <div className="flex-0 w-24">
          <Select
            name="durationType"
            label="Time Unit"
            options={MassUnit}
            defaultValue={fermentable?.amountType}
          />
        </div>
        <Submit>Save</Submit>
      </Form>
    </Modal>
  );
};
