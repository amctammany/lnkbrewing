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
  const { register, trigger, handleSubmit, reset, setValue } =
    useForm<OtherIngredientFormInput>({
      defaultValues: src || { recipeId: recipe?.id },
    });
  const onSubmiti: SubmitHandler<OtherIngredientFormInput> = (data) => {
    const body = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null) {
        body.append(key, value?.toString());
      }
    });
    console.log(data);
    action(body);
  };
  const onSubmit = async (data: FormData) => {
    const valid = await trigger();
    if (!valid) return;
    return action(data);
  };
  const options = (others || []).reduce((acc, other) => {
    acc[other.id] = other.name;
    return acc;
  }, {} as Record<string, string>);

  return (
    <Form action={onSubmit}>
      <input type="hidden" {...register("id")} />
      <input type="hidden" {...register("recipeId")} />
      <div className="flex flex-col gap-2 md:grid md:grid-cols-2">
        <Select
          label="Other"
          {...register("otherIngredientId")}
          options={options}
        />
        <div className="grid grid-cols-2 gap-2">
          <div className="">
            <NumberField label="Amount" {...register("amount")} />
          </div>
          <div className="">
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

        <Submit>Save</Submit>
      </div>
    </Form>
  );
};
