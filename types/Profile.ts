import { WaterProfile } from "@prisma/client";
import { BaseUser } from "./User";
import { OptionalNullable } from "@/lib/utils";

export interface WaterProfileType extends WaterProfile {
  author?: BaseUser;
}
export type BaseWaterProfile = Omit<OptionalNullable<WaterProfile>, "id">;
