import { HopIngredientForm } from "@/app/recipes/_components";
import { createHopIngredient } from "@/app/recipes/actions";
import { Modal } from "@/components";
import { HopIngredient } from "@prisma/client";

export type NewHopIngredientModalProps = { params: { id: number } };
export default function NewHopIngredientModal({
  params: { id },
}: NewHopIngredientModalProps) {
  const hop = { recipeId: id } as HopIngredient;
  return (
    <Modal>
      <h2>Create Hop Ingredient</h2>
      <HopIngredientForm src={hop} action={createHopIngredient} />
    </Modal>
  );
}
