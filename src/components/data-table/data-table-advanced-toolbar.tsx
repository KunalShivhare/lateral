import type { DataTableAdvancedFilterField, Filter } from "@/types";
import type { Table } from "@tanstack/react-table";
import type * as React from "react";

import { DataTableFilterList } from "@/components/data-table/data-table-filter-list";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { cn } from "@/lib/utils";
import { DataTableSortList } from "./data-table-sort-list";

interface DataTableAdvancedToolbarProps<TData>
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The table instance returned from useDataTable hook with pagination, sorting, filtering, etc.
   * @type Table<TData>
   */
  table: Table<TData>;

  /**
   * An array of filter field configurations for the data table.
   * @type DataTableAdvancedFilterField<TData>[]
   * @example
   * const filterFields = [
   *   {
   *     id: 'name',
   *     label: 'Name',
   *     type: 'text',
   *     placeholder: 'Filter by name...'
   *   },
   *   {
   *     id: 'status',
   *     label: 'Status',
   *     type: 'select',
   *     options: [
   *       { label: 'Active', value: 'active', count: 10 },
   *       { label: 'Inactive', value: 'inactive', count: 5 }
   *     ]
   *   }
   * ]
   */
  filterFields: DataTableAdvancedFilterField<TData>[];

  /**
   * Debounce time (ms) for filter updates to enhance performance during rapid input.
   * @default 300
   */
  debounceMs?: number;

  /**
   * Shallow mode keeps query states client-side, avoiding server calls.
   * Setting to `false` triggers a network request with the updated querystring.
   * @default true
   */
  shallow?: boolean;

  /**
   * Custom filters to use instead of the URL filters
   */
  customFilters?: Filter<TData>[];

  /**
   * Custom handler for filter changes
   */
  onFiltersChange?: (filters: Filter<TData>[]) => void;
  /**
   * Custom handler to apply filters
   */
  handleApplyFilters?: () => void;

  /**
   * Custom handler to reset filters
   */
  handleResetFilters?: () => void;

  /**
   * Controls if the filter popover is open
   */
  open?: boolean;

  /**
   * Function to set the open state of the filter popover
   */
  setOpen?: (open: boolean) => void;
}

export function DataTableAdvancedToolbar<TData>({
  table,
  filterFields = [],
  debounceMs = 300,
  shallow = true,
  customFilters,
  onFiltersChange,
  children,
  className,
  handleApplyFilters,
  handleResetFilters,
  open,
  setOpen,
  ...props
}: DataTableAdvancedToolbarProps<TData>) {
  return (
    <div
      role="toolbar"
      aria-orientation="horizontal"
      className={cn(
        "flex w-full items-center justify-between gap-2 overflow-auto",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <DataTableFilterList
          table={table}
          filterFields={filterFields}
          debounceMs={debounceMs}
          shallow={shallow}
          customFilters={customFilters}
          onFiltersChange={onFiltersChange}
          handleApplyFilters={
            handleApplyFilters ? handleApplyFilters : () => {}
          }
          handleResetFilters={handleResetFilters}
          open={open}
          setOpen={setOpen}
        />
        {/* <DataTableSortList
          table={table}
          debounceMs={debounceMs}
          shallow={shallow}
        /> */}
      </div>
      <div className="flex items-center gap-2">
        {children}
        {/* <DataTableViewOptions table={table} /> */}
      </div>
    </div>
  );
}
