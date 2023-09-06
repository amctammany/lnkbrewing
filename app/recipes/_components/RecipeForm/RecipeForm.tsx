import { Form, NumberField, Submit, TextArea, TextField } from "@/components";
import { Recipe } from "@prisma/client";

export type RecipeFormProps = {
  src: Recipe | null;
  action?: (data: FormData) => void;
};

export const RecipeForm = ({ src, action }: RecipeFormProps) => {
  return (
    <Form action={action}>
      <input type="hidden" name="id" value={src?.id} />
      <TextField name="name" label="Name" defaultValue={src?.name} />
      <TextArea
        name="description"
        label="description"
        defaultValue={src?.description}
      />
      <Submit>Update Recipe</Submit>
    </Form>
  );
};
