import { Fermentable } from "@prisma/client";
import { Metadata } from "next";
import { FermentablesTable } from "./_components";
import { getFermentables } from "./queries";
export const metadata: Metadata = {
  title: "LNK Fermentables",
};
export default async function FermentablesIndex({
  searchParams,
}: {
  searchParams?: Record<string, string>;
}) {
  const fermentables = await getFermentables();
  return (
    <FermentablesTable
      sort={searchParams?.sort as keyof Fermentable}
      direction={searchParams?.direction}
      fermentables={fermentables || []}
    />
  );
}
