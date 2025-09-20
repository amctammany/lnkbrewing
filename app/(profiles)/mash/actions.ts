"use server";
import { prisma } from "@/lib/client";
import slugify from "@/lib/slugify";
import { validateSchema } from "@/lib/validateSchema";
import { mashProfileSchema } from "@/schemas/ProfileSchemas";
import { redirect } from "next/navigation";
export async function createMashProfile(prev: any, formData: FormData) {
  const v = validateSchema(formData, mashProfileSchema);
  console.log(v);
  if (v.errors) return v;
  if (!v.success) {
    return Promise.resolve(v);
  }
  const res = await prisma.mashProfile.create({
    data: { ...v.data, slug: slugify(v.data.name) },
  });
  return redirect(`/mash/${res.slug}`);
  //  return { success: true, data: res };
}

export async function updateMashProfile(prev: any, formData: FormData) {
  const v = validateSchema(formData, mashProfileSchema);
  console.log(v);
  if (v.errors) return v;
  if (!v.success) {
    return Promise.resolve(v);
  }
  const res = await prisma.mashProfile.update({
    where: {
      id: v.data.id,
    },
    data: { ...v.data, slug: slugify(v.data.name) },
  });
  return redirect(`/mash/${res.slug}`);
}
