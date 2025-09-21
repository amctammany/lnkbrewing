import { User } from "@prisma/client";

export type BaseUser = Pick<User, "id" | "name" | "role" | "username">;

export type Good =
  | MassUnit
  | UserPressurePreference
  | UserGravityPreference
  | UserVolumePreference
  | UserMassPreference;
