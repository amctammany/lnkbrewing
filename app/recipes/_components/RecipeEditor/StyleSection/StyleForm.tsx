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
import { IconButton } from "@/components/Button/IconButton";
import { SaveIcon } from "@/components/Icon";
const styleSchema = zfd.formData({
  id: zfd.numeric(z.number()),
  styleIdentifer: zfd.text(z.string()),
});

interface StyleFormProps {
  recipe?: ExtendedRecipe | null;
  styles: Style[];
  action?: any;
  massUnit?: UserMassPreference;
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
    setError,
    setValue,
  } = useForm<Schema>({
    defaultValues: recipe as any,

    //resolver: zodResolver(styleSchema, {

    //}),
  });
  const onSubmit = async (data: FormData) => {
    updateRecipe(data);
    const res = (await updateRecipe(data)) as any;
    if (res?.errors?.length) {
      res.errors.forEach((err: any) =>
        setError(err.path, { type: err.code, message: err.message })
      );
      return;
    }

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
          className="md:col-span-2"
          label="Style"
          {...register("styleIdentifer")}
          error={errors?.styleIdentifer}
          options={options}
        />
      </div>
      <Toolbar className="col-span-2">
        <IconButton Icon={SaveIcon} type="submit">
          Save
        </IconButton>
      </Toolbar>
    </Form>
  );
};
export default StyleForm;
