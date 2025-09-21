import { MassUnit, UserTemperaturePreference } from "@prisma/client";
import { UnitDict, UnitNames, UnitTypes } from "./UnitDict";

const massConverter: Record<MassUnit, ConversionType> = {
  Kg: 1,
  g: 1000,
  Lb: [(t: number) => t * 2.2, (t: number) => t / 2.2],
  Oz: 35.2,
};

const tempConverter: Record<UserTemperaturePreference, ConversionType> = {
  C: 1,
  F: [(f: number) => (f - 32) * (5 / 9), (c: number) => c * (9 / 5) + 32],
};
const converters: Partial<Record<UnitTypes, any>> = {
  mass: makeConverter(massConverter),
  temperature: makeConverter(tempConverter),
};

export type ConversionType =
  | number
  //  | [number, number]
  | [(x: number) => number, (x: number) => number];
export type ConverterDict = Partial<Record<UnitNames, ConversionType>>;
function makeConverter(src: ConverterDict) {
  return (
    value: number,
    from: keyof ConverterDict,
    to: keyof ConverterDict
  ) => {
    if (!src.hasOwnProperty(from) || !src.hasOwnProperty(to)) throw new Error();
    const baseValue =
      typeof src[from] === "number" ? value / src[from] : src[from]?.[0](value);
    const res =
      typeof src[to] === "number"
        ? (baseValue ?? 1) * src[to]
        : src[to]?.[1](value);
    return res;
  };
}
export function Converter(value: number, from: UnitNames, to: UnitNames) {
  const group = UnitDict[from];
  if (UnitDict[to] !== group)
    throw new Error("Cannot convert between two different measurements");
  const convert = converters[group];
  if (!convert) throw new Error("Converter not available");
  return convert(value, from, to);
}
