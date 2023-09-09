import {
  Form,
  Section,
  Select,
  Submit,
  TextArea,
  TextField,
} from "@/components";
import { Fermentable, Recipe } from "@prisma/client";
import { RecipeHopIngredients } from "./RecipeHopIngredients";
import { RecipeFermentableIngredients } from "./RecipeFermentableIngredients";

export type RecipeFormProps = {
  src: Recipe | null;
  action?: (data: FormData) => void;
  hops: any;
  fermentables: any;
};

export const RecipeForm = ({
  src,
  hops,
  fermentables,
  action,
}: RecipeFormProps) => {
  return (
    <Form action={action}>
      <input type="hidden" name="id" value={src?.id} />
      <Section header="General">
        <TextField name="name" label="Name" defaultValue={src?.name} />
        <TextArea
          name="description"
          label="description"
          defaultValue={src?.description}
        />
      </Section>
      <Section header="Style">
        <Select name="category" defaultValue={src?.styleIdentifer}>
          <option value="1A">1A</option>
          <option value="21A">21A</option>
        </Select>
      </Section>
      <RecipeHopIngredients hops={hops} src={src} />
      <RecipeFermentableIngredients fermentables={fermentables} src={src} />
      <Submit>Update Recipe</Submit>
    </Form>
  );
};
