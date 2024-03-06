import React from "react";
import { MassUnit, YeastAmountType } from "@prisma/client";
function displayAmount(amount: number, type: MassUnit | YeastAmountType) {
  if (type === "LbOz") {
    const lb = Math.floor(amount);
    const oz = ((amount - lb) * 16).toFixed(2);
    return `${lb} lb ${parseFloat(oz).toFixed(2)} oz`;
  }
  return `${amount} ${type}`;
}

export type AmountProps = {
  amount?: number;
  type: MassUnit | YeastAmountType;
};
export function Amount({ amount, type }: AmountProps) {
  return <div>{displayAmount(amount ?? 0, type)}</div>;
}
