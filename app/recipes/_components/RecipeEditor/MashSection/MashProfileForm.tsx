"use client";
import { MashProfileSelect } from "@/app/profiles/mash/_components/MashProfileSelect/MashProfileSelect";
import { ExtendedRecipe } from "@/app/recipes/types";
import { Form } from "@/components/Form/Form";
import { Label } from "@/components/Form/Label";
import { NumberField } from "@/components/Form/NumberField";
import { Submit } from "@/components/Form/Submit";
import { MashProfile } from "@prisma/client";
import React, { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { MashSelect } from "./MashSelect";
import { Select } from "@/components/Form/Select";
import { MashProfileStep } from "@/app/profiles/mash/types";
import { TextField } from "@/components";

interface MashProfileFormProps {
  recipe?: ExtendedRecipe | null;
  action?: any;
  profiles: MashProfile[];
}
type MashProfileFormInput = {
  id: number;
  mashProfileId: number | null;
};
export const MashProfileForm: FC<MashProfileFormProps> = ({
  recipe,
  action,
  profiles,
}) => {
  const { register, handleSubmit, trigger, reset } =
    useForm<MashProfileFormInput>({
      defaultValues: recipe || {},
    });
  //<div className="col-span-2">
  //<MashProfileSelect
  //name="mashProfileId"
  //value={recipe?.mashProfileId}
  ///>
  //</div>;
  const options = profiles.reduce((acc, profile) => {
    acc[profile.id] = `${profile.name}`;
    return acc;
  }, {} as Record<string, string>);

  const onSubmit = async (data: FormData) => {
    const valid = await trigger();
    if (!valid) return;
    return action(data);
  };

  //const onSubit: SubmitHandler<MashProfileFormInput> = (data) => {
  //const body = new FormData();

  //Object.entries(data).forEach(([key, value]) => {
  //if (value) {
  //if (Array.isArray(value)) {
  //value.forEach((v, i) =>
  //Object.entries(v as MashProfileStep).forEach(
  //([nestKey, nestValue]) => {
  //console.log({ nestKey, nestValue });
  //body.append(nestKey, nestValue.toString());
  //}
  //)
  //);
  //} else {
  //body.append(key, value?.toString());
  //}
  //}
  //});
  //action(body);
  //};
  //const opts = Object.entries(options).map(([k, v]) => (
  //<option key={k} value={k}>
  //{v}
  //</option>
  //));
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const { name, value } = e.currentTarget;
    const profile = profiles.find((p) => p.id === parseInt(value));
    reset({ ...profile, id: recipe?.id });
  };

  return (
    <Form action={onSubmit}>
      <Select
        label="Mash Profile"
        {...register("mashProfileId")}
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
