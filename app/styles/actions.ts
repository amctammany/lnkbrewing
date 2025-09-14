"use server";
import { zfd } from "zod-form-data";
import { z } from "zod";
import { prisma } from "@/lib/client";
import { redirect } from "next/navigation";
import { $Enums } from "@/lib/generated/prisma/client";
import slugify from "@/lib/slugify";

const schema = zfd.formData({
  id: zfd.numeric(),
  name: zfd.text(),
  identifier: zfd.text(),
  category: z.enum($Enums.StyleCategory),
  subcategoryId: zfd.numeric(),
  aroma: zfd.text(z.string().optional()),
  appearance: zfd.text(z.string().optional()),
  flavor: zfd.text(z.string().optional()),
  mouthfeel: zfd.text(z.string().optional()),
  history: zfd.text(z.string().optional()),
  ingredients: zfd.text(z.string().optional()),
  comments: zfd.text(z.string().optional()),
  comparison: zfd.text(z.string().optional()),
  examples: zfd.text(z.string().optional()),
});
export async function updateStyle(formData: FormData) {
  const data = schema.parse(formData);
  console.log(data);
  const res = await prisma.style.update({
    where: {
      id: data.id,
    },
    data: { ...data, slug: slugify(data.name) },
  });
  redirect(`/styles/${res.identifier}`);
}
export const createStyle = async (formData: FormData) => {
  const data = schema.parse(formData);
  const res = await prisma.style.create({
    data: { ...data, slug: slugify(data.name) },
  });
  redirect(`/styles/${res.identifier}`);
};
