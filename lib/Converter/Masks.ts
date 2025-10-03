import {
  EquipmentProfileType,
  MashProfileType,
  MashStepType,
} from "@/types/Profile";
import { UnitMaskType } from "./adjustUnits";
import { MashProfile, MashStep } from "@prisma/client";

export const EquipmentProfileMask: UnitMaskType<Partial<EquipmentProfileType>> =
  {
    boilTime: "time",
    brewEfficiency: "percent",
    mashEfficiency: "percent",
    batchVolume: "volume",
    boilVolume: "volume",
    preboilVolume: "volume",
    trubLoss: "volume",
    mashLoss: "volume",
    fermenterLoss: "volume",
    fermenterTopOff: "volume",
  };

export const MashStepMask: UnitMaskType<Partial<MashStepType>> = {
  temperature: "temperature",
  time: "time",
  rampTime: "time",
};
export const MashProfileMask: UnitMaskType<Partial<MashProfileType>> = {
  grainTemp: "temperature",
  mashTunTemp: "temperature",
  spargeTemp: "temperature",
  steps: MashStepMask,
};
