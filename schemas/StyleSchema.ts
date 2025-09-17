import { $Enums } from "@prisma/client";
import z from "zod";
import { zfd } from "zod-form-data";

export const styleSchema = zfd.formData({
  id: zfd.numeric(),
  name: zfd.text(),
  identifier: zfd.text(),
  category: z.enum($Enums.StyleCategory),
  subcategoryId: zfd.numeric(),
  aroma: zfd.text(z.string().optional()),
  appearance: zfd.text(z.string().optional()),
  flavor: zfd.text(z.string().optional()),
  mouthfeel: zfd.text(z.string().optional()),
  history: zfd.text(z.string().optional()),
  ingredients: zfd.text(z.string().optional()),
  comments: zfd.text(z.string().optional()),
  comparison: zfd.text(z.string().optional()),
  examples: zfd.text(z.string().optional()),
});
export type StyleInput = z.infer<typeof styleSchema>;
