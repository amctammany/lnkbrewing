"use server";
import { prisma } from "@/lib/client";
import slugify from "@/lib/slugify";
import { validateSchema } from "@/lib/validateSchema";
import { hopSchema } from "@/schemas/IngredientSchemas";
import { redirect } from "next/navigation";

export async function createHop(prev: any, formData: FormData) {
  const v = validateSchema(formData, hopSchema);
  console.log(v);
  if (v.errors) return v;
  if (!v.success) {
    return Promise.resolve(v);
  }
  const res = await prisma.hop.create({
    data: { ...v.data, slug: slugify(v.data.name) },
  });
  return redirect(`/hops/${res.slug}`);
  //  return { success: true, data: res };
}

export async function updateHop(prev: any, formData: FormData) {
  console.log(Object.fromEntries(formData));
  const v = validateSchema(formData, hopSchema);
  console.log(v);
  if (v.errors) return v;
  if (!v.success) {
    return Promise.resolve(v);
  }
  const res = await prisma.hop.update({
    where: {
      id: v.data.id,
    },
    data: { ...v.data, slug: slugify(v.data.name) },
  });
  return redirect(`/hops/${res.slug}`);
}
