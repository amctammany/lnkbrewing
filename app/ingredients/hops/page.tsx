import { Hop } from "@prisma/client";
import { Metadata } from "next";
import { HopsTable } from "./_components";
import { getHops } from "./queries";
import { Direction } from "@/components/Table";
export const metadata: Metadata = {
  title: "LNK Hops",
};
export default async function HopsIndex({
  searchParams,
}: {
  searchParams?: Record<string, string>;
}) {
  const hops = await getHops();
  return (
    <HopsTable
      sort={searchParams?.sort as keyof Hop}
      direction={searchParams?.direction as Direction}
      hops={hops || []}
    />
  );
}
