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
  const { register, handleSubmit, reset, setValue } =
    useForm<YeastIngredientFormInput>({
      defaultValues: src || { recipeId: recipe?.id },
    });
  const onSubmit: SubmitHandler<YeastIngredientFormInput> = (data) => {
    const body = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null) {
        body.append(key, value?.toString());
      }
    });
    console.log(data);
    action(body);
  };

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const { name, value } = e.currentTarget;
    const yeast = yeasts.find((p) => p.id === parseInt(value));
    if (!yeast) return;
    setValue("yeastId", yeast?.id);
    setValue("attenuation", yeast?.attenuation);
  };
  const options = (yeasts || []).reduce((acc, yeast) => {
    acc[yeast.id] = yeast.name;
    return acc;
  }, {} as Record<string, string>);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register("id")} />
      <input type="hidden" {...register("recipeId")} />

      <div className="gap-2 grid grid-cols-1 md:grid-cols-2">
        <div className="md:col-span-2">
          <Select
            label="Yeast"
            {...register("yeastId")}
            options={options}
            onChange={handleChange}
          />
        </div>
        <div className="md:col-span-1">
          <div className="grid grid-cols-2 gap-2">
            <div className="">
              <NumberField label="Amount" {...register("amount")} />
            </div>
            <div className="">
              <Select
                {...register("amountType")}
                label="Unit"
                options={YeastAmountType}
              />
            </div>
          </div>
        </div>
        <div className="md:col-span-1">
          <NumberField
            {...register("attenuation")}
            step={0.001}
            label="Attenuation (%)"
          />
        </div>

        <Toolbar className="col-span-2 md:col-span-2">
          <Button type="submit">Save</Button>
        </Toolbar>
      </div>
    </Form>
  );
};
