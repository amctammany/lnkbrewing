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
    <table>
      <thead>
        <tr>
          {columns.map(({ name, label }) => (
            <th key={name}>{label || name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {src.map((row) => (
          <tr key={row.id}>
            {columns.map(({ label, name }) => (
              <td key={`${row.id}-${name}`}>{row[name]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
