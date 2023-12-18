"use server";
import {
  FermentableIngredientUsage,
  HopIngredientUsage,
  IngredientUsage,
  MassUnit,
  TimeUnit,
  YeastAmountType,
} from "@prisma/client";
import { prisma } from "@/lib/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { zfd } from "zod-form-data";
import { z } from "zod";
import slugify from "slugify";
import { ExtendedRecipe } from "./types";
import { getObjectDifferences } from "@/lib/utils";
import { validateSchema } from "@/lib/validateSchema";
const removeSchema = zfd.formData({
  id: zfd.numeric(),
});

const recipeSchema = zfd.formData({
  id: zfd.numeric(z.number()),
  name: zfd.text(z.string().optional()),
  description: zfd.text(z.string().optional()),
  mashProfileId: zfd.numeric(z.number().optional()),
  waterProfileId: zfd.numeric(z.number().optional()),
  styleIdentifer: zfd.text(z.string().optional()),
  equipmentProfileId: zfd.numeric(z.number().optional()),
  boilTime: zfd.numeric(z.number().min(0).optional()),
  batchVolume: zfd.numeric(z.number().min(0).optional()),
  mashEfficiency: zfd.numeric(z.number().min(0).optional()),
  brewEfficiency: zfd.numeric(z.number().min(0).optional()),
  calcium: zfd.numeric(z.number().optional()),
  magnesium: zfd.numeric(z.number().optional()),
  sodium: zfd.numeric(z.number().optional()),
  chloride: zfd.numeric(z.number().optional()),
  sulfate: zfd.numeric(z.number().optional()),
  bicarbonate: zfd.numeric(z.number().optional()),
});
export async function removeRecipe(formData: FormData) {
  const { id } = removeSchema.parse(formData);
  const res = await prisma.recipe.delete({
    where: { id },
  });
  redirect("/recipes");
}

export async function updateRecipe(formData: FormData) {
  const {
    id,
    mashProfileId,
    waterProfileId,
    equipmentProfileId,
    styleIdentifer,
    ...data
  } = recipeSchema.parse(formData);

  const old = await prisma.recipe.findFirst({
    where: {
      id,
    },
  });
  const res = await prisma.recipe.update({
    where: {
      id,
    },
    data: {
      ...data,
      ...(data.name
        ? { name: data.name, slug: slugify(data.name, { lower: true }) }
        : {}),
      ...(mashProfileId ? { mash: { connect: { id: mashProfileId } } } : {}),
      ...(waterProfileId ? { water: { connect: { id: waterProfileId } } } : {}),
      ...(equipmentProfileId
        ? { equipment: { connect: { id: equipmentProfileId } } }
        : {}),
      ...(styleIdentifer
        ? {
            style: {
              connect: {
                identifier: styleIdentifer,
              },
            },
          }
        : {}),
    },
  });
  //console.log(getObjectDifferences(old, res));
  await updateRecipeVitals(res.id);
  //redirect(`/recipes/${res.id}/edit`);
}
export async function updateRecipeVitals(id: number) {
  const recipe = await prisma.recipe.findFirst({
    where: { id },
    include: {
      author: true,
      style: true,
      water: true,
      mash: { include: { steps: true } },
      yeasts: { include: { yeast: true } },
      hops: { include: { hop: true } },
      otherIngredients: { include: { otherIngredient: true } },
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
    otherIngredients,
    fermentables,
    batchVolume,
    boilTime,
    mashEfficiency,
    brewEfficiency,
    calcium,
    magnesium,
    sodium,
    chloride,
    sulfate,
    bicarbonate,
    id: _id,
    ...data
  } = recipe;
  revalidatePath(`/recipes/${recipe.id}/edit`);
  return prisma.recipe.update({
    where: {
      id,
    },
    data: {
      batchVolume: batchVolume ?? equipment?.batchVolume,
      boilTime: boilTime ?? equipment?.boilTime,
      mashEfficiency: mashEfficiency ?? equipment?.mashEfficiency,
      brewEfficiency: brewEfficiency ?? equipment?.brewEfficiency,
      calcium: calcium ?? water?.calcium,
      magnesium: magnesium ?? water?.magnesium,
      sodium: sodium ?? water?.sodium,
      chloride: chloride ?? water?.chloride,
      sulfate: sulfate ?? water?.sulfate,
      bicarbonate: bicarbonate ?? water?.bicarbonate,
      //...data,
      ...vitals,
    },
    include: {
      style: true,
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
  const { errors, ...data } = validateSchema(formData, yeastIngredientSchema);
  if (errors) return Promise.resolve({ errors });
  const res = await prisma.yeastIngredient.create({
    data,
  });
  return updateRecipeVitals(res.recipeId);
  //redirect(`/recipes/${res.recipeId}/edit`);
}
export async function updateYeastIngredient(formData: FormData) {
  const { errors, ...data } = validateSchema(formData, yeastIngredientSchema);
  if (errors) return Promise.resolve({ errors });

  const res = await prisma.yeastIngredient.update({
    where: { id: data.id },
    data,
  });
  return updateRecipeVitals(res.recipeId);
  //redirect(`/recipes/${res.recipeId}/edit`);
}
export async function removeYeastIngredient(formData: FormData) {
  const { id } = removeSchema.parse(formData);
  const res = await prisma.yeastIngredient.delete({
    where: { id },
  });
  return updateRecipeVitals(res.recipeId);
  //redirect(`/recipes/${res.recipeId}/edit`);
}

const otherIngredientSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  recipeId: zfd.numeric(z.number()),
  otherIngredientId: zfd.numeric(z.number()),
  amount: zfd.numeric(z.number().min(0)),
  amountType: z.nativeEnum(MassUnit).default(MassUnit.g),
  usage: z.nativeEnum(IngredientUsage).default(IngredientUsage.Boil),
});
export async function addRecipeOtherIngredientToRecipe(formData: FormData) {
  const { errors, ...data } = validateSchema(formData, otherIngredientSchema);
  if (errors) return Promise.resolve({ errors });
  const res = await prisma.recipeOtherIngredient.create({
    data,
  });
  return updateRecipeVitals(res.recipeId);
  //redirect(`/recipes/${res.recipeId}/edit`);
}
export async function updateRecipeOtherIngredient(formData: FormData) {
  const { errors, ...data } = validateSchema(formData, otherIngredientSchema);
  if (errors) return Promise.resolve({ errors });
  const res = await prisma.recipeOtherIngredient.update({
    where: { id: data.id },
    data,
  });
  return updateRecipeVitals(res.recipeId);
  //redirect(`/recipes/${res.recipeId}/edit`);
}
export async function removeRecipeOtherIngredient(formData: FormData) {
  const { id } = removeSchema.parse(formData);
  const res = await prisma.recipeOtherIngredient.delete({
    where: { id },
  });
  return updateRecipeVitals(res.recipeId);
  //redirect(`/recipes/${res.recipeId}/edit`);
}

const hopIngredientSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  recipeId: zfd.numeric(z.number()),
  hopId: zfd.numeric(z.number()),
  amount: zfd.numeric(z.number().min(0)),
  alpha: zfd.numeric(z.number().min(0).optional()),
  usage: z.nativeEnum(HopIngredientUsage).default(HopIngredientUsage.Boil),
  amountType: z.nativeEnum(MassUnit).default(MassUnit.oz),
  duration: zfd.numeric(z.number().min(0)),
  durationType: z.nativeEnum(TimeUnit).default(TimeUnit.min),
});
export async function addHopIngredientToRecipe(formData: FormData) {
  //const data = hopIngredientSchema.parse(formData);
  const { errors, ...data } = validateSchema(formData, hopIngredientSchema);
  if (errors) return Promise.resolve({ errors });
  const res = await prisma.hopIngredient.create({
    data,
  });
  return updateRecipeVitals(res.recipeId);
  //redirect(`/recipes/${res.recipeId}/edit`);
}
export async function updateHopIngredient(formData: FormData) {
  const { errors, ...data } = validateSchema(formData, hopIngredientSchema);
  //if (errors) return { errors };
  if (errors) return Promise.resolve({ errors });
  //const data = hopIngredientSchema.parse(formData);
  const res = await prisma.hopIngredient.update({
    where: { id: data.id },
    data,
  });
  return updateRecipeVitals(res.recipeId);
  //redirect(`/recipes/${res.recipeId}/edit`);
}
export async function removeHopIngredient(formData: FormData) {
  const { id } = removeSchema.parse(formData);
  const res = await prisma.hopIngredient.delete({
    where: { id },
  });
  return updateRecipeVitals(res.recipeId);
  //redirect(`/recipes/${res.recipeId}/edit`);
}

const fermentableIngredientSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  recipeId: zfd.numeric(z.number()),
  fermentableId: zfd.numeric(z.number()),
  usage: z
    .nativeEnum(FermentableIngredientUsage)
    .default(FermentableIngredientUsage.Mash),
  amount: zfd.numeric(z.number().min(0)),
  amountType: z.nativeEnum(MassUnit).default(MassUnit.oz),
});
export async function addFermentableIngredientToRecipe(formData: FormData) {
  const { errors, ...data } = validateSchema(
    formData,
    fermentableIngredientSchema
  );
  if (errors) return Promise.resolve({ errors });
  const res = await prisma.fermentableIngredient.create({
    data,
  });
  return updateRecipeVitals(res.recipeId);
  //redirect(`/recipes/${res.recipeId}/edit`);
}
export async function updateFermentableIngredient(formData: FormData) {
  const { errors, ...data } = validateSchema(
    formData,
    fermentableIngredientSchema
  );
  if (errors) return Promise.resolve({ errors });
  const res = await prisma.fermentableIngredient.update({
    where: { id: data.id },
    data,
  });
  return updateRecipeVitals(res.recipeId);
  //redirect(`/recipes/${res.recipeId}/edit`);
}
export async function removeFermentableIngredient(formData: FormData) {
  const { id } = removeSchema.parse(formData);
  const res = await prisma.fermentableIngredient.delete({
    where: { id },
  });
  return updateRecipeVitals(res.recipeId);
  //redirect(`/recipes/${res.recipeId}/edit`);
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
  console.log(ibu);
  return {
    og,
    srm,
    fg,
    ibu,
    abv,
  } as RecipeVitalType;
}
