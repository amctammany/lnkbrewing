"use client";

import { UnitDict, UnitTypes, UnitNames } from "@/lib/Converter/UnitDict";
import React, { use } from "react";
import { Converter } from "@/lib/Converter/Converter";
import { Prop, PropProps } from "./Prop";

export type ClientAmountPropProps = Omit<PropProps, "unit"> & {
  label?: string | React.ReactNode;
  value: number;
  prefs: Promise<Record<UnitTypes, UnitNames> | null>;
  unit: UnitNames;
};
export default function ClientAmountProp({
  label,
  prefs,
  value,
  unit,
  ...props
}: ClientAmountPropProps) {
  const refs = use(prefs);
  const Prefs = refs ?? ({} as any);
  const userUnit = Prefs[UnitDict[unit]];
  const result = Converter(value, unit, userUnit);
  return <Prop label={label} value={result} unit={userUnit} {...props} />;
}
