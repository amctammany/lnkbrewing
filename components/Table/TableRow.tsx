import Link from "next/link";
import { DataColumnProps } from "./DataColumn";

export type TableRowProps<T extends Record<string, any> = Record<string, any>> =
  {
    data: T;
    columns: DataColumnProps<T>[];
  };

export function TableRow<T extends Record<string, any> = Record<string, any>>({
  data,
  columns,
}: TableRowProps<T>) {
  return (
    <tr className="" key={data.id}>
      {columns.map(({ name, href }) => (
        <td
          className="border border-slate-400"
          key={`${data.id}-${name.toString()}`}
        >
          {href ? (
            <Link
              className="text-blue-600 visited:text-purple-600  underline"
              href={typeof href === "string" ? href : href(data)}
            >
              {data[name]}
            </Link>
          ) : (
            <p>{data[name]}</p>
          )}
        </td>
      ))}
    </tr>
  );
}

export function makeTableRow(columns: DataColumnProps[]) {
  return function CustomTableRow(props: Omit<TableRowProps, "columns">) {
    return <TableRow columns={columns} {...props} />;
  };
}
