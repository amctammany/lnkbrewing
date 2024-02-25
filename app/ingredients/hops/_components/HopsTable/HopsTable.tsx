"use client";
import { ClientTable } from "@/components/ClientTable";
import { Section } from "@/components/Section";
import { Direction, Table } from "@/components/Table";
import { DataColumnProps } from "@/components/Table/DataColumn";
import { Hop } from "@prisma/client";

export type HopsTableProps = {
  hops: Hop[];
  sort?: keyof Hop;
  direction?: Direction;
};
const columns: DataColumnProps<Hop>[] = [
  { name: "name", href: (src: Hop) => `/ingredients/hops/${src.slug}` },
  { name: "country" },
  { name: "usage" },
  { name: "alpha" },
  { name: "beta" },
];

export const HopsTable = ({ hops, sort, direction }: HopsTableProps) => (
  <Section header="Hops">
    <ClientTable
      src={hops}
      columns={columns}
      selectActions={{
        Compare: "/ingredients/hops/compare",
        Combine: "/ingredients/hops/combine",
      }}
    />
  </Section>
);
