import {
  MassUnit,
  User,
  UserGravityPreference,
  UserMassPreference,
  UserPressurePreference,
  UserVolumePreference,
} from "@prisma/client";

export type BaseUser = Pick<User, "id" | "name" | "role" | "username">;
