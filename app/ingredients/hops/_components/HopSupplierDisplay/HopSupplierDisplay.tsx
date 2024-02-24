import React from "react";
import { HopSupplier } from "@prisma/client";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { EditIcon } from "@/components/Icon/EditIcon";
import { Section } from "@/components/Section";
export type HopSupplierDisplayProps = {
  supplier: HopSupplier | null;
};
const fieldNames: (keyof HopSupplier)[] = [
  "name",
  "description",
  "address1",
  "address2",
  "phone",
];

export function HopSupplierDisplay({ supplier }: HopSupplierDisplayProps) {
  return (
    <Section
      header={`Hop Supplier: ${supplier?.name}`}
      actions={
        <ButtonLink href={`/ingredients/hops/suppliers/${supplier?.slug}/edit`}>
          <EditIcon />
        </ButtonLink>
      }
    >
      <div className="grid grid-auto grid-cols-1 md:grid-cols-2">
        <div className="m-0 p-2 shadow-lg">
          {fieldNames.map((field) => (
            <div key={field} className="m-2 p-0 ">
              <h2 key={field} className="text-lg uppercase underline">
                {field}
              </h2>
              <p className="px-2 m-1">{supplier?.[field]}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
export default HopSupplierDisplay;
