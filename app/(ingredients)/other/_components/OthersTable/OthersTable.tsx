"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Header } from "@/components/DataTable/Header";
import Link from "next/link";
import slugify from "@/lib/slugify";
import { OthersTableRowActions } from "./OthersTableRowActions";
import { DataTable } from "@/components/DataTable";
// import { BookType } from "lucide-react";
const columns: ColumnDef<OtherType>[] = [
  {
    accessorKey: "name",
    header: Header<OtherType>,
    size: 3,
    cell: ({ getValue }) => (
      <Link
        className="hover:underline w-8"
        prefetch={false}
        href={`/other/${slugify(getValue<string>() || "", { lower: true })}`}
      >
        {getValue<string>()}
      </Link>
    ),
  },

  {
    accessorKey: "country",
    header: Header<OtherType>,
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: OthersTableRowActions<OtherType>,
  },
];
import React from "react";
import { OtherType } from "@/types/Ingredient";
export interface OthersTableProps {
  src: OtherType[];
}
export const OthersTable: React.FC<OthersTableProps> = ({ src }) => {
  return (
    <div>
      <div className="relative overflow-auto">
        <DataTable data={src} columns={columns} />
      </div>
    </div>
  );
};
export default OthersTable;
