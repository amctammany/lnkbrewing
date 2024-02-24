import { Hop } from "@prisma/client";
import { Metadata } from "next";
//import { HopsTable } from "./_components/HopsTable";
import { Direction } from "@/components/Table";
import Link from "next/link";
import { getHopSuppliers } from "../queries";
export const metadata: Metadata = {
  title: "LNK Hops",
};
export default async function HopSuppliersIndex({
  searchParams,
}: {
  searchParams?: Record<string, string>;
}) {
  const suppliers = await getHopSuppliers();
  return (
    <>
      {suppliers.map((supplier) => (
        <div key={supplier.id}>
          <Link href={`/ingredients/hops/suppliers/${supplier.slug}`}>
            {supplier.name}
          </Link>
        </div>
      ))}
    </>
  );
}
