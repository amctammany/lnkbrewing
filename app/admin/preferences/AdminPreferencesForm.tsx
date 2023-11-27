"use client";
import { Form } from "@/components/Form/Form";
import { Select } from "@/components/Form/Select";
import { Submit } from "@/components/Form/Submit";
import { TextField } from "@/components/Form/TextField";
import {
  User,
  UserMassPreference,
  UserPreferences,
  UserVolumePreference,
} from "@prisma/client";
import React, { FC } from "react";
import { useForm } from "react-hook-form";

interface AdminPreferencesFormProps {
  src?: UserPreferences | null;
  action: any;
}

export const AdminPreferencesForm: FC<AdminPreferencesFormProps> = ({
  src,
  action,
}) => {
  const { register, trigger } = useForm<UserPreferences>({
    defaultValues: src || {},
  });
  const onSubmit = async (data: FormData) => {
    const valid = await trigger();
    if (!valid) return;
    action(data);
  };
  return (
    <Form action={onSubmit}>
      <input type="hidden" {...register("userId")} />
      <Select {...register("volumeUnit")} options={UserVolumePreference} />
      <Select {...register("hopMassUnit")} options={UserMassPreference} />
      <Select
        {...register("fermentableMassUnit")}
        options={UserMassPreference}
      />
      <Submit>Save</Submit>
    </Form>
  );
};
