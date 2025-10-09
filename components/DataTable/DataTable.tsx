"use client";

import {
  useVirtualizer,
  VirtualItem,
  Virtualizer,
} from "@tanstack/react-virtual";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  Row,
  RowSelectionState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMemo, useRef, useState } from "react";
import { fuzzyFilter } from "@/lib/fuzzyFilter";
//import clsx from "clsx";
import TableSearch from "./TableSearch";
import FilterInput from "./FilterInput";
import FilterSelect from "./FilterSelect";
import { Checkbox } from "../ui/checkbox";
//import { Badge } from "../Badge";
//import { Wheat } from "lucide-react";
//import TableSelection from "./TableSelection";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  selectable?: boolean;
  filters?: any[];
  children?: React.ReactNode | React.ReactNode[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filters,
  selectable = true,
}: //children,
DataTableProps<TData, TValue>) {
  //"use no memo";
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<any>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const table = useReactTable({
    data,
    columns: selectable
      ? [
          {
            id: "select",
            size: 24,
            header: ({ table }) => (
              <Checkbox
                checked={
                  table.getIsAllPageRowsSelected() ||
                  (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                  table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
              />
            ),
            cell: ({ row }) => (
              <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
              />
            ),
            enableSorting: false,
            enableHiding: false,
          },
          ...columns,
        ]
      : columns,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    globalFilterFn: "fuzzy",
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      globalFilter,
      sorting,
      columnFilters,
      rowSelection,
    },
    getCoreRowModel: getCoreRowModel(),
  });
  const onFilterChange = useMemo(
    () => (name: any, value: any) => {
      return table.getColumn(name)?.setFilterValue(value);
    },
    [table]
  );
  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer<HTMLDivElement, HTMLTableRowElement>({
    count: rows.length,
    estimateSize: () => 33, //estimate row height for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    //measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== "undefined" &&
      navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });
  return (
    <div className="w-full relative ">
      <TableSearch table={table}>
        {filters?.map(({ name, options }) =>
          options ? (
            <FilterSelect
              key={name}
              name={name}
              value={(table.getColumn(name)?.getFilterValue() as string) ?? ""}
              options={options}
              onChange={onFilterChange}
            />
          ) : (
            <FilterInput
              key={name}
              name={name}
              value={(table.getColumn(name)?.getFilterValue() as string) ?? ""}
              onChange={onFilterChange}
            />
          )
        )}
      </TableSearch>
      <div className="relative overflow-auto h-[640px]" ref={tableContainerRef}>
        <Table className="grid">
          <TableHeader className="grid sticky top-0 z-1">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="flex w-full">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="flex"
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody
            className={`grid relative`}
            style={{ height: rowVirtualizer.getTotalSize() }}
          >
            {table.getRowModel().rows?.length ? (
              rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const row = rows[virtualRow.index] as Row<any>;
                return (
                  <TableRow
                    className="flex absolute w-full "
                    style={{ transform: `translateY(${virtualRow.start}px)` }}
                    data-index={virtualRow.index}
                    ref={(node) => rowVirtualizer.measureElement(node)}
                    key={row.id}
                    //                    style={{ transform: `translateY(${virtualRow.start}px)` }}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        style={{ width: cell.column.getSize() }}
                        className="flex my-auto"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
