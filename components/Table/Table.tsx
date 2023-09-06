import React from "react";
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
  return (
    <table className="table-auto">
      <thead>
        <tr>
          {columns.map(({ name, label }) => (
            <th key={name}>{label || name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {src.map((row) => (
          <tr className="border-b-2" key={row.id}>
            {columns.map(({ label, name }) => (
              <td key={`${row.id}-${name}`}>{row[name]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
