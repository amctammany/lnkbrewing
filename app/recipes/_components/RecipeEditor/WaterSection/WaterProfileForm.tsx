"use client";
import { WaterProfileSelect } from "@/app/profiles/water/_components/WaterProfileSelect/WaterProfileSelect";
import { ExtendedRecipe } from "@/app/recipes/types";
import { Form } from "@/components/Form/Form";
import { Label } from "@/components/Form/Label";
import { NumberField } from "@/components/Form/NumberField";
import { Submit } from "@/components/Form/Submit";
import { WaterProfile } from "@prisma/client";
import React, { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { WaterSelect } from "./WaterSelect";
import { Select } from "@/components/Form/Select";
import { TextField } from "@/components";

interface WaterProfileFormProps {
  recipe?: ExtendedRecipe | null;
  action?: any;
  profiles: WaterProfile[];
}
type WaterProfileFormInput = {
  id: number;
  waterProfileId: number | null;
};
export const WaterProfileForm: FC<WaterProfileFormProps> = ({
  recipe,
  action,
  profiles,
}) => {
  const { register, handleSubmit, trigger, reset } =
    useForm<WaterProfileFormInput>({
      defaultValues: recipe || {},
    });
  //<div className="col-span-2">
  //<WaterProfileSelect
  //name="waterProfileId"
  //value={recipe?.waterProfileId}
  ///>
  //</div>;
  const options = profiles.reduce((acc, profile) => {
    acc[profile.id] = `${profile.name}`;
    return acc;
  }, {} as Record<string, string>);

  const onSubmit = async (data: FormData) => {
    console.log(data);
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
        label="Water Profile"
        {...register("waterProfileId")}
        onChange={handleChange}
        options={options}
      />

      <input type="hidden" value={recipe?.id} {...register("id")} />
      <div className="flex flex-row md:grid md:grid-cols-2 gap-2">
        <Submit>Save</Submit>
      </div>
    </Form>
  );
};
