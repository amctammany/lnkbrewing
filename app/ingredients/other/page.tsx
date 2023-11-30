import { Section } from "@/components/Section";
import { Table } from "@/components/Table";
import { prisma } from "@/lib/client";
import { Fermentable, OtherIngredient } from "@prisma/client";
import { Metadata } from "next";
import { getOtherIngredients } from "./queries";
export const metadata: Metadata = {
  title: "LNK Other Ingredients",
};
const columns = [
  {
    name: "name",
    href: (src: OtherIngredient) => `/ingredients/other/${src.slug}`,
  },
];

export default async function OtherIngredientsIndex() {
  const others = await getOtherIngredients();
  return (
    <Section header="Other Ingredients">
      <Table src={others} columns={columns} />
    </Section>
  );
}
