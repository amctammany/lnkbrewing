"use server";
import { prisma } from "@/lib/client";
import slugify from "@/lib/slugify";
import { validateSchema } from "@/lib/validateSchema";
import { equipmentProfileSchema } from "@/schemas/ProfileSchemas";
import { redirect } from "next/navigation";
export async function createEquipmentProfile(prev: any, formData: FormData) {
  const v = validateSchema(formData, equipmentProfileSchema);
  if (v.errors) return v;
  if (!v.success) {
    return Promise.resolve(v);
  }
  const res = await prisma.equipmentProfile.create({
    data: { ...v.data, slug: slugify(v.data.name) },
  });
  return redirect(`/equipment/${res.slug}`);
  //  return { success: true, data: res };
}

export async function updateEquipmentProfile(prev: any, formData: FormData) {
  const v = validateSchema(formData, equipmentProfileSchema);
  if (v.errors) return v;
  if (!v.success) {
    return Promise.resolve(v);
  }
  const res = await prisma.equipmentProfile.update({
    where: {
      id: v.data.id,
    },
    data: { ...v.data, slug: slugify(v.data.name) },
  });
  return redirect(`/equipment/${res.slug}`);
}
