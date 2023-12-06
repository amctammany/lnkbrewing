"use client";
import {
  Fermentable,
  FermentableIngredient,
  FermentableIngredientUsage,
  MassUnit,
  TimeUnit,
} from "@prisma/client";
//import { FermentableSelect } from "./FermentableSelect";
import { Form } from "@/components/Form/Form";
import { NumberField } from "@/components/Form/NumberField";
import { Select } from "@/components/Form/Select";
import { Submit } from "@/components/Form/Submit";
import {
  ExtendedFermentableIngredient,
  ExtendedRecipe,
} from "@/app/recipes/types";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  updateFermentableIngredient,
  addFermentableIngredientToRecipe,
} from "@/app/recipes/actions";
import { Toolbar } from "@/components/Toolbar/Toolbar";
import { Button } from "@/components/Button";
import { Autocomplete } from "@/components/Form/Autocomplete";

export type FermentableIngredientFormProps = {
  recipe?: ExtendedRecipe | null;
  fermentable?: ExtendedFermentableIngredient | null;
  fermentables: Fermentable[];
};

type FermentableIngredientFormInput = {
  id: number;
  recipeId: number;
  fermentableId: number | null;
  color: number | null;
  potential: number | null;
  amount: number | null;
  amountType: MassUnit | null;
  usage: FermentableIngredientUsage;
};
export function FermentableIngredientForm({
  recipe,
  fermentable: src,
  fermentables,
}: FermentableIngredientFormProps) {
  const { register, getValues, handleSubmit, reset, setValue } =
    useForm<FermentableIngredientFormInput>({
      defaultValues: {
        ...src,
        fermentableId: src?.fermentable?.id,
        potential: src?.fermentable?.potential,
        color: src?.fermentable?.color,
      } || { recipeId: recipe?.id },
    });
  const action = src?.id
    ? updateFermentableIngredient
    : addFermentableIngredientToRecipe;

  const onSubmit: SubmitHandler<FermentableIngredientFormInput> = (data) => {
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
    const fermentable = fermentables.find((p) => p.id === parseInt(value));
    if (!fermentable) return;
    setValue("fermentableId", fermentable?.id);
    setValue("potential", fermentable?.potential);
    setValue("color", fermentable?.color);
  };
  const autoChange = (value: number) => {
    const fermentable = fermentables.find((p) => p.id === value);
    if (!fermentable) return;
    setValue("fermentableId", fermentable?.id);
    setValue("potential", fermentable?.potential);
    setValue("color", fermentable?.color);
  };
  const options = (fermentables || []).reduce((acc, hop) => {
    acc[hop.id] = hop.name;
    return acc;
  }, {} as Record<string, string>);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="m-2 grid gap-0 md:gap-2 items-center grid-cols-1 md:grid-cols-2">
        <input type="hidden" {...register("id")} />
        <input type="hidden" {...register("recipeId")} />
        <div className="col-span-2">
          <Autocomplete
            label="Fermentable"
            options={options}
            value={getValues("fermentableId") as any}
            {...register("fermentableId")}
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
        <div className="">
          <Select
            label="Usage"
            options={FermentableIngredientUsage}
            {...register("usage")}
          />
        </div>
        <div>
          <NumberField
            {...register("potential")}
            label="Potential"
            step={0.001}
          />
        </div>
        <div>
          <NumberField {...register("color")} label="Color" step={0.01} />
        </div>
      </div>
      <Toolbar className="col-span-2">
        <Button type="submit">Submit</Button>
      </Toolbar>
    </Form>
  );
}
