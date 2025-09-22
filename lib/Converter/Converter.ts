import {
  MassUnit,
  UserTemperaturePreference,
  UserVolumePreference,
} from "@prisma/client";
import { UnitDict, UnitNames, UnitTypes } from "./UnitDict";

const massConverter: Record<MassUnit, ConversionType> = {
  Kg: 1,
  g: 1000,
  Lb: [(t: number) => t * 2.2, (t: number) => t / 2.2],
  Oz: 35.2,
};
const volumeConverter: Record<UserVolumePreference, ConversionType> = {
  L: 1,
  gal: 0.264172,
  bbl: 0.00852166206,
};

const tempConverter: Record<UserTemperaturePreference, ConversionType> = {
  C: 1,
  F: [(c: number) => c * (9 / 5) + 32, (f: number) => (f - 32) * (5 / 9)],
};
const converters: Partial<Record<UnitTypes, Record<UnitNames, ConverterType>>> =
  {
    mass: makeConverter(massConverter),
    temperature: makeConverter(tempConverter),
    volume: makeConverter(volumeConverter),
  };

export type ConversionType =
  | number
  //  | [number, number]
  | [(x: number) => number, (x: number) => number];
export type ConverterDict = Partial<Record<UnitNames, ConversionType>>;
function makeConvertFn(src: ConverterDict) {
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
export type ConverterType = {
  to: (v: number) => number;
  from: (v: number) => number;
};
function makeConverter(src: ConverterDict) {
  return Object.entries(src).reduce((acc, [unit, converter]) => {
    const to = Array.isArray(converter)
      ? converter[0]
      : (v: number) => v * converter;
    const from = Array.isArray(converter)
      ? converter[1]
      : (v: number) => v / converter;
    acc[unit as UnitNames] = { to, from };
    return acc;
  }, {} as Record<UnitNames, ConverterType>);
}
export function Converter(value: number, from: UnitNames, to: UnitNames) {
  const group = UnitDict[from];
  if (UnitDict[to] !== group)
    throw new Error("Cannot convert between two different measurements");
  const convert = converters[group];
  if (!convert) throw new Error("Converter not available");
  const baseValue = convert[from].from(value);
  const newValue = convert[to].to(baseValue);
  console.log({ to, from, group, value, baseValue, newValue });
  return newValue;
}
