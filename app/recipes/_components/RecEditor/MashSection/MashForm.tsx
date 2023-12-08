"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExtendedRecipe } from "@/app/recipes/types";
import { Form } from "@/components/Form/Form";
import React, { FC } from "react";
import { MashProfile, UserMassPreference } from "@prisma/client";
import { useForm, SubmitHandler } from "react-hook-form";
//import { mashSchema } from "@/app/recipes/actions";
import * as z from "zod";
import { zfd } from "zod-form-data";
import { Toolbar } from "@/components/Toolbar";
import { Button } from "@/components/Button";
import { useRecipe } from "../useRecipe";
import { updateRecipe } from "@/app/recipes/actions";
import { TextField } from "@/components/Form/TextField";
import { Select } from "@/components/Form/Select";
const mashSchema = zfd.formData({
  id: zfd.numeric(z.number()),
  mashProfileId: zfd.text(z.string().optional()),
});

interface MashFormProps {
  recipe?: ExtendedRecipe | null;
  profiles: MashProfile[];
  massUnit: UserMassPreference;
}
type Schema = z.infer<typeof mashSchema>;

export const MashForm: FC<MashFormProps> = ({ massUnit, profiles }) => {
  const { recipe, modalId, openModal, closeModal } = useRecipe();
  const {
    register,
    getValues,
    control,
    trigger,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<Schema>({
    defaultValues: recipe as any,
    resolver: async (data, context, options) => {
      //console.log({ data, context, options });
      const r = await zodResolver(mashSchema)(data, context, options);
      return r;
    },

    //resolver: zodResolver(mashSchema, {

    //}),
  });
  const onSubmit = async (data: FormData) => {
    const valid = await trigger();
    if (!valid) return;
    updateRecipe(data);
    closeModal();
  };
  const options = profiles.reduce((acc, profile) => {
    acc[profile.id] = `${profile.name}`;
    return acc;
  }, {} as Record<string, string>);
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const { name, value } = e.currentTarget;
    const profile = profiles.find((p) => p.id === parseInt(value));
    reset({ ...profile, id: recipe?.id });
  };
  return (
    <Form action={onSubmit}>
      <div className="m-2 grid gap-0 md:gap-2 items-center grid-cols-1 md:grid-cols-2">
        <input type="hidden" {...register("id")} />
        <Select
          label="Mash Profile"
          {...register("mashProfileId")}
          onChange={handleChange}
          options={options}
        />
      </div>
      <Toolbar className="col-span-2">
        <Button type="submit">Submit</Button>
      </Toolbar>
    </Form>
  );
};
export default MashForm;
