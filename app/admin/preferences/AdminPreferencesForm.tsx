"use client";
import { EquipmentProfileSelect } from "@/app/profiles/equipment/_components";
import { EquipmentSelect } from "@/app/recipes/_components/RecipeEditor/EquipmentSection/EquipmentSelect";
import { Form } from "@/components/Form/Form";
import { Select } from "@/components/Form/Select";
import { Submit } from "@/components/Form/Submit";
import { TextField } from "@/components/Form/TextField";
import {
  EquipmentProfile,
  User,
  UserGravityPreference,
  UserMassPreference,
  UserPreferences,
  UserTemperaturePreference,
  UserVolumePreference,
} from "@prisma/client";
import React, { FC } from "react";
import { useForm } from "react-hook-form";

interface AdminPreferencesFormProps {
  src?: UserPreferences | null;
  equipmentProfiles: any; //EquipmentProfile[];
  action: any;
}

export const AdminPreferencesForm: FC<AdminPreferencesFormProps> = ({
  src,
  action,
  equipmentProfiles,
}) => {
  const { register, trigger } = useForm<UserPreferences>({
    defaultValues: src || {},
  });
  const onSubmit = async (data: FormData) => {
    const valid = await trigger();
    if (!valid) return;
    action(data);
  };
  console.log(equipmentProfiles);
  return (
    <Form action={onSubmit}>
      <input type="hidden" {...register("userId")} />
      <Select {...register("volumeUnit")} options={UserVolumePreference} />
      <Select {...register("hopMassUnit")} options={UserMassPreference} />
      <Select
        {...register("fermentableMassUnit")}
        options={UserMassPreference}
      />
      <Select
        {...register("temperatureUnit")}
        options={UserTemperaturePreference}
      />
      <Select {...register("gravityUnit")} options={UserGravityPreference} />
      <Select {...register("equipmentProfileId")} options={equipmentProfiles} />
      <Submit>Save</Submit>
    </Form>
  );
};
