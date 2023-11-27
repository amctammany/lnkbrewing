import React from "react";
import { TableRow, makeTableRow } from "./TableRow";
import Link from "next/link";
export type TableProps<T extends Record<string, any>> = {
  sort?: keyof T;
  direction?: string; //"ASC" | "DESC";
  src: T[];
  columns: {
    name: string;
    label?: string;
    width?: number;
  }[];
};

export function Table<T extends Record<string, any>>({
  src,
  columns,
  sort,
  direction,
}: TableProps<T>) {
  const Row = makeTableRow(columns);
  const filtered = sort
    ? src.sort((a, b) => (a[sort] < b[sort] ? -1 : 1))
    : src;
  return (
    <table className="min-w-full table-auto border border-collapse border-slate-400">
      <thead>
        <tr>
          {columns.map(({ name, label }) => (
            <th key={name} className="border border-slate-400">
              <Link href={`?sort=${name}`}>
                <>
                  <b>{label || name}</b>
                  <i>{sort === name && <b> selected</b>}</i>
                </>
              </Link>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filtered.map((row) => (
          <Row key={row.id} data={row} />
        ))}
      </tbody>
    </table>
  );
}
