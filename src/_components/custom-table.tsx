import * as React from "react";
import { 
  type FilterFn,
  type ColumnFiltersState,
  ColumnDef,
} from "@tanstack/react-table";
import { useQueryState } from "nuqs";
import { useQuery } from "@apollo/client";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableAdvancedToolbar } from "@/components/data-table/data-table-advanced-toolbar";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import type { DataTableAdvancedFilterField, DataTableFilterField, DataTableRowAction, Filter } from "@/types";
import { toSentenceCase } from "@/lib/utils";
import { getFiltersStateParser } from "@/lib/parsers";
import { Button } from "@/components/ui/button";

import { type CustomTask } from "../_lib/custom-data";
import { GET_TASKS } from "../_lib/queries";
import { getCustomColumns } from "./custom-table-columns";
import { useFeatureFlags } from "./feature-flags-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { setDefaultHighWaterMark } from "stream";

// Custom filter functions
const amount1Filter: FilterFn<CustomTask> = (row, columnId, value) => {
  const amount1 = row.getValue<number>(columnId);
  const filterValue = Number(value);
  return !isNaN(filterValue) && amount1 === filterValue;
};

const amount2Filter: FilterFn<CustomTask> = (row, columnId, value) => {
  const amount2 = row.getValue<number>(columnId);
  const filterValue = Number(value);
  return !isNaN(filterValue) && amount2 === filterValue;
};

const batch_idFilter: FilterFn<CustomTask> = (row, columnId, value) => {
  const batch_id = row.getValue<string | null>(columnId);
  return batch_id === value;
};

const dateFilter: FilterFn<CustomTask> = (row, columnId, value) => {
  const date = row.getValue<string>(columnId);
  return date === value;
};

const due_dateFilter: FilterFn<CustomTask> = (row, columnId, value) => {
  const due_date = row.getValue<string | null>(columnId);
  return due_date === value;
};

const debtoridFilter: FilterFn<CustomTask> = (row, columnId, value) => {
  const debtorid = row.getValue<string>(columnId);
  return debtorid === value;
};

const client_idFilter: FilterFn<CustomTask> = (row, columnId, value) => {
  const client_id = row.getValue<number>(columnId);
  const filterValue = Number(value);
  return !isNaN(filterValue) && client_id === filterValue;
};

// Custom global filter function
const customGlobalFilterFn: FilterFn<CustomTask> = (
  row,
  columnId,
  filterValue
) => {
  const value = row.getValue<string>(columnId);
  if (typeof value === 'string') {
    return value.toLowerCase().includes((filterValue as string).toLowerCase());
  }
  return false;
};

interface CustomTableProps {}

// Custom Advanced Toolbar with Apply button
interface CustomAdvancedToolbarProps {
  table: any;
  filterFields: DataTableAdvancedFilterField<any>[];
  initialFilters: Filter<any>[];
  onApply: (filters: Filter<any>[]) => void;
  onReset?: () => void;
}

// Custom Advanced Toolbar with Apply button - wrapped in React.memo to prevent unnecessary re-renders
const CustomAdvancedToolbar = React.memo(function CustomAdvancedToolbarInner({
  table,
  filterFields,
  initialFilters,
  onApply,
  onReset
}: CustomAdvancedToolbarProps) {
  // Create a local state for filters that's completely isolated
  const [localFilters, setLocalFilters] = React.useState<Filter<any>[]>(initialFilters);
  // Add state for popover
  const [open, setOpen] = React.useState(false);

  // Initialize local filters when initialFilters change - only when empty
  React.useEffect(() => {
    if (initialFilters.length > 0 && localFilters.length === 0) {
      setLocalFilters(initialFilters);
    }
  }, [initialFilters.length]);

  // Custom handler for filter changes - stable reference
  const handleFilterChange = React.useCallback((filters: Filter<any>[]) => {
    setLocalFilters(filters);
  }, []);
  
  // Apply local filters to parent state - stable reference
  const handleApply = React.useCallback(() => {
    onApply(localFilters);
    setOpen(false); // Close popover after applying filters
  }, [localFilters, onApply]);

  // Reset filters and trigger refetch
  const handleReset = React.useCallback(() => {
    setLocalFilters([]);
    if (onReset) {
      onReset();
    }
    setOpen(false); // Close popover after resetting filters
  }, [onReset]);

  // Memoize the toolbar to prevent re-renders
  const toolbar = React.useMemo(() => (
    <DataTableAdvancedToolbar
      table={table}
      filterFields={filterFields}
      shallow={true}
      debounceMs={0}
      customFilters={localFilters}
      onFiltersChange={handleFilterChange}
      handleApplyFilters={handleApply}
      handleResetFilters={handleReset}
      open={open}
      setOpen={setOpen}
    />
  ), [table, filterFields, localFilters, handleFilterChange, handleApply, handleReset, open]);

  return (
    <div className="flex flex-col gap-2 w-full">
      {toolbar}
    </div>
  );
});

// Helper function to convert filter to GraphQL format
const convertFilterToGraphQL = (filter: Filter<CustomTask>) => {
  const { id, operator, value, type } = filter;
  
  switch (operator) {
    case 'eq':
      return {
        [id]: { _eq: type === 'number' ? Number(value) : value }
      };
    case 'ne':
      return {
        [id]: { _neq: type === 'number' ? Number(value) : value }
      };
    case 'iLike':
      return {
        [id]: { _ilike: `%${value}%` }
      };
    case 'notILike':
      return {
        [id]: { _nilike: `%${value}%` }
      };
    case 'isEmpty':
      return {
        [id]: { _is_null: true }
      };
    case 'isNotEmpty':
      return {
        [id]: { _is_null: false }
      };
    case 'lt':
      return {
        [id]: { _lt: type === 'number' ? Number(value) : value }
      };
    case 'lte':
      return {
        [id]: { _lte: type === 'number' ? Number(value) : value }
      };
    case 'gt':
      return {
        [id]: { _gt: type === 'number' ? Number(value) : value }
      };
    case 'gte':
      return {
        [id]: { _gte: type === 'number' ? Number(value) : value }
      };
    default:
      return null;
  }
};

export function CustomTable({}: CustomTableProps) {
  const { featureFlags } = useFeatureFlags();
  
  const [rowAction, setRowAction] = 
    React.useState<DataTableRowAction<CustomTask> | null>(null);

  // Add pagination state
  const [pageIndex, setPageIndex] = useQueryState(
    "page",
    { defaultValue: "0" }
  );

  // Add page size state
  const [pageSize, setPageSize] = useQueryState(
    "pageSize",
    { defaultValue: "10" }
  );

  // Get advanced filters from URL
  const [advancedFilters, setAdvancedFilters] = useQueryState(
    "filters",
    getFiltersStateParser<CustomTask>().withDefault([])
  );

  // Get join operator from URL
  const [joinOperator] = useQueryState(
    "joinOperator",
    { defaultValue: "and" }
  );

  // Feature flags - stable references
  const enableAdvancedTable = true;
  const enableFloatingBar = false;

  // Convert filters to GraphQL format
  const graphqlFilters = React.useMemo(() => {
    if (!advancedFilters.length) return null;
    
    const convertedFilters = advancedFilters
      .map(convertFilterToGraphQL)
      .filter(Boolean);

    return joinOperator === 'and' 
      ? convertedFilters
      : [];
  }, [advancedFilters, joinOperator]);

  const [tasks, setTasks] = React.useState<CustomTask[]>([]);
  // Fetch tasks using GraphQL with filters
  const { data, loading, error, refetch } = useQuery(GET_TASKS, {
    variables: {
      filters: graphqlFilters ?? {},
      joinOperator,
      offset: Number(pageIndex) * Number(pageSize),
      limit: Number(pageSize)
    },
    onCompleted: (data) => {
      setTasks(data.rdebt_cases);
      console.log('Query completed:', data);
    },
    onError: (error) => {
      console.error('Query error:', error);
    }
  });

  // Handle page size change
  const handlePageSizeChange = React.useCallback((newPageSize: number) => {
    setPageSize(String(newPageSize));
    setPageIndex("0"); // Reset to first page when changing page size
    // Use refetch with the new variables
    refetch({
      filters: graphqlFilters ?? {},
      joinOperator,
      offset: 0, // Reset to first page
      limit: newPageSize
    });
  }, [refetch, graphqlFilters, joinOperator]);

  const columns = React.useMemo(() => getCustomColumns({ setRowAction, data: tasks[0] }), [tasks]);

  // Create filter fields - stable references
  const filterFields = React.useMemo(() => [
    {
      id: "amount1",
      label: "Amount 1",
      placeholder: "Filter amount 1...",
    },
    {
      id: "amount2",
      label: "Amount 2",
      placeholder: "Filter amount 2...",
    },
    {
      id: "batch_id",
      label: "Batch ID",
      placeholder: "Filter batch ID...",
    },
    {
      id: "date",
      label: "Date",
      placeholder: "Filter date...",
    },
    {
      id: "due_date",
      label: "Due Date",
      placeholder: "Filter due date...",
    },
  ] as DataTableFilterField<CustomTask>[], []);

  // Advanced filter fields - stable references
  const advancedFilterFields = React.useMemo(() => [
    {
      id: "amount1",
      label: "Amount 1",
      type: "number",
    },
    {
      id: "amount2",
      label: "Amount 2",
      type: "number",
    },
    {
      id: "batch_id",
      label: "Batch ID",
      type: "text",
    },
    {
      id: "date",
      label: "Date",
      type: "date",
    },
    {
      id: "due_date",
      label: "Due Date",
      type: "date",
    },
    {
      id: "debtorid",
      label: "Debtor ID",
      type: "text",
    },
    {
      id: "client_id",
      label: "Client ID",
      type: "number",
    },
  ] as DataTableAdvancedFilterField<CustomTask>[], []);

  // Function to apply filters - stable reference
  const applyFilters = React.useCallback((newFilters: Filter<CustomTask>[]) => {
    setAdvancedFilters(newFilters);
  }, [setAdvancedFilters]);

  // Memoize the table configuration
  const tableConfig = React.useMemo(() => ({
    data: tasks,
    columns: columns as ColumnDef<CustomTask>[],
    pageCount: Math.ceil((data?.rdebt_cases_aggregate?.aggregate?.count ?? 0) / Number(pageSize)),
    filterFields: filterFields,
    enableAdvancedFilter: enableAdvancedTable,
    initialState: {
      sorting: [{ id: "date" as keyof CustomTask, desc: true }],
      columnPinning: { right: ["actions"] },
      pagination: {
        pageIndex: Number(pageIndex),
        pageSize: Number(pageSize)
      }
    },
    getRowId: (originalRow: CustomTask) => originalRow.id,
    shallow: false,
    clearOnDefault: true,
    clientSideFiltering: false,
    serverSideFiltering: false,
    enableSorting: true,
    enableMultiSort: true,
    enableColumnFilters: true,
    enableFilters: true,
    manualFiltering: true,
    manualPagination: true,
    onPaginationChange: (updater: any) => {
      const newPageIndex = typeof updater === 'function' 
        ? updater({ pageIndex: Number(pageIndex), pageSize: Number(pageSize) }).pageIndex 
        : updater.pageIndex;
      setPageIndex(String(newPageIndex));
      // Use refetch with the new variables
      refetch({
        filters: graphqlFilters ?? {},
        joinOperator,
        offset: newPageIndex * Number(pageSize),
        limit: Number(pageSize)
      });
    },
    onPageSizeChange: handlePageSizeChange
  }), [tasks, columns, filterFields, enableAdvancedTable, pageIndex, pageSize, data?.rdebt_cases_aggregate?.aggregate?.count, refetch, handlePageSizeChange]);

  // Get the table instance with stable configuration
  const { table } = useDataTable(tableConfig);


  // Memoize the floating bar to prevent re-renders
  const floatingBar = React.useMemo(() => 
    enableFloatingBar ? <></> : null
  , [enableFloatingBar, table]);

  // Memoize the toolbar with proper typing
  const toolbar = React.useMemo(() => {
    if (enableAdvancedTable) {
      return (
        <CustomAdvancedToolbar
          table={table}
          filterFields={advancedFilterFields}
          initialFilters={advancedFilters}
          onApply={applyFilters}
          onReset={() => {
            setAdvancedFilters([]);
            refetch({
              filters: {},
              joinOperator,
              offset: 0,
              limit: Number(pageSize)
            });
          }}
        />
      );
    } else {
      return <DataTableToolbar table={table} filterFields={filterFields} />;
    }
  }, [enableAdvancedTable, table, advancedFilterFields, advancedFilters, applyFilters, filterFields, pageSize, refetch]);

  // Memoize the entire DataTable to prevent re-renders
  const dataTable = React.useMemo(() => (
    <DataTable 
      table={table}
    >
      <div className="flex justify-end">
        <ModeToggle/>
      </div>
      {toolbar}
    </DataTable>
  ), [table, floatingBar, toolbar, tasks]);

  return <>{dataTable}</>;
} 