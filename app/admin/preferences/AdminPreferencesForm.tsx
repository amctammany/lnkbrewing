"use client";
import { Section } from "@/components/Section";
import { Autocomplete } from "@/components/Form/Autocomplete";
import { Form } from "@/components/Form/Form";
import { Select } from "@/components/Form/Select";
import { Submit } from "@/components/Form/Submit";
import { TextField } from "@/components/Form/TextField";
import {
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
  waterProfiles: any;
  mashProfiles: any;
  action: any;
}

export const AdminPreferencesForm: FC<AdminPreferencesFormProps> = ({
  src,
  action,
  mashProfiles,
  equipmentProfiles,
  waterProfiles,
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
    <div className="max-w-lg mx-auto">
      <Section header="Preferences">
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
          <Autocomplete
            {...register("equipmentProfileId")}
            value={src?.equipmentProfileId ?? undefined}
            options={equipmentProfiles}
          />
          <Select
            {...register("gravityUnit")}
            options={UserGravityPreference}
          />
          <Select {...register("mashProfileId")} options={mashProfiles} />
          <Select
            {...register("sourceWaterProfileId")}
            options={waterProfiles}
          />
          <Select
            {...register("targetWaterProfileId")}
            options={waterProfiles}
          />
          <Submit>Save</Submit>
        </Form>
      </Section>
    </div>
  );
};
