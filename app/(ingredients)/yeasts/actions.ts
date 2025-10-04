"use server";
import { UserPreferencesType } from "@/contexts/UserPreferencesContext";
import { prisma } from "@/lib/client";
import { adjustUnits } from "@/lib/Converter/adjustUnits";
import { YeastMask } from "@/lib/Converter/Masks";
import slugify from "@/lib/slugify";
import { validateSchema } from "@/lib/validateSchema";
import { yeastSchema } from "@/schemas/IngredientSchemas";
import { redirect } from "next/navigation";

export async function createYeast(
  prefs: UserPreferencesType,
  prev: any,
  formData: FormData
) {
  const v = validateSchema(formData, yeastSchema);
  if (v.errors) return v;
  if (!v.success) {
    return Promise.resolve(v);
  }
  const adj = adjustUnits({
    src: v.data,
    prefs,
    mask: YeastMask,
    inline: true,
    dir: false,
  });
  const res = await prisma.yeast.create({
    data: { ...adj, slug: slugify(v.data.name) },
  });
  return redirect(`/yeasts/${res.slug}`);
  //  return { success: true, data: res };
}

export async function updateYeast(
  prefs: UserPreferencesType,
  prev: any,
  formData: FormData
) {
  const v = validateSchema(formData, yeastSchema);

  if (v.errors) return v;
  if (!v.success) {
    return Promise.resolve(v);
  }
  const adj = adjustUnits({
    src: v.data,
    prefs,
    mask: YeastMask,
    inline: true,
    dir: false,
  });

  const res = await prisma.yeast.update({
    where: {
      id: v.data.id,
    },
    data: { ...adj, slug: slugify(v.data.name) },
  });
  return redirect(`/yeasts/${res.slug}`);
}
