import { UserPreferencesType } from "@/contexts/UserPreferencesContext";
import { BASE_UNITS, UnitNames, UnitTypes } from "./UnitDict";
import { FieldValues } from "react-hook-form";
import { converters } from "./Converter";
import { kMaxLength } from "buffer";
export type UnitMaskType<T> = {
  [K in keyof T]?: UnitTypes | undefined | object;
};
export type UnitMask<T> = {
  [K in keyof T]?: UnitNames | undefined | object;
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
  value: number | object;
  type: UnitTypes | object;
  unit: UnitNames;
}) {
  console.log({ value, type, unit });
  if (typeof value === "number") {
    const convert = converters[type as UnitTypes];
    if (!convert) throw new Error("Converter not available");
    const baseValue = convert[unit].from(value);
    const newValue = convert[unit].to(value);
    return { value: newValue, unit } as UnitValue;
  }
  if (Array.isArray(value))
    return value.map((val) =>
      Object.entries(type).reduce((acc, [k, v]) => {
        acc[k] = convertUnit({
          value: val[k],
          type: v,
          unit: (type as any)[k] as any,
        });
        return acc;
      }, {} as any)
    );
}
export function getUnits<T extends FieldValues>(
  src: T,
  mask: Partial<Record<keyof T, UnitTypes | object>>,
  prefs: UserPreferencesType
) {
  console.log({ src, mask, prefs });
  return Object.keys(src).reduce((acc, k) => {
    if (typeof mask[k] === "string") {
      if (mask[k]) acc[k] = prefs[mask[k]] ?? BASE_UNITS[mask[k]];
    }
    return acc;
  }, {} as any);
}
export function adjustUnits<T extends FieldValues>(
  src: T | T[],
  mask: Partial<Record<keyof T, UnitTypes | object | string>>,
  prefs: UserPreferencesType
) {
  const s = Object.entries(src).reduce((acc, [k, v]) => {
    if (Array.isArray(v)) {
      acc[k] = v.map((val) => adjustUnits(val, mask[k] as any, prefs));
    } else {
      acc[k] =
        typeof mask[k] === "string"
          ? convertUnit({
              value: v,
              type: mask[k] as UnitTypes,
              unit:
                prefs[mask[k] as UnitTypes] ?? BASE_UNITS[mask[k] as UnitTypes],
            })
          : v;
    }
    return acc;
  }, {} as any);
  return s as any;
}
type Mapped<T> = {
  [K in keyof T]?: boolean;
};

const remap = <T extends Record<string, unknown>>(obj: T) => {
  const mapped: Record<string, boolean> = {};
  Object.keys(obj).forEach((key) => {
    mapped[key] = !!key; // Type 'Mapped<T>' is generic and can only be indexed for reading.(2862)
  });

  return mapped as Mapped<T>;
};
const remapWithAs = <T extends Record<string, unknown>>(obj: T) => {
  const mapped: Record<string, boolean> = {};
  Object.keys(obj).forEach((key) => {
    mapped[key] = !!key;
  });

  return mapped as Mapped<T>; // Is this my only option?
};
export function stripUnits<T extends Record<string, unknown>>(src: T) {
  return Object.keys(src).reduce((acc, k) => {
    const v = src[k as keyof T];
    acc[k as keyof T] =
      !!v &&
      typeof v === "object" &&
      v.hasOwnProperty("value") &&
      v.hasOwnProperty("unit")
        ? (v as any).value
        : v;

    return acc;
  }, {} as T);
}
