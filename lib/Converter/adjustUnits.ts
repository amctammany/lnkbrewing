import { UserPreferencesType } from "@/contexts/UserPreferencesContext";
import { BASE_UNITS, UnitNames, UnitTypes } from "./UnitDict";
import { FieldValues } from "react-hook-form";
import { converters } from "./Converter";
export type UnitMaskType<T> = {
  [K in keyof T]: UnitTypes | undefined;
};
export type UnitMask<T> = {
  [K in keyof T]?: UnitNames | undefined;
};

export type UnitValues<
  T extends FieldValues,
  Q extends Partial<Record<keyof T, UnitNames>>
> = {
  [P in keyof T]: Q[P] extends UnitNames ? UnitValue : T[P];
};

export type UnitValue = {
  value: any;
  unit: UnitNames;
};
function convertUnit({
  value,
  type,
  unit,
}: {
  value: any;
  type: UnitTypes;
  unit: UnitNames;
}) {
  const convert = converters[type];
  if (!convert) throw new Error("Converter not available");
  const baseValue = convert[unit].from(value);
  const newValue = convert[unit].to(value);
  return { value: newValue, unit } as UnitValue;
}
export function getUnits<T extends FieldValues>(
  src: T,
  mask: Partial<Record<keyof T, UnitTypes>>,
  prefs: UserPreferencesType
) {
  return Object.keys(src).reduce((acc, k) => {
    if (mask[k]) acc[k] = prefs[mask[k]] ?? BASE_UNITS[mask[k]];
    return acc;
  }, {} as any);
}
export function adjustUnits<T extends FieldValues>(
  src: T,
  mask: Partial<Record<keyof T, UnitTypes>>,
  prefs: UserPreferencesType
) {
  const s = Object.entries(src).reduce((acc, [k, v]) => {
    acc[k] = mask[k]
      ? convertUnit({
          value: v,
          type: mask[k],
          unit: prefs[mask[k]] ?? BASE_UNITS[mask[k]],
        })
      : v;
    return acc;
  }, {} as any);
  return s;
}
