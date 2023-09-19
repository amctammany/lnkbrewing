"use server";
import { prisma } from "@/lib/client";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zfd } from "zod-form-data";

const schema = zfd.formData({
  id: zfd.numeric(),
  name: zfd.text(),
  description: zfd.text(z.string().optional()),
  boilTime: zfd.numeric(z.number().min(0).optional()),
  batchVolume: zfd.numeric(z.number().min(0).optional()),
  boilOffRate: zfd.numeric(z.number().min(0).optional()),
  trubLoss: zfd.numeric(z.number().min(0).optional()),
  mashLoss: zfd.numeric(z.number().min(0).optional()),
  fermenterLoss: zfd.numeric(z.number().min(0).optional()),
  brewEfficiency: zfd.numeric(z.number().min(0).optional()),
  mashEfficiency: zfd.numeric(z.number().min(0).optional()),
});

export const updateEquipmentProfile = async (formData: FormData) => {
  const data = schema.parse(formData);
  const res = await prisma.equipmentProfile.update({
    where: { id: data.id },
    data,
  });
  redirect(`/profiles/equipment/${res.slug}`);
};
