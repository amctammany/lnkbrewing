"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExtendedRecipe } from "@/app/recipes/types";
import { Form } from "@/components/Form/Form";
import React, { FC } from "react";
import { EquipmentProfile, UserMassPreference } from "@prisma/client";
import { useForm, SubmitHandler } from "react-hook-form";
//import { equipmentSchema } from "@/app/recipes/actions";
import * as z from "zod";
import { zfd } from "zod-form-data";
import { Toolbar } from "@/components/Toolbar";
import { Button } from "@/components/Button";
import { useRecipe } from "../useRecipe";
import { updateRecipe } from "@/app/recipes/actions";
import { TextField } from "@/components/Form/TextField";
import { Select } from "@/components/Form/Select";
import { NumberField } from "@/components/Form/NumberField";
const equipmentSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  equipmentProfileId: zfd.numeric(z.number()),
  boilTime: zfd.numeric(z.number().min(0).optional().nullable()),
  batchVolume: zfd.numeric(z.number().min(0).optional().nullable()),
  boilOffRate: zfd.numeric(z.number().min(0).optional().nullable()),
  trubLoss: zfd.numeric(z.number().min(0).optional().nullable()),
  mashLoss: zfd.numeric(z.number().min(0).optional().nullable()),
  fermenterLoss: zfd.numeric(z.number().min(0).optional().nullable()),
  mashEfficiency: zfd.numeric(z.number().min(0).max(1).optional().nullable()),
  brewEfficiency: zfd.numeric(z.number().min(0).max(1).optional().nullable()),
});

interface EquipmentFormProps {
  recipe?: ExtendedRecipe | null;
  profiles: EquipmentProfile[];
  massUnit: UserMassPreference;
}
type Schema = z.infer<typeof equipmentSchema>;

export const EquipmentForm: FC<EquipmentFormProps> = ({
  massUnit,
  profiles,
}) => {
  const { recipe, modalId, openModal, closeModal } = useRecipe();
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
    defaultValues: recipe as any,
    resolver: async (data, context, options) => {
      //console.log({ data, context, options });
      const r = await zodResolver(equipmentSchema)(data, context, options);
      return r;
    },

    //resolver: zodResolver(equipmentSchema, {

    //}),
  });
  const onSubmit = async (data: FormData) => {
    const valid = await trigger();
    if (!valid) return;
    updateRecipe(data);
    closeModal();
  };
  const options = profiles.reduce((acc, profile) => {
    acc[profile.id] = `${profile.name}`;
    return acc;
  }, {} as Record<string, string>);
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const { name, value } = e.currentTarget;
    const profile = profiles.find((p) => p.id === parseInt(value));
    reset({ ...profile, id: recipe?.id });
  };
  return (
    <Form action={onSubmit}>
      <div className="m-2 grid gap-0 md:gap-2 items-center grid-cols-1 md:grid-cols-2">
        <input type="hidden" {...register("id")} />
        <Select
          className="md:col-span-2"
          label="Equipment Profile"
          {...register("equipmentProfileId")}
          onChange={handleChange}
          options={options}
        />

        <NumberField step={1} {...register("boilTime")} />
        <NumberField step={0.01} {...register("batchVolume")} />
        <NumberField step={0.01} {...register("mashEfficiency")} />
        <NumberField step={0.01} {...register("brewEfficiency")} />

        <Toolbar className="col-span-2 md:col-span-4">
          <Button type="submit">Save</Button>
        </Toolbar>
      </div>
    </Form>
  );
};
export default EquipmentForm;
