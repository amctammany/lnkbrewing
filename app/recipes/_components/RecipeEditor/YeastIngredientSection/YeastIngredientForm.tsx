"use client";

import { ExtendedYeastIngredient, ExtendedRecipe } from "@/app/recipes/types";
import { Form } from "@/components/Form/Form";
import { NumberField } from "@/components/Form/NumberField";
import { Submit } from "@/components/Form/Submit";
import React, { FC } from "react";
import { MassUnit, TimeUnit, Yeast, YeastAmountType } from "@prisma/client";
import { Select } from "@/components/Form/Select";
import { useForm, SubmitHandler } from "react-hook-form";
import { Toolbar } from "@/components/Toolbar";
import { Button } from "@/components/Button";
import { Autocomplete } from "@/components/Form/Autocomplete";

interface YeastIngredientFormProps {
  recipe?: ExtendedRecipe | null;
  yeast?: ExtendedYeastIngredient | null;
  yeastId?: string;
  action?: any;
  yeasts: Yeast[];
}

type YeastIngredientFormInput = {
  id: number;
  recipeId: number;
  yeastId: number | null;
  amount: number | null;
  amountType: YeastAmountType | null;
  attenuation: number | null;
  //duration: number | null;
  //durationType: TimeUnit | null;
};

export const YeastIngredientForm: FC<YeastIngredientFormProps> = ({
  recipe,
  action,
  yeastId,
  yeast,
  yeasts,
}) => {
  const src =
    yeastId === "new"
      ? ({ recipeId: recipe?.id } as ExtendedYeastIngredient)
      : yeast;
  const { register, trigger, getValues, setValue } =
    useForm<YeastIngredientFormInput>({
      defaultValues: src || { recipeId: recipe?.id },
    });
  const onSubmit = async (data: FormData) => {
    const valid = await trigger();
    if (!valid) return;
    action(data);
  };

  const handleChange = (value: number) => {
    const yeast = yeasts.find((p) => p.id === value);
    if (!yeast) return;
    setValue("yeastId", yeast?.id);
    setValue("attenuation", yeast?.attenuation);
  };
  const options = (yeasts || []).reduce((acc, yeast) => {
    acc[yeast.id] = yeast.name;
    return acc;
  }, {} as Record<string, string>);

  return (
    <Form action={onSubmit}>
      <input type="hidden" {...register("id")} />
      <input type="hidden" {...register("recipeId")} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 m-2">
        <div className="md:col-span-2">
          <Autocomplete
            label="Yeast"
            {...register("yeastId")}
            value={getValues("yeastId") as any}
            options={options}
            handleChange={handleChange}
          />
        </div>
        <div className="flex">
          <div className="flex-grow">
            <NumberField label="Amount" {...register("amount")} />
          </div>
          <div className="flex-shrink-0">
            <Select
              {...register("amountType")}
              label="Unit"
              options={YeastAmountType}
            />
          </div>
        </div>
        <div className="md:col-span-1">
          <NumberField
            {...register("attenuation")}
            step={0.001}
            label="Attenuation (%)"
          />
        </div>
      </div>
      <Toolbar className="col-span-2 md:col-span-2">
        <Button type="submit">Save</Button>
      </Toolbar>
    </Form>
  );
};
