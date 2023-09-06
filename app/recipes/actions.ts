"use server";
import { MassUnit } from "@prisma/client";
import { prisma } from "@/lib/client";
import { redirect } from "next/navigation";
import { zfd } from "zod-form-data";
import { z } from "zod";

const schema = zfd.formData({
  id: zfd.numeric(),
  name: zfd.text(),
  description: zfd.text(z.string().optional()),
  hops: z
    .object({
      id: zfd.numeric(z.number().optional()),
      hopId: zfd.numeric(z.number().optional().default(1078)),
      amount: zfd.numeric(z.number().min(0)),
      amountType: z.nativeEnum(MassUnit).default(MassUnit.oz),
      //amountType: z.enum(["kg", "g", "oz", "lb"]).default("kg"),
    })
    .array(),
});
export async function updateRecipe(formData: FormData) {
  const data = schema.parse(formData);
  const hops = await prisma.$transaction(
    data.hops.map(({ id, ...hop }) => {
      if (id) {
        return prisma.hopIngredient.update({
          where: { id },
          data: hop,
        });
      } else {
        return prisma.hopIngredient.create({
          data: { ...hop, recipeId: data.id },
        });
      }
    })
  );
  const res = await prisma.recipe.update({
    where: {
      id: data.id,
    },
    data: {
      ...data,
      hops: { set: hops },
    },
  });
  redirect(`/recipes/${res.id}`);
}
