import type { Table } from "@tanstack/react-table";
import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData> & {
    options: {
      onPageSizeChange?: (pageSize: number) => void;
      onPaginationChange?: (pagination: {
        pageIndex: number;
        pageSize: number;
      }) => void;
    };
  };
  pageSizeOptions?: number[];
}

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [10, 20, 30, 40, 50],
}: DataTablePaginationProps<TData>) {
  // State for the custom page input
  const [customPageInput, setCustomPageInput] = useState<string>(
    `${table.getState().pagination.pageIndex + 1}`
  );

  // Update the input when the page changes
  useEffect(() => {
    setCustomPageInput(`${table.getState().pagination.pageIndex + 1}`);
  }, [table.getState().pagination.pageIndex]);

  // Handle custom page navigation
  const handleGoToPage = () => {
    const pageNumber = parseInt(customPageInput, 10);
    if (
      !isNaN(pageNumber) &&
      pageNumber > 0 &&
      pageNumber <= table.getPageCount()
    ) {
      const newPageIndex = pageNumber - 1; // Convert to 0-based index
      table.setPageIndex(newPageIndex);
      if (table.options.onPaginationChange) {
        table.options.onPaginationChange({
          pageIndex: newPageIndex,
          pageSize: table.getState().pagination.pageSize,
        });
      }
    } else {
      // Reset to current page if invalid input
      setCustomPageInput(`${table.getState().pagination.pageIndex + 1}`);
    }
  };
  return (
    <div className="flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8">
      <div className="flex-1 whitespace-nowrap text-muted-foreground text-sm">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
        <div className="flex items-center space-x-2">
          <p className="whitespace-nowrap font-medium text-sm">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              const newPageSize = Number(value);
              table.setPageSize(newPageSize);
              if (table.options.onPageSizeChange) {
                table.options.onPageSizeChange(newPageSize);
              }
            }}
          >
            <SelectTrigger className="h-8 w-[4.5rem]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <span className="font-medium text-sm">Page</span>
          <div className="flex items-center space-x-1">
            <Input
              type="text"
              value={customPageInput}
              onChange={(e) => setCustomPageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleGoToPage();
                }
              }}
              onBlur={handleGoToPage}
              className="h-8 w-12 text-center"
            />
            <span className="font-medium text-sm">
              of {table.getPageCount()}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            aria-label="Go to first page"
            variant="outline"
            className="hidden size-8 p-0 lg:flex"
            onClick={() => {
              table.setPageIndex(0);
              if (table.options.onPaginationChange) {
                table.options.onPaginationChange({
                  pageIndex: 0,
                  pageSize: table.getState().pagination.pageSize,
                });
              }
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to previous page"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => {
              table.previousPage();
              if (table.options.onPaginationChange) {
                table.options.onPaginationChange({
                  pageIndex: table.getState().pagination.pageIndex - 1,
                  pageSize: table.getState().pagination.pageSize,
                });
              }
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to next page"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => {
              table.nextPage();
              console.log("s", table.getState().pagination.pageIndex + 1);
              if (table.options.onPaginationChange) {
                table.options.onPaginationChange({
                  pageIndex: table.getState().pagination.pageIndex + 1,
                  pageSize: table.getState().pagination.pageSize,
                });
              }
            }}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to last page"
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => {
              const lastPage = table.getPageCount() - 1;
              table.setPageIndex(lastPage);
              if (table.options.onPaginationChange) {
                table.options.onPaginationChange({
                  pageIndex: lastPage,
                  pageSize: table.getState().pagination.pageSize,
                });
              }
            }}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}
