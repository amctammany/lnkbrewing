import React from "react";
import * as D from "@heroicons/react/20/solid";
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
    ? src.sort(
        (a, b) => (a[sort] < b[sort] ? -1 : 1) * (direction === "ASC" ? -1 : 1)
      )
    : src;
  return (
    <div className="max-w-full overflow-auto">
      <table className="w-full table table-auto border border-collapse border-slate-400">
        <thead>
          <tr>
            {columns.map(({ name, label }) => (
              <th key={name} className="border border-slate-400">
                <Link
                  href={`?sort=${name}&direction=${
                    direction === "ASC" ? "DESC" : "ASC"
                  }`}
                >
                  <div className="flex">
                    <b className="flex-grow">{label || name}</b>
                    <span className="flex-shrink">
                      {sort === name &&
                        (direction === "ASC" ? (
                          <D.ArrowUpIcon className="h-6 w-6" />
                        ) : (
                          <D.ArrowDownIcon className="h-6 w-6" />
                        ))}
                    </span>
                  </div>
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
    </div>
  );
}
