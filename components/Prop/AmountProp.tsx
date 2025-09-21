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
export type AmountPropProps = PropProps & {
  value?: number;
  unit:
    | MassUnit
    | UserPressurePreference
    | UserGravityPreference
    | UserVolumePreference
    | UserTemperaturePreference
    | UserMassPreference;
};
export function AmountProp({ value, unit, ...props }: AmountPropProps) {
  const prefs = getPreferences();
  return (
    <Suspense fallback={<Prop value={value} unit={unit} {...props} />}>
      <ClientAmountProp
        unit={unit}
        value={value ?? 0}
        prefs={prefs}
        {...props}
      />
    </Suspense>
  );
}
