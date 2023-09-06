import { prisma } from "@/lib/client";
import { z } from "zod";
import { zfd } from "zod-form-data";

const schema = zfd.formData({
  id: zfd.numeric(),
  name: zfd.text(),
  description: zfd.text(z.string().optional()),
});

export const updateHop = async (formData: FormData) => {
  const data = schema.parse(formData);
  await prisma.hop.update({
    where: { id: data.id },
    data,
  });
};
