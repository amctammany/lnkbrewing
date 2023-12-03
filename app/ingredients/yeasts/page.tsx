import { prisma } from "@/lib/client";
import { Yeast } from "@prisma/client";
import { Metadata } from "next";
import { YeastsTable } from "./_components";
export const metadata: Metadata = {
  title: "LNK Yeasts",
};
export default async function YeastsIndex({
  searchParams,
}: {
  searchParams?: Record<string, string>;
}) {
  const yeasts = await prisma.yeast.findMany();
  return (
    <YeastsTable
      sort={searchParams?.sort as keyof Yeast}
      direction={searchParams?.direction}
      yeasts={yeasts || []}
    />
  );
}
