import { ExtendedRecipe } from "@/app/recipes/types";
import { RoutedModal } from "@/components/Modal/RoutedModal";
import React, { FC } from "react";
import { MashProfileForm } from "./MashProfileForm";
import {
  changeRecipeMashProfile,
  updateRecipeMash,
} from "@/app/recipes/actions";
import { getMashProfileOptions, getMashProfiles } from "@/app/profiles/queries";
import { MashSelect } from "./MashSelect";

interface MashProfileModalProps {
  recipe?: ExtendedRecipe | null;
  open: boolean;
}

export const MashProfileModal: FC<MashProfileModalProps> = async ({
  recipe,
  open,
}) => {
  const mashProfiles = await getMashProfiles();
  return (
    <RoutedModal hidden={!open} returnUrl={`/recipes/${recipe?.id}/edit`}>
      <div>
        <MashProfileForm
          profiles={mashProfiles}
          recipe={recipe}
          action={updateRecipeMash}
        />
      </div>
    </RoutedModal>
  );
};
export default MashProfileModal;
