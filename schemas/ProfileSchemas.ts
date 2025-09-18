import z from "zod";
import { zfd } from "zod-form-data";

export const equipmentProfileSchema = zfd.formData({
  //userId: zfd.text(),
  id: zfd.text(z.string().optional()),
  forkedFrom: zfd.text(z.string().optional()),
  userId: zfd.text(z.string().optional()),
  name: zfd.text(),
  description: zfd.text(),
  brewEfficiency: zfd.numeric(z.number().min(0)),
  mashEfficiency: zfd.numeric(z.number().min(0)),
  batchVolume: zfd.numeric(z.number().min(0)),
  boilTime: zfd.numeric(z.number().min(0).default(60)),
  boilVolume: zfd.numeric(z.number().min(0).optional()),
  preboilVolume: zfd.numeric(z.number().min(0).optional()),
  boilOffRate: zfd.numeric(z.number().min(0).default(5)),
  trubLoss: zfd.numeric(z.number().min(0).default(0)),
  mashLoss: zfd.numeric(z.number().min(0).default(0)),
  fermenterLoss: zfd.numeric(z.number().min(0).default(0)),
  grainAbsorption: zfd.numeric(z.number().min(0).default(1)),
  waterGrainRatio: zfd.numeric(z.number().min(0).default(1)),
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
