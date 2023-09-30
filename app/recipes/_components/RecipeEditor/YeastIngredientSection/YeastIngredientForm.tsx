import { ExtendedYeastIngredient, ExtendedRecipe } from "@/app/recipes/types";
import { Form } from "@/components/Form/Form";
import { NumberField } from "@/components/Form/NumberField";
import { Submit } from "@/components/Form/Submit";
import React, { FC } from "react";
import { YeastAmountType } from "@prisma/client";
import { Select } from "@/components/Form/Select";

interface YeastIngredientFormProps {
  recipe?: ExtendedRecipe | null;
  yeast?: ExtendedYeastIngredient | null;
  yeastId?: string;
  action?: any;
  yeasts?: Record<string, string>;
}

export const YeastIngredientForm: FC<YeastIngredientFormProps> = ({
  recipe,
  action,
  yeastId,
  yeast,
  yeasts,
}) => {
  console.log(yeast);
  const src =
    yeastId === "new"
      ? ({ recipeId: recipe?.id } as ExtendedYeastIngredient)
      : yeast;
  return (
    <Form action={action}>
      <input type="hidden" name="recipeId" value={recipe?.id} />
      <input type="hidden" name="id" value={src?.id} />
      <div className="flex flex-row gap-2 md:grid md:grid-cols-2">
        <div className="col-span-2">
          <Select
            name="yeastId"
            label="Yeast"
            defaultValue={src?.yeastId}
            options={yeasts}
          />
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
              options={YeastAmountType}
              defaultValue={src?.amountType}
            />
          </div>
        </div>
        <div className="">
          <NumberField
            name="attenuation"
            step={0.01}
            label="Attenuation (%)"
            defaultValue={src?.attenuation || src?.yeast?.attenuation}
          />
        </div>

        <div className="col-span-2">
          <Submit>Save</Submit>
        </div>
      </div>
    </Form>
  );
};
