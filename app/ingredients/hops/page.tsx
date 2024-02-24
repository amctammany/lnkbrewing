import { Hop } from "@prisma/client";
import { Metadata } from "next";
import { HopsTable } from "./_components/HopsTable";
import { getHops } from "./queries";
import { Direction } from "@/components/Table";
import Link from "next/link";
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
    <>
      <Link href="/ingredients/hops/suppliers">Hop Suppliers</Link>

      <HopsTable
        sort={searchParams?.sort as keyof Hop}
        direction={searchParams?.direction as Direction}
        hops={hops || []}
      />
    </>
  );
}
