import { MassUnit, YeastAmountType } from "@prisma/client";
export function displayAmount(
  amount: number,
  type: MassUnit | YeastAmountType
) {
  if (type === "LbOz") {
    const lb = Math.floor(amount);
    const oz = ((amount - lb) * 16).toPrecision(2);
    return `${lb} lb ${oz} oz`;
  }
  return `${amount} ${type}`;
}
