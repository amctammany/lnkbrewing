import { HopIngredientForm } from "@/app/recipes/_components/RecipeForm/HopIngredientForm";
import { Modal } from "@/components";
import { prisma } from "@/lib/client";
import { HopIngredient } from "@prisma/client";
export type HopIngredientModalProps = {
  params: {
    id: number;
    hopId: number;
  };
};

export default async function HopIngredientModal({
  params: { id, hopId },
}: HopIngredientModalProps) {
  const hop = await prisma.hopIngredient.findFirst({
    where: { recipeId: id, id: hopId },
  });
  return (
    <Modal>
      <h2>Create Hop Ingredient</h2>
      <HopIngredientForm src={hop} />
    </Modal>
  );
}
