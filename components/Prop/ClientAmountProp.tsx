"use client";

import { UserType } from "@/app/admin/_components/Settings/SettingsForm";
import { UnitDict, UnitTypes, UnitNames } from "@/lib/Converter/UnitDict";
import React, { use } from "react";
import AmountProp from "./AmountProp";
import { useSession } from "next-auth/react";
import { Converter } from "@/lib/Converter/Converter";

export type ClientAmountPropProps = {
  label?: string | React.ReactNode;
  user?: UserType;
  value: number;
  prefs: Promise<Record<UnitTypes, UnitNames> | null>;
  unit: UnitNames;
};
export default function ClientAmountProp({
  label,
  user,
  prefs,
  value,
  unit,
}: ClientAmountPropProps) {
  const refs = use(prefs);
  const Prefs = refs ?? ({} as any);
  const userUnit = Prefs[UnitDict[unit]];
  console.log(Prefs, UnitDict[unit], userUnit);
  const result = Converter(value, unit, userUnit);
  console.log({ value, unit, result, userUnit });
  return <AmountProp label={label} value={value} unit={unit} />;
}
