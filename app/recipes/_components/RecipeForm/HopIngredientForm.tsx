import { Form, NumberField, Select, Submit, TextField } from "@/components";
import {
  HopIngredient,
  MassUnit,
  TimeUnit,
  HopIngredientUsage,
} from "@prisma/client";
import { HopSelect } from "./HopSelect";
import { ExtendedHopIngredient } from "../../types";

export type HopIngredientFormProps = {
  src: ExtendedHopIngredient | null;
  action?: (data: FormData) => void;
};

export async function HopIngredientForm({
  src,
  action,
}: HopIngredientFormProps) {
  return (
    <form action={action}>
      <div className="grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-2">
        <input type="hidden" name="id" value={src?.id} />
        <input type="hidden" name="recipeId" value={src?.recipeId} />
        <div className="col-span-2">
          <HopSelect name="hopId" label="Hop" value={src?.hopId} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="">
            <NumberField
              name="amount"
              label="Amount"
              defaultValue={src?.amount}
            />
          </div>
          <div className="">
            <Select
              name="amountType"
              label="Unit"
              options={MassUnit}
              defaultValue={src?.amountType}
            />
          </div>
        </div>
        <div className="">
          <NumberField
            name="alpha"
            step={0.1}
            label="Alpha Acids"
            defaultValue={src?.alpha || src?.hop?.alpha}
          />
        </div>

        <div className="">
          <Select
            name="usage"
            label="Usage"
            options={HopIngredientUsage}
            defaultValue={src?.usage}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
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
        </div>
        <div className="col-span-2">
          <Submit>Save</Submit>
        </div>
      </div>
    </form>
  );
}
