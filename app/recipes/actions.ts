"use server";
import { MassUnit, TimeUnit } from "@prisma/client";
import { prisma } from "@/lib/client";
import { redirect } from "next/navigation";
import { zfd } from "zod-form-data";
import { z } from "zod";

const schema = zfd.formData({
  id: zfd.numeric(),
  name: zfd.text(),
  description: zfd.text(z.string().optional()),
  styleIdentifer: zfd.text(z.string().optional()),
  fermentables: z
    .object({
      //recipeId: zfd.numeric(z.number()),
      fermentableId: zfd.numeric(z.number().optional().default(1078)),
      amount: zfd.numeric(z.number().min(0)),
      amountType: z.nativeEnum(MassUnit).default(MassUnit.oz),
    })
    .array(),

  hops: z
    .object({
      //recipeId: zfd.numeric(z.number()),
      hopId: zfd.numeric(z.number().optional().default(1078)),
      amount: zfd.numeric(z.number().min(0)),
      amountType: z.nativeEnum(MassUnit).default(MassUnit.oz),
      duration: zfd.numeric(z.number().min(0)),
      durationType: z.nativeEnum(TimeUnit).default(TimeUnit.min),
      //amountType: z.enum(["kg", "g", "oz", "lb"]).default("kg"),
    })
    .array(),
});
export async function updateRecipe(formData: FormData) {
  const data = schema.parse(formData);
  const res = await prisma.recipe.update({
    where: {
      id: data.id,
    },
    data: {
      ...data,
      fermentables: {
        deleteMany: {},
        createMany: { data: data.fermentables },
      },
      hops: {
        deleteMany: {},
        createMany: { data: data.hops },
      },
    },
  });
  redirect(`/recipes/${res.id}`);
}
