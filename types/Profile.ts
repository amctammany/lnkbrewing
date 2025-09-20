import {
  EquipmentProfile,
  MashProfile,
  MashStep,
  WaterProfile,
} from "@prisma/client";
import { BaseUser } from "./User";
import { OptionalNullable } from "@/lib/utils";
export interface MashProfileType extends BaseMashProfile {
  owner?: BaseUser;
  origin?: BaseMashProfile;
  steps: MashStep[];
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
export type BaseEquipmentProfile = Omit<
  OptionalNullable<EquipmentProfile>,
  "id"
> & {
  id?: string;
};
