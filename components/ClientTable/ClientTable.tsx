"use client";
import { useState } from "react";
import { Direction, Table, TableProps } from "../Table";
import { ClientHeaderProps, ClientHeader } from "./ClientHeader";
import { ClientRow } from "./ClientRow";
import { RowProps, TableRowProps } from "../Table/TableRow";
import { Label } from "../Form/Label";
import { ButtonLink } from "../Button/Button";

export type ClientTableProps<T extends Record<string, any>> = TableProps<T> & {
  selectActions?: Record<string, string>;
};

function selectedParams(selected: number[]) {
  const params = new URLSearchParams(
    selected.map((id) => ["hopId", id.toString()])
  );
  return params.toString();
}
export function ClientTable<T extends Record<string, any>>({
  selectActions,
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
      <div className="inline-flex p-2 bg-slate-200">
        {selected.map((id) => (
          <div key={id} className="px-2 py-1 border-2 mx-2 bg-white">
            {id}
          </div>
        ))}
        {Object.entries(selectActions || {}).map(([label, pathname]) => (
          <ButtonLink
            key={label}
            href={{ pathname, query: selectedParams(selected) }}
          >
            {label}
          </ButtonLink>
        ))}
      </div>
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
