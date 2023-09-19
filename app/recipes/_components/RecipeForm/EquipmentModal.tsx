import { RoutedModal } from "@/components";
import { EquipmentProfile, TimeUnit } from "@prisma/client";
import { updateRecipe, updateRecipeEquipment } from "@/app/recipes/actions";
import { prisma } from "@/lib/client";
import { EquipmentProfileForm } from "./EquipmentProfileForm";
import { getRecipe } from "@/app/recipes/queries";
export type EquipmentProfileModalProps = {
  recipeId: number;
  open?: boolean;
  hop?: EquipmentProfile;
  action?: (data: FormData) => void;
};
export const EquipmentProfileModal = async ({
  recipeId,
  open,
}: //hop,
//action,
EquipmentProfileModalProps) => {
  const recipe = await getRecipe(recipeId);
  //const hop =
  //hopId && hopId !== "new"
  //? await prisma.equipmentProfile.findFirst({
  //where: {
  //recipeId: { equals: recipeId },
  //},
  //},
  //})
  //: ({ recipeId } as EquipmentProfile);
  return !open ? null : (
    <RoutedModal hidden={!open} returnUrl={`/recipes/${recipeId}/edit`}>
      <EquipmentProfileForm src={recipe} action={updateRecipeEquipment} />
    </RoutedModal>
  );
};
