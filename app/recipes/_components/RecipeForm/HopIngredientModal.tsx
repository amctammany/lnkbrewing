import { Modal } from "@/components";

export type HopIngredientModalProps = {
  recipeId?: number;
  hopId?: string;
};
export const HopIngredientModal = ({
  recipeId,
  hopId,
}: HopIngredientModalProps) => {
  const display = hopId ? "block" : "hidden";
  return (
    <div className={display}>
      <Modal>HopIngredientModal</Modal>
    </div>
  );
};
