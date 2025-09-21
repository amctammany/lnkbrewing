"use client";

import { UserType } from "@/app/admin/_components/Settings/SettingsForm";
import { UnitDict, UnitTypes, UnitNames } from "@/lib/Converter/UnitDict";
import React, { use } from "react";
import AmountProp from "./AmountProp";
import { useSession } from "next-auth/react";
import { Converter } from "@/lib/Converter/Converter";
import { PropProps } from "./Prop";

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
  return <AmountProp label={label} value={result} unit={userUnit} {...props} />;
}
