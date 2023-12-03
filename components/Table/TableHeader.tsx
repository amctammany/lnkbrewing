import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import Link from "next/link";
import { ComponentProps } from "react";

export type TableHeaderProps = VariantProps<typeof tableHeaderStyles> &
  ComponentProps<"th"> & {
    name: string;
    label?: string;
    active?: "ASC" | "DESC";
  };
const tableHeaderStyles = cva(["uppercase border border-slate-500"], {
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
export const TableHeader = ({
  name,
  label,
  active,
  className,
}: TableHeaderProps) => {
  return (
    <th className={clsx(tableHeaderStyles({ active }), className)}>
      <Link
        href={`?sort=${name}&direction=${active === "DESC" ? "ASC" : "DESC"}`}
      >
        <div className="flex">
          <b className="flex-grow">{label || name}</b>
          <span className="flex-shrink">
            {active &&
              (active === "ASC" ? (
                <ArrowUpIcon className="h-6 w-6" />
              ) : (
                <ArrowDownIcon className="h-6 w-6" />
              ))}
          </span>
        </div>
      </Link>
    </th>
  );
};
