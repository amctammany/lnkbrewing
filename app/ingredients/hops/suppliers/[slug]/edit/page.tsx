import { HopSupplier } from "@prisma/client";
import { Metadata } from "next";
//import { HopsTable } from "./_components/HopsTable";
import Link from "next/link";
import { HopSupplierForm } from "../../../_components/HopSupplierForm/HopSupplierForm";
import { getHopSupplier } from "../../../queries";
import { updateHopSupplier } from "../../../actions";
export const metadata: Metadata = {
  title: "LNK Hops",
};
export default async function HopSupplierFormPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const supplier = await getHopSupplier(slug);
  return <HopSupplierForm src={supplier} action={updateHopSupplier} />;
}
