"use server";
import { prisma } from "@/lib/client";
import { redirect } from "next/navigation";
import { zfd } from "zod-form-data";
import { ZodEffects, ZodSchema, ZodType, ZodTypeAny, z } from "zod";
import {
  UserGravityPreference,
  UserMassPreference,
  UserTemperaturePreference,
  UserVolumePreference,
} from "@prisma/client";

const schema = zfd.formData({
  id: zfd.text(),
  name: zfd.text(),
});
export async function updateUser(formData: FormData) {
  const data = schema.parse(formData);
  const res = await prisma.user.update({
    where: {
      id: data.id,
    },
    data,
  });
  redirect("/admin");
}
const preferenceSchema = zfd.formData({
  userId: zfd.text(),
  volumeUnit: zfd.text(z.nativeEnum(UserMassPreference)),
  hopMassUnit: zfd.text(z.nativeEnum(UserMassPreference)),
  fermentableMassUnit: zfd.text(z.nativeEnum(UserMassPreference)),
  gravityUnit: zfd.text(z.nativeEnum(UserGravityPreference)),
  temperatureUnit: zfd.text(z.nativeEnum(UserTemperaturePreference)),
  equipmentProfileId: zfd.numeric(z.number().optional()),
  mashProfileId: zfd.numeric(z.number().optional()),
  sourceWaterProfileId: zfd.numeric(z.number().optional()),
  targetWaterProfileId: zfd.numeric(z.number().optional()),
});
function validate<
  T extends ZodSchema
  //S extends any //<T> = ZodEffects<T>
>(formData: FormData, schema: T) {
  try {
    const data = schema.parse(formData);
    return data;
  } catch (e: any) {
    return {
      errors: e.errors?.map((err: any) => ({
        ...err,
        path: err.path.join("."),
      })),
    };
  }
}
export async function updateUserPreferences(formData: FormData) {
  //const r = preferenceSchema.parse(formData);
  const { errors, userId, ...data } = validate(formData, preferenceSchema);
  if (errors && errors.length) {
    console.log(errors);
    return { errors };
  }
  const update = {
    ...data,
  };
  const res = await prisma.userPreferences.upsert({
    where: {
      userId,
    },
    update,
    create: {
      ...update,
      userId,
    },
  });
  redirect("/admin");
}
