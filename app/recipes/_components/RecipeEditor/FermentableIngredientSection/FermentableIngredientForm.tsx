"use client";
import {
  ExtendedFermentableIngredient,
  ExtendedRecipe,
} from "@/app/recipes/types";
import { Form } from "@/components/Form/Form";
import { NumberField } from "@/components/Form/NumberField";
import React, { FC } from "react";
import {
  Fermentable,
  FermentableIngredientUsage,
  MassUnit,
  UserMassPreference,
} from "@prisma/client";
import { Select } from "@/components/Form/Select";
import { useForm, SubmitHandler } from "react-hook-form";
import { Autocomplete } from "@/components/Form/Autocomplete";
import * as z from "zod";
import { zfd } from "zod-form-data";
import { Toolbar } from "@/components/Toolbar";
import { Button } from "@/components/Button";
import { useRecipe } from "../useRecipe";
import {
  addFermentableIngredientToRecipe,
  removeFermentableIngredient,
  updateFermentableIngredient,
} from "@/app/recipes/actions";
import { AmountField } from "@/components/Form/AmountField";
import { IconButton } from "@/components/Button/IconButton";
import { DeleteIcon, SaveIcon } from "@/components/Icon";
const fermentableIngredientSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  recipeId: zfd.numeric(z.number()),
  fermentableId: zfd.numeric(z.number().optional()),
  color: zfd.numeric(z.number().optional()),
  potential: zfd.numeric(z.number().optional()),
  usage: z
    .nativeEnum(FermentableIngredientUsage)
    .default(FermentableIngredientUsage.Mash),
  amount: zfd.numeric(z.number().min(0)),
  amountType: z.nativeEnum(MassUnit).default(MassUnit.LbOz),
});

interface FermentableIngredientFormProps {
  recipe?: ExtendedRecipe | null;
  fermentable?: ExtendedFermentableIngredient | null;
  fermentableId?: string;
  action?: any;
  fermentables: Fermentable[]; //Record<string, string>;
  massUnit?: UserMassPreference;
}

type Schema = z.infer<typeof fermentableIngredientSchema>;

export const FermentableIngredientForm: FC<FermentableIngredientFormProps> = ({
  massUnit,
  recipe,
  //action,
  //fermentableId,
  fermentable,
  fermentables,
}) => {
  const { modalId, closeModal } = useRecipe();
  //const fermentable = recipe?.fermentables?.find((h) => h.id === modalId);
  const src =
    modalId === "new"
      ? ({
          recipeId: recipe?.id,
          amountType: massUnit,
        } as ExtendedFermentableIngredient)
      : fermentable;
  const action = src?.id
    ? updateFermentableIngredient
    : addFermentableIngredientToRecipe;
  const {
    register,
    getValues,
    formState: { errors },
    setError,
    setValue,
  } = useForm<Schema>({
    defaultValues: (src
      ? {
          ...src,
          amountType: src?.amountType ?? massUnit,
          fermentableId: src?.fermentable?.id,
          potential: src?.fermentable?.potential,
          color: src?.fermentable?.color,
        }
      : { recipeId: recipe?.id, amountType: massUnit }) as any,
  });
  const onSubmit = async (data: FormData) => {
    const res = (await action(data)) as any;
    if (res?.errors?.length) {
      res.errors.forEach((err: any) =>
        setError(err.path, { type: err.code, message: err.message })
      );
      return;
    }

    closeModal();
  };

  const autoChange = (value?: number) => {
    const fermentable = fermentables.find((p) => p.id === value);
    //if (!fermentable) return;
    setValue("fermentableId", fermentable?.id);
    setValue("potential", fermentable?.potential!);
    setValue("color", fermentable?.color!);
  };
  const handleRemove = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const data = new FormData();
    data.append("id", fermentable!.id.toString());
    await removeFermentableIngredient(data);
    closeModal();
    e.stopPropagation();
    e.preventDefault();
    return false;
  };

  const options = (fermentables || []).reduce((acc, fermentable) => {
    acc[fermentable.id] = fermentable.name;
    return acc;
  }, {} as Record<string, string>);

  return (
    <Form action={onSubmit}>
      <div className="m-2 grid gap-0 md:gap-2 items-center grid-cols-1 md:grid-cols-2">
        <input type="hidden" {...register("id")} />
        <input type="hidden" {...register("recipeId")} />
        <div className="col-span-2">
          <Autocomplete
            label="Fermentable"
            options={options}
            error={errors?.fermentableId}
            value={getValues("fermentableId") as any}
            {...register("fermentableId")}
            handleChange={autoChange}
          />
        </div>
        <div className="flex">
          <AmountField
            amountType={src?.amountType}
            {...register("amount", { valueAsNumber: true })}
            value={getValues("amount")}
            error={errors?.amount}
            label="Amount"
          />
        </div>
        <div className="">
          <Select
            label="Usage"
            error={errors?.usage}
            options={FermentableIngredientUsage}
            {...register("usage")}
          />
        </div>
        <div>
          <NumberField
            {...register("potential")}
            error={errors?.potential}
            label="Potential"
            step={0.001}
          />
        </div>
        <div>
          <NumberField
            {...register("color")}
            error={errors?.color}
            label="Color"
            step={0.01}
          />
        </div>
      </div>
      <Toolbar className="col-span-2">
        <IconButton Icon={DeleteIcon} onClick={handleRemove}>
          Remove
        </IconButton>
        <IconButton Icon={SaveIcon} type="submit">
          Submit
        </IconButton>
      </Toolbar>
    </Form>
  );
};
export default FermentableIngredientForm;
