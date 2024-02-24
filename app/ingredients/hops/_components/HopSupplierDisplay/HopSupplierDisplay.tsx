import React from "react";
import { HopSupplier } from "@prisma/client";
import Link from "next/link";
export type HopSupplierDisplayProps = {
  supplier: HopSupplier | null;
};
export function HopSupplierDisplay({ supplier }: HopSupplierDisplayProps) {
  return (
    <div key={supplier?.id}>
      <Link href={`/ingredients/hops/suppliers/${supplier?.slug}/edit`}>
        edit
      </Link>
      <h4>{supplier?.name}</h4>
    </div>
  );
}
export default HopSupplierDisplay;
