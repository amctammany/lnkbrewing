"use client";
import { ExtendedOtherIngredient, ExtendedRecipe } from "@/app/recipes/types";
import { Form } from "@/components/Form/Form";
import { NumberField } from "@/components/Form/NumberField";
import { Submit } from "@/components/Form/Submit";
import React, { FC } from "react";
import {
  OtherIngredient,
  IngredientUsage,
  MassUnit,
  TimeUnit,
} from "@prisma/client";
import { Select } from "@/components/Form/Select";
import { useForm, SubmitHandler } from "react-hook-form";
import { Toolbar } from "@/components/Toolbar";
import { Button } from "@/components/Button";
import { Autocomplete } from "@/components/Form/Autocomplete";

interface OtherIngredientFormProps {
  recipe?: ExtendedRecipe | null;
  other?: ExtendedOtherIngredient | null;
  otherId?: string;
  action?: any;
  others: OtherIngredient[]; //Record<string, string>;
}

type OtherIngredientFormInput = {
  id: number;
  recipeId: number;
  otherIngredientId: number | null;
  amount: number | null;
  amountType: MassUnit | null;
  usage: IngredientUsage | null;
};
export const OtherIngredientForm: FC<OtherIngredientFormProps> = ({
  recipe,
  action,
  otherId,
  other,
  others,
}) => {
  console.log(other, recipe);
  const src =
    otherId === "new"
      ? ({ recipeId: recipe?.id } as ExtendedOtherIngredient)
      : other;
  const { register, trigger, setValue, getValues } =
    useForm<OtherIngredientFormInput>({
      defaultValues: src || { recipeId: recipe?.id },
    });
  const onSubmit = async (data: FormData) => {
    const valid = await trigger();
    if (!valid) return;
    return action(data);
  };
  const handleChange = (value: number) => {
    const other = others.find((o) => o.id === value);
    if (!other) return;
    setValue("otherIngredientId", other?.id);
  };
  const options = (others || []).reduce((acc, other) => {
    acc[other.id] = other.name;
    return acc;
  }, {} as Record<string, string>);

  return (
    <Form action={onSubmit}>
      <input type="hidden" {...register("id")} />
      <input type="hidden" {...register("recipeId")} />
      <div className="flex flex-col gap-2 md:grid md:grid-cols-2 m-2">
        <div className="col-span-2">
          <Autocomplete
            label="Other"
            {...register("otherIngredientId")}
            value={getValues("otherIngredientId") as any}
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
              options={MassUnit}
            />
          </div>
        </div>

        <div className="">
          <Select
            {...register("usage")}
            label="Usage"
            options={IngredientUsage}
          />
        </div>
      </div>
      <Toolbar className="col-span-2 md:col-span-2">
        <Button type="submit">Save</Button>
      </Toolbar>
    </Form>
  );
};
