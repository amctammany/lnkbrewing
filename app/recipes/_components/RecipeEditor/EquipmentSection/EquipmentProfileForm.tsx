"use client";
import { EquipmentProfileSelect } from "@/app/profiles/equipment/_components/EquipmentProfileSelect/EquipmentProfileSelect";
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
import { MashProfileStep } from "@/app/profiles/mash/types";
import { Toolbar } from "@/components/Toolbar";
import { Button } from "@/components/Button";

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
  const { register, handleSubmit, trigger, reset } =
    useForm<EquipmentProfileFormInput>({
      defaultValues: {
        id: recipe?.id,
        boilTime: recipe?.boilTime ?? (recipe?.equipment?.boilTime || 0),
        mashEfficiency:
          recipe?.mashEfficiency ?? (recipe?.equipment?.mashEfficiency || 0),
        brewEfficiency:
          recipe?.brewEfficiency ?? (recipe?.equipment?.brewEfficiency || 0),
        batchVolume:
          recipe?.batchVolume ?? (recipe?.equipment?.batchVolume || 0),
      },
    });
  const options = profiles.reduce((acc, profile) => {
    acc[
      profile.id
    ] = `${profile.name}: ${profile.batchVolume} - ${profile.brewEfficiency}`;
    return acc;
  }, {} as Record<string, string>);

  const onSubmit = async (data: FormData) => {
    const valid = await trigger();
    if (!valid) return;
    return action(data);
  };
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const { name, value } = e.currentTarget;
    const profile = profiles.find((p) => p.id === parseInt(value));
    reset({ ...profile, id: recipe?.id });
  };

  return (
    <Form action={onSubmit}>
      <Select
        label="Equipment Profile"
        {...register("equipmentProfileId")}
        onChange={handleChange}
        options={options}
      />

      <input type="hidden" value={recipe?.id} {...register("id")} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <NumberField step={1} {...register("boilTime")} />
        <NumberField step={0.01} {...register("batchVolume")} />
        <NumberField step={0.01} {...register("mashEfficiency")} />
        <NumberField step={0.01} {...register("brewEfficiency")} />

        <Toolbar className="col-span-2 md:col-span-4">
          <Button type="submit">Save</Button>
        </Toolbar>
      </div>
    </Form>
  );
};
