"use client";

import { UserType } from "@/app/admin/_components/Settings/SettingsForm";
import { UnitNames } from "@/types/User";
import React from "react";
import AmountProp from "./AmountProp";
import { useSession } from "next-auth/react";

export type ClientAmountPropProps = {
  label?: string | React.ReactNode;
  user?: UserType;
  value: number;
  unit: UnitNames;
};
export default function ClientAmountProp({
  label,
  user,
  value,
  unit,
}: ClientAmountPropProps) {
  const auth = useSession();
  return <AmountProp label={label} value={value} unit={unit} />;
}
