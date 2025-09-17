import { prisma } from "@/lib/client";
import slugify from "@/lib/slugify";
import { validateSchema } from "@/lib/validateSchema";
import { otherIngredientSchema } from "@/schemas/IngredientSchemas";
import { redirect } from "next/navigation";
export const createOtherIngredient = async (prev: any, formData: FormData) => {
  const v = validateSchema(formData, otherIngredientSchema);
  console.log(v);
  if (v.errors) return v;
  if (!v.success) {
    return Promise.resolve(v);
  }
  const res = await prisma.otherIngredient.create({
    data: { ...v.data, slug: slugify(v.data.name) },
  });
  return redirect(`/other/${res.slug}`);
};
export const updateOtherIngredient = async (prev: any, formData: FormData) => {
  const v = validateSchema(formData, otherIngredientSchema);
  console.log(v);
  if (v.errors) return v;
  if (!v.success) {
    return Promise.resolve(v);
  }
  const res = await prisma.otherIngredient.update({
    where: { id: v.data.id },
    data: { ...v.data, slug: slugify(v.data.name) },
  });
  return redirect(`/other/${res.slug}`);
};
