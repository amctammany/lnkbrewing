"use client";
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
  RecipeOtherIngredient,
} from "@prisma/client";
import { Select } from "@/components/Form/Select";
import { useForm, SubmitHandler } from "react-hook-form";
import { Autocomplete } from "@/components/Form/Autocomplete";
//import { otherIngredientSchema } from "@/app/recipes/actions";
import { Toolbar } from "@/components/Toolbar";
import { Button } from "@/components/Button";
import { useRecipe } from "../useRecipe";
import {
  addRecipeOtherIngredientToRecipe,
  removeRecipeOtherIngredient,
  updateRecipeOtherIngredient,
} from "@/app/recipes/actions";
interface OtherIngredientFormProps {
  recipe?: ExtendedRecipe | null;
  other?: ExtendedOtherIngredient | null;
  otherId?: string;
  action?: any;
  others: OtherIngredient[]; //Record<string, string>;
  massUnit?: UserMassPreference;
}

export const OtherIngredientForm: FC<OtherIngredientFormProps> = ({
  massUnit,
  recipe,
  //action,
  //otherId,
  //other,
  others,
}) => {
  const { modalId, closeModal } = useRecipe();
  const other = recipe?.otherIngredients.find((h) => h.id === modalId);
  const src =
    modalId === "new"
      ? ({ recipeId: recipe?.id } as ExtendedOtherIngredient)
      : other;
  const action = src?.id
    ? updateRecipeOtherIngredient
    : addRecipeOtherIngredientToRecipe;
  const {
    register,
    getValues,
    control,
    setError,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<RecipeOtherIngredient>({
    defaultValues: (src
      ? {
          ...src,
          otherId: src?.otherIngredient?.id,
        }
      : { recipeId: recipe?.id }) as any,

    //resolver: zodResolver(otherIngredientSchema, {

    //}),
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
    const other = others.find((p) => p.id === value);
    setValue("otherIngredientId", other!.id);
  };

  const handleRemove = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const data = new FormData();
    data.append("id", other!.id.toString());
    await removeRecipeOtherIngredient(data);
    closeModal();
    e.stopPropagation();
    e.preventDefault();
    return false;
  };
  const options = (others || []).reduce((acc, other) => {
    acc[other.id] = other.name;
    return acc;
  }, {} as Record<string, string>);

  return (
    <Form action={onSubmit}>
      <div className="m-2 grid gap-0 md:gap-2 items-center grid-cols-1 md:grid-cols-2">
        <input type="hidden" {...register("id")} />
        <input type="hidden" {...register("recipeId")} />
        <div className="col-span-2">
          <Autocomplete
            label="Other"
            options={options}
            error={errors?.otherIngredientId}
            value={getValues("otherIngredientId") as any}
            {...register("otherIngredientId")}
            handleChange={autoChange}
          />
        </div>
        <div className="flex">
          <div className="flex-grow">
            <NumberField
              {...register("amount")}
              error={errors?.amount}
              label="Amount"
            />
          </div>
          <div className="flex-shrink-0">
            <Select
              {...register("amountType")}
              error={errors?.amountType}
              label=""
              options={MassUnit}
            />
          </div>
        </div>
      </div>
      <Toolbar className="col-span-2">
        <Button onClick={handleRemove}>Remove</Button>
        <Button type="submit">Submit</Button>
      </Toolbar>
    </Form>
  );
};
export default OtherIngredientForm;
