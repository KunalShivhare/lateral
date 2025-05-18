import { useQuery } from "@apollo/client";
import { ColumnDef } from "@tanstack/react-table";
import { useQueryState } from "nuqs";
import * as React from "react";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableAdvancedToolbar } from "@/components/data-table/data-table-advanced-toolbar";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import { getFiltersStateParser } from "@/lib/parsers";
import type {
  DataTableAdvancedFilterField,
  DataTableFilterField,
  Filter,
} from "@/types";

import { ModeToggle } from "@/components/mode-toggle";
import { type CustomTask } from "../_lib/custom-data";
import { GET_TASKS } from "../_lib/queries";
import { getCustomColumns } from "./custom-table-columns";
import { useFeatureFlags } from "./feature-flags-provider";
import TableActionButtons from "@/components/case-list/tableActionButton";
import { CaseListHeader } from "@/components/case-list/CaseListHeader";
import { CaseSearchFilter } from "@/components/case-list/CaseSearchFilter";
import { useSearch } from "@/context/SearchContext";

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
  onReset,
}: CustomAdvancedToolbarProps) {
  // Create a local state for filters that's completely isolated
  const [localFilters, setLocalFilters] =
    React.useState<Filter<any>[]>(initialFilters);
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

  const { searchQuery, setSearchQuery, isNewSearchActive } = useSearch();

  // Memoize the toolbar to prevent re-renders
  const toolbar = React.useMemo(
    () => (
      <div className="flex">
        <div className="relative w-[25%] mr-6">
          <input
            type="text"
            placeholder="Search users and leads"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-[#8C8C8C] rounded py-2 pl-3 pr-10 text-sm"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#8C8C8C"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
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
      </div>
    ),
    [
      table,
      filterFields,
      localFilters,
      handleFilterChange,
      handleApply,
      handleReset,
      open,
    ]
  );

  return <div className="flex flex-col gap-2 w-full">{toolbar}</div>;
});

// Helper function to convert filter to GraphQL format
const convertFilterToGraphQL = (filter: Filter<CustomTask>) => {
  const { id, operator, value, type } = filter;

  switch (operator) {
    case "eq":
      return {
        [id]: { _eq: type === "number" ? Number(value) : value },
      };
    case "ne":
      return {
        [id]: { _neq: type === "number" ? Number(value) : value },
      };
    case "iLike":
      return {
        [id]: { _ilike: `%${value}%` },
      };
    case "notILike":
      return {
        [id]: { _nilike: `%${value}%` },
      };
    case "isEmpty":
      return {
        [id]: { _is_null: true },
      };
    case "isNotEmpty":
      return {
        [id]: { _is_null: false },
      };
    case "lt":
      return {
        [id]: { _lt: type === "number" ? Number(value) : value },
      };
    case "lte":
      return {
        [id]: { _lte: type === "number" ? Number(value) : value },
      };
    case "gt":
      return {
        [id]: { _gt: type === "number" ? Number(value) : value },
      };
    case "gte":
      return {
        [id]: { _gte: type === "number" ? Number(value) : value },
      };
    default:
      return null;
  }
};

export function CustomTable({}: CustomTableProps) {
  // Using useFeatureFlags but not using the featureFlags variable
  useFeatureFlags();

  // Add pagination state
  const [pageIndex, setPageIndex] = useQueryState("page", {
    defaultValue: "0",
  });

  // Add page size state
  const [pageSize, setPageSize] = useQueryState("pageSize", {
    defaultValue: "10",
  });

  // Get advanced filters from URL
  const [advancedFilters, setAdvancedFilters] = useQueryState(
    "filters",
    getFiltersStateParser<CustomTask>().withDefault([])
  );

  // Get join operator from URL
  const [joinOperator] = useQueryState("joinOperator", { defaultValue: "and" });

  // Feature flags - stable references
  const enableAdvancedTable = true;
  const enableFloatingBar = false;

  // Convert filters to GraphQL format
  const graphqlFilters = React.useMemo(() => {
    if (!advancedFilters.length) return null;

    const convertedFilters = advancedFilters
      .map(convertFilterToGraphQL)
      .filter(Boolean);

    return joinOperator === "and" ? convertedFilters : [];
  }, [advancedFilters, joinOperator]);

  const [tasks, setTasks] = React.useState<CustomTask[]>([]);
  // Fetch tasks using GraphQL with filters
  const { data, refetch } = useQuery(GET_TASKS, {
    variables: {
      filters: graphqlFilters ?? {},
      joinOperator,
      offset: Number(pageIndex) * Number(pageSize),
      limit: Number(pageSize),
    },
    onCompleted: (data) => {
      setTasks(data.rdebt_cases);
      console.log("Query completed:", data);
    },
    onError: (error) => {
      console.error("Query error:", error);
    },
  });

  // Handle page size change
  const handlePageSizeChange = React.useCallback(
    (newPageSize: number) => {
      setPageSize(String(newPageSize));
      setPageIndex("0"); // Reset to first page when changing page size
      // Use refetch with the new variables
      refetch({
        filters: graphqlFilters ?? {},
        joinOperator,
        offset: 0, // Reset to first page
        limit: newPageSize,
      });
    },
    [refetch, graphqlFilters, joinOperator]
  );

  const columns = React.useMemo(
    () => getCustomColumns({ data: tasks[0] }),
    [tasks]
  );

  // Create filter fields - stable references
  const filterFields = React.useMemo(
    () =>
      [
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
      ] as DataTableFilterField<CustomTask>[],
    []
  );

  // Advanced filter fields - stable references
  const advancedFilterFields = React.useMemo(
    () =>
      [
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
      ] as DataTableAdvancedFilterField<CustomTask>[],
    []
  );

  // Function to apply filters - stable reference
  const applyFilters = React.useCallback(
    (newFilters: Filter<CustomTask>[]) => {
      setAdvancedFilters(newFilters);
    },
    [setAdvancedFilters]
  );

  // Memoize the table configuration
  const tableConfig = React.useMemo(
    () => ({
      data: tasks,
      columns: columns as ColumnDef<CustomTask>[],
      pageCount: Math.ceil(
        (data?.rdebt_cases_aggregate?.aggregate?.count ?? 0) / Number(pageSize)
      ),
      filterFields: filterFields,
      enableAdvancedFilter: enableAdvancedTable,
      initialState: {
        sorting: [{ id: "date" as keyof CustomTask, desc: true }],
        columnPinning: { right: ["actions"] },
        pagination: {
          pageIndex: Number(pageIndex),
          pageSize: Number(pageSize),
        },
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
        const newPageIndex =
          typeof updater === "function"
            ? updater({
                pageIndex: Number(pageIndex),
                pageSize: Number(pageSize),
              }).pageIndex
            : updater.pageIndex;
        setPageIndex(String(newPageIndex));
        // Use refetch with the new variables
        refetch({
          filters: graphqlFilters ?? {},
          joinOperator,
          offset: newPageIndex * Number(pageSize),
          limit: Number(pageSize),
        });
      },
      onPageSizeChange: handlePageSizeChange,
    }),
    [
      tasks,
      columns,
      filterFields,
      enableAdvancedTable,
      pageIndex,
      pageSize,
      data?.rdebt_cases_aggregate?.aggregate?.count,
      refetch,
      handlePageSizeChange,
    ]
  );

  // Get the table instance with stable configuration
  const { table } = useDataTable(tableConfig);

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
              limit: Number(pageSize),
            });
          }}
        />
      );
    } else {
      return <DataTableToolbar table={table} filterFields={filterFields} />;
    }
  }, [
    enableAdvancedTable,
    table,
    advancedFilterFields,
    advancedFilters,
    applyFilters,
    filterFields,
    pageSize,
    refetch,
  ]);

  // Memoize the entire DataTable to prevent re-renders
  const dataTable = React.useMemo(
    () => (
      <>
        <CaseListHeader />
        {toolbar}
        <DataTable table={table}>
          {/* <div className="flex justify-end">
          <ModeToggle />
          </div> */}
          <TableActionButtons />
        </DataTable>
      </>
    ),
    [table, toolbar, tasks]
  );

  return <>{dataTable}</>;
}
