import { getExtendedRecipe, getRecipe } from "@/app/recipes/queries";
import { ButtonLink } from "@/components/Button/Button";
import { Section } from "@/components/Section/Section";
import React, { FC } from "react";
import { EquipmentProfileModal } from "./EquipmentProfileModal";
import { NumberField } from "@/components/Form/NumberField";
import { EquipmentProfileSelect } from "@/app/profiles/_components";

interface EquipmentSectionProps {
  recipeId: number;
  open: boolean;
}

const EquipmentSectionActions = () => {
  return (
    <div>
      <ButtonLink href="?equipment=true">Edit</ButtonLink>
    </div>
  );
};
export const EquipmentSection: FC<EquipmentSectionProps> = async ({
  recipeId,
  open,
}) => {
  const recipe = await getExtendedRecipe(recipeId);
  return (
    <Section header="Equipment" actions={<EquipmentSectionActions />}>
      <div className="flex flex-row md:grid md:grid-cols-2 gap-2">
        <div className="col-span-2">
          <EquipmentProfileSelect
            name="equipmentProfileId"
            value={recipe?.equipmentProfileId}
            disabled
          />
        </div>
        <NumberField
          label="Boil Time"
          name="boilTime"
          defaultValue={recipe?.boilTime}
          disabled
        />
        <NumberField
          label="Batch Volume"
          name="batchVolume"
          defaultValue={recipe?.batchVolume}
          disabled
        />
      </div>
      <EquipmentProfileModal recipe={recipe} open={open} />
    </Section>
  );
};
