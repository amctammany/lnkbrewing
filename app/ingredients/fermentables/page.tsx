import { Section } from "@/components/Section";
import { prisma } from "@/lib/client";
import { Fermentable } from "@prisma/client";
import { Metadata } from "next";
import { FermentablesTable } from "./_components";
export const metadata: Metadata = {
  title: "LNK Fermentables",
};
export default async function FermentablesIndex({
  searchParams,
}: {
  searchParams?: Record<string, string>;
}) {
  const fermentables = await prisma.fermentable.findMany();
  return (
    <FermentablesTable
      sort={searchParams?.sort as keyof Fermentable}
      direction={searchParams?.direction}
      fermentables={fermentables || []}
    />
  );
}
