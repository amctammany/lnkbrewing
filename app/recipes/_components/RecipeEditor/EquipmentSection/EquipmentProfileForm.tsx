"use client";
import { EquipmentProfileSelect } from "@/app/profiles/_components/EquipmentProfileSelect/EquipmentProfileSelect";
import { ExtendedRecipe } from "@/app/recipes/types";
import { Form } from "@/components/Form/Form";
import { NumberField } from "@/components/Form/NumberField";
import { Submit } from "@/components/Form/Submit";
import React, { FC } from "react";

interface EquipmentProfileFormProps {
  recipe?: ExtendedRecipe | null;
  action?: any;
}

export const EquipmentProfileForm: FC<EquipmentProfileFormProps> = ({
  recipe,
  action,
}) => {
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {};
  return (
    <Form action={action}>
      <input type="hidden" name="id" value={recipe?.id} />
      <div className="flex flex-row md:grid md:grid-cols-2 gap-2">
        <div className="col-span-2">
          <EquipmentProfileSelect
            name="equipmentProfileId"
            value={recipe?.equipmentProfileId}
          />
        </div>
        <NumberField
          label="Boil Time"
          name="boilTime"
          defaultValue={recipe?.boilTime}
        />
        <NumberField
          label="Batch Volume"
          name="batchVolume"
          defaultValue={recipe?.batchVolume}
        />
        <Submit>Save</Submit>
      </div>
    </Form>
  );
};
