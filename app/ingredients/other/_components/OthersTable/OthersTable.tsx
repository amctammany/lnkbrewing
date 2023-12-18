import { Section } from "@/components/Section";
import { Direction, Table } from "@/components/Table";
import { DataColumnProps } from "@/components/Table/DataColumn";
import { OtherIngredient as Other } from "@prisma/client";

export type OthersTableProps = {
  others: Other[];
  sort?: keyof Other;
  direction?: Direction;
};
const columns: DataColumnProps<Other>[] = [
  { name: "name", href: (src: Other) => `/ingredients/other/${src.slug}` },
];

export const OthersTable = ({ others, sort, direction }: OthersTableProps) => (
  <Section header="Others">
    <Table src={others} columns={columns} sort={sort} direction={direction} />
  </Section>
);
