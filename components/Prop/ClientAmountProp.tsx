"use client";

import { UnitDict, UnitTypes, UnitNames } from "@/lib/Converter/UnitDict";
import React, { use } from "react";
import { Converter } from "@/lib/Converter/Converter";
import { Prop, PropProps } from "./Prop";
import { precisionRound } from "@/lib/utils";
import { UserPreferencesType } from "@/contexts/UserPreferencesContext";

export type ClientAmountPropProps = Omit<PropProps, "unit"> & {
  label?: string | React.ReactNode;
  value: number;
  precision?: number;
  prefs: Promise<UserPreferencesType | null>;
  unit: UnitNames;
};
export default function ClientAmountProp({
  label,
  precision = 1,
  prefs,
  value,
  unit,
  ...props
}: ClientAmountPropProps) {
  const refs = use(prefs);
  const Prefs = refs ?? ({} as any);
  const userUnit = Prefs[UnitDict[unit]];
  const result = precisionRound(Converter(value, unit, userUnit), precision);
  return <Prop label={label} value={result} unit={userUnit} {...props} />;
}
