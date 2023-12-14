"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExtendedRecipe } from "@/app/recipes/types";
import { Form } from "@/components/Form/Form";
import React, { FC } from "react";
import { UserMassPreference } from "@prisma/client";
import { useForm, SubmitHandler } from "react-hook-form";
//import { generalSchema } from "@/app/recipes/actions";
import * as z from "zod";
import { zfd } from "zod-form-data";
import { Toolbar } from "@/components/Toolbar";
import { Button } from "@/components/Button";
import { useRecipe } from "../useRecipe";
import { updateRecipe } from "@/app/recipes/actions";
import { TextField } from "@/components";
const generalSchema = zfd.formData({
  id: zfd.numeric(z.number()),
  name: zfd.text(z.string()),
});

interface GeneralFormProps {
  recipe?: ExtendedRecipe | null;
  action?: any;
  massUnit: UserMassPreference;
}
type Schema = z.infer<typeof generalSchema>;

export const GeneralForm: FC<GeneralFormProps> = ({
  massUnit,
  recipe,
  //action,
  //otherId,
  //other,
}) => {
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
    //resolver: zodResolver(generalSchema, {

    //}),
  });
  const onSubmit = async (data: FormData) => {
    const res = (await updateRecipe(data)) as any;
    if (res?.errors?.length) {
      res.errors.forEach((err: any) =>
        setError(err.path, { type: err.code, message: err.message })
      );
      return;
    }

    closeModal();
  };

  return (
    <Form action={onSubmit}>
      <div className="m-2 grid gap-0 md:gap-2 items-center grid-cols-1 md:grid-cols-2">
        <input type="hidden" {...register("id")} />
        <div className="col-span-2">
          <TextField {...register("name")} error={errors?.name} />
        </div>
      </div>
      <Toolbar className="col-span-2">
        <Button type="submit">Submit</Button>
      </Toolbar>
    </Form>
  );
};
export default GeneralForm;
