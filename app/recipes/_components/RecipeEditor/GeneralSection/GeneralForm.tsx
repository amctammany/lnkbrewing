import { Form } from "@/components/Form/Form";
import { Submit } from "@/components/Form/Submit";
import { TextArea } from "@/components/Form/TextArea";
import { TextField } from "@/components/Form/TextField";
import { Recipe } from "@prisma/client";
import React, { FC } from "react";

interface GeneralFormProps {
  recipe?: Recipe | null;
  action: (data: FormData) => void;
}

export const GeneralForm: FC<GeneralFormProps> = ({ recipe, action }) => {
  return (
    <Form action={action}>
      <input type="hidden" name="id" value={recipe?.id} />
      <TextField name="name" defaultValue={recipe?.name} />
      <TextArea name="description" defaultValue={recipe?.description} />
      <Submit>Save</Submit>
    </Form>
  );
};
