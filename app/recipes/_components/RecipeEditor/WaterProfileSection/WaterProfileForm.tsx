"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExtendedRecipe } from "@/app/recipes/types";
import { Form } from "@/components/Form/Form";
import React, { FC } from "react";
import { UserMassPreference, WaterProfile } from "@prisma/client";
import { useForm, SubmitHandler } from "react-hook-form";
//import { waterProfileSchema } from "@/app/recipes/actions";
import * as z from "zod";
import { zfd } from "zod-form-data";
import { Toolbar } from "@/components/Toolbar";
import { Button } from "@/components/Button";
import { useRecipe } from "../useRecipe";
import { updateRecipe } from "@/app/recipes/actions";
import { TextField } from "@/components/Form/TextField";
import { Autocomplete } from "@/components/Form/Autocomplete";
import { NumberField } from "@/components/Form/NumberField";
import { SaveIcon } from "@/components/Icon";
import { IconButton } from "@/components/Button/IconButton";
const waterProfileSchema = zfd.formData({
  id: zfd.numeric(z.number()),
  name: zfd.text(z.string()),
});

type WaterProfileFormInput = {
  id: number;
  waterProfileId: number | null;
  calcium: number | null;
  magnesium: number | null;
  sodium: number | null;
  sulfate: number | null;
  chloride: number | null;
  bicarbonate: number | null;
};

interface WaterProfileFormProps {
  recipe?: ExtendedRecipe | null;
  profiles: WaterProfile[];
  massUnit?: UserMassPreference;
}
type Schema = z.infer<typeof waterProfileSchema>;

export const WaterProfileForm: FC<WaterProfileFormProps> = ({
  recipe,
  massUnit,
  profiles,
}) => {
  const { modalId, openModal, closeModal } = useRecipe();
  const {
    register,
    getValues,
    control,
    trigger,
    formState: { errors },
    handleSubmit,
    setError,
    reset,
    setValue,
  } = useForm<WaterProfileFormInput>({
    defaultValues: recipe as any,
    //resolver: async (data, context, options) => {
    ////console.log({ data, context, options });
    //const r = await zodResolver(waterProfileSchema)(data, context, options);
    //return r;
    //},

    //resolver: zodResolver(waterProfileSchema, {

    //}),
  });
  const options = profiles.reduce((acc, profile) => {
    acc[profile.id] = `${profile.name}`;
    return acc;
  }, {} as Record<string, string>);

  const onSubmit = async (data: FormData) => {
    const res = (await updateRecipe(data)) as any;
    if (res?.errors?.length) {
      res.errors.forEach((err: any) =>
        setError(err.path, { type: err.code, message: err.message })
      );
      return;
    }

    closeModal();
  };
  const autoChange = (value?: number) => {
    const profile = profiles.find((p) => p.id === value);
    reset({ ...profile, id: recipe?.id });
  };

  return (
    <Form action={onSubmit}>
      <div className="m-2 grid gap-0 md:gap-2 items-center grid-cols-1 md:grid-cols-2">
        <input type="hidden" value={recipe?.id} {...register("id")} />
        <Autocomplete
          className="md:col-span-2"
          label="Water Profile"
          value={getValues("waterProfileId") as any}
          {...register("waterProfileId")}
          handleChange={autoChange}
          options={options}
        />

        <NumberField
          step={1}
          error={errors?.calcium}
          {...register("calcium")}
        />
        <NumberField
          step={1}
          error={errors?.magnesium}
          {...register("magnesium")}
        />
        <NumberField step={1} error={errors?.sodium} {...register("sodium")} />
        <NumberField
          step={1}
          error={errors?.chloride}
          {...register("chloride")}
        />
        <NumberField
          step={1}
          error={errors?.sulfate}
          {...register("sulfate")}
        />
        <NumberField
          step={1}
          error={errors?.bicarbonate}
          {...register("bicarbonate")}
        />

        <Toolbar className="col-span-2 md:col-span-2">
          <IconButton Icon={SaveIcon} type="submit">
            Save
          </IconButton>
        </Toolbar>
      </div>
    </Form>
  );
};
export default WaterProfileForm;
