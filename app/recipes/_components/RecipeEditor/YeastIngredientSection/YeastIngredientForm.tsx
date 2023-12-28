"use client";
import { ExtendedYeastIngredient, ExtendedRecipe } from "@/app/recipes/types";
import { Form } from "@/components/Form/Form";
import { NumberField } from "@/components/Form/NumberField";
import { Submit } from "@/components/Form/Submit";
import React, { FC } from "react";
import {
  Yeast,
  YeastIngredient,
  MassUnit,
  TimeUnit,
  UserMassPreference,
  YeastAmountType,
} from "@prisma/client";
import { Select } from "@/components/Form/Select";
import { useForm, SubmitHandler } from "react-hook-form";
import { Autocomplete } from "@/components/Form/Autocomplete";
//import { yeastIngredientSchema } from "@/app/recipes/actions";
//import { zodResolver } from "@hookform/resolvers/zod";
//import * as z from "zod";
//import { zfd } from "zod-form-data";
import { Toolbar } from "@/components/Toolbar";
import { Button } from "@/components/Button";
import { useRecipe } from "../useRecipe";
import {
  addYeastIngredientToRecipe,
  removeYeastIngredient,
  updateYeastIngredient,
} from "@/app/recipes/actions";
import { AmountField } from "@/components/Form/AmountField";
import { IconButton } from "@/components/Button/IconButton";
import { DeleteIcon, SaveIcon } from "@/components/Icon";
//const yeastIngredientSchema = zfd.formData({
//id: zfd.numeric(z.number().optional()),
//recipeId: zfd.numeric(z.number()),
//yeastId: zfd.numeric(z.number().optional()),
//attenuation: zfd.numeric(z.number().min(0).optional()),
//amount: zfd.numeric(z.number().min(0)),
//amountType: z.nativeEnum(YeastAmountType).default(YeastAmountType.package),
//});

interface YeastIngredientFormProps {
  recipe?: ExtendedRecipe | null;
  yeast?: ExtendedYeastIngredient | null;
  yeastId?: string;
  action?: any;
  yeasts: Yeast[]; //Record<string, string>;
  massUnit?: UserMassPreference;
}
//type Schema = z.infer<typeof yeastIngredientSchema>;

export const YeastIngredientForm: FC<YeastIngredientFormProps> = ({
  recipe,
  massUnit,
  yeasts,
}) => {
  const { modalId, closeModal } = useRecipe();
  const yeast = recipe?.yeasts?.find((h) => h.id === modalId);
  const src =
    modalId === "new"
      ? ({ recipeId: recipe?.id } as ExtendedYeastIngredient)
      : yeast;
  const action = src?.id ? updateYeastIngredient : addYeastIngredientToRecipe;
  const {
    register,
    getValues,
    control,
    setError,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<YeastIngredient>({
    defaultValues: (src
      ? {
          ...src,
          yeastId: src?.yeast?.id,
          attenuation: src?.yeast?.attenuation,
        }
      : { recipeId: recipe?.id }) as any,
    //resolver: async (data, context, options) => {
    ////console.log({ data, context, options });
    //const r = await zodResolver(yeastIngredientSchema)(
    //data,
    //context,
    //options
    //);
    //return r;
    //},

    //resolver: zodResolver(yeastIngredientSchema, {

    //}),
  });
  const handleRemove = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const data = new FormData();
    data.append("id", yeast!.id.toString());
    await removeYeastIngredient(data);
    closeModal();
    e.stopPropagation();
    e.preventDefault();
    return false;
  };

  const onSubmit = async (data: FormData) => {
    //const valid = await trigger();
    //if (!valid) return;
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
    const yeast = yeasts.find((p) => p.id === value);
    setValue("yeastId", yeast!.id);
    setValue("attenuation", yeast!.attenuation);
  };

  const options = (yeasts || []).reduce((acc, yeast) => {
    acc[yeast.id] = yeast.name;
    return acc;
  }, {} as Record<string, string>);

  return (
    <Form action={onSubmit}>
      <div className="m-2 grid gap-0 md:gap-2 items-center grid-cols-1 md:grid-cols-2">
        <input type="hidden" {...register("id")} />
        <input type="hidden" {...register("recipeId")} />
        <div className="col-span-2">
          <Autocomplete
            error={errors?.yeastId}
            label="Yeast"
            options={options}
            value={getValues("yeastId") as any}
            {...register("yeastId")}
            handleChange={autoChange}
          />
        </div>
        <AmountField
          {...register("amount", { valueAsNumber: true })}
          error={errors?.amount}
          options={YeastAmountType}
          label="Amount"
        >
          <select {...register("amountType")}>
            {Object.entries(YeastAmountType).map(([k, v]) => (
              <option key={k} value={v}>
                {k}
              </option>
            ))}
          </select>
        </AmountField>
        <div>
          <NumberField
            {...register("attenuation")}
            error={errors?.attenuation}
            label="Potential"
            step={0.001}
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
export default YeastIngredientForm;
