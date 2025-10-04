"use server";
import { UserPreferencesType } from "@/contexts/UserPreferencesContext";
import { prisma } from "@/lib/client";
import { adjustUnits } from "@/lib/Converter/adjustUnits";
import { MashProfileMask } from "@/lib/Converter/Masks";
import slugify from "@/lib/slugify";
import { validateSchema } from "@/lib/validateSchema";
import { mashProfileSchema } from "@/schemas/ProfileSchemas";
import { MashStep } from "@prisma/client";
import { redirect } from "next/navigation";
export async function createMashProfile(prev: any, formData: FormData) {
  const v = validateSchema(formData, mashProfileSchema);
  if (v.errors) return v;
  if (!v.success) {
    return Promise.resolve(v);
  }
  const { steps, ...data } = v.data;
  const res = await prisma.mashProfile.create({
    data: { ...data, slug: slugify(v.data.name), steps: { create: steps } },
  });
  return redirect(`/mash/${res.slug}`);
  //  return { success: true, data: res };
}

export async function updateMashProfile(
  prefs: UserPreferencesType,
  prev: any,
  formData: FormData
) {
  const v = validateSchema(formData, mashProfileSchema);
  if (v.errors) return v;
  if (!v.success) {
    return Promise.resolve(v);
  }
  const adj = adjustUnits({
    src: v.data,
    prefs,
    mask: MashProfileMask,
    inline: true,
    dir: false,
  });
  const { steps, ...data } = adj;

  const stepData = await prisma.$transaction(async (tx) => {
    return Promise.all(
      (steps as MashStep[]).map(async ({ id, ...d }) => {
        return await tx.mashStep.upsert({
          where: { mashIndex: { mashProfileId: data.id!, index: d.index } },
          create: { ...d, mashProfileId: data.id! },
          update: d,
        });
      })
    );
  });
  const res = await prisma.mashProfile.update({
    where: {
      id: v.data.id,
    },
    data: {
      ...data,
      slug: slugify(v.data.name),
      steps: {
        connect: stepData.map(({ id }) => ({ id })),
        deleteMany: { index: { gt: stepData.length - 1 } },
      },
    },
  });
  return redirect(`/mash/${res.slug}`);
}
