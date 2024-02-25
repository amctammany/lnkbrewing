import { Hop } from "@prisma/client";
import { Metadata } from "next";
import { HopCombination } from "../_components/HopCombination";
import { getHops } from "../queries";
import { combineHops } from "../actions";
import { Section } from "@/components/Section";
import { Form } from "@/components/Form/Form";
//import { Direction } from "@/components/Table";
export const metadata: Metadata = {
  title: "LNK Hops",
};
export default async function HopsCombination({
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
  const hops = await getHops({ where: { id: { in: hopIds } } });

  return <HopCombination hops={hops} action={combineHops} />;
}
