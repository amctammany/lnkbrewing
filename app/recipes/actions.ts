"use server";
import {
  FermentableIngredientUsage,
  HopIngredientUsage,
  MassUnit,
  TimeUnit,
  YeastAmountType,
} from "@prisma/client";
import { prisma } from "@/lib/client";
import { redirect } from "next/navigation";
import { zfd } from "zod-form-data";
import { z } from "zod";
import slugify from "slugify";
import { ExtendedRecipe } from "./types";
/**
const recipeSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  name: zfd.text(),
  description: zfd.text(z.string().optional()),
  authorEmail: zfd.text(z.string().optional()),
  styleIdentifer: zfd.text(z.string().optional()),
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

      slug: slugify(data.name || "", { lower: true }),
      //fermentables: { createMany: { data: data.fermentables || [] } },
      //hops: { createMany: { data: data.hops || [] } },
    },
  });
  redirect(`/recipes/${res.id}`);
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
      slug: slugify(data.name || "", { lower: true }),
    },
  });
  await updateRecipeVitals(res.id);
  redirect(`/recipes/${res.id}`);
}
**/
const recipeSchema = zfd.formData({
  id: zfd.numeric(z.number()),
  name: zfd.text(z.string().optional()),
  description: zfd.text(z.string().optional()),
  mashProfileId: zfd.numeric(z.number().optional()),
  waterProfileId: zfd.numeric(z.number().optional()),
  styleIdentifer: zfd.text(z.string().optional()),
  equipmentProfileId: zfd.numeric(z.number().optional()),
  boilTime: zfd.numeric(z.number().optional()),
  batchVolume: zfd.numeric(z.number().optional()),
  calcium: zfd.numeric(z.number().optional()),
  magnesium: zfd.numeric(z.number().optional()),
  sodium: zfd.numeric(z.number().optional()),
  chloride: zfd.numeric(z.number().optional()),
  sulfate: zfd.numeric(z.number().optional()),
  bicarbonate: zfd.numeric(z.number().optional()),
});
//export async function changeRecipeWaterProfile({
//id,
//waterProfileId,
//}: {
//id: number;
//waterProfileId: number;
//}) {
//const res = await prisma.recipe.update({
//where: { id },
//data: {
//waterProfileId,
//},
//});
//redirect(`/recipes/${res.id}/edit/?mash=1`);
//}

//export async function changeRecipeMashProfile({
//recipeId,
//mashProfileId,
//}: {
//recipeId: number;
//mashProfileId: number;
//}) {
//const res = await prisma.recipe.update({
//where: { id: recipeId },
//data: {
//mashProfileId,
////boilTime,
////batchVolume,
////preboilVolume,
//},
//});
//redirect(`/recipes/${res.id}/edit/?mash=1`);
//}
function getObjectDifferences(obj1: any, obj2: any): any {
  if (obj1 === null || obj2 === null) {
    return obj1 !== obj2 ? [obj1, obj2] : undefined;
  }
  if (typeof obj1 !== "object" || typeof obj2 !== "object") {
    return obj1 !== obj2 ? [obj1, obj2] : undefined;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const uniqueKeys = new Set([...keys1, ...keys2]);

  const differences: any = {};
  for (const key of uniqueKeys.keys()) {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (typeof value1 === "object" && typeof value2 === "object") {
      const nestedDifferences = getObjectDifferences(value1, value2);
      if (nestedDifferences) {
        differences[key] = nestedDifferences;
      }
    } else if (value1 !== value2) {
      differences[key] = [value1, value2];
    }
  }

  return Object.keys(differences).length === 0 ? undefined : differences;
}
export async function updateRecipe(formData: FormData) {
  const { id, styleIdentifer, ...data } = recipeSchema.parse(formData);

  const old = await prisma.recipe.findFirst({
    where: {
      id,
    },
  });
  const res = await prisma.recipe.update({
    where: {
      id,
    },
    data,
  });
  //console.log(old, res);
  console.log(getObjectDifferences(old, res));
  await updateRecipeVitals(res.id);
  redirect(`/recipes/${res.id}/edit`);
}

const recipeStyleSchema = zfd.formData({
  id: zfd.numeric(z.number()),
  styleIdentifer: zfd.text(),
});
export async function updateRecipeStyle(formData: FormData) {
  const { id, styleIdentifer } = recipeStyleSchema.parse(formData);
  const res = await prisma.recipe.update({
    where: {
      id,
    },
    data: {
      style: {
        connect: { identifier: styleIdentifer },
      },
    },
  });
  redirect(`/recipes/${res.id}/edit`);
}
export async function updateRecipeVitals(id: number) {
  const recipe = await prisma.recipe.findFirst({
    where: { id },
    include: {
      author: true,
      style: true,
      water: true,
      mash: true,
      yeasts: { include: { yeast: true } },
      hops: { include: { hop: true } },
      fermentables: { include: { fermentable: true } },
      equipment: true,
    },
  });
  if (!recipe) return;
  const vitals = calculateVitals(recipe);
  const {
    author,
    style,
    equipment,
    hops,
    water,
    mash,
    yeasts,
    fermentables,
    ...data
  } = recipe;
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

const yeastIngredientSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  recipeId: zfd.numeric(z.number()),
  yeastId: zfd.numeric(z.number()),
  attenuation: zfd.numeric(z.number().min(0)),
  amount: zfd.numeric(z.number().min(0)),
  amountType: z.nativeEnum(YeastAmountType).default(YeastAmountType.package),
});
export async function addYeastIngredientToRecipe(formData: FormData) {
  const data = yeastIngredientSchema.parse(formData);
  const res = await prisma.yeastIngredient.create({
    data,
  });
  await updateRecipeVitals(res.recipeId);
  redirect(`/recipes/${res.recipeId}/edit`);
}
export async function updateYeastIngredient(formData: FormData) {
  const data = yeastIngredientSchema.parse(formData);
  const res = await prisma.yeastIngredient.update({
    where: { id: data.id },
    data,
  });
  await updateRecipeVitals(res.recipeId);
  redirect(`/recipes/${res.recipeId}/edit`);
}
const removeSchema = zfd.formData({
  id: zfd.numeric(),
});
export async function removeYeastIngredient(formData: FormData) {
  const { id } = removeSchema.parse(formData);
  const res = await prisma.yeastIngredient.delete({
    where: { id },
  });
  await updateRecipeVitals(res.recipeId);
  redirect(`/recipes/${res.recipeId}/edit`);
}

const hopIngredientSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  recipeId: zfd.numeric(z.number()),
  hopId: zfd.numeric(z.number().optional().default(1078)),
  amount: zfd.numeric(z.number().min(0)),
  alpha: zfd.numeric(z.number().min(0).optional()),
  usage: z.nativeEnum(HopIngredientUsage).default(HopIngredientUsage.Boil),
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
export async function removeHopIngredient(formData: FormData) {
  const { id } = removeSchema.parse(formData);
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
  usage: z
    .nativeEnum(FermentableIngredientUsage)
    .default(FermentableIngredientUsage.Mash),
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
export async function removeFermentableIngredient(formData: FormData) {
  const { id } = removeSchema.parse(formData);
  const res = await prisma.fermentableIngredient.delete({
    where: { id },
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
