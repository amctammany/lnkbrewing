"use server";
import { prisma } from "@/lib/client";
import slugify from "@/lib/slugify";
import { validateSchema } from "@/lib/validateSchema";
import { redirect } from "next/navigation";
import z from "zod";
import { zfd } from "zod-form-data";

const waterProfileSchema = zfd.formData({
  //userId: zfd.text(),
  id: zfd.numeric(z.number().optional()),
  userId: zfd.text(z.string().optional()),
  name: zfd.text(),
  description: zfd.text(),

  calcium: zfd.numeric(z.number().min(0)),
  magnesium: zfd.numeric(z.number().min(0)),
  sodium: zfd.numeric(z.number().min(0)),
  sulfate: zfd.numeric(z.number().min(0)),
  chloride: zfd.numeric(z.number().min(0)),
  bicarbonate: zfd.numeric(z.number().min(0)),
});
export async function createWaterProfile(prev: any, formData: FormData) {
  const v = validateSchema(formData, waterProfileSchema);
  console.log(v);
  if (v.errors) return v;
  if (!v.success) {
    return Promise.resolve(v);
  }
  console.log(v);
  const res = await prisma.waterProfile.create({
    data: { ...v.data, slug: slugify(v.data.name) },
  });
  return redirect(`/profiles/water/${res.slug}`);
  //  return { success: true, data: res };
}

export async function updateWaterProfile(prev: any, formData: FormData) {
  const v = validateSchema(formData, waterProfileSchema);
  console.log(v);
  if (v.errors) return v;
  if (!v.success) {
    return Promise.resolve(v);
  }
  console.log(v);
  const res = await prisma.waterProfile.update({
    where: {
      id: v.data.id,
    },
    data: { ...v.data, slug: slugify(v.data.name) },
  });
  return redirect(`/profiles/water/${res.slug}`);
}
