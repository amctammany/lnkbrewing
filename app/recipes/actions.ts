"use server";
import { prisma } from "@/lib/client";
import { redirect } from "next/navigation";
import { zfd } from "zod-form-data";
import { z } from "zod";

const schema = zfd.formData({
  id: zfd.numeric(),
  name: zfd.text(),
  description: zfd.text(z.string().optional()),
});
export async function updateRecipe(formData: FormData) {
  const data = schema.parse(formData);
  const res = await prisma.recipe.update({
    where: {
      id: data.id,
    },
    data,
  });
  redirect(`/recipes/${res.id}`);
}
