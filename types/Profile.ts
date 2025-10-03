import {
  EquipmentProfile,
  MashProfile,
  MashStep,
  WaterProfile,
} from "@prisma/client";
import { BaseUser } from "./User";
import { OptionalNullable } from "@/lib/utils";
import { UnitValue } from "@/lib/Converter/adjustUnits";
export interface MashProfileType extends BaseMashProfile {
  owner?: BaseUser;
  origin?: BaseMashProfile;
  steps: MashStepType[];
}
export interface MashStepType
  extends Omit<OptionalNullable<MashStep>, "mashProfileId" | "id"> {
  id?: number;
  mashProfileId?: string;
}
export interface WaterProfileType extends BaseWaterProfile {
  owner?: BaseUser;
  origin?: BaseWaterProfile;
}
export type BaseMashProfile = Omit<OptionalNullable<MashProfile>, "id"> & {
  id?: string;
};
export type BaseWaterProfile = Omit<OptionalNullable<WaterProfile>, "id"> & {
  id?: number;
};
export interface EquipmentProfileType extends BaseEquipmentProfile {
  owner?: BaseUser;
  origin?: BaseEquipmentProfile;
}
type AmountFields<S, N extends keyof S> = {
  [P in keyof S]: P extends N ? UnitValue : S[P];
};
type EquipmentProfileAmountFieldNames =
  | "batchVolume"
  | "trubLoss"
  | "mashLoss"
  | "fermenterLoss";
export type AdjustedEquipmentProfileType = AmountFields<
  EquipmentProfileType,
  EquipmentProfileAmountFieldNames
>;
export type BaseEquipmentProfile = Omit<
  OptionalNullable<EquipmentProfile>,
  "id"
> & {
  id?: string;
};
