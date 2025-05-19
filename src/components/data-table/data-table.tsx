import { type Table as TanstackTable, flexRender } from "@tanstack/react-table";
import { ColumnReorderButton } from "./column-reorder-button";
import type * as React from "react";
import { useMemo } from "react";
import TableActionButtons from "@/components/case-list/tableActionButton";

import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCommonPinningStyles } from "@/lib/data-table";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface DataTableProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The table instance returned from useDataTable hook with pagination, sorting, filtering, etc.
   * @type TanstackTable<TData>
   */
  table: TanstackTable<TData>;

  /**
   * The floating bar to render at the bottom of the table on row selection.
   * @default null
   * @type React.ReactNode | null
   * @example floatingBar={<TasksTableFloatingBar table={table} />}
   */
  floatingBar?: React.ReactNode | null;
}

export function DataTable<TData>({
  table,
  floatingBar = null,
  children,
  className,
  ...props
}: DataTableProps<TData>) {
  const navigate = useNavigate();

  const handleRowClick = (
    e: React.MouseEvent<HTMLTableRowElement>,
    caseId: string
  ) => {
    // Check if the click was on a checkbox or its label
    const target = e.target as HTMLElement;
    const isCheckbox = target.closest(
      'input[type="checkbox"], .checkbox-container'
    );

    // Only navigate if the click wasn't on a checkbox
    if (!isCheckbox) {
      navigate(`/dashboard/${caseId}`);
    }
  };
  // Check if any rows are selected
  const hasSelectedRows = table.getSelectedRowModel().rows.length > 0;

  return (
    <div
      className={cn("w-full space-y-2.5 overflow-auto", className)}
      {...props}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">{children}</div>
      </div>

      {/* Render TableActionButtons only when rows are selected */}
      {<TableActionButtons hasSelectedRows={hasSelectedRows} />}
      <div className="overflow-hidden rounded-md h-[calc(100vh-280px)] flex flex-col">
        <Table className="h-full">
          <TableHeader className="sticky top-0 bg-background z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{
                        ...getCommonPinningStyles({ column: header.column }),
                        cursor: header.column.getCanSort() ? "grab" : "default",
                      }}
                      className="group"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, {
                            ...header.getContext(),
                            table,
                          })}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="overflow-y-auto hide-scrollbar">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={(e) => handleRowClick(e, row.original["id"])}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell
                        key={cell.id}
                        style={{
                          ...getCommonPinningStyles({ column: cell.column }),
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col gap-2.5">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
