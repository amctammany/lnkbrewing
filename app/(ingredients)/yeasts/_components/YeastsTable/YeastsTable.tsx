"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Header } from "@/components/DataTable/Header";
import Link from "next/link";
import slugify from "@/lib/slugify";
import { YeastsTableRowActions } from "./YeastsTableRowActions";
import { DataTable } from "@/components/DataTable";
// import { BookType } from "lucide-react";
const columns: ColumnDef<YeastType>[] = [
  {
    accessorKey: "name",
    header: Header<YeastType>,
    size: 3,
    cell: ({ getValue }) => (
      <Link
        className="hover:underline w-8"
        prefetch={false}
        href={`/yeasts/${slugify(getValue<string>() || "", {
          lower: true,
        })}`}
      >
        {getValue<string>()}
      </Link>
    ),
  },
  {
    accessorKey: "manufacturer",
    header: Header<YeastType>,
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
  },
  {
    accessorKey: "attenuation",
    header: Header<YeastType>,
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
  },
  {
    accessorKey: "form",
    header: Header<YeastType>,
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
  },
  {
    accessorKey: "flocculation",
    header: Header<YeastType>,
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
  },
  {
    accessorKey: "tempLow",
    header: Header<YeastType>,
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
  },
  {
    accessorKey: "tempHigh",
    header: Header<YeastType>,
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
  },
  {
    accessorKey: "country",
    header: Header<YeastType>,
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: YeastsTableRowActions<YeastType>,
  },
];
import React from "react";
import { YeastType } from "@/types/Ingredient";
export interface YeastsTableProps {
  src: YeastType[];
}
export const YeastsTable: React.FC<YeastsTableProps> = ({ src }) => {
  return (
    <div>
      <DataTable data={src} columns={columns} />
    </div>
  );
};
export default YeastsTable;
