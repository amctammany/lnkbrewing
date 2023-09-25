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
      <div className="col-span-2">
        <HopSelect name="hopId" label="Hop" value={src?.hopId} />
      </div>
      <div className="">
        <NumberField name="amount" label="Amount" defaultValue={src?.amount} />
      </div>
      <div className="">
        <Select
          name="amountType"
          label="Unit"
          options={MassUnit}
          defaultValue={src?.amountType}
        />
      </div>

      <div className="">
        <NumberField
          name="duration"
          label="Time"
          defaultValue={src?.duration}
        />
      </div>
      <div className="">
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
