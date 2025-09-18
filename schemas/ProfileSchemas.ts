import z from "zod";
import { zfd } from "zod-form-data";

export const equipmentProfileSchema = zfd.formData({
  //userId: zfd.text(),
  id: zfd.text(z.string().optional()),
  forkedFrom: zfd.text(z.string().optional()),
  userId: zfd.text(z.string().optional()),
  name: zfd.text(),
  description: zfd.text(),
});

export const waterProfileSchema = zfd.formData({
  //userId: zfd.text(),
  id: zfd.numeric(z.number().optional()),
  forkedFrom: zfd.numeric(z.number().optional()),
  userId: zfd.text(z.string().optional()),
  name: zfd.text(),
  description: zfd.text(),

  calcium: zfd.numeric(z.number().min(0)),
  magnesium: zfd.numeric(z.number().min(0)),
  sodium: zfd.numeric(z.number().min(0)),
  sulfate: zfd.numeric(z.number().min(0)),
  chloride: zfd.numeric(z.number().min(0)),
  bicarbonate: zfd.numeric(z.number().min(0)),
});
