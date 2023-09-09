"use server";
import { MassUnit, TimeUnit } from "@prisma/client";
import { prisma } from "@/lib/client";
import { redirect } from "next/navigation";
import { zfd } from "zod-form-data";
import { z } from "zod";
import slugify from "slugify";

const schema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  name: zfd.text(),
  description: zfd.text(z.string().optional()),
  authorEmail: zfd.text(),
  styleIdentifer: zfd.text(),
  fermentables: z
    .object({
      //recipeId: zfd.numeric(z.number()),
      fermentableId: zfd.numeric(z.number().optional().default(1078)),
      amount: zfd.numeric(z.number().min(0)),
      amountType: z.nativeEnum(MassUnit).default(MassUnit.oz),
    })
    .array()
    .optional(),
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
    .array()
    .optional(),
});
export async function updateRecipe(formData: FormData) {
  const { id, authorEmail, styleIdentifer, ...data } = schema.parse(formData);
  let res;
  if (id) {
    res = await prisma.recipe.update({
      where: {
        id,
      },
      data: {
        ...data,
        fermentables: {
          deleteMany: {},
          createMany: { data: data.fermentables || [] },
        },
        hops: {
          deleteMany: {},
          createMany: { data: data.hops || [] },
        },
      },
    });
  } else {
    res = await prisma.recipe.create({
      data: {
        ...data,
        style: { connect: { identifier: styleIdentifer } },
        author: {
          connect: {
            email: authorEmail,
          },
        },

        slug: slugify(data.name, { lower: true }),
        fermentables: { createMany: { data: data.fermentables || [] } },
        hops: { createMany: { data: data.hops || [] } },
      },
    });
  }
  redirect(`/recipes/${res.id}`);
}
