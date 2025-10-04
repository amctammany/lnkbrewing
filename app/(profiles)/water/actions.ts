"use server";
import { prisma } from "@/lib/client";
import slugify from "@/lib/slugify";
import { validateSchema } from "@/lib/validateSchema";
import { waterProfileSchema } from "@/schemas/ProfileSchemas";
import { redirect } from "next/navigation";
export async function createWaterProfile(prev: any, formData: FormData) {
  const v = validateSchema(formData, waterProfileSchema);
  if (v.errors) return v;
  if (!v.success) {
    return Promise.resolve(v);
  }
  const res = await prisma.waterProfile.create({
    data: { ...v.data, slug: slugify(v.data.name) },
  });
  return redirect(`/water/${res.slug}`);
  //  return { success: true, data: res };
}

export async function updateWaterProfile(prev: any, formData: FormData) {
  const v = validateSchema(formData, waterProfileSchema);
  if (v.errors) return v;
  if (!v.success) {
    return Promise.resolve(v);
  }
  const res = await prisma.waterProfile.update({
    where: {
      id: v.data.id,
    },
    data: { ...v.data, slug: slugify(v.data.name) },
  });
  return redirect(`/water/${res.slug}`);
}
