import {
  EquipmentProfileType,
  MashProfileType,
  MashStepType,
} from "@/types/Profile";
import { UnitMaskType } from "./adjustUnits";
import { MashProfile, MashStep } from "@prisma/client";
import { FermentableType, YeastType } from "@/types/Ingredient";

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

export const FermentableMask: UnitMaskType<Partial<FermentableType>> = {
  protein: "percent",
  friability: "percent",
  coarseFineDiff: "percent",
  moisture: "percent",
  color: "color",
};

export const YeastMask: UnitMaskType<Partial<YeastType>> = {
  attenuation: "percent",
  attenuationLow: "percent",
  attenuationHigh: "percent",
  tempLow: "temperature",
  tempHigh: "temperature",
};
