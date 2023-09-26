import {
  FermentableIngredient,
  FermentableIngredientUsage,
  MassUnit,
  TimeUnit,
} from "@prisma/client";
//import { FermentableSelect } from "./FermentableSelect";
import { Form } from "@/components/Form/Form";
import { NumberField } from "@/components/Form/NumberField";
import { Select } from "@/components/Form/Select";
import { Submit } from "@/components/Form/Submit";
import { ExtendedFermentableIngredient } from "@/app/recipes/types";

export type FermentableIngredientFormProps = {
  fermentable?: ExtendedFermentableIngredient | null;
  fermentableOptions: any;
  action?: (data: FormData) => void;
};

export function FermentableIngredientForm({
  fermentable: src,
  fermentableOptions,
  action,
}: FermentableIngredientFormProps) {
  return (
    <Form action={action}>
      <div className="grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-2">
        <input type="hidden" name="id" value={src?.id} />
        <input type="hidden" name="recipeId" value={src?.recipeId} />
        <div className="col-span-2">
          <Select
            name="fermentableId"
            label="Fermentable"
            value={src?.fermentableId}
            options={fermentableOptions}
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
    </Form>
  );
}
