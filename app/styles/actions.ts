"use server";
import { prisma } from "@/lib/client";
import { redirect } from "next/navigation";
import slugify from "@/lib/slugify";
import { styleSchema } from "@/schemas/StyleSchema";

export async function updateStyle(formData: FormData) {
  const data = styleSchema.parse(formData);
  const res = await prisma.style.update({
    where: {
      id: data.id,
    },
    data: { ...data, slug: slugify(data.identifier) },
  });
  redirect(`/styles/${res.slug}`);
}
export const createStyle = async (formData: FormData) => {
  const data = styleSchema.parse(formData);
  const res = await prisma.style.create({
    data: { ...data, slug: slugify(data.identifier) },
  });
  redirect(`/styles/${res.slug}`);
};
