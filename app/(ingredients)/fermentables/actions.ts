"use server";
import { prisma } from "@/lib/client";
import slugify from "@/lib/slugify";
import { validateSchema } from "@/lib/validateSchema";
import { fermentableSchema } from "@/schemas/IngredientSchemas";
import { redirect } from "next/navigation";

export async function createFermentable(prev: any, formData: FormData) {
  const v = validateSchema(formData, fermentableSchema);
  console.log(v);
  if (v.errors) return v;
  if (!v.success) {
    return Promise.resolve(v);
  }
  const res = await prisma.fermentable.create({
    data: { ...v.data, slug: slugify(v.data.name) },
  });
  return redirect(`/fermentables/${res.slug}`);
  //  return { success: true, data: res };
}

export async function updateFermentable(prev: any, formData: FormData) {
  console.log(Object.fromEntries(formData));
  const v = validateSchema(formData, fermentableSchema);
  console.log(v);
  if (v.errors) return v;
  if (!v.success) {
    return Promise.resolve(v);
  }
  const res = await prisma.fermentable.update({
    where: {
      id: v.data.id,
    },
    data: { ...v.data, slug: slugify(v.data.name) },
  });
  return redirect(`/fermentables/${res.slug}`);
}
