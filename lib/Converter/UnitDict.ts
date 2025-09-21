import {
  MassUnit,
  UserPressurePreference,
  UserGravityPreference,
  UserVolumePreference,
  UserMassPreference,
  UserTemperaturePreference,
} from "@prisma/client";

export type UnitNames =
  | MassUnit
  | UserTemperaturePreference
  | UserPressurePreference
  | UserGravityPreference
  | UserVolumePreference
  | UserMassPreference;
const UNITS = {
  mass: UserMassPreference,
  temperature: UserTemperaturePreference,
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
