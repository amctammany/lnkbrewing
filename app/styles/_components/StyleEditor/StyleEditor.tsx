"use client";
import TextInput from "@/components/Form/TextInput";
import type { Style } from "@/lib/generated/prisma/client";
import { register } from "module";
import React from "react";
import { useFormContext } from "react-hook-form";
export type StyleEditorProps = { style: Style };

export default function StyleEditor({ style }: StyleEditorProps) {
  const { control, register } = useFormContext<Style>();
  return (
    <div>
      <input type="hidden" {...register("id", { valueAsNumber: true })} />
      <input type="hidden" {...register("category")} />
      <input type="hidden" {...register("identifier")} />
      <input type="hidden" {...register("subcategoryId")} />
      <TextInput control={control} name="name" label="Name" />
      <TextInput control={control} name="overall" label="Overall" />
      <TextInput control={control} name="appearance" label="Appearance" />
      <TextInput control={control} name="aroma" label="Aroma" />
      <TextInput control={control} name="flavor" label="Flavor" />
      <TextInput control={control} name="history" label="History" />
    </div>
  );
}
