"use server";
import { YeastFlocculation, YeastForm, YeastType } from "@prisma/client";
import { prisma } from "@/lib/client";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zfd } from "zod-form-data";

const schema = zfd.formData({
  id: zfd.numeric(),
  name: zfd.text(),
  description: zfd.text(z.string().optional()),
  manufacturer: zfd.text(z.string().optional()),
  type: z.nativeEnum(YeastType).optional().default(YeastType.Ale),
  flocculation: z.nativeEnum(YeastFlocculation).optional(),
  form: z.nativeEnum(YeastForm).optional(),
  attenuation: zfd.numeric(z.number().min(0).max(1).optional()),
  tempLow: zfd.numeric(z.number().optional()),
  tempHigh: zfd.numeric(z.number().optional()),
  usage: zfd.text(z.string().optional()),
  notes: zfd.text(z.string().optional()),
});

export const updateYeast = async (formData: FormData) => {
  const data = schema.parse(formData);
  const res = await prisma.yeast.update({
    where: { id: data.id },
    data,
  });
  redirect(`/ingredients/yeasts/${res.slug}`);
};
