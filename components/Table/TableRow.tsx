import Link from "next/link";
import { DataColumnProps } from "./DataColumn";
import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps } from "react";

export type TableRowProps<T extends Record<string, any>> = VariantProps<
  typeof tableRowStyles
> &
  ComponentProps<"tr"> & {
    data: T;
    columns: DataColumnProps<T>[];
  };
const tableRowStyles = cva([""], {
  variants: {
    variant: {
      default: [""],
    },
    active: {
      ASC: ["underline"],
      DESC: ["underline"],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function TableRow<T extends Record<string, any> = Record<string, any>>({
  data,
  columns,
  variant,
  ...props
}: TableRowProps<T>) {
  return (
    <tr className={tableRowStyles({ variant })} key={data.id} {...props}>
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

export function makeTableRow<T extends Record<string, any>>(
  columns: DataColumnProps<T>[]
) {
  return function CustomTableRow(props: Omit<TableRowProps<T>, "columns">) {
    return <TableRow columns={columns} {...props} />;
  };
}
