import { Form, Modal, NumberField, Select, Submit } from "@/components";
import { HopIngredient, TimeUnit } from "@prisma/client";
import {
  addHopIngredientToRecipe,
  updateHopIngredient,
} from "@/app/recipes/actions";
import { prisma } from "@/lib/client";
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
  console.log(hop);
  const action = hop?.id ? updateHopIngredient : addHopIngredientToRecipe;
  const hops = (
    await prisma.hop.findMany({
      select: {
        name: true,
        alpha: true,
        id: true,
      },
    })
  ).reduce((acc, hop) => {
    acc[hop.id] = hop.name;
    return acc;
  }, {} as any);
  return hidden ? null : (
    <Modal hidden={hidden} returnUrl={`/recipes/${recipeId}/edit`}>
      HopIngredientModal
      <Form action={action}>
        <input type="hidden" name="id" value={hop?.id} />
        <input type="hidden" name="recipeId" value={recipeId} />
        <div className="flex-1">
          <Select
            options={hops}
            name="hopId"
            label="Hop"
            defaultValue={hop?.hopId}
          />
        </div>
        <div className="flex-0 w-28">
          <NumberField
            name="amount"
            label="Amount"
            defaultValue={hop?.amount}
          />
        </div>
        <div className="flex-0 w-24">
          <NumberField
            name="duration"
            label="Time"
            defaultValue={hop?.duration}
          />
        </div>
        <div className="flex-0 w-24">
          <Select
            name="durationType"
            label="Time Unit"
            options={TimeUnit}
            defaultValue={hop?.durationType}
          />
        </div>
        <Submit>Save</Submit>
      </Form>
    </Modal>
  );
};
