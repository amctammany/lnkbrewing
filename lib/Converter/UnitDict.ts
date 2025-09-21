import {
  MassUnit,
  UserPressurePreference,
  UserGravityPreference,
  UserVolumePreference,
  UserMassPreference,
} from "@prisma/client";

export type UnitNames =
  | MassUnit
  | UserPressurePreference
  | UserGravityPreference
  | UserVolumePreference
  | UserMassPreference;
const UNITS = {
  mass: UserMassPreference,
  pressure: UserPressurePreference,
  gravity: UserGravityPreference,
  volume: UserVolumePreference,
};
export type UnitTypes = keyof typeof UNITS;
export const UnitDict = Object.entries(UNITS).reduce((acc, [k, v]) => {
  return Object.values(v).reduce((dict, unit) => {
    dict[unit] = k as UnitTypes;
    return dict;
  }, acc);
}, {} as Record<UnitNames, UnitTypes>);
