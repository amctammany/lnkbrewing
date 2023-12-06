import { ExtendedRecipe } from "@/app/recipes/types";
import { RoutedModal } from "@/components/Modal/RoutedModal";
import React, { FC } from "react";
import { WaterProfileForm } from "./WaterProfileForm";
import { updateRecipe } from "@/app/recipes/actions";
import {
  getWaterProfileOptions,
  getWaterProfiles,
} from "@/app/profiles/queries";
import { WaterSelect } from "./WaterSelect";

interface WaterProfileModalProps {
  recipe?: ExtendedRecipe | null;
  open: boolean;
}

export const WaterProfileModal: FC<WaterProfileModalProps> = async ({
  recipe,
  open,
}) => {
  const waterProfiles = await getWaterProfiles();
  return (
    <RoutedModal
      title="Edit Water Profile"
      hidden={!open}
      returnUrl={`/recipes/${recipe?.id}/edit`}
    >
      <div>
        <WaterProfileForm
          profiles={waterProfiles}
          recipe={recipe}
          action={updateRecipe}
        />
      </div>
    </RoutedModal>
  );
};
export default WaterProfileModal;
