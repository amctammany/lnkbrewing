import { Section } from "@/components/Section";
import { Table } from "@/components/Table";
import { prisma } from "@/lib/client";
import { Yeast } from "@prisma/client";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "LNK Yeasts",
};
const columns = [
  { name: "name", href: (src: Yeast) => `/ingredients/yeasts/${src.slug}` },
  { name: "manufacturer" },
  { name: "type" },
  { name: "form" },
  { name: "tempLow" },
  { name: "tempHigh" },
  { name: "attenuation" },
  { name: "flocculation" },
  { name: "usage" },
];
export default async function YeastsIndex() {
  const yeasts = await prisma.yeast.findMany();
  return (
    <Section header="Yeasts">
      <Table src={yeasts} columns={columns} />
    </Section>
  );
}
