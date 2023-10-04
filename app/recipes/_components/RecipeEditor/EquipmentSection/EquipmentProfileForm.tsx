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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Label label="Equipment Profile">
        <select
          className="block w-full disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
          {...register("equipmentProfileId")}
          onChange={handleChange}
        >
          {opts}
        </select>
      </Label>

      <input type="hidden" value={recipe?.id} {...register("id")} />
      <div className="flex flex-row md:grid md:grid-cols-2 gap-2">
        <Label label="Boil Time">
          <input
            className="block w-full disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
            type="number"
            step={1}
            {...register("boilTime", { valueAsNumber: false })}
          />
        </Label>
        <Label label="Batch Volume">
          <input
            className="block w-full disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
            type="number"
            step={0.01}
            {...register("batchVolume", { valueAsNumber: false })}
          />
        </Label>
        <Label label="Mash Efficiency">
          <input
            className="block w-full disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
            type="number"
            step={0.01}
            {...register("mashEfficiency", { valueAsNumber: false })}
          />
        </Label>
        <Label label="Brew Efficiency">
          <input
            className="block w-full disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
            type="number"
            step={0.01}
            {...register("brewEfficiency", { valueAsNumber: false })}
          />
        </Label>

        <Submit>Save</Submit>
      </div>
    </form>
  );
};
