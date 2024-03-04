"use client";
import { useState } from "react";
import { Direction, Table, TableProps } from "../Table";
import { ClientHeaderProps, ClientHeader } from "./ClientHeader";
import { ClientRow } from "./ClientRow";
import { RowProps, TableRowProps } from "../Table/TableRow";
import { Label } from "../Form/Label";
import Button, { ButtonLink } from "../Button/Button";
import { IconButton } from "../Button/IconButton";
import { CloseIcon, DownIcon, UpIcon } from "../Icon";
import { Searchbar } from "../Searchbar";
import { ClientTableSearch } from "./ClientTableSearch";
type AdvancedSearchProps = {
  open: boolean;
};
function AdvancedSearch({ open }: AdvancedSearchProps) {
  return open ? (
    <div className="flex p-0 bg-slate-200">AdvancedSearch</div>
  ) : (
    <div></div>
  );
}
export type ClientTableProps<T extends Record<string, any>> = TableProps<T> & {
  selectActions?: Record<string, string>;
  filters?: Partial<T>;
};

function selectedParams(selected: number[]) {
  const params = new URLSearchParams(
    selected.map((id) => ["hopId", id.toString()])
  );
  return params.toString();
}
export function ClientTable<T extends Record<string, any>>({
  selectActions,
  filters,
  ...props
}: ClientTableProps<T>) {
  const [query, setQuery] = useState(
    Object.entries(filters || {}).reduce((acc, [n, f]) => {
      if (f === "string") acc[n] = "";
      if (Array.isArray(f)) acc[n] = f[0];
      return acc;
    }, {} as any)
  );
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
  const handleUnselect: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const id = e.currentTarget.dataset.id;
    if (id)
      setSelected((old) => old.filter((v) => v.toString() !== id.toString()));
  };
  //const handleAdvancedSearchToggle: React.MouseEventHandler<
  //HTMLButtonElement
  //> = (e) => {
  //setSearchOpen((o) => !o);
  //};
  //const handleQuery: React.ChangeEventHandler<HTMLInputElement> = (e) => {
  //const { value } = e.currentTarget;
  //setQuery(value);
  //};
  return (
    <div className="">
      <div className="">
        <ClientTableSearch
          filters={filters}
          query={query}
          setQuery={setQuery}
        />
        <div className="flex bg-slate-200">
          <div className="flex-grow inline-flex p-0 ">
            {selected.map((id) => (
              <IconButton
                key={id}
                Icon={CloseIcon}
                iconVariant="default"
                size="default"
                data-id={id}
                onClick={handleUnselect}
              >
                {props.src.find((v) => v.id === id)?.name}
              </IconButton>
            ))}
          </div>
          {Object.entries(selectActions || {}).map(([label, pathname]) => (
            <ButtonLink
              key={label}
              href={{ pathname, query: selectedParams(selected) }}
            >
              {label}
            </ButtonLink>
          ))}
        </div>
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
