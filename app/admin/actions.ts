"use server";
import { prisma } from "@/lib/client";
import { redirect } from "next/navigation";
import { zfd } from "zod-form-data";
import { z } from "zod";
import {
  UserGravityPreference,
  UserMassPreference,
  UserTemperaturePreference,
  UserVolumePreference,
} from "@prisma/client";
import { validateSchema } from "@/lib/validateSchema";

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
  return redirect("/admin");
}
const preferenceSchema = zfd.formData({
  userId: zfd.text(),
  volumeUnit: zfd.text(z.nativeEnum(UserVolumePreference)),
  hopMassUnit: zfd.text(z.nativeEnum(UserMassPreference)),
  fermentableMassUnit: zfd.text(z.nativeEnum(UserMassPreference)),
  gravityUnit: zfd.text(z.nativeEnum(UserGravityPreference)),
  temperatureUnit: zfd.text(z.nativeEnum(UserTemperaturePreference)),
  equipmentProfileId: zfd.numeric(z.number()),
  mashProfileId: zfd.numeric(z.number().optional()),
  sourceWaterProfileId: zfd.numeric(z.number().optional()),
  targetWaterProfileId: zfd.numeric(z.number().optional()),
});
export async function updateUserPreferences(formData: FormData) {
  //const r = preferenceSchema.parse(formData);
  const { errors, userId, ...data } = validateSchema(
    formData,
    preferenceSchema
  );
  if (errors && errors.length) {
    //console.log(errors);
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
  return redirect("/admin");
}
