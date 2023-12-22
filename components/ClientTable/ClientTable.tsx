"use client";
import { useState } from "react";
import { Direction, Table, TableProps } from "../Table";
import { ClientHeaderProps, ClientHeader } from "./ClientHeader";
import { ClientRow } from "./ClientRow";
import { RowProps, TableRowProps } from "../Table/TableRow";
import { Label } from "../Form/Label";

export type ClientTableProps<T extends Record<string, any>> =
  TableProps<T> & {};

export function ClientTable<T extends Record<string, any>>({
  ...props
}: ClientTableProps<T>) {
  const [query, setQuery] = useState("");
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
  const handleQuery: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget;
    setQuery(value);
  };
  return (
    <div className="">
      <input type="search" value={query} onChange={handleQuery} />
      <Table
        {...props}
        sort={sort}
        query={query}
        direction={direction}
        Header={Header}
        Row={Row}
      />
    </div>
  );
}

export default ClientTable;
