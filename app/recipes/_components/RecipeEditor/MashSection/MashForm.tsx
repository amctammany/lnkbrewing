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
import { IconButton } from "@/components/Button/IconButton";
import { SaveIcon } from "@/components/Icon";
const mashSchema = zfd.formData({
  id: zfd.numeric(z.number()),
  mashProfileId: zfd.text(z.string().optional()),
});

interface MashFormProps {
  recipe?: ExtendedRecipe | null;
  profiles: MashProfile[];
  massUnit?: UserMassPreference;
}
type Schema = z.infer<typeof mashSchema>;

export const MashForm: FC<MashFormProps> = ({ recipe, massUnit, profiles }) => {
  const { modalId, openModal, closeModal } = useRecipe();
  const {
    register,
    getValues,
    control,
    trigger,
    formState: { errors },
    handleSubmit,
    setError,
    reset,
    setValue,
  } = useForm<Schema>({
    defaultValues: recipe as any,
    //resolver: async (data, context, options) => {
    ////console.log({ data, context, options });
    //const r = await zodResolver(mashSchema)(data, context, options);
    //return r;
    //},

    //resolver: zodResolver(mashSchema, {

    //}),
  });
  const onSubmit = async (data: FormData) => {
    //updateRecipe(data);
    const res = (await updateRecipe(data)) as any;
    if (res?.errors?.length) {
      res.errors.forEach((err: any) =>
        setError(err.path, { type: err.code, message: err.message })
      );
      return;
    }

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
          error={errors?.mashProfileId}
          onChange={handleChange}
          options={options}
        />
      </div>
      <Toolbar className="col-span-2">
        <IconButton Icon={SaveIcon} type="submit">
          Submit
        </IconButton>
      </Toolbar>
    </Form>
  );
};
export default MashForm;
