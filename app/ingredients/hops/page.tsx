import { prisma } from "@/lib/client";
import { Hop } from "@prisma/client";
import { Metadata } from "next";
import { HopsTable } from "./_components";
export const metadata: Metadata = {
  title: "LNK Hops",
};
export default async function HopsIndex({
  searchParams,
}: {
  searchParams?: Record<string, string>;
}) {
  const hops = await prisma.hop.findMany();
  return (
    <HopsTable
      sort={searchParams?.sort as keyof Hop}
      direction={searchParams?.direction}
      hops={hops || []}
    />
  );
}
