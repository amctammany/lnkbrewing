import { Section } from "@/components/Section";
import { Table } from "@/components/Table";
import { Fermentable } from "@prisma/client";

export type FermentablesTableProps = {
  fermentables: Fermentable[];
  sort?: keyof Fermentable;
  direction?: string;
};
const columns = [
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
