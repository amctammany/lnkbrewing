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
  styles: any;
  fermentables: any;
};

export const RecipeForm = ({
  src,
  hops,
  styles,
  fermentables,
  action,
}: RecipeFormProps) => {
  return (
    <Form action={action}>
      <input type="hidden" name="id" value={src?.id} />
      <input type="hidden" name="authorEmail" value={src?.authorEmail} />
      <Section header="General">
        <TextField name="name" label="Name" defaultValue={src?.name} />
        <TextArea
          name="description"
          label="description"
          defaultValue={src?.description}
        />
      </Section>
      <Section header="Style">
        <Select
          label="Style"
          name="styleIdentifer"
          options={styles}
          defaultValue={src?.styleIdentifer || "1A"}
        />
      </Section>
      <RecipeHopIngredients hops={hops} src={src} />
      <RecipeFermentableIngredients fermentables={fermentables} src={src} />
      <Submit>Update Recipe</Submit>
    </Form>
  );
};
