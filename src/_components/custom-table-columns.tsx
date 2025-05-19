import { Column, ColumnDef } from "@tanstack/react-table";
import { AlertCircle, CheckCircle2, Clock, XCircle } from "lucide-react";
import * as React from "react";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { type DataTableRowAction } from "@/types";
import { type CustomTask } from "../_lib/custom-data";

interface GetColumnsProps {
  setRowAction?: React.Dispatch<
    React.SetStateAction<DataTableRowAction<CustomTask> | null>
  >;
  data?: CustomTask;
}

export function getStatusIcon(status: string) {
  switch (status) {
    case "pending":
      return Clock;
    case "in-progress":
      return AlertCircle;
    case "completed":
      return CheckCircle2;
    case "canceled":
      return XCircle;
    default:
      return Clock;
  }
}

export function getPriorityIcon(priority: string) {
  switch (priority) {
    case "low":
      return Clock;
    case "medium":
      return AlertCircle;
    case "high":
      return AlertCircle;
    default:
      return Clock;
  }
}

const getData = (data: CustomTask) => {
  const keys = Object.keys(data).filter((key) => key !== "__typename");
  return keys.map((key) => {
    const title = key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    // Set appropriate column sizes based on content type
    let initialSize = Math.max(100, title.length * 10); // Base size on title length

    // Adjust size based on data type
    const value = data[key as keyof CustomTask];
    if (typeof value === "number") {
      initialSize = Math.min(initialSize, 120); // Numbers usually need less space
    } else if (typeof value === "boolean") {
      initialSize = 100; // Booleans need minimal space
    } else if (typeof value === "string") {
      if (key.includes("date") || value.match(/^\d{4}-\d{2}-\d{2}/)) {
        initialSize = 150; // Dates need specific space
      } else if (value.length > 50) {
        initialSize = 250; // Long text needs more space
      }
    }

    return {
      accessorKey: key,
      header: ({ column }: { column: Column<any, unknown> }) => (
        <DataTableColumnHeader column={column} title={title} />
      ),
      cell: ({ row }: { row: any }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.getValue(key)}
            </span>
          </div>
        );
      },
      size: initialSize,
    };
  });
};

export function getCustomColumns({
  setRowAction,
  data,
}: GetColumnsProps): ColumnDef<CustomTask>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={Boolean(
            table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
          )}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5 mx-auto"
        />
      ),
      cell: ({ row }) => (
        <div className="checkbox-container" onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="translate-y-0.5 mx-auto"
            onClick={(e) => {
              e.stopPropagation();
              row.toggleSelected();
            }}
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
      size: 60, // Fixed width for selection column
    },
    ...(data ? getData(data) : []),
    // {
    //   accessorKey: "batch_id",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Batch ID" />
    //   ),
    //   cell: ({ row }) => (
    //     <div className="font-medium">{row.getValue("batch_id")}</div>
    //   ),
    // },
    // {
    //   id: "actions",
    //   cell: function Cell({ row }) {
    //     return (
    //       <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //           <Button
    //             aria-label="Open menu"
    //             variant="ghost"
    //             className="flex size-8 p-0 data-[state=open]:bg-muted"
    //           >
    //             <Ellipsis className="size-4" aria-hidden="true" />
    //           </Button>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align="end" className="w-40">
    //           <DropdownMenuItem
    //             onSelect={() => setRowAction({ row, type: "update" })}
    //           >
    //             Edit
    //           </DropdownMenuItem>
    //           <DropdownMenuSeparator />
    //           <DropdownMenuItem
    //             onSelect={() => setRowAction({ row, type: "delete" })}
    //           >
    //             Delete
    //             <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
    //           </DropdownMenuItem>
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //     );
    //   },
    //   size: 40,
    // },
  ];
}

// export function getCustomAdvancedFilterFields({
//   data,
// }: GetColumnsProps): ColumnDef<CustomTask>[] {
//   return [...(data ? getFiltersFields(data) : [])];
// }
