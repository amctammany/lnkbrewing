"use server";
import { prisma } from "@/lib/client";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zfd } from "zod-form-data";

const mashSchema = zfd.formData({
  id: zfd.numeric(),
  name: zfd.text(),
  description: zfd.text(z.string().optional()),
});

export const updateMashProfile = async (formData: FormData) => {
  const data = mashSchema.parse(formData);
  const res = await prisma.mashProfile.update({
    where: { id: data.id },
    data,
  });
  redirect(`/profiles/mash/${res.slug}`);
};
