import { Section } from "@/components/Section";
import { Table } from "@/components/Table";
import { Yeast } from "@prisma/client";
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

export type YeastsTableProps = {
  yeasts: Yeast[];
  sort?: keyof Yeast;
  direction?: string;
};
export const YeastsTable = ({ yeasts, sort, direction }: YeastsTableProps) => (
  <Section header="Yeasts">
    <Table src={yeasts} columns={columns} sort={sort} direction={direction} />
  </Section>
);
