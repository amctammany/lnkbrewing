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
  return (
    <div className="flex-auto w-full m-2 p-2 bg-white">
      <form action={action}>
        <div className="grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-2">
          <input type="hidden" name="id" value={src?.id} />
          <input type="hidden" name="recipeId" value={src?.recipeId} />
          <div className="col-span-2">
            <FermentableSelect
              name="fermentableId"
              label="Fermentable"
              value={src?.fermentableId}
            />
          </div>
          <div>
            <NumberField
              name="amount"
              label="Amount"
              defaultValue={src?.amount}
            />
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

          <div className="col-span-2">
            <Submit>Save</Submit>
          </div>
        </div>
      </form>
    </div>
  );
}
