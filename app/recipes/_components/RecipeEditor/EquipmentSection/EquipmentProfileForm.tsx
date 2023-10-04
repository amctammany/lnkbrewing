"use client";
import { EquipmentProfileSelect } from "@/app/profiles/_components/EquipmentProfileSelect/EquipmentProfileSelect";
import { ExtendedRecipe } from "@/app/recipes/types";
import { Form } from "@/components/Form/Form";
import { Label } from "@/components/Form/Label";
import { NumberField } from "@/components/Form/NumberField";
import { Submit } from "@/components/Form/Submit";
import { EquipmentProfile } from "@prisma/client";
import React, { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { EquipmentSelect } from "./EquipmentSelect";
import { Select } from "@/components/Form/Select";

interface EquipmentProfileFormProps {
  recipe?: ExtendedRecipe | null;
  action?: any;
  profiles: EquipmentProfile[];
}
type EquipmentProfileFormInput = {
  id: number;
  equipmentProfileId: number | null;
  boilTime: number | null;
  batchVolume: number | null;
  mashEfficiency: number | null;
  brewEfficiency: number | null;
};
export const EquipmentProfileForm: FC<EquipmentProfileFormProps> = ({
  recipe,
  action,
  profiles,
}) => {
  const { register, handleSubmit, reset } = useForm<EquipmentProfileFormInput>({
    defaultValues: recipe || {},
  });
  //<div className="col-span-2">
  //<EquipmentProfileSelect
  //name="equipmentProfileId"
  //value={recipe?.equipmentProfileId}
  ///>
  //</div>;
  const options = profiles.reduce((acc, profile) => {
    acc[
      profile.id
    ] = `${profile.name}: ${profile.batchVolume} - ${profile.brewEfficiency}`;
    return acc;
  }, {} as Record<string, string>);

  const onSubmit: SubmitHandler<EquipmentProfileFormInput> = (data) => {
    const body = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        body.append(key, value?.toString());
      }
    });
    action(body);
  };
  const opts = Object.entries(options).map(([k, v]) => (
    <option key={k} value={k}>
      {v}
    </option>
  ));
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const { name, value } = e.currentTarget;
    const profile = profiles.find((p) => p.id === parseInt(value));
    reset({ ...profile, id: recipe?.id });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Select
        label="Equipment Profile"
        {...register("equipmentProfileId")}
        onChange={handleChange}
        options={options}
      />

      <input type="hidden" value={recipe?.id} {...register("id")} />
      <div className="flex flex-row md:grid md:grid-cols-2 gap-2">
        <NumberField step={1} {...register("boilTime")} />
        <NumberField step={0.01} {...register("batchVolume")} />
        <NumberField step={0.01} {...register("mashEfficiency")} />
        <NumberField step={0.01} {...register("brewEfficiency")} />

        <Submit>Save</Submit>
      </div>
    </Form>
  );
};
