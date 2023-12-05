import React, { ComponentProps } from "react";
import { TableRow, makeTableRow } from "./TableRow";
import { TableHeader } from "./TableHeader";
import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { DataColumnProps } from "./DataColumn";
export type TableProps<T extends Record<string, any>> = VariantProps<
  typeof tableStyles
> &
  ComponentProps<"table"> & {
    sort?: string;
    direction?: Direction; //string; //"ASC" | "DESC";
    src: T[];
    columns: DataColumnProps<T>[];
  };
export type Direction = "ASC" | "DESC";
const tableStyles = cva(
  ["w-full table table-auto border border-collapse border-slate-400"],
  {
    variants: {
      variant: {
        default: [""],
      },
      //active: {
      //ASC: ["underline"],
      //DESC: ["underline"],
      //},
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export function Table<T extends Record<string, any>>({
  src,
  columns,
  sort,
  direction,
  variant,
  className,
  ...props
}: TableProps<T>) {
  const Row = makeTableRow(columns);
  const filtered = sort
    ? src.sort(
        (a, b) => (a[sort] < b[sort] ? -1 : 1) * (direction === "ASC" ? -1 : 1)
      )
    : src;
  return (
    <div className="max-w-full overflow-auto">
      <table className={clsx(tableStyles({ variant }), className)} {...props}>
        <thead>
          <tr>
            {columns.map(({ name, label }) => (
              <TableHeader
                key={name.toString()}
                variant={variant}
                name={name.toString()}
                label={label}
                active={
                  (sort === name
                    ? direction === "DESC"
                      ? "DESC"
                      : "ASC"
                    : undefined) as Direction
                }
              />
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
