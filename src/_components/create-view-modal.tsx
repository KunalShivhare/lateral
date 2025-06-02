import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_TABLE_SCHEMA } from "../_lib/queries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { VisibilityState } from "@tanstack/react-table";

interface CreateViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (viewName: string, columnVisibility: Record<string, boolean>) => void;
  tableName: string;
}

export function CreateViewModal({
  isOpen,
  onClose,
  onSave,
  tableName,
}: CreateViewModalProps) {
  const [viewName, setViewName] = useState("");
  const [availableColumns, setAvailableColumns] = useState<string[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch table schema
  const { data, loading, error } = useQuery(GET_TABLE_SCHEMA, {
    variables: { tableName },
    skip: !isOpen, // Only fetch when modal is open
  });

  // Update available columns when data is loaded
  useEffect(() => {
    if (data?.__type?.fields) {
      const columns = data.__type.fields.map(
        (field: { name: string }) => field.name
      );
      setAvailableColumns(
        columns.filter((col) => !selectedColumns.includes(col))
      );
    }
  }, [data, selectedColumns]);

  // Handle drag start
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    item: string,
    source: "available" | "selected"
  ) => {
    setDraggedItem(item);
    e.dataTransfer.setData("text/plain", JSON.stringify({ item, source }));
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Handle drop for available columns
  const handleDropToAvailable = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));

    if (data.source === "selected" && data.item) {
      setSelectedColumns((prev) => prev.filter((col) => col !== data.item));
      setAvailableColumns((prev) => [...prev, data.item]);
    }

    setDraggedItem(null);
  };

  // Handle drop for selected columns
  const handleDropToSelected = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));

    if (data.source === "available" && data.item) {
      setAvailableColumns((prev) => prev.filter((col) => col !== data.item));
      setSelectedColumns((prev) => [...prev, data.item]);
    }

    setDraggedItem(null);
  };

  // Handle save
  const handleSave = () => {
    if (!viewName.trim()) {
      alert("Please enter a view name");
      return;
    }

    // Create column visibility object where selected columns are true
    const columnVisibility: Record<string, boolean> = {};

    // Set all available columns to false
    availableColumns.forEach((col) => {
      columnVisibility[col] = false;
    });

    // Set all selected columns to true
    selectedColumns.forEach((col) => {
      columnVisibility[col] = true;
    });

    onSave(viewName, columnVisibility);

    // Reset state
    setViewName("");
    setSelectedColumns([]);
    onClose();
  };

  // Handle moving a column from available to selected
  const handleMoveToSelected = (column: string) => {
    setAvailableColumns((prev) => prev.filter((col) => col !== column));
    setSelectedColumns((prev) => [...prev, column]);
  };

  // Handle moving a column from selected to available
  const handleMoveToAvailable = (column: string) => {
    setSelectedColumns((prev) => prev.filter((col) => col !== column));
    setAvailableColumns((prev) => [...prev, column]);
  };

  const handleAllMoveToSelected = () => {
    setAvailableColumns((prev) => []);
    setSelectedColumns((prev) => [...prev, ...availableColumns]);
  };

  const handleAllMoveToAvailable = () => {
    setSelectedColumns((prev) => []);
    setAvailableColumns((prev) => [...prev, ...selectedColumns]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[var(--background)] rounded-lg p-6 w-[800px] max-h-[80vh] overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[var(--primary-text)]">
            Create Result View
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-[var(--ring)] mb-2">
            Result Name:
          </label>
          <Input
            type="text"
            value={viewName}
            onChange={(e) => setViewName(e.target.value)}
            placeholder="Enter view name"
            className="w-full"
          />
        </div>
        <div className="flex flex-row gap-16">
          <Input
            type="text"
            placeholder="Search fields..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full mb-2 opacity-0"
          />

          <Input
            type="text"
            placeholder="Search fields..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full mb-2"
          />
        </div>

        <div className="flex flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-[var(--ring)] mb-2">
              Selected Fields:
            </label>
            <div
              className="border border-[var(--border)] rounded-md h-[300px] overflow-y-auto p-2 bg-[var(--background)]"
              onDragOver={handleDragOver}
              onDrop={handleDropToSelected}
            >
              {selectedColumns.length === 0 ? (
                <p className="text-gray-400 text-center mt-4">
                  Drag fields here to select them
                </p>
              ) : (
                selectedColumns.map((column) => (
                  <div
                    key={column}
                    className="p-2 mb-1 bg-[var(--background)] border-[var(--border)] rounded-md cursor-move flex justify-between items-center"
                    draggable
                    onDragStart={(e) => handleDragStart(e, column, "selected")}
                  >
                    <span className="text-[var(--primary-text)] text-sm">
                      {column}
                    </span>
                    <Button
                      variant="link"
                      size="sm"
                      onClick={() => handleMoveToAvailable(column)}
                      className="h-6 w-6 p-0"
                    >
                      →
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <Button
              variant="link"
              size="sm"
              onClick={() => handleAllMoveToSelected()}
              className="h-6 w-6 p-0"
            >
              ←
            </Button>
            <Button
              variant="link"
              size="sm"
              onClick={() => handleAllMoveToAvailable()}
              className="h-6 w-6 p-0"
            >
              →
            </Button>
          </div>

          <div className="flex-1">
            <div className="mb-2">
              <label className="block text-sm font-medium text-[var(--ring)] mb-1">
                Available Fields:
              </label>
            </div>

            <div
              className="border border-[var(--border)] rounded-md h-[300px] overflow-y-auto p-2 bg-[var(--background)]"
              onDragOver={handleDragOver}
              onDrop={handleDropToAvailable}
            >
              {loading ? (
                <p className="text-gray-400 text-center mt-4">
                  Loading fields...
                </p>
              ) : error ? (
                <p className="text-red-400 text-center mt-4">
                  Error loading fields
                </p>
              ) : availableColumns.length === 0 ? (
                <p className="text-gray-400 text-center mt-4">
                  No available fields
                </p>
              ) : (
                availableColumns
                  .filter((column) =>
                    column.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((column) => (
                    <div
                      key={column}
                      className="p-2 mb-1 bg-[var(--background)] border-[var(--border)] rounded-md cursor-move flex justify-between items-center"
                      draggable
                      onDragStart={(e) =>
                        handleDragStart(e, column, "available")
                      }
                    >
                      <span className="text-[var(--primary-text)] text-sm">
                        {column}
                      </span>
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => handleMoveToSelected(column)}
                        className="h-6 w-6 p-0"
                      >
                        ←
                      </Button>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button variant="outline" onClick={onClose} className="mr-2 ">
            Cancel
          </Button>
          <Button variant="default" onClick={handleSave}>
            Submit Result view
          </Button>
        </div>
      </div>
    </div>
  );
}
