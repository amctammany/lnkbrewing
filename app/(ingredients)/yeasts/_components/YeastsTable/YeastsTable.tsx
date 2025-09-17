"use client";
import { Yeast } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Header } from "@/components/DataTable/Header";
import Link from "next/link";
import slugify from "@/lib/slugify";
import { YeastsTableRowActions } from "./YeastsTableRowActions";
import { DataTable } from "@/components/DataTable";
// import { BookType } from "lucide-react";
const columns: ColumnDef<Yeast>[] = [
  {
    accessorKey: "name",
    header: Header<Yeast>,
    size: 3,
    cell: ({ getValue }) => (
      <Link
        className="hover:underline w-8"
        prefetch={false}
        href={`/fermentables/${slugify(getValue<string>() || "", {
          lower: true,
        })}`}
      >
        {getValue<string>()}
      </Link>
    ),
  },

  {
    accessorKey: "country",
    header: Header<Yeast>,
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: YeastsTableRowActions<Yeast>,
  },
];
import React from "react";
export interface YeastsTableProps {
  src: Yeast[];
}
export const YeastsTable: React.FC<YeastsTableProps> = ({ src }) => {
  return (
    <div>
      <div className="relative overflow-auto">
        <DataTable data={src} columns={columns} />
      </div>
    </div>
  );
};
export default YeastsTable;
