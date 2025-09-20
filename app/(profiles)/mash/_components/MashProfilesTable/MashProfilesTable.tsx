"use client";
import { MashProfile } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Header } from "@/components/DataTable/Header";
import Link from "next/link";
import slugify from "@/lib/slugify";
import { MashProfilesTableRowActions } from "./MashProfilesTableRowActions";
import { DataTable } from "@/components/DataTable";
// import { BookType } from "lucide-react";
const columns: ColumnDef<MashProfile>[] = [
  {
    accessorKey: "name",
    header: Header<MashProfile>,
    size: 3,
    cell: ({ getValue }) => (
      <Link
        className="hover:underline w-8"
        prefetch={false}
        href={`/mash/${slugify(getValue<string>() || "", {
          lower: true,
        })}`}
      >
        {getValue<string>()}
      </Link>
    ),
  },

  {
    accessorKey: "country",
    header: Header<MashProfile>,
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: MashProfilesTableRowActions<MashProfile>,
  },
];
import React from "react";
import { MashProfileType } from "@/types/Profile";
export interface MashProfilesTableProps {
  src: MashProfile[];
}
export const MashProfilesTable: React.FC<MashProfilesTableProps> = ({
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
export default MashProfilesTable;
