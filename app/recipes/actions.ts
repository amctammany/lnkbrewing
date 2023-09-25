"use server";
import { MassUnit, TimeUnit } from "@prisma/client";
import { prisma } from "@/lib/client";
import { redirect } from "next/navigation";
import { zfd } from "zod-form-data";
import { z } from "zod";
import slugify from "slugify";
import { ExtendedRecipe } from "./types";

const recipeSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  name: zfd.text(),
  description: zfd.text(z.string().optional()),
  authorEmail: zfd.text(),
  styleIdentifer: zfd.text(),
  equipmentProfileId: zfd.numeric(z.number().optional()),
  boilTime: zfd.numeric(z.number().optional()),
  batchVolume: zfd.numeric(z.number().optional()),
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

const equipmentSchema = zfd.formData({
  id: zfd.numeric(z.number()),
  equipmentProfileId: zfd.numeric(z.number().optional()),
  boilTime: zfd.numeric(z.number().optional()),
  batchVolume: zfd.numeric(z.number().optional()),
  boilVolume: zfd.numeric(z.number().optional()),
});

export async function updateRecipeEquipment(formData: FormData) {
  const data = equipmentSchema.parse(formData);
  const res = await prisma.recipe.update({
    where: {
      id: data.id,
    },
    data,
  });

  await updateRecipeVitals(res.id);
  redirect(`/recipes/${res.id}/edit`);
}

export async function updateRecipe(formData: FormData) {
  const { id, authorEmail, styleIdentifer, equipmentProfileId, ...data } =
    recipeSchema.parse(formData);
  const res = await prisma.recipe.update({
    where: {
      id,
    },
    data: {
      ...data,
      style: { connect: { identifier: styleIdentifer } },
      author: { connect: { email: authorEmail } },
      //equipment: { connect: { id: equipmentProfileId } },
      slug: slugify(data.name, { lower: true }),
    },
  });
  await updateRecipeVitals(res.id);
  redirect(`/recipes/${res.id}`);
}
export async function updateRecipeVitals(id: number) {
  console.log("updateRecipeVitals", id);
  const recipe = await prisma.recipe.findFirst({
    where: { id },
    include: {
      author: true,
      style: true,
      hops: { include: { hop: true } },
      fermentables: { include: { fermentable: true } },
      equipment: true,
    },
  });
  if (!recipe) return;
  const vitals = calculateVitals(recipe);
  console.log(vitals);
  const { author, style, equipment, hops, fermentables, ...data } = recipe;
  return prisma.recipe.update({
    where: {
      id,
    },
    data: {
      ...data,
      ...vitals,
    },
  });
}

export async function createRecipe(formData: FormData) {
  const { id, equipmentProfileId, authorEmail, styleIdentifer, ...data } =
    recipeSchema.parse(formData);

  const res = await prisma.recipe.create({
    data: {
      ...data,
      equipment: { connect: { id: equipmentProfileId } },
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
const hopIngredientSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  recipeId: zfd.numeric(z.number()),
  hopId: zfd.numeric(z.number().optional().default(1078)),
  amount: zfd.numeric(z.number().min(0)),
  amountType: z.nativeEnum(MassUnit).default(MassUnit.oz),
  duration: zfd.numeric(z.number().min(0)),
  durationType: z.nativeEnum(TimeUnit).default(TimeUnit.min),
});
export async function addHopIngredientToRecipe(formData: FormData) {
  const data = hopIngredientSchema.parse(formData);
  const res = await prisma.hopIngredient.create({
    data,
  });
  await updateRecipeVitals(res.recipeId);
  redirect(`/recipes/${res.recipeId}/edit`);
}
export async function updateHopIngredient(formData: FormData) {
  const data = hopIngredientSchema.parse(formData);
  const res = await prisma.hopIngredient.update({
    where: { id: data.id },
    data,
  });
  await updateRecipeVitals(res.recipeId);
  redirect(`/recipes/${res.recipeId}/edit`);
}
const removeHopIngredientSchema = zfd.formData({
  id: zfd.numeric(),
});
export async function removeHopIngredient(formData: FormData) {
  const { id } = removeHopIngredientSchema.parse(formData);
  const res = await prisma.hopIngredient.delete({
    where: { id },
  });
  await updateRecipeVitals(res.recipeId);
  redirect(`/recipes/${res.recipeId}/edit`);
}

const fermentableIngredientSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  recipeId: zfd.numeric(z.number()),
  fermentableId: zfd.numeric(z.number().optional().default(1078)),
  amount: zfd.numeric(z.number().min(0)),
  amountType: z.nativeEnum(MassUnit).default(MassUnit.oz),
});
export async function addFermentableIngredientToRecipe(formData: FormData) {
  const data = fermentableIngredientSchema.parse(formData);
  const res = await prisma.fermentableIngredient.create({
    data,
  });
  await updateRecipeVitals(res.recipeId);
  redirect(`/recipes/${res.recipeId}/edit`);
}
export async function updateFermentableIngredient(formData: FormData) {
  const data = fermentableIngredientSchema.parse(formData);
  const res = await prisma.fermentableIngredient.update({
    where: { id: data.id },
    data,
  });
  await updateRecipeVitals(res.recipeId);
  redirect(`/recipes/${res.recipeId}/edit`);
}
export interface RecipeVitalType {
  abv: number;
  og: number;
  fg: number;
  srm: number;
  ibu: number;
}
function calculateVitals(src: ExtendedRecipe) {
  console.log(src.fermentables);
  const og =
    (src.fermentables.reduce((acc, fermentable) => {
      acc +=
        fermentable.amount *
        (((fermentable.fermentable.potential || 1) - 1) * 1000);
      return acc;
    }, 0) *
      ((src.equipment?.brewEfficiency || 1) / (src.batchVolume || 1))) /
      1000 +
    1;
  const fg = 1 + ((og - 1) * 1000 * (1 - 0.8)) / 1000;

  const srm =
    1.49 *
    src.fermentables.reduce((acc, fermentable) => {
      acc +=
        ((fermentable.fermentable.color || 1) * fermentable.amount) /
        (src.batchVolume || 1);
      return acc;
    }, 0) **
      0.6859;
  const gravity = ((src.batchVolume || 1) / (src.boilVolume || 1)) * (og - 1);
  const bigness = 1.65 * 0.000125 ** gravity;
  const boilfactor = (1 - Math.exp(-0.04 * (src.boilTime || 60))) / 4.15;
  const utilization = bigness * boilfactor * 1.1;

  const ibu = src.hops.reduce((acc, hop) => {
    acc +=
      ((hop.hop.alpha || 1) * hop.amount * utilization * 74.9) /
      (src.batchVolume || 1);
    return acc;
  }, 0);
  const abv = (100 * ((og - fg) * 1.05)) / fg / 0.79;
  return {
    og,
    srm,
    fg,
    ibu,
    abv,
  } as RecipeVitalType;
}
