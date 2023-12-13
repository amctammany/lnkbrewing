"use client";
import { zodResolver } from "@hookform/resolvers/zod";
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
import * as z from "zod";
import { zfd } from "zod-form-data";
import { Toolbar } from "@/components/Toolbar";
import { Button } from "@/components/Button";
import { useRecipe } from "../useRecipe";
import {
  addYeastIngredientToRecipe,
  updateYeastIngredient,
} from "@/app/recipes/actions";
const yeastIngredientSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  recipeId: zfd.numeric(z.number()),
  yeastId: zfd.numeric(z.number().optional().default(1078)),
  attenuation: zfd.numeric(z.number().min(0).optional()),
  amount: zfd.numeric(z.number().min(0)),
  amountType: z.nativeEnum(YeastAmountType).default(YeastAmountType.package),
});

interface YeastIngredientFormProps {
  recipe?: ExtendedRecipe | null;
  yeast?: ExtendedYeastIngredient | null;
  yeastId?: string;
  action?: any;
  yeasts: Yeast[]; //Record<string, string>;
  massUnit: UserMassPreference;
}
type Schema = z.infer<typeof yeastIngredientSchema>;

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
    trigger,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<Schema>({
    defaultValues: (src
      ? {
          ...src,
          yeastId: src?.yeast?.id,
          attenuation: src?.yeast?.attenuation,
        }
      : { recipeId: recipe?.id }) as any,
    resolver: async (data, context, options) => {
      //console.log({ data, context, options });
      const r = await zodResolver(yeastIngredientSchema)(
        data,
        context,
        options
      );
      return r;
    },

    //resolver: zodResolver(yeastIngredientSchema, {

    //}),
  });
  const onSubmit = async (data: FormData) => {
    const valid = await trigger();
    if (!valid) return;
    action(data);
    closeModal();
  };

  const autoChange = (value: number) => {
    const yeast = yeasts.find((p) => p.id === value);
    if (!yeast) return;
    setValue("yeastId", yeast?.id);
    setValue("attenuation", yeast?.attenuation!);
  };

  const options = (yeasts || []).reduce((acc, yeast) => {
    acc[yeast.id] = yeast.name;
    return acc;
  }, {} as Record<string, string>);
  const handleError = (e: any) => console.log(e);

  return (
    <Form action={onSubmit}>
      <div className="m-2 grid gap-0 md:gap-2 items-center grid-cols-1 md:grid-cols-2">
        <input type="hidden" {...register("id")} />
        <input type="hidden" {...register("recipeId")} />
        <div className="col-span-2">
          <Autocomplete
            label="Yeast"
            options={options}
            value={getValues("yeastId") as any}
            {...register("yeastId")}
            handleChange={autoChange}
          />
        </div>
        <div className="flex">
          <div className="flex-grow">
            <NumberField {...register("amount")} label="Amount" />
          </div>
          <div className="flex-shrink-0">
            <Select
              {...register("amountType")}
              label=""
              options={YeastAmountType}
            />
          </div>
        </div>
        <div>
          <NumberField
            {...register("attenuation")}
            label="Potential"
            step={0.001}
          />
        </div>
      </div>
      <Toolbar className="col-span-2">
        <Button type="submit">Submit</Button>
      </Toolbar>
    </Form>
  );
};
export default YeastIngredientForm;
