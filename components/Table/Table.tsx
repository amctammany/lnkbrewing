import React from "react";
import { TableRow, makeTableRow } from "./TableRow";
export type TableProps<T extends Record<string, any>> = {
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
}: TableProps<T>) {
  const Row = makeTableRow(columns);
  return (
    <table className="table-auto border border-collapse border-slate-400">
      <thead>
        <tr>
          {columns.map(({ name, label }) => (
            <th className="border border-slate-400" key={name}>
              {label || name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {src.map((row) => (
          <Row key={row.id} data={row} />
        ))}
      </tbody>
    </table>
  );
}
