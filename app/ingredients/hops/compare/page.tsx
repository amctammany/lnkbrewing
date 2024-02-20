import { Hop } from "@prisma/client";
import { Metadata } from "next";
import { HopComparison } from "../_components/HopComparison";
import { getHops } from "../queries";
//import { Direction } from "@/components/Table";
export const metadata: Metadata = {
  title: "LNK Hops",
};
export default async function HopsComparison({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const ids = searchParams?.hopId;

  const hopIds = Array.isArray(ids)
    ? ids.map((id) => parseInt(id))
    : ids
    ? [parseInt(ids)]
    : [];
  console.log(hopIds);
  const hops = await getHops({ where: { id: { in: hopIds } } });

  return <HopComparison hops={hops} />;
}
