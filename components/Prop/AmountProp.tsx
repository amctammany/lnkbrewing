import {
  MassUnit,
  UserGravityPreference,
  UserMassPreference,
  UserPressurePreference,
  UserTemperaturePreference,
  UserVolumePreference,
} from "@prisma/client";
import React, { Suspense } from "react";
import { Prop, PropProps } from "./Prop";
import { getPreferences, getUserPreferences } from "@/app/admin/queries";
import ClientAmountProp from "./ClientAmountProp";
import { precisionRound } from "@/lib/utils";
export type AmountPropProps = PropProps & {
  value?: number;
  precision?: number;
  unit:
    | MassUnit
    | UserPressurePreference
    | UserGravityPreference
    | UserVolumePreference
    | UserTemperaturePreference
    | UserMassPreference;
};
export function AmountProp({
  value,
  precision = 1,
  unit,
  ...props
}: AmountPropProps) {
  const prefs = getPreferences();
  const val = precisionRound(value ?? 0, precision);
  return (
    <Suspense fallback={<Prop value={val} unit={unit} {...props} />}>
      <ClientAmountProp
        unit={unit}
        value={val}
        prefs={prefs as any}
        {...props}
      />
    </Suspense>
  );
}
