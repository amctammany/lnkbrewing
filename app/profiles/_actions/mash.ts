"use server";
import { prisma } from "@/lib/client";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { z } from "zod";
import { zfd } from "zod-form-data";

const mashSchema = zfd.formData({
  id: zfd.numeric(),
  name: zfd.text(),
  description: zfd.text(z.string().optional()),
});
export const createMashProfile = async (formData: FormData) => {
  const data = mashSchema.parse(formData);
  const res = await prisma.mashProfile.create({
    data: {
      ...data,
      slug: slugify(data.name, { lower: true }),
    },
  });
  redirect(`/profiles/mash/${res.slug}`);
};
export const updateMashProfile = async (formData: FormData) => {
  const data = mashSchema.parse(formData);
  const res = await prisma.mashProfile.update({
    where: { id: data.id },
    data: { ...data, slug: slugify(data.name, { lower: true }) },
  });
  redirect(`/profiles/mash/${res.slug}`);
};
