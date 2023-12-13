"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExtendedRecipe } from "@/app/recipes/types";
import { Form } from "@/components/Form/Form";
import React, { FC } from "react";
import { Style, UserMassPreference } from "@prisma/client";
import { useForm, SubmitHandler } from "react-hook-form";
//import { styleSchema } from "@/app/recipes/actions";
import * as z from "zod";
import { zfd } from "zod-form-data";
import { Toolbar } from "@/components/Toolbar";
import { Button } from "@/components/Button";
import { useRecipe } from "../useRecipe";
import { updateRecipe } from "@/app/recipes/actions";
import { TextField } from "@/components/Form/TextField";
import { Select } from "@/components/Form/Select";
const styleSchema = zfd.formData({
  id: zfd.numeric(z.number()),
  styleIdentifer: zfd.text(z.string()),
});

interface StyleFormProps {
  recipe?: ExtendedRecipe | null;
  styles: Style[];
  action?: any;
  massUnit: UserMassPreference;
}
type Schema = z.infer<typeof styleSchema>;

export const StyleForm: FC<StyleFormProps> = ({ recipe, massUnit, styles }) => {
  const { modalId, openModal, closeModal } = useRecipe();
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
      const r = await zodResolver(styleSchema)(data, context, options);
      return r;
    },

    //resolver: zodResolver(styleSchema, {

    //}),
  });
  const onSubmit = async (data: FormData) => {
    const valid = await trigger();
    if (!valid) return;
    updateRecipe(data);
    closeModal();
  };
  const options = styles.reduce((acc, profile) => {
    acc[profile.identifier] = `${profile.name}`;
    return acc;
  }, {} as Record<string, string>);

  return (
    <Form action={onSubmit}>
      <div className="m-2 grid gap-0 md:gap-2 items-center grid-cols-1 md:grid-cols-2">
        <input type="hidden" {...register("id")} />
        <Select
          label="Style"
          {...register("styleIdentifer")}
          options={options}
        />
        <Toolbar className="col-span-2 md:col-span-2">
          <Button type="submit">Save</Button>
        </Toolbar>
      </div>
      <Toolbar className="col-span-2">
        <Button type="submit">Submit</Button>
      </Toolbar>
    </Form>
  );
};
export default StyleForm;
