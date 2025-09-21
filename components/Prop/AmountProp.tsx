import {
  MassUnit,
  UserGravityPreference,
  UserMassPreference,
  UserPressurePreference,
  UserVolumePreference,
} from "@prisma/client";
import React, { Suspense } from "react";
import { Prop, PropProps } from "./Prop";
import { getPreferences, getUserPreferences } from "@/app/admin/queries";
import ClientAmountProp from "./ClientAmountProp";
export type AmountPropProps = PropProps & {
  value: number;
  unit:
    | MassUnit
    | UserPressurePreference
    | UserGravityPreference
    | UserVolumePreference
    | UserMassPreference;
};
export default function AmountProp({ value, unit, ...props }: AmountPropProps) {
  return <Prop value={value} unit={unit} {...props} />;
}
export function Amount({ value, unit, ...props }: AmountPropProps) {
  const prefs = getPreferences();
  if (!prefs) return;
  return (
    <Suspense fallback={<Prop value={value} unit={unit} {...props} />}>
      <ClientAmountProp unit={unit} value={value} prefs={prefs} />
    </Suspense>
  );
}
