import { Form, NumberField, Select, Submit, TextField } from "@/components";
import { HopIngredient, MassUnit, TimeUnit } from "@prisma/client";
import { HopSelect } from "./HopSelect";

export type HopIngredientFormProps = {
  src: HopIngredient | null;
  action?: (data: FormData) => void;
};

export async function HopIngredientForm({
  src,
  action,
}: HopIngredientFormProps) {
  console.log(src);
  return (
    <Form action={action}>
      <input type="hidden" name="id" value={src?.id} />
      <input type="hidden" name="recipeId" value={src?.recipeId} />
      <div className="flex-1">
        <HopSelect name="hopId" label="Hop" value={src?.hopId} />
      </div>
      <div className="flex-0 w-28">
        <NumberField name="amount" label="Amount" defaultValue={src?.amount} />
      </div>
      <div className="flex-0 w-24">
        <NumberField
          name="duration"
          label="Time"
          defaultValue={src?.duration}
        />
      </div>
      <div className="flex-0 w-24">
        <Select
          name="durationType"
          label="Time Unit"
          options={TimeUnit}
          defaultValue={src?.durationType}
        />
      </div>
      <Submit>Save</Submit>
    </Form>
  );
}
