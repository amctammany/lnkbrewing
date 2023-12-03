import { Section } from "@/components/Section";
import { Table } from "@/components/Table";
import { OtherIngredient as Other } from "@prisma/client";

export type OthersTableProps = {
  others: Other[];
  sort?: keyof Other;
  direction?: string;
};
const columns = [
  { name: "name", href: (src: Other) => `/ingredients/others/${src.slug}` },
];

export const OthersTable = ({ others, sort, direction }: OthersTableProps) => (
  <Section header="Others">
    <Table src={others} columns={columns} sort={sort} direction={direction} />
  </Section>
);
