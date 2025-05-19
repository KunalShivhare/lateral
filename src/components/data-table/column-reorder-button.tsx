import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown } from "lucide-react";

interface ColumnReorderButtonProps<TData> {
  table: Table<TData>;
}

export function ColumnReorderButton<TData>({
  table,
}: ColumnReorderButtonProps<TData>) {
  // Get all visible columns
  const columns = table
    .getAllLeafColumns()
    .filter((column) => column.getIsVisible());

  // Get current column order or default to empty array
  const columnOrder = table.getState().columnOrder || [];

  // Handle column move up
  const moveColumnUp = (columnId: string) => {
    // Get current order or initialize with all column IDs if empty
    const currentOrder =
      columnOrder.length > 0 ? [...columnOrder] : columns.map((col) => col.id);

    const columnIndex = currentOrder.indexOf(columnId);

    // Can't move up if it's already at the top
    if (columnIndex <= 0) return;

    // Swap with the column above it
    const newOrder = [...currentOrder];
    [newOrder[columnIndex], newOrder[columnIndex - 1]] = [
      newOrder[columnIndex - 1],
      newOrder[columnIndex],
    ];

    // Update column order
    table.setColumnOrder(newOrder);
  };

  // Handle column move down
  const moveColumnDown = (columnId: string) => {
    // Get current order or initialize with all column IDs if empty
    const currentOrder =
      columnOrder.length > 0 ? [...columnOrder] : columns.map((col) => col.id);

    const columnIndex = currentOrder.indexOf(columnId);

    // Can't move down if it's already at the bottom
    if (columnIndex === -1 || columnIndex >= currentOrder.length - 1) return;

    // Swap with the column below it
    const newOrder = [...currentOrder];
    [newOrder[columnIndex], newOrder[columnIndex + 1]] = [
      newOrder[columnIndex + 1],
      newOrder[columnIndex],
    ];

    // Update column order
    table.setColumnOrder(newOrder);
  };

  // Reset column order to default
  const resetColumnOrder = () => {
    table.setColumnOrder([]);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto h-8 gap-1">
          <ArrowUpDown className="h-3.5 w-3.5" />
          <span>Reorder</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>Reorder Columns</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {columns.map((column) => {
          // Get column title from header
          const headerContext = column.columnDef.header;
          let columnTitle = column.id;

          if (typeof headerContext === "string") {
            columnTitle = headerContext;
          } else if (typeof headerContext === "function") {
            // Try to extract title from the column definition if possible
            // This is a best effort approach
            const columnDef = column.columnDef as any; // Use type assertion for flexibility
            if (columnDef.accessorKey) {
              columnTitle = columnDef.accessorKey
                .split("_")
                .map(
                  (word: string) => word.charAt(0).toUpperCase() + word.slice(1)
                )
                .join(" ");
            }
          }

          return (
            <div key={column.id} className="px-2 py-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm truncate max-w-[120px]">
                  {columnTitle}
                </span>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={() => moveColumnUp(column.id)}
                    disabled={columnOrder.indexOf(column.id) <= 0}
                  >
                    ↑
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={() => moveColumnDown(column.id)}
                    disabled={
                      columnOrder.indexOf(column.id) >= columns.length - 1
                    }
                  >
                    ↓
                  </Button>
                </div>
              </div>
            </div>
          );
        })}

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={resetColumnOrder}>
          Reset to Default Order
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
