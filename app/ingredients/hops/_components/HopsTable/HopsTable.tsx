import { Section } from "@/components/Section";
import { Table } from "@/components/Table";
import { Hop } from "@prisma/client";

export type HopsTableProps = {
  hops: Hop[];
  sort?: keyof Hop;
  direction?: string;
};
const columns = [
  { name: "name", href: (src: Hop) => `/ingredients/hops/${src.slug}` },
  { name: "country" },
  { name: "usage" },
  { name: "alpha" },
  { name: "beta" },
];

export const HopsTable = ({ hops, sort, direction }: HopsTableProps) => (
  <Section header="Hops">
    <div className="min-w-full">
      <Table src={hops} columns={columns} sort={sort} direction={direction} />
    </div>
  </Section>
);
