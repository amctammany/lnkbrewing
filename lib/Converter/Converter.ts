import { UnitDict, UnitNames, UnitTypes } from "./UnitDict";

const massConverter = {
  Kg: 1,
  g: 1000,
  Lb: 2.2,
  Oz: 35.2,
};

const converters: Partial<Record<UnitTypes, any>> = {
  mass: makeConverter(massConverter),
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
    console.log({ value, from, to });
    return (value / (src[from] as number)) * (src[to] as number);
  };
}
export function Converter(value: number, from: UnitNames, to: UnitNames) {
  const group = UnitDict[from];
  console.log({ to, from, group });
  if (UnitDict[to] !== group)
    throw new Error("Cannot convert between two different measurements");
  const convert = converters[group];
  const res = convert(value, from, to);
  console.log({ res });
}
