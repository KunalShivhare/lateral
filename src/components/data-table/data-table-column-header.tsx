import { SelectIcon } from "@radix-ui/react-select";
import type { Column, Table } from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ChevronsUpDown,
  GripVertical,
  X,
} from "lucide-react";
import { useRef, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  table: Table<TData>;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  table,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort() && !column.getCanHide()) {
    return <div className={cn(className)}>{title}</div>;
  }

  const noneValue = `${column.id}-none`;
  const ascValue = `${column.id}-asc`;
  const descValue = `${column.id}-desc`;
  const hideValue = `${column.id}-hide`;

  // State to track if we're dragging the grip handle
  const [isDragging, setIsDragging] = useState(false);
  const gripRef = useRef<HTMLDivElement>(null);

  // Handle drag start from the grip handle
  const handleGripDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDragging(true);

    // Set the column ID as drag data
    e.dataTransfer.setData("column-id", column.id);
    e.dataTransfer.effectAllowed = "move";

    // Create a ghost image for dragging
    if (gripRef.current) {
      const rect = gripRef.current.getBoundingClientRect();
      const ghostEl = document.createElement("div");
      ghostEl.style.width = `${rect.width}px`;
      ghostEl.style.height = `${rect.height}px`;
      ghostEl.style.background = "rgba(0, 0, 0, 0.1)";
      ghostEl.style.border = "2px dashed #666";
      ghostEl.style.position = "absolute";
      ghostEl.style.top = "-1000px";
      ghostEl.style.left = "-1000px";
      document.body.appendChild(ghostEl);

      e.dataTransfer.setDragImage(ghostEl, 0, 0);

      // Clean up ghost element
      setTimeout(() => {
        document.body.removeChild(ghostEl);
      }, 0);
    }
  };

  // Handle drag over
  const handleGripDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
  };

  // Handle drag end
  const handleGripDragEnd = () => {
    setIsDragging(false);
  };

  // Handle drop
  const handleGripDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // Get the dragged column ID
    const sourceId = e.dataTransfer.getData("column-id");
    const targetId = column.id;

    // Don't do anything if dropping the column on itself
    if (sourceId === targetId) {
      return;
    }

    // Get all visible columns
    const columns = table
      .getAllLeafColumns()
      .filter((col) => col.getIsVisible());

    // Get current column order or initialize with all column IDs
    const currentOrder =
      table.getState().columnOrder.length > 0
        ? [...table.getState().columnOrder]
        : columns.map((col) => col.id);

    // Find indices
    const sourceIndex = currentOrder.indexOf(sourceId);
    const targetIndex = currentOrder.indexOf(targetId);

    // Ensure both columns are in the order array
    if (sourceIndex === -1 || targetIndex === -1) {
      return;
    }

    // Create new order by moving the source column to the target position
    const newOrder = [...currentOrder];
    newOrder.splice(sourceIndex, 1);
    newOrder.splice(targetIndex, 0, sourceId);

    // Update the column order
    table.setColumnOrder(newOrder);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Grip handle for dragging */}
      <div
        ref={gripRef}
        draggable
        onDragStart={handleGripDragStart}
        onDragEnd={handleGripDragEnd}
        onDragOver={handleGripDragOver}
        onDrop={handleGripDrop}
        className="cursor-grab hover:bg-gray-100 rounded p-1"
        onClick={(e) => e.stopPropagation()}
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>
      <Select
        value={
          column.getIsSorted() === "desc"
            ? descValue
            : column.getIsSorted() === "asc"
            ? ascValue
            : noneValue
        }
        onValueChange={(value) => {
          if (value === ascValue) column.toggleSorting(false);
          else if (value === descValue) column.toggleSorting(true);
          else if (value === hideValue) column.toggleVisibility(false);
          else if (value === noneValue) column.clearSorting();
        }}
      >
        <SelectTrigger
          aria-label={
            column.getIsSorted() === "desc"
              ? "Sorted descending. Click to sort ascending."
              : column.getIsSorted() === "asc"
              ? "Sorted ascending. Click to sort descending."
              : "Not sorted. Click to sort ascending."
          }
          className="h-8 w-fit shadow-none dark:bg-transparent border-none text-xs [&>svg:last-child]:hidden"
        >
          <div className="flex justify-between gap-2">
            <span className="text-xs">{title}</span>
            <SelectIcon asChild>
              {column.getCanSort() && column.getIsSorted() === "desc" ? (
                <ArrowDown className="ml-2.5 size-4" aria-hidden="true" />
              ) : column.getIsSorted() === "asc" ? (
                <ArrowUp className="ml-2.5 size-4" aria-hidden="true" />
              ) : (
                <ChevronsUpDown className="ml-2.5 size-4" aria-hidden="true" />
              )}
            </SelectIcon>
          </div>
        </SelectTrigger>
        <SelectContent align="start">
          {column.getCanSort() && (
            <>
              <SelectItem value={ascValue}>
                <span className="flex items-center">
                  <ArrowUp
                    className="mr-2 size-3.5 text-muted-foreground/70"
                    aria-hidden="true"
                  />
                  Asc
                </span>
              </SelectItem>
              <SelectItem value={descValue}>
                <span className="flex items-center">
                  <ArrowDown
                    className="mr-2 size-3.5 text-muted-foreground/70"
                    aria-hidden="true"
                  />
                  Desc
                </span>
              </SelectItem>
              <SelectItem value={noneValue}>
                <span className="flex items-center gap-2">
                  <X
                    className="size-3.5 text-muted-foreground/70"
                    aria-hidden="true"
                  />
                  Reset
                </span>
              </SelectItem>
            </>
          )}
          {/* {column.getCanHide() && (
            <SelectItem value={hideValue}>
              <span className="flex items-center">
                <EyeOff
                  className="mr-2 size-3.5 text-muted-foreground/70"
                  aria-hidden="true"
                />
                Hide
              </span>
            </SelectItem>
          )} */}
        </SelectContent>
      </Select>
    </div>
  );
}
