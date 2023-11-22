"use server";
import { prisma } from "@/lib/client";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { z } from "zod";
import { zfd } from "zod-form-data";

const waterSchema = zfd.formData({
  id: zfd.numeric(),
  name: zfd.text(),
  description: zfd.text(z.string().optional()),
});
export const createWaterProfile = async (formData: FormData) => {
  const data = waterSchema.parse(formData);
  console.log(data);
  const res = await prisma.waterProfile.create({
    data: {
      ...data,
      slug: slugify(data.name, { lower: true }),
    },
  });
  redirect(`/profiles/water/${res.slug}`);
};
export const updateWaterProfile = async (formData: FormData) => {
  const data = waterSchema.parse(formData);
  const res = await prisma.waterProfile.update({
    where: { id: data.id },
    data: {
      ...data,
      slug: slugify(data.name, { lower: true }),
    },
  });
  redirect(`/profiles/water/${res.slug}`);
};
