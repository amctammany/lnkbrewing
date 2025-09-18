"use client";
import { Fermentable } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Header } from "@/components/DataTable/Header";
import Link from "next/link";
import slugify from "@/lib/slugify";
import { FermentablesTableRowActions } from "./FermentablesTableRowActions";
import { DataTable } from "@/components/DataTable";
// import { BookType } from "lucide-react";
const columns: ColumnDef<Fermentable>[] = [
  {
    accessorKey: "name",
    header: Header<Fermentable>,
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
    accessorKey: "color",
    header: Header<Fermentable>,
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
  },
  {
    accessorKey: "maxUsage",
    header: Header<Fermentable>,
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
  },
  {
    accessorKey: "potential",
    header: Header<Fermentable>,
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
  },
  {
    accessorKey: "country",
    header: Header<Fermentable>,
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: FermentablesTableRowActions<Fermentable>,
  },
];
import React from "react";
export interface FermentablesTableProps {
  src: Fermentable[];
}
export const FermentablesTable: React.FC<FermentablesTableProps> = ({
  src,
}) => {
  return (
    <div>
      <div className="relative overflow-auto">
        <DataTable data={src} columns={columns} />
      </div>
    </div>
  );
};
export default FermentablesTable;
