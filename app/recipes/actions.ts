"use server";
import { MassUnit, TimeUnit } from "@prisma/client";
import { prisma } from "@/lib/client";
import { redirect } from "next/navigation";
import { zfd } from "zod-form-data";
import { z } from "zod";
import slugify from "slugify";

const recipeSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  name: zfd.text(),
  description: zfd.text(z.string().optional()),
  authorEmail: zfd.text(),
  styleIdentifer: zfd.text(),
  //fermentables: z
  //.object({
  ////recipeId: zfd.numeric(z.number()),
  //fermentableId: zfd.numeric(z.number().optional().default(1078)),
  //amount: zfd.numeric(z.number().min(0)),
  //amountType: z.nativeEnum(MassUnit).default(MassUnit.oz),
  //})
  //.array()
  //.optional(),
  //hops: z
  //.object({
  ////recipeId: zfd.numeric(z.number()),
  //hopId: zfd.numeric(z.number().optional().default(1078)),
  //amount: zfd.numeric(z.number().min(0)),
  //amountType: z.nativeEnum(MassUnit).default(MassUnit.oz),
  //duration: zfd.numeric(z.number().min(0)),
  //durationType: z.nativeEnum(TimeUnit).default(TimeUnit.min),
  ////amountType: z.enum(["kg", "g", "oz", "lb"]).default("kg"),
  //})
  //.array()
  //.optional(),
});
export async function updateRecipe(formData: FormData) {
  const { id, authorEmail, styleIdentifer, ...data } =
    recipeSchema.parse(formData);

  const res = await prisma.recipe.update({
    where: {
      id,
    },
    data,
    //data: {
    //...data,
    //fermentables: {
    //deleteMany: {},
    //createMany: { data: data.fermentables || [] },
    //},
    //hops: {
    //deleteMany: {},
    //createMany: { data: data.hops || [] },
    //},
    //},
  });
  redirect(`/recipes/${res.id}`);
}
export async function createRecipe(formData: FormData) {
  const { id, authorEmail, styleIdentifer, ...data } =
    recipeSchema.parse(formData);
  const res = await prisma.recipe.create({
    data: {
      ...data,
      style: { connect: { identifier: styleIdentifer } },
      author: {
        connect: {
          email: authorEmail,
        },
      },

      slug: slugify(data.name, { lower: true }),
      //fermentables: { createMany: { data: data.fermentables || [] } },
      //hops: { createMany: { data: data.hops || [] } },
    },
  });
  redirect(`/recipes/${res.id}`);
}
//}

const hopIngredientSchema = zfd.formData({
  recipeId: zfd.numeric(z.number()),
  hopId: zfd.numeric(z.number().optional().default(1078)),
  amount: zfd.numeric(z.number().min(0)),
  amountType: z.nativeEnum(MassUnit).default(MassUnit.oz),
  duration: zfd.numeric(z.number().min(0)),
  durationType: z.nativeEnum(TimeUnit).default(TimeUnit.min),
});
//.object({
////amountType: z.enum(["kg", "g", "oz", "lb"]).default("kg"),
//})

export async function createHopIngredient(formData: FormData) {
  const data = hopIngredientSchema.parse(formData);
  const res = await prisma.hopIngredient.create({
    data,
  });
  redirect(`/recipes/${res.recipeId}/edit`);
}
