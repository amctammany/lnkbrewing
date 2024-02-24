import React from "react";
import { HopSupplier } from "@prisma/client";
import Link from "next/link";
export type HopSupplierFormProps = {
  supplier: HopSupplier | null;
};
export function HopSupplierForm({ supplier }: HopSupplierFormProps) {
  return (
    <div key={supplier?.id}>
      <Link href={`/ingredients/hops/suppliers/${supplier?.slug}`}>
        {supplier?.name}
      </Link>
    </div>
  );
}
export default HopSupplierForm;
