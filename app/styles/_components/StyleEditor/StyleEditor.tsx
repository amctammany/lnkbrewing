"use client";
import TextInput from "@/components/Form/TextInput";
import type { Style } from "@prisma/client";
import { register } from "module";
import React from "react";
import { useFormContext } from "react-hook-form";
export type StyleEditorProps = { style: Style };

export default function StyleEditor({ style }: StyleEditorProps) {
  const { control, register } = useFormContext<Style>();
  return (
    <div className="gap-2 *:p-3">
      <input type="hidden" {...register("id", { valueAsNumber: true })} />
      <input type="hidden" {...register("category")} />
      <input type="hidden" {...register("identifier")} />
      <input type="hidden" {...register("subcategoryId")} />
      <TextInput control={control} name="name" label="Name" />
      <TextInput control={control} name="overall" label="Overall" />
      <TextInput control={control} name="appearance" label="Appearance" />
      <TextInput control={control} name="aroma" label="Aroma" />
      <TextInput control={control} name="flavor" label="Flavor" />
      <TextInput control={control} name="mouthfeel" label="Mouthfeel" />
      <TextInput control={control} name="history" label="History" />
      <TextInput control={control} name="comments" label="Comments" />
      <TextInput control={control} name="ingredients" label="Ingredients" />
      <TextInput control={control} name="comparison" label="Comparison" />
      <TextInput control={control} name="examples" label="Examples" />
    </div>
  );
}
