import {
  MassUnit,
  UserGravityPreference,
  UserMassPreference,
  UserPressurePreference,
  UserVolumePreference,
} from "@prisma/client";
import React from "react";
import { Prop, PropProps } from "./Prop";
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
  return (
    <Suspense fallback={<Prop value={value} unit={unit} {...props} />}>
      <ClientAmountProp unit={unit} value={value} />
    </Suspense>
  );
}
