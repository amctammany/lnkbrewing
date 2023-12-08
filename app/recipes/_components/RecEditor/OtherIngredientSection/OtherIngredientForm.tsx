"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExtendedOtherIngredient, ExtendedRecipe } from "@/app/recipes/types";
import { Form } from "@/components/Form/Form";
import { NumberField } from "@/components/Form/NumberField";
import { Submit } from "@/components/Form/Submit";
import React, { FC } from "react";
import {
  OtherIngredient,
  MassUnit,
  TimeUnit,
  UserMassPreference,
} from "@prisma/client";
import { Select } from "@/components/Form/Select";
import { useForm, SubmitHandler } from "react-hook-form";
import { Autocomplete } from "@/components/Form/Autocomplete";
//import { otherIngredientSchema } from "@/app/recipes/actions";
import * as z from "zod";
import { zfd } from "zod-form-data";
import { Toolbar } from "@/components/Toolbar";
import { Button } from "@/components/Button";
import { useRecipe } from "../useRecipe";
import {
  addRecipeOtherIngredientToRecipe,
  updateRecipeOtherIngredient,
} from "@/app/recipes/actions";
const otherIngredientSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  recipeId: zfd.numeric(z.number()),
  otherIngredientId: zfd.numeric(z.number().optional().default(1078)),
  attenuation: zfd.numeric(z.number().min(0).optional()),
  amount: zfd.numeric(z.number().min(0)),
  amountType: z.nativeEnum(MassUnit).default(MassUnit.g),
});

interface OtherIngredientFormProps {
  recipe?: ExtendedRecipe | null;
  other?: ExtendedOtherIngredient | null;
  otherId?: string;
  action?: any;
  others: OtherIngredient[]; //Record<string, string>;
  massUnit: UserMassPreference;
}
type Schema = z.infer<typeof otherIngredientSchema>;

export const OtherIngredientForm: FC<OtherIngredientFormProps> = ({
  massUnit,
  //recipe,
  //action,
  //otherId,
  //other,
  others,
}) => {
  const { recipe, otherId, closeOther } = useRecipe();
  const other = recipe?.otherIngredients.find((h) => h.id === otherId);
  const src =
    otherId === "new"
      ? ({ recipeId: recipe?.id } as ExtendedOtherIngredient)
      : other;
  const action = src?.id
    ? updateRecipeOtherIngredient
    : addRecipeOtherIngredientToRecipe;
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
          otherId: src?.otherIngredient?.id,
        }
      : { recipeId: recipe?.id }) as any,
    resolver: async (data, context, options) => {
      //console.log({ data, context, options });
      const r = await zodResolver(otherIngredientSchema)(
        data,
        context,
        options
      );
      return r;
    },

    //resolver: zodResolver(otherIngredientSchema, {

    //}),
  });
  const onSubmit = async (data: FormData) => {
    const valid = await trigger();
    if (!valid) return;
    action(data);
    closeOther();
  };

  const autoChange = (value: number) => {
    const other = others.find((p) => p.id === value);
    if (!other) return;
    setValue("otherIngredientId", other?.id);
  };

  const options = (others || []).reduce((acc, other) => {
    acc[other.id] = other.name;
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
            label="Other"
            options={options}
            value={getValues("otherIngredientId") as any}
            {...register("otherIngredientId")}
            handleChange={autoChange}
          />
        </div>
        <div className="flex">
          <div className="flex-grow">
            <NumberField {...register("amount")} label="Amount" />
          </div>
          <div className="flex-shrink-0">
            <Select {...register("amountType")} label="" options={MassUnit} />
          </div>
        </div>
      </div>
      <Toolbar className="col-span-2">
        <Button type="submit">Submit</Button>
      </Toolbar>
    </Form>
  );
};
export default OtherIngredientForm;
