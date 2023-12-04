"use client";
import { ExtendedRecipe } from "@/app/recipes/types";
import { Form } from "@/components/Form/Form";
import { NumberField } from "@/components/Form/NumberField";
import { Submit } from "@/components/Form/Submit";
import React, { FC } from "react";
import { StyleSelect } from "./StyleSelect";
import { Style } from "@prisma/client";
import { Select } from "@/components/Form/Select";
import { SubmitHandler, useForm } from "react-hook-form";

interface StyleFormProps {
  recipe?: ExtendedRecipe | null;
  action?: any;
  styles?: Record<string, string>;
}
type StyleFormInput = {
  id: number;
  styleIdentifer: string | null;
};

export const StyleForm: FC<StyleFormProps> = ({ recipe, action, styles }) => {
  //<div className="col-span-2">
  //<StyleSelect
  //name="styleId"
  //value={recipe?.styleId}
  ///>
  //</div>;
  const { register, trigger, handleSubmit } = useForm<StyleFormInput>({
    defaultValues: recipe || {},
  });
  console.log(recipe);
  const onSubmit1: SubmitHandler<StyleFormInput> = (data) => {
    const body = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        body.append(key, value?.toString());
      }
    });
    action(body);
  };
  const onSubmit = async (data: FormData) => {
    const valid = await trigger();
    if (!valid) return;
    return action(data);
  };

  return (
    <Form action={onSubmit}>
      <input type="hidden" {...register("id")} />
      <div className="grid gap-2">
        <Select
          label="Style"
          {...register("styleIdentifer")}
          options={styles}
        />
        <Submit>Save</Submit>
      </div>
    </Form>
  );
};
