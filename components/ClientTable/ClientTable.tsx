"use client";
import { useState } from "react";
import { Direction, Table, TableProps } from "../Table";
import { ClientHeaderProps, ClientHeader } from "./ClientHeader";
import { ClientRow } from "./ClientRow";
import { RowProps, TableRowProps } from "../Table/TableRow";

export type ClientTableProps<T extends Record<string, any>> =
  TableProps<T> & {};

export function ClientTable<T extends Record<string, any>>({
  ...props
}: ClientTableProps<T>) {
  const [sort, setSort] = useState("name");
  const [selected, setSelected] = useState<number[]>([]);
  const [direction, setDirection] = useState<Direction>("DESC");
  const Header = ({
    ...props
  }: Omit<ClientHeaderProps, "setSort" | "setDirection">) => (
    <ClientHeader
      sort={sort}
      setSort={setSort}
      setDirection={setDirection}
      {...props}
    />
  );
  const Row = ({ ...props }: RowProps & { data?: Record<string, any> }) => (
    <ClientRow selected={selected} setSelected={setSelected} {...props} />
  );
  return (
    <div className="">
      <Table
        {...props}
        sort={sort}
        direction={direction}
        Header={Header}
        Row={Row}
      />
    </div>
  );
}

export default ClientTable;
