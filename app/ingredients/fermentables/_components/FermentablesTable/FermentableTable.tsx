import { Section } from "@/components/Section";
import { Table, Direction } from "@/components/Table";
import { DataColumnProps } from "@/components/Table/DataColumn";
import { Fermentable } from "@prisma/client";

export type FermentablesTableProps = {
  fermentables: Fermentable[];
  sort?: keyof Fermentable;
  direction?: Direction;
};
const columns: DataColumnProps<Fermentable>[] = [
  {
    name: "name",
    href: (src: Fermentable) => `/ingredients/fermentables/${src.slug}`,
  },
  { name: "country" },
  { name: "color" },
  { name: "maxUsage" },
  { name: "potential" },
];

export const FermentablesTable = ({
  fermentables,
  sort,
  direction,
}: FermentablesTableProps) => (
  <Section header="Fermentables">
    <Table
      src={fermentables}
      columns={columns}
      sort={sort}
      direction={direction}
    />
  </Section>
);
