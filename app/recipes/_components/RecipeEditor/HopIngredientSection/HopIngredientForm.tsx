"use client";
import { ExtendedHopIngredient, ExtendedRecipe } from "@/app/recipes/types";
import { Form } from "@/components/Form/Form";
import { NumberField } from "@/components/Form/NumberField";
import { Submit } from "@/components/Form/Submit";
import React, { FC } from "react";
import {
  Hop,
  HopIngredient,
  HopIngredientUsage,
  MassUnit,
  TimeUnit,
  UserMassPreference,
} from "@prisma/client";
import { Select } from "@/components/Form/Select";
import { useForm, SubmitHandler } from "react-hook-form";
import { Autocomplete } from "@/components/Form/Autocomplete";

interface HopIngredientFormProps {
  recipe?: ExtendedRecipe | null;
  hop?: ExtendedHopIngredient | null;
  hopId?: string;
  action?: any;
  hops: Hop[]; //Record<string, string>;
  massUnit: UserMassPreference;
}

type HopIngredientFormInput = {
  id: number;
  recipeId: number;
  hopId: number | null;
  amount: number | null;
  amountType: MassUnit | null;
  alpha: number | null;
  usage: HopIngredientUsage | null;
  duration: number | null;
  durationType: TimeUnit | null;
};
export const HopIngredientForm: FC<HopIngredientFormProps> = ({
  massUnit,
  recipe,
  action,
  hopId,
  hop,
  hops,
}) => {
  console.log({ massUnit });
  const src =
    hopId === "new" ? ({ recipeId: recipe?.id } as ExtendedHopIngredient) : hop;
  const { register, getValues, handleSubmit, reset, setValue } =
    useForm<HopIngredientFormInput>({
      defaultValues: src || { recipeId: recipe?.id },
    });
  const onSubmit: SubmitHandler<HopIngredientFormInput> = (data) => {
    const body = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null) {
        body.append(key, value?.toString());
      }
    });
    console.log(data);
    action(body);
  };

  const handleChange = (value: number) => {
    const hop = hops.find((p) => p.id === value);
    console.log(value);
    if (!hop) return;
    setValue("hopId", hop?.id);
    setValue("alpha", hop?.alpha);
  };
  const options = (hops || []).reduce((acc, hop) => {
    acc[hop.id] = hop.name;
    return acc;
  }, {} as Record<string, string>);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register("id")} />
      <input type="hidden" {...register("recipeId")} />
      <div className="flex flex-row gap-2 md:grid md:grid-cols-2">
        <Autocomplete
          label="Hop"
          {...register("hopId")}
          defaultValue={getValues("hopId") as any}
          options={options}
          handleChange={handleChange}
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
          <NumberField {...register("alpha")} step={0.1} label="Alpha Acids" />
        </div>

        <div className="">
          <Select
            {...register("usage")}
            label="Usage"
            options={HopIngredientUsage}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="">
            <NumberField
              {...register("duration")}
              name="duration"
              label="Time"
            />
          </div>
          <div className="">
            <Select
              {...register("durationType")}
              label="Time Unit"
              options={TimeUnit}
            />
          </div>
        </div>

        <Submit>Save</Submit>
      </div>
    </Form>
  );
};
