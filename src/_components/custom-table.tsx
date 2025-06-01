import { useQuery, useMutation } from "@apollo/client";
import {
  ColumnOrderState,
  OnChangeFn,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import { useQueryState } from "nuqs";
import * as React from "react";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableAdvancedToolbar } from "@/components/data-table/data-table-advanced-toolbar";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import { getFiltersStateParser } from "@/lib/parsers";
import type {
  DataTableAdvancedFilterField,
  DataTableFilterField,
  DataTableRowAction,
  Filter,
} from "@/types";

import { CaseListHeader } from "@/components/case-list/CaseListHeader";
import { useSearch } from "@/context/SearchContext";
import { type CustomTask } from "../_lib/custom-data";
import {
  GET_FILTER_DEFINITIONS,
  GET_SAVED_FILTERS,
  GET_SAVED_VIEWS,
  GET_TASKS,
  SAVE_VIEW,
} from "../_lib/queries";
import { getCustomColumns } from "./custom-table-columns";
import { PreviewDialog } from "./preview-dialog";
import { Button } from "@/components/ui/button";
import { CreateViewModal } from "./create-view-modal";

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
    setLocalFilters(initialFilters);
  }, [initialFilters]);

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
            className="w-full border border-[#8C8C8C] rounded py-2 pl-3 pr-10 text-sm text-[#8C8C8C]"
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
  const [rowAction, setRowAction] =
    React.useState<DataTableRowAction<CustomTask> | null>(null);

  // Fetch filter definitions at the top level
  const { data: filterDefinitionsData, loading: filterDefinitionsLoading } =
    useQuery(GET_FILTER_DEFINITIONS);
  const filterDefinitions = filterDefinitionsData?.filter_definition || [];

  // Add pagination state
  const [pageIndex, setPageIndex] = useQueryState("page", {
    defaultValue: "0",
  });

  // Add page size state
  const [pageSize, setPageSize] = useQueryState("pageSize", {
    defaultValue: "10",
  });

  // Add sorting state
  const [sorting, setSorting] = useState(
    JSON.stringify([{ id: "date", desc: true }])
  );

  // Get advanced filters from URL
  const [advancedFilters, setAdvancedFilters] = useQueryState(
    "filters",
    getFiltersStateParser<any>().withDefault([])
  );

  // Get join operator from URL
  const [joinOperator] = useQueryState("joinOperator", { defaultValue: "and" });

  // Track column visibility state with no initial hidden columns
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  // Column ordering state
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([]);

  // Table reference to be used in callbacks
  const tableRef = React.useRef<any>(null);

  // Query for saved filters
  const { data: savedFiltersData, refetch: refetchSavedFilters } =
    useQuery(GET_SAVED_FILTERS);

  // Query for saved views
  const {
    data: savedViewsData,
    loading: viewsLoading,
    refetch: refetchSavedViews,
  } = useQuery(GET_SAVED_VIEWS);

  // Create filter fields - stable references
  const filterFields = React.useMemo(() => {
    return filterDefinitions
      .filter((def: any) => def.active)
      .map((def: any) => ({
        id: def.column_name,
        label: def.display_name,
        placeholder: `Filter ${def.display_name.toLowerCase()}...`,
      })) as DataTableFilterField<CustomTask>[];
  }, [filterDefinitions]);

  // Advanced filter fields - stable references
  const advancedFilterFields = React.useMemo(() => {
    return filterDefinitions
      .filter((def: any) => def.active)
      .map((def: any) => ({
        id: def.column_name,
        label: def.display_name,
        type: def.filter_type,
        placeholder: `Filter ${def.display_name.toLowerCase()}...`,
      })) as DataTableAdvancedFilterField<CustomTask>[];
  }, [filterDefinitions]);

  const convertFilterToGraphQL = React.useCallback(
    (filter: Filter<any>) => {
      const { id, operator, value } = filter;
      const filterDef = filterDefinitions.find(
        (def: any) => def.column_name === id
      );

      if (!filterDef) return null;

      // Create the base filter object based on the table name
      const createFilterObject = (condition: any) => {
        // If it's the main table (rdebt_cases), return direct filter
        if (filterDef.table_name === "rdebt_cases") {
          console.log("🚀 ~ createFilterObject ~ condition:", condition);
          return condition;
        }

        // For nested tables, create the appropriate structure
        switch (filterDef.table_name) {
          case "rdebt_debtor":
            return {
              debtor: condition,
            };
          case "rdebt_creditor":
            return {
              creditor: condition,
            };
          // Add more cases for other related tables
          default:
            return condition;
        }
      };

      // Handle empty/null values
      if (operator === "isEmpty") {
        return createFilterObject({ [id]: { _is_null: true } });
      }
      if (operator === "isNotEmpty") {
        return createFilterObject({ [id]: { _is_null: false } });
      }

      // Handle different filter types
      switch (filterDef.filter_type) {
        case "text":
          switch (operator) {
            case "eq":
              return createFilterObject({ [id]: { _eq: value } });
            case "ne":
              return createFilterObject({ [id]: { _neq: value } });
            case "iLike":
              return createFilterObject({ [id]: { _ilike: `%${value}%` } });
            case "notILike":
              return createFilterObject({ [id]: { _nilike: `%${value}%` } });
            default:
              return null;
          }
        case "number":
          const numValue = Number(value);
          if (isNaN(numValue)) return null;
          switch (operator) {
            case "eq":
              return createFilterObject({ [id]: { _eq: numValue } });
            case "ne":
              return createFilterObject({ [id]: { _neq: numValue } });
            case "lt":
              return createFilterObject({ [id]: { _lt: numValue } });
            case "lte":
              return createFilterObject({ [id]: { _lte: numValue } });
            case "gt":
              return createFilterObject({ [id]: { _gt: numValue } });
            case "gte":
              return createFilterObject({ [id]: { _gte: numValue } });
            default:
              return null;
          }
        case "date":
          switch (operator) {
            case "eq":
              return createFilterObject({ [id]: { _eq: value } });
            case "ne":
              return createFilterObject({ [id]: { _neq: value } });
            case "lt":
              return createFilterObject({ [id]: { _lt: value } });
            case "lte":
              return createFilterObject({ [id]: { _lte: value } });
            case "gt":
              return createFilterObject({ [id]: { _gt: value } });
            case "gte":
              return createFilterObject({ [id]: { _gte: value } });
            case "isBetween":
              return createFilterObject({
                [id]: {
                  _gte: value[0],
                  _lte: value[1],
                },
              });
            default:
              return null;
          }
        default:
          return null;
      }
    },
    [filterDefinitions]
  );

  // Function to apply filters - stable reference
  const applyFilters = React.useCallback(
    (newFilters: Filter<any>[]) => {
      setAdvancedFilters(newFilters);
      const filters =
        joinOperator === "and"
          ? newFilters.map(convertFilterToGraphQL).filter(Boolean) ?? {}
          : {};
      // After setting the filters, refetch the data
      refetch({
        filters: filters,
        joinOperator,
        offset: Number(pageIndex) * Number(pageSize),
        limit: Number(pageSize),
      });
    },
    [
      setAdvancedFilters,
      joinOperator,
      pageIndex,
      pageSize,
      convertFilterToGraphQL,
    ]
  );

  // Parse sorting state
  const parsedSorting = React.useMemo(() => {
    try {
      const parsed = JSON.parse(sorting);
      return parsed.map((item: any) => ({
        id: item.id as keyof CustomTask,
        desc: item.desc as boolean,
      }));
    } catch (e) {
      return [{ id: "date" as keyof CustomTask, desc: true }];
    }
  }, [sorting]);

  // Feature flags - stable references
  const enableAdvancedTable = true;
  const enableFloatingBar = false;

  // Convert sorting to GraphQL format
  const graphqlSorting = React.useMemo(() => {
    return parsedSorting.map(
      (sort: { id: keyof CustomTask; desc: boolean }) => ({
        [sort.id]: sort.desc ? "desc" : "asc",
      })
    );
  }, [parsedSorting]);

  const [tasks, setTasks] = React.useState<CustomTask[]>([]);

  // State for preview dialog
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [previewCaseId, setPreviewCaseId] = React.useState<string | null>(null);

  // Handle row preview
  const handlePreview = React.useCallback(
    (row: CustomTask) => {
      // If the same case is clicked again, close the preview
      if (previewCaseId === row.id && previewOpen) {
        setPreviewOpen(false);
      } else {
        // Otherwise, open the preview with the new case
        setPreviewCaseId(row.id);
        setPreviewOpen(true);
      }
    },
    [previewCaseId, previewOpen]
  );

  // Fetch tasks using GraphQL with filters
  const { data, loading, error, refetch } = useQuery(GET_TASKS, {
    variables: {
      filters:
        joinOperator === "and"
          ? advancedFilters.map(convertFilterToGraphQL).filter(Boolean) ?? {}
          : {},
      joinOperator,
      offset: Number(pageIndex) * Number(pageSize),
      limit: Number(pageSize),
      orderBy: graphqlSorting,
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
        filters:
          joinOperator === "and"
            ? advancedFilters.map(convertFilterToGraphQL).filter(Boolean) ?? {}
            : {},
        joinOperator,
        offset: 0, // Reset to first page
        limit: newPageSize,
        orderBy: graphqlSorting,
      });
    },
    [refetch, joinOperator, graphqlSorting, advancedFilters]
  );

  // Handle sorting change
  const handleSortingChange = React.useCallback<OnChangeFn<SortingState>>(
    (updaterOrValue) => {
      // Extract field and value from the string format
      const [field, value] = String(updaterOrValue).split("-");

      if (!field || !value) {
        console.error("Invalid sorting format:", updaterOrValue);
        return;
      }

      if (value === "none") {
        setSorting(JSON.stringify([]));
        const newGraphqlSorting = [
          {
            ["id"]: "asc",
          },
        ];
        refetch({
          filters:
            joinOperator === "and"
              ? advancedFilters.map(convertFilterToGraphQL).filter(Boolean) ??
                {}
              : {},
          joinOperator,
          offset: Number(pageIndex) * Number(pageSize),
          limit: Number(pageSize),
          orderBy: newGraphqlSorting,
        });
        if (tableRef.current) {
          tableRef.current.setSorting([]);
        }
        return;
      }

      // Create a new sorting state
      const newSorting = [
        {
          id: field,
          desc: value === "desc",
        },
      ];

      // Store the sorting state
      setSorting(JSON.stringify(newSorting));

      // Convert to GraphQL format for the API
      const newGraphqlSorting = [
        {
          [field]: value === "asc" ? "asc" : "desc",
        },
      ];

      // Always refetch when sorting changes
      refetch({
        filters:
          joinOperator === "and"
            ? advancedFilters.map(convertFilterToGraphQL).filter(Boolean) ?? {}
            : {},
        joinOperator,
        offset: Number(pageIndex) * Number(pageSize),
        limit: Number(pageSize),
        orderBy: newGraphqlSorting,
      });

      // Force update the table's sorting state to match our new state
      if (tableRef.current) {
        tableRef.current.setSorting(newSorting);
      }
    },
    [joinOperator, pageIndex, pageSize, advancedFilters]
  );

  const columns = React.useMemo(
    () =>
      getCustomColumns({
        setRowAction,
        data: tasks[0],
        onPreview: handlePreview,
        handleSortingChange,
      }),
    [tasks, handlePreview, setRowAction]
  );

  // Handle selecting a saved filter
  const handleSavedFilterSelect = React.useCallback(
    (filters: Filter<any>[]) => {
      applyFilters(filters);
    },
    [applyFilters]
  );

  // Handle selecting a saved view - using tableRef instead of direct table reference
  const handleSavedViewSelect = React.useCallback((views: VisibilityState) => {
    // Apply the column visibility from the saved view
    setColumnVisibility(views);

    // Update the table's columnVisibility state if table exists
    if (tableRef.current) {
      tableRef.current.setColumnVisibility(views);
    }
  }, []);

  // Initialize column order when columns change
  React.useEffect(() => {
    if (columns.length > 0) {
      // Set initial column order based on column ids
      const initialColumnOrder = columns
        .map((column) => {
          // Get the column ID - each column should have an id
          if (typeof column.id === "string") {
            return column.id;
          }
          // If no id, try to get the accessorKey if it exists
          if (
            "accessorKey" in column &&
            typeof column.accessorKey === "string"
          ) {
            return column.accessorKey;
          }
          return "";
        })
        .filter((id) => id !== ""); // Filter out any empty ids

      setColumnOrder(initialColumnOrder);
    }
  }, [columns]);

  // Memoize the table configuration
  const tableConfig = React.useMemo(
    () => ({
      data: tasks,
      columns: columns,
      pageCount: data?.rdebt_cases_aggregate?.aggregate?.count
        ? Math.ceil(
            data.rdebt_cases_aggregate.aggregate.count / Number(pageSize)
          )
        : 0,
      filterFields: filterFields,
      enableAdvancedFilter: enableAdvancedTable,
      advancedFilterFields: advancedFilterFields,
      initialState: {
        sorting: parsedSorting.map(
          (sort: { id: keyof CustomTask; desc: boolean }) => ({
            id: sort.id as keyof CustomTask,
            desc: sort.desc,
          })
        ),
        columnPinning: { right: ["actions"] },
        pagination: {
          pageIndex: Number(pageIndex),
          pageSize: Number(pageSize),
        },
        columnVisibility,
        columnOrder,
      },
      state: {
        sorting: parsedSorting,
        pagination: {
          pageIndex,
          pageSize: Number(pageSize),
        },
        columnVisibility,
        columnOrder,
      },
      // Enable column resizing with a valid mode
      enableColumnResizing: true,
      columnResizeMode: "onEnd" as const,
      // Enable column reordering
      enableColumnDragging: true,
      getRowId: (originalRow: CustomTask) => originalRow.id,
      shallow: false,
      clearOnDefault: true,
      serverSideFiltering: false,
      enableSorting: true,
      enableMultiSort: true,
      enableColumnFilters: true,
      enableFilters: true,
      manualFiltering: true,
      manualPagination: true,
      manualSorting: true,
      onPaginationChange: (updater: any) => {
        const newPageIndex =
          typeof updater === "function"
            ? updater({
                pageIndex: Number(pageIndex),
                pageSize: Number(pageSize),
              }).pageIndex
            : updater.pageIndex;
        setPageIndex(String(newPageIndex));
        const filters =
          joinOperator === "and"
            ? advancedFilters.map(convertFilterToGraphQL).filter(Boolean) ?? {}
            : {};
        // Use refetch with the new variables
        refetch({
          filters: filters,
          joinOperator,
          offset: newPageIndex * Number(pageSize),
          limit: Number(pageSize),
          orderBy: graphqlSorting,
        });
      },
      // onSortingChange: handleSortingChange,
      onPageSizeChange: handlePageSizeChange,
      onColumnVisibilityChange: (updater: any) => {
        // Handle both function updater and direct value
        const updatedVisibility =
          typeof updater === "function" ? updater(columnVisibility) : updater;

        setColumnVisibility(updatedVisibility);
      },
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
      handleSortingChange,
      graphqlSorting,
      columnVisibility,
      columnOrder,
    ]
  );

  // Get the table instance with stable configuration
  const { table } = useDataTable(tableConfig);

  // Store table reference for callbacks and ensure column visibility reset is applied
  React.useEffect(() => {
    if (table) {
      tableRef.current = table;

      // Ensure the table has empty column visibility on page refresh
      // This will show all columns by default
      table.setColumnVisibility({});
    }
  }, [table]);

  // Synchronize the table's sorting state with our custom sorting state
  React.useEffect(() => {
    if (table && parsedSorting && parsedSorting.length > 0) {
      console.log("Synchronizing table sorting state with:", parsedSorting);
      // Update the table's sorting state to match our custom state
      table.setSorting(parsedSorting);
    }
  }, [table, parsedSorting]);

  // Memoize the toolbar with proper typing
  const toolbar = React.useMemo(() => {
    if (enableAdvancedTable) {
      return (
        <div className="flex flex-col gap-2 w-full">
          {/* <div className="flex justify-between items-center mb-2">
            <div className="flex gap-2">
              <SavedFiltersDropdown onSelect={handleSavedFilterSelect} />
              <SaveFilterDialog 
                filters={advancedFilters} 
                onSave={() => refetchSavedFilters()} 
              />
              <div className="border-r border-gray-200 h-8 mx-2"></div>
              <SavedViewsDropdown onSelect={handleSavedViewSelect} />
              <SaveViewDialog 
                columnVisibility={table.getState().columnVisibility} 
                onSave={() => refetchSavedViews()} 
              />
              </div>
              </div> */}
          <div className="flex justify-between items-center mb-2">
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
            {Object.keys(columnVisibility).length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // Reset column visibility to show all columns
                  setColumnVisibility({});
                  table.setColumnVisibility({});
                }}
              >
                Reset View
              </Button>
            )}
          </div>
        </div>
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
    graphqlSorting,
    handleSavedFilterSelect,
    handleSavedViewSelect,
    refetchSavedFilters,
    refetchSavedViews,
  ]);

  // State for create view modal
  const [createViewModalOpen, setCreateViewModalOpen] = useState(false);

  // Handle create new view
  const handleCreateView = React.useCallback(() => {
    // Open the create view modal
    setCreateViewModalOpen(true);
  }, []);

  // Handle select view
  const handleSelectView = React.useCallback(
    (viewId: string) => {
      // Find the selected view
      const selectedView = savedViewsData?.user_views.find(
        (view: any) => view.id === viewId
      );
      if (selectedView && selectedView.views) {
        console.log("Applying view:", selectedView.view_name);
        // Apply the view settings to the table
        try {
          const viewData = selectedView.views;
          // Apply the new visibility state
          handleSavedViewSelect(viewData);
          // Apply column order if available
          if (viewData.columnOrder) {
            setColumnOrder(viewData.columnOrder);
          }

          // Apply filters if available
          if (viewData.filters) {
            setAdvancedFilters(viewData.filters);
          }

          // Apply sorting if available
          if (viewData.sorting) {
            // Parse the sorting if it's stored as a string, otherwise use directly
            const sortingData =
              typeof viewData.sorting === "string"
                ? JSON.parse(viewData.sorting)
                : viewData.sorting;
            setSorting(sortingData);
          }
        } catch (error) {
          console.error("Error applying view:", error);
        }
      }
    },
    [
      savedViewsData,
      setColumnOrder,
      handleSavedViewSelect,
      setAdvancedFilters,
      setSorting,
    ]
  );

  // Memoize the entire DataTable to prevent re-renders
  const dataTable = React.useMemo(
    () => (
      <>
        <CaseListHeader />
        {toolbar}
        <DataTable
          table={table}
          savedViews={savedViewsData?.user_views || []}
          viewsLoading={viewsLoading}
          onCreateView={handleCreateView}
          onSelectView={handleSelectView}
        ></DataTable>
      </>
    ),
    [
      table,
      toolbar,
      tasks,
      savedViewsData,
      viewsLoading,
      handleCreateView,
      handleSelectView,
    ]
  );

  // Add save view mutation
  const [saveView, { loading: saveViewLoading }] = useMutation(SAVE_VIEW, {
    onCompleted: (data) => {
      console.log("View saved successfully:", data);
      // Refetch saved views to update the list
      refetchSavedViews();
    },
    onError: (error) => {
      console.error("Error saving view:", error);
    },
  });

  // Handle save view from modal
  const handleSaveView = (
    viewName: string,
    columnVisibility: Record<string, boolean>
  ) => {
    // Create view data object
    const viewData = {
      ...columnVisibility,
      // Include other view settings if needed
      columnOrder: columnOrder,
      filters: advancedFilters,
      sorting: parsedSorting,
    };

    // Save the view using the mutation
    saveView({
      variables: {
        view_name: viewName,
        views: viewData,
      },
    });
  };

  return (
    <>
      {dataTable}
      <PreviewDialog
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        caseId={previewCaseId}
      />
      <CreateViewModal
        isOpen={createViewModalOpen}
        onClose={() => setCreateViewModalOpen(false)}
        onSave={handleSaveView}
        tableName="rdebt_cases"
      />
    </>
  );
}
