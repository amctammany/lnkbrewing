import { Modal } from "@/components";
import { HopIngredient } from "@prisma/client";
export type HopIngredientModalProps = {
  params: {
    hopId: number;
  };
};

export default function HopIngredientModal({
  params: { hopId },
}: HopIngredientModalProps) {
  return <Modal>HopIngredientModal</Modal>;
}
