import type { CustomTask } from "../_lib/custom-data";
import type { DataTableRowAction } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { AlertCircle, CheckCircle2, Clock, XCircle } from "lucide-react";
import * as React from "react";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";

interface GetColumnsProps {
  setRowAction?: React.Dispatch<
    React.SetStateAction<DataTableRowAction<CustomTask> | null>
  >;
  data?: CustomTask;
}

export function getStatusIcon(status: CustomTask["status"]) {
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

export function getPriorityIcon(priority: CustomTask["priority"]) {
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
    const title =
      key.replace(/_/g, " ").charAt(0).toUpperCase() +
      key.replace(/_/g, " ").slice(1);
    return {
      accessorKey: key,
      header: ({ column }: { column: any }) => (
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
    };
  });
};

export function getCustomColumns({
  data,
}: Omit<GetColumnsProps, "setRowAction">): ColumnDef<CustomTask>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected()
              ? true
              : table.getIsSomePageRowsSelected()
              ? "indeterminate"
              : false
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5 mr-4"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5 mr-4"
        />
      ),
      enableSorting: false,
      enableHiding: false,
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
