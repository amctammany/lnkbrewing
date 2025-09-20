"use server";
import { prisma } from "@/lib/client";
import slugify from "@/lib/slugify";
import { validateSchema } from "@/lib/validateSchema";
import { mashProfileSchema } from "@/schemas/ProfileSchemas";
import { redirect } from "next/navigation";
export async function createMashProfile(prev: any, formData: FormData) {
  console.log(Object.fromEntries(formData));
  const v = validateSchema(formData, mashProfileSchema);
  console.log(v);
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

export async function updateMashProfile(prev: any, formData: FormData) {
  console.log(Object.fromEntries(formData));
  const v = validateSchema(formData, mashProfileSchema);
  console.log(v);
  if (v.errors) return v;
  if (!v.success) {
    return Promise.resolve(v);
  }
  const { steps, ...data } = v.data;

  const stepData = await prisma.$transaction(async (tx) => {
    return Promise.all(
      steps.map(async ({ id, ...d }) => {
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
