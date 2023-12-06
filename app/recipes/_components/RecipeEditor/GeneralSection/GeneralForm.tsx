"use client";
import { Button } from "@/components/Button";
import { Form } from "@/components/Form/Form";
import { Label } from "@/components/Form/Label";
import { Submit } from "@/components/Form/Submit";
import { TextArea } from "@/components/Form/TextArea";
import { TextField } from "@/components/Form/TextField";
import { Toolbar } from "@/components/Toolbar";
import { Recipe } from "@prisma/client";
import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface GeneralFormProps {
  recipe?: Recipe | null;
  action: any;
}
type GeneralFormInput = {
  id: number;
  name: string | null;
  description?: string | null;
};

export const GeneralForm: FC<GeneralFormProps> = ({ recipe, action }) => {
  const { register, trigger } = useForm<GeneralFormInput>({
    defaultValues: recipe || {},
  });
  const onSubmit = async (data: FormData) => {
    const valid = await trigger();
    if (!valid) return;
    action(data);
  };

  return (
    <Form action={onSubmit}>
      <input type="hidden" {...register("id")} />
      <TextField {...register("name")} />
      <TextArea {...register("description")} />
      <Toolbar>
        <Button type="submit" size="toolbar">
          Save
        </Button>
      </Toolbar>
    </Form>
  );
};
