"use client";
import { zodResolver } from "@hookform/resolvers/zod";
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
//import { hopIngredientSchema } from "@/app/recipes/actions";
import { Toolbar } from "@/components/Toolbar";
import { Button } from "@/components/Button";
import { useRecipe } from "../useRecipe";
import {
  addHopIngredientToRecipe,
  updateHopIngredient,
} from "@/app/recipes/actions";
import { setRequestMeta } from "next/dist/server/request-meta";
/**
import * as z from "zod";
import { zfd } from "zod-form-data";
const hopIngredientSchema = z.object({
  id: z.number().optional(),
  recipeId: z.number(),
  hopId: z.number().optional().default(1078),
  amount: z.number().min(0),
  alpha: z.number().min(0).optional(),
  usage: z.nativeEnum(HopIngredientUsage).default(HopIngredientUsage.Boil),
  amountType: z.nativeEnum(MassUnit).default(MassUnit.oz),
  duration: z.number().min(0),
  durationType: z.nativeEnum(TimeUnit).default(TimeUnit.min),
});
//console.log(hopIngredientSchema._def.schema);
const hopIngredientSchema1 = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  recipeId: zfd.numeric(z.number()),
  hopId: zfd.numeric(z.number().optional()),
  amount: zfd.numeric(z.number().min(0)),
  alpha: zfd.numeric(z.number().min(0).optional()),
  usage: z.nativeEnum(HopIngredientUsage).default(HopIngredientUsage.Boil),
  amountType: z.nativeEnum(MassUnit).default(MassUnit.oz),
  duration: zfd.numeric(z.number().min(0)),
  durationType: z.nativeEnum(TimeUnit).default(TimeUnit.min),
});

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
type Schema = z.infer<typeof hopIngredientSchema1>;
*/

interface HopIngredientFormProps {
  recipe?: ExtendedRecipe | null;
  hop?: ExtendedHopIngredient | null;
  hopId?: string;
  action?: any;
  hops: Hop[]; //Record<string, string>;
  massUnit?: UserMassPreference;
}

export const HopIngredientForm: FC<HopIngredientFormProps> = ({
  massUnit,
  recipe,
  //action,
  //hopId,
  //hop,
  hops,
}) => {
  const { modalId, closeModal } = useRecipe();

  const hop = recipe?.hops?.find((h) => h.id === modalId);
  const src =
    modalId === "new"
      ? ({ recipeId: recipe?.id } as ExtendedHopIngredient)
      : hop;
  const action = src?.id ? updateHopIngredient : addHopIngredientToRecipe;
  const {
    register,
    getValues,
    control,
    trigger,
    setError,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<HopIngredient>({
    defaultValues: (src || { recipeId: recipe?.id }) as any,
    //resolver: async (data, context, options) => {
    ////console.log({ data, context, options });
    //const r = await zodResolver(hopIngredientSchema1)(data, context, options);
    //return r;
    //},

    //resolver: zodResolver(hopIngredientSchema, {

    //}),
  });
  const onSubmit = async (data: FormData) => {
    //const valid = await trigger();
    //if (!valid) return;
    const res = (await action(data)) as any;
    console.log(res);
    if (res?.errors?.length) {
      res.errors.forEach((err: any) =>
        setError(err.path, { type: err.code, message: err.message })
      );
      return;
    }
    closeModal();
    //setRecipe(res);
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.dataset);
  };
  const handleChange = (value?: number) => {
    const hop = hops.find((p) => p.id === value);
    //if (!hop) return;
    setValue("hopId", hop?.id!);
    setValue("alpha", hop?.alpha!);
  };
  const options = (hops || []).reduce((acc, hop) => {
    acc[hop.id] = hop.name;
    return acc;
  }, {} as Record<string, string>);
  const handleError = (e: any) => console.log(e);

  return (
    <Form action={onSubmit} onError={handleError}>
      <input type="hidden" {...register("id")} />
      <input type="hidden" {...register("recipeId")} />
      <div className="gap-2 md:grid md:grid-cols-2">
        <div className="md:col-span-2">
          <Autocomplete
            label="Hop"
            {...register("hopId")}
            error={errors?.hopId}
            value={getValues("hopId") as any}
            options={options}
            handleChange={handleChange}
          />
        </div>
        <div className="flex">
          <div className="flex-grow">
            <NumberField
              label="Amount"
              error={errors?.amount}
              {...register("amount", { valueAsNumber: true })}
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
        <div>
          <Select
            name="type"
            label="Type"
            options={{ pellet: "Pellet", cryo: "CryoHop" }}
          />
        </div>

        <div className="flex">
          <div className="flex-grow">
            <NumberField
              error={errors?.duration}
              {...register("duration", { valueAsNumber: true })}
              name="duration"
              label="Time"
            />
          </div>
          <div className="flex-shrink-0">
            <Select
              {...register("durationType")}
              error={errors?.durationType}
              label=""
              options={TimeUnit}
            />
          </div>
        </div>
        <div>
          <Select
            {...register("usage")}
            error={errors?.usage}
            label="Usage"
            options={HopIngredientUsage}
          />
        </div>
        <div className="">
          <NumberField
            {...register("alpha", { valueAsNumber: true })}
            error={errors?.alpha}
            step={0.1}
            label="Alpha Acids"
          />
        </div>

        <Toolbar className="md:col-span-2">
          <Button onClick={handleRemove}>Remove</Button>
          <Button type="submit">Save</Button>
        </Toolbar>
      </div>
    </Form>
  );
};
export default HopIngredientForm;
