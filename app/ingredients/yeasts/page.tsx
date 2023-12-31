import { Yeast } from "@prisma/client";
import { Metadata } from "next";
import { YeastsTable } from "./_components";
import { getYeasts } from "./queries";
import { Direction } from "@/components";
export const metadata: Metadata = {
  title: "LNK Yeasts",
};
export default async function YeastsIndex({
  searchParams,
}: {
  searchParams?: Record<string, string>;
}) {
  const yeasts = await getYeasts();
  return (
    <YeastsTable
      sort={searchParams?.sort as keyof Yeast}
      direction={searchParams?.direction as Direction}
      yeasts={yeasts || []}
    />
  );
}
