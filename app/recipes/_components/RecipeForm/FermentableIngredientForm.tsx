import { Form, NumberField, Select, Submit, TextField } from "@/components";
import {
  FermentableIngredient,
  FermentableIngredientUsage,
  MassUnit,
  TimeUnit,
} from "@prisma/client";
import { FermentableSelect } from "./FermentableSelect";

export type FermentableIngredientFormProps = {
  src: FermentableIngredient | null;
  action?: (data: FormData) => void;
};

export async function FermentableIngredientForm({
  src,
  action,
}: FermentableIngredientFormProps) {
  console.log(src);
  return (
    <Form action={action}>
      <input type="hidden" name="id" value={src?.id} />
      <input type="hidden" name="recipeId" value={src?.recipeId} />
      <div>
        <FermentableSelect
          name="fermentableId"
          label="Fermentable"
          value={src?.fermentableId}
        />
      </div>
      <div>
        <NumberField name="amount" label="Amount" defaultValue={src?.amount} />
      </div>
      <div>
        <Select
          name="amountType"
          label="Amount Unit"
          options={MassUnit}
          defaultValue={src?.amountType}
        />
      </div>
      <div className="">
        <Select
          name="usage"
          label="Unit"
          options={FermentableIngredientUsage}
          defaultValue={src?.usage}
        />
      </div>

      <Submit>Save</Submit>
    </Form>
  );
}
