import { Row, Table } from "@tanstack/react-table";
import { TableBody, TableCell, TableRow } from "../ui/table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { DataTableBodyRow } from "./DataTableBodyRow";

interface TableBodyProps<T = any> {
  table: Table<T>;
  tableContainerRef: React.RefObject<HTMLDivElement>;
}

export function DataTableBody({ table, tableContainerRef }: TableBodyProps) {
  const { rows } = table.getRowModel();
  const columns = table.getAllColumns();

  // Important: Keep the row virtualizer in the lowest component possible to avoid unnecessary re-renders.
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
    <TableBody
      className="grid relative"
      style={{ height: rowVirtualizer.getTotalSize() }}
    >
      {table.getRowModel().rows?.length ? (
        rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const row = rows[virtualRow.index] as Row<any>;
          return (
            <DataTableBodyRow
              key={row.id}
              row={row}
              virtualRow={virtualRow}
              rowVirtualizer={rowVirtualizer}
            />
          );
        })
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}
