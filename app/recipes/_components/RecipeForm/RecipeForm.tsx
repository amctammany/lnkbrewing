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
import { updateRecipe } from "../../actions";

export type RecipeFormProps = {
  src: Recipe | null;
};

export const RecipeForm = ({ src }: RecipeFormProps) => {
  const styles = { style: "123" };
  return (
    <Form action={updateRecipe}>
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
      <RecipeHopIngredients recipeId={src?.id} />
      <RecipeFermentableIngredients recipeId={src?.id} />
      <Submit>{(src?.id ? "Update" : "Create") + " Recipe"}</Submit>
    </Form>
  );
};
