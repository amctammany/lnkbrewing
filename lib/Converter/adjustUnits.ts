import { UserPreferencesType } from "@/contexts/UserPreferencesContext";
import { BASE_UNITS, UnitNames, UnitTypes } from "./UnitDict";
import { FieldValues } from "react-hook-form";
import { converters } from "./Converter";

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
  return newValue;
}
export function adjustUnits<T extends FieldValues>(
  src: T,
  mask: Partial<Record<keyof T, UnitTypes>>,
  prefs: UserPreferencesType
) {
  console.log({ src, mask, prefs });
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
  console.log(s);
  return s;
}
