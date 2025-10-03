import { EquipmentProfileType } from "@/types/Profile";
import { UnitMaskType } from "./adjustUnits";

export const EquipmentProfileMask: UnitMaskType<Partial<EquipmentProfileType>> =
  {
    batchVolume: "volume",
    boilVolume: "volume",
    preboilVolume: "volume",
    trubLoss: "volume",
    mashLoss: "volume",
    fermenterLoss: "volume",
    fermenterTopOff: "volume",
  };
