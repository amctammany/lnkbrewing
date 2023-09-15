import {
  Form,
  Section,
  Select,
  Submit,
  TextArea,
  TextField,
} from "@/components";
import { Fermentable, Recipe } from "@prisma/client";
import { HopIngredients } from "./RecipeHopIngredients";
import { FermentableIngredients } from "./RecipeFermentableIngredients";

export type RecipeFormProps = {
  src: Recipe | null;
  action?: (data: FormData) => void;
  //hops: any;
  //styles: any;
  //fermentables: any;
};

export const RecipeForm = ({ src, action }: RecipeFormProps) => {
  const styles = { style: "123" };
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
      <HopIngredients recipeId={src?.id} />
      <FermentableIngredients recipeId={src?.id} />
      <Submit>{(src?.id ? "Update" : "Create") + " Recipe"}</Submit>
    </Form>
  );
};
