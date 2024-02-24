import { HopSupplier } from "@prisma/client";
import { Metadata } from "next";
//import { HopsTable } from "./_components/HopsTable";
import Link from "next/link";
import { getHopSupplier } from "../../queries";
import { HopSupplierDisplay } from "../../_components/HopSupplierDisplay";
export const metadata: Metadata = {
  title: "LNK Hops",
};
export default async function HopSupplierDisplayPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const supplier = await getHopSupplier(slug);
  return <HopSupplierDisplay supplier={supplier} />;
}
