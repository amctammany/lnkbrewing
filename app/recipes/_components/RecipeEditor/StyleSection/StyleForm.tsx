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
  const { register, handleSubmit } = useForm<StyleFormInput>({
    defaultValues: recipe || {},
  });
  const onSubmit: SubmitHandler<StyleFormInput> = (data) => {
    const body = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        body.append(key, value?.toString());
      }
    });
    action(body);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" name="id" value={recipe?.id} />
      <div className="flex flex-row gap-2">
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
