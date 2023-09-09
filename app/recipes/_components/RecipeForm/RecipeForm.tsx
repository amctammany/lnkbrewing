import { Form, Select, Submit, TextArea, TextField } from "@/components";
import { Fermentable, Recipe } from "@prisma/client";
import { RecipeHopIngredients } from "./RecipeHopIngredients";

export type RecipeFormProps = {
  src: Recipe | null;
  action?: (data: FormData) => void;
  hops: any[];
  fermentables: Fermentable[];
};

export const RecipeForm = ({ src, hops, action }: RecipeFormProps) => {
  return (
    <Form action={action}>
      <input type="hidden" name="id" value={src?.id} />
      <TextField name="name" label="Name" defaultValue={src?.name} />
      <Select name="category" defaultValue={src?.styleIdentifer}>
        <option value="1A">1A</option>
        <option value="21A">21A</option>
      </Select>
      <TextArea
        name="description"
        label="description"
        defaultValue={src?.description}
      />
      <RecipeHopIngredients hops={hops} src={src} />
      <Submit>Update Recipe</Submit>
    </Form>
  );
};
