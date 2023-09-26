import { ExtendedHopIngredient, ExtendedRecipe } from "@/app/recipes/types";
import { Form } from "@/components/Form/Form";
import { NumberField } from "@/components/Form/NumberField";
import { Submit } from "@/components/Form/Submit";
import React, { FC } from "react";
import {
  HopIngredient,
  HopIngredientUsage,
  MassUnit,
  TimeUnit,
} from "@prisma/client";
import { Select } from "@/components/Form/Select";

interface HopIngredientFormProps {
  recipe?: ExtendedRecipe | null;
  hop?: ExtendedHopIngredient | null;
  hopId?: string;
  action?: any;
  hops?: Record<string, string>;
}

export const HopIngredientForm: FC<HopIngredientFormProps> = ({
  recipe,
  action,
  hopId,
  hop,
  hops,
}) => {
  console.log(hop);
  const src =
    hopId === "new" ? ({ recipeId: recipe?.id } as ExtendedHopIngredient) : hop;
  return (
    <Form action={action}>
      <input type="hidden" name="recipeId" value={recipe?.id} />
      <input type="hidden" name="id" value={src?.id} />
      <div className="flex flex-row gap-2 md:grid md:grid-cols-2">
        <Select
          name="hopId"
          label="Hop"
          defaultValue={src?.hopId}
          options={hops}
        />
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

        <Submit>Save</Submit>
      </div>
    </Form>
  );
};
