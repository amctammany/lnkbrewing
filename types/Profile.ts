import { WaterProfile } from "@prisma/client";
import { BaseUser } from "./User";
import { OptionalNullable } from "@/lib/utils";

export interface WaterProfileType extends BaseWaterProfile {
  author?: BaseUser;
  origin?: BaseWaterProfile;
}
export type BaseWaterProfile = Omit<OptionalNullable<WaterProfile>, "id"> & {
  id?: number;
};
