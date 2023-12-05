import { OtherIngredient } from "@prisma/client";
import { Metadata } from "next";
import { getOtherIngredients } from "./queries";
export const metadata: Metadata = {
  title: "LNK Other Ingredients",
};
import { OthersTable } from "./_components";
import { Direction } from "@/components/Table";
export default async function OthersIndex({
  searchParams,
}: {
  searchParams?: Record<string, string>;
}) {
  const others = await getOtherIngredients();
  return (
    <OthersTable
      sort={searchParams?.sort as keyof OtherIngredient}
      direction={searchParams?.direction as Direction}
      others={others || []}
    />
  );
}
