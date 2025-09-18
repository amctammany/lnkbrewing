"use server";
import { prisma } from "@/lib/client";
import slugify from "@/lib/slugify";
import { validateSchema } from "@/lib/validateSchema";
import { yeastSchema } from "@/schemas/IngredientSchemas";
import { redirect } from "next/navigation";

export async function createYeast(prev: any, formData: FormData) {
  const v = validateSchema(formData, yeastSchema);
  if (v.errors) return v;
  if (!v.success) {
    return Promise.resolve(v);
  }
  const res = await prisma.yeast.create({
    data: { ...v.data, slug: slugify(v.data.name) },
  });
  return redirect(`/yeasts/${res.slug}`);
  //  return { success: true, data: res };
}

export async function updateYeast(prev: any, formData: FormData) {
  const v = validateSchema(formData, yeastSchema);
  if (v.errors) return v;
  if (!v.success) {
    return Promise.resolve(v);
  }
  const res = await prisma.yeast.update({
    where: {
      id: v.data.id,
    },
    data: { ...v.data, slug: slugify(v.data.name) },
  });
  return redirect(`/yeasts/${res.slug}`);
}
