"use server";
import { UserPreferencesType } from "@/contexts/UserPreferencesContext";
import { prisma } from "@/lib/client";
import { adjustUnits } from "@/lib/Converter/adjustUnits";
import { EquipmentProfileMask } from "@/lib/Converter/Masks";
import slugify from "@/lib/slugify";
import { validateSchema } from "@/lib/validateSchema";
import { equipmentProfileSchema } from "@/schemas/ProfileSchemas";
import { UserPreferences } from "@prisma/client";
import { redirect } from "next/navigation";
export async function createEquipmentProfile(
  prefs: UserPreferencesType,
  prev: any,
  formData: FormData
) {
  const v = validateSchema(formData, equipmentProfileSchema);
  if (v.errors) return v;
  if (!v.success) {
    return Promise.resolve(v);
  }
  const adj = adjustUnits({
    src: v.data,
    prefs,
    mask: EquipmentProfileMask,
    inline: true,
    dir: false,
  });

  const res = await prisma.equipmentProfile.create({
    data: { ...adj, slug: slugify(v.data.name) },
  });
  return redirect(`/equipment/${res.slug}`);
  //  return { success: true, data: res };
}

export async function updateEquipmentProfile(
  prefs: UserPreferencesType,
  prev: any,
  formData: FormData
) {
  const v = validateSchema(formData, equipmentProfileSchema);
  if (v.errors) return v;
  if (!v.success) {
    return Promise.resolve(v);
  }
  const adj = adjustUnits({
    src: v.data,
    prefs,
    mask: EquipmentProfileMask,
    inline: true,
    dir: false,
  });

  const res = await prisma.equipmentProfile.update({
    where: {
      id: v.data.id,
    },
    data: { ...adj, slug: slugify(v.data.name) },
  });
  return redirect(`/equipment/${res.slug}`);
}
